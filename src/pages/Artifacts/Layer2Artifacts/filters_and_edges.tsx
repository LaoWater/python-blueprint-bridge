import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Zap, Eye, Sliders, ArrowLeft, Home } from 'lucide-react';

const OpenCVConvolutionLab = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('original');
  const [kernelSize, setKernelSize] = useState(5);
  const [edgeThreshold1, setEdgeThreshold1] = useState(100);
  const [edgeThreshold2, setEdgeThreshold2] = useState(200);
  const [showKernelOverlay, setShowKernelOverlay] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const canvasRef = useRef(null);
  const originalCanvasRef = useRef(null);

  // Create a sample image programmatically (geometric shapes for clear demonstration)
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Create a scene with clear shapes for demonstrating filters
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 400, 300);
    
    // Circle (demonstrates edge detection)
    ctx.fillStyle = '#e94560';
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fill();
    
    // Rectangle (demonstrates sharpening)
    ctx.fillStyle = '#16213e';
    ctx.fillRect(200, 50, 120, 80);
    
    // Triangle (demonstrates blur effects)
    ctx.fillStyle = '#0f3460';
    ctx.beginPath();
    ctx.moveTo(300, 200);
    ctx.lineTo(350, 280);
    ctx.lineTo(250, 280);
    ctx.closePath();
    ctx.fill();
    
    // Add noise for blur demonstration
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 400;
      const y = Math.random() * 300;
      const brightness = Math.random() * 100 + 100;
      ctx.fillStyle = `rgb(${brightness},${brightness},${brightness})`;
      ctx.fillRect(x, y, 1, 1);
    }
    
    setUploadedImage(canvas);
  }, []);

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 400;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          setUploadedImage(canvas);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply convolution filter
  useEffect(() => {
    if (!uploadedImage || !canvasRef.current || !originalCanvasRef.current) return;

    const canvas = canvasRef.current;
    const originalCanvas = originalCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const origCtx = originalCanvas.getContext('2d');
    
    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;
    originalCanvas.width = uploadedImage.width;
    originalCanvas.height = uploadedImage.height;
    
    // Draw original
    origCtx.drawImage(uploadedImage, 0, 0);
    const originalImageData = origCtx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Apply selected filter
    let resultImageData;
    
    switch(selectedFilter) {
      case 'blur':
        resultImageData = applyBoxBlur(originalImageData, kernelSize);
        break;
      case 'gaussian':
        resultImageData = applyGaussianBlur(originalImageData, kernelSize);
        break;
      case 'sharpen':
        resultImageData = applySharpen(originalImageData);
        break;
      case 'edge':
        resultImageData = applyEdgeDetection(originalImageData, edgeThreshold1, edgeThreshold2);
        break;
      case 'emboss':
        resultImageData = applyEmboss(originalImageData);
        break;
      default:
        resultImageData = originalImageData;
    }
    
    ctx.putImageData(resultImageData, 0, 0);
    
    // Draw kernel overlay if enabled
    if (showKernelOverlay && selectedFilter !== 'original' && selectedFilter !== 'edge') {
      drawKernelOverlay(ctx, canvas.width / 2, canvas.height / 2, kernelSize);
    }
  }, [uploadedImage, selectedFilter, kernelSize, edgeThreshold1, edgeThreshold2, showKernelOverlay]);

  // Box blur (simple averaging kernel)
  const applyBoxBlur = (imageData, kSize) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);
    const halfK = Math.floor(kSize / 2);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0, count = 0;
        
        // Convolve: slide kernel over neighborhood
        for (let ky = -halfK; ky <= halfK; ky++) {
          for (let kx = -halfK; kx <= halfK; kx++) {
            const px = x + kx;
            const py = y + ky;
            
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const idx = (py * width + px) * 4;
              r += data[idx];
              g += data[idx + 1];
              b += data[idx + 2];
              count++;
            }
          }
        }
        
        const outIdx = (y * width + x) * 4;
        output.data[outIdx] = r / count;
        output.data[outIdx + 1] = g / count;
        output.data[outIdx + 2] = b / count;
        output.data[outIdx + 3] = 255;
      }
    }
    
    return output;
  };

  // Gaussian blur (weighted averaging)
  const applyGaussianBlur = (imageData, kSize) => {
    const kernel = generateGaussianKernel(kSize);
    return applyConvolution(imageData, kernel);
  };

  const generateGaussianKernel = (size) => {
    const sigma = size / 3;
    const kernel = [];
    const halfSize = Math.floor(size / 2);
    let sum = 0;
    
    for (let y = -halfSize; y <= halfSize; y++) {
      const row = [];
      for (let x = -halfSize; x <= halfSize; x++) {
        const value = Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
        row.push(value);
        sum += value;
      }
      kernel.push(row);
    }
    
    // Normalize
    return kernel.map(row => row.map(v => v / sum));
  };

  // Sharpen filter
  const applySharpen = (imageData) => {
    const kernel = [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0]
    ];
    return applyConvolution(imageData, kernel);
  };

  // Emboss filter
  const applyEmboss = (imageData) => {
    const kernel = [
      [-2, -1, 0],
      [-1, 1, 1],
      [0, 1, 2]
    ];
    return applyConvolution(imageData, kernel);
  };

  // Generic convolution
  const applyConvolution = (imageData, kernel) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);
    const kSize = kernel.length;
    const halfK = Math.floor(kSize / 2);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0;
        
        for (let ky = 0; ky < kSize; ky++) {
          for (let kx = 0; kx < kSize; kx++) {
            const px = x + kx - halfK;
            const py = y + ky - halfK;
            
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const idx = (py * width + px) * 4;
              const weight = kernel[ky][kx];
              r += data[idx] * weight;
              g += data[idx + 1] * weight;
              b += data[idx + 2] * weight;
            }
          }
        }
        
        const outIdx = (y * width + x) * 4;
        output.data[outIdx] = Math.max(0, Math.min(255, r));
        output.data[outIdx + 1] = Math.max(0, Math.min(255, g));
        output.data[outIdx + 2] = Math.max(0, Math.min(255, b));
        output.data[outIdx + 3] = 255;
      }
    }
    
    return output;
  };

  // Simple edge detection (Sobel-like)
  const applyEdgeDetection = (imageData, threshold1, threshold2) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const gray = new Uint8Array(width * height);
    
    // Convert to grayscale
    for (let i = 0; i < data.length; i += 4) {
      gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    
    // Sobel operators
    const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    
    const output = new ImageData(width, height);
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = (y + ky) * width + (x + kx);
            const pixel = gray[idx];
            gx += pixel * sobelX[ky + 1][kx + 1];
            gy += pixel * sobelY[ky + 1][kx + 1];
          }
        }
        
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        const outIdx = (y * width + x) * 4;
        const value = magnitude > threshold1 ? 255 : 0;
        
        output.data[outIdx] = value;
        output.data[outIdx + 1] = value;
        output.data[outIdx + 2] = value;
        output.data[outIdx + 3] = 255;
      }
    }
    
    return output;
  };

  // Draw kernel visualization overlay
  const drawKernelOverlay = (ctx, x, y, size) => {
    const cellSize = 20;
    const totalSize = size * cellSize;
    const startX = x - totalSize / 2;
    const startY = y - totalSize / 2;
    
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, totalSize, totalSize);
    
    ctx.strokeStyle = '#00ff0080';
    for (let i = 0; i <= size; i++) {
      ctx.beginPath();
      ctx.moveTo(startX + i * cellSize, startY);
      ctx.lineTo(startX + i * cellSize, startY + totalSize);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(startX, startY + i * cellSize);
      ctx.lineTo(startX + totalSize, startY + i * cellSize);
      ctx.stroke();
    }
  };

  const filters = [
    { id: 'original', name: 'Original', icon: Camera, desc: 'No filter applied' },
    { id: 'blur', name: 'Box Blur', icon: Eye, desc: 'Simple averaging - each pixel becomes average of neighbors' },
    { id: 'gaussian', name: 'Gaussian Blur', icon: Eye, desc: 'Weighted averaging - center pixels have more influence' },
    { id: 'sharpen', name: 'Sharpen', icon: Zap, desc: 'Enhances edges by emphasizing differences' },
    { id: 'edge', name: 'Edge Detection', icon: Sliders, desc: 'Finds boundaries using gradient magnitude' },
    { id: 'emboss', name: 'Emboss', icon: Sliders, desc: 'Creates 3D-like effect by detecting directional edges' },
  ];

  const getKernelVisualization = () => {
    switch(selectedFilter) {
      case 'blur':
        const blurVal = (1 / (kernelSize * kernelSize)).toFixed(3);
        return `Each cell = ${blurVal}\n(1 / ${kernelSize}²)`;
      case 'gaussian':
        return 'Center weighted\nGaussian distribution';
      case 'sharpen':
        return '[ 0 -1  0]\n[-1  5 -1]\n[ 0 -1  0]';
      case 'emboss':
        return '[-2 -1  0]\n[-1  1  1]\n[ 0  1  2]';
      default:
        return 'No kernel';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/artifacts/computer-vision-session28')}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Session 28</span>
          </button>
          <button
            onClick={() => navigate('/machine-learning')}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>ML Overview</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8 text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎨 OpenCV Convolution Lab
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">See exactly how kernels transform images, pixel by pixel</p>
        </div>

      <div className="mb-6 p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-blue-200 dark:border-slate-700 shadow-lg">
        <label className="block mb-3 font-bold text-lg text-blue-700 dark:text-blue-300">📤 Upload Your Own Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300">Original Image</h3>
          <canvas ref={originalCanvasRef} className="w-full border-4 border-blue-300 dark:border-slate-700 rounded-lg shadow-lg bg-white" />
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300">After Convolution</h3>
          <canvas ref={canvasRef} className="w-full border-4 border-purple-400 dark:border-purple-600 rounded-lg shadow-lg bg-white" />
        </div>
      </div>

      <div className="mb-6 p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-amber-200 dark:border-slate-700 shadow-lg">
        <h3 className="font-bold mb-4 text-xl text-amber-700 dark:text-yellow-300">Select Filter (Kernel)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filters.map(filter => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`p-3 rounded-lg transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white border-2 border-blue-400 scale-105 shadow-lg'
                    : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-white border-2 border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={18} />
                  <span className="font-semibold">{filter.name}</span>
                </div>
                <p className={`text-xs ${selectedFilter === filter.id ? 'text-blue-100' : 'text-gray-600 dark:text-slate-300'}`}>{filter.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {(selectedFilter === 'blur' || selectedFilter === 'gaussian') && (
        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-slate-800 rounded-xl border-2 border-blue-200 dark:border-slate-700 shadow-md">
          <label className="block mb-3 font-semibold text-gray-800 dark:text-white">Kernel Size: {kernelSize}x{kernelSize}</label>
          <input
            type="range"
            min="3"
            max="15"
            step="2"
            value={kernelSize}
            onChange={(e) => setKernelSize(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">Larger kernels = more blur, but slower processing</p>
        </div>
      )}

      {selectedFilter === 'edge' && (
        <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:bg-slate-800 rounded-xl border-2 border-purple-200 dark:border-slate-700 shadow-md">
          <label className="block mb-3 font-semibold text-gray-800 dark:text-white">Edge Threshold: {edgeThreshold1}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={edgeThreshold1}
            onChange={(e) => setEdgeThreshold1(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">Higher threshold = only strong edges detected</p>
        </div>
      )}

      {selectedFilter !== 'original' && selectedFilter !== 'edge' && (
        <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-teal-50 dark:bg-slate-800 rounded-xl border-2 border-green-200 dark:border-slate-700 shadow-md">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showKernelOverlay}
              onChange={(e) => setShowKernelOverlay(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="font-semibold text-gray-800 dark:text-white">Show Kernel Overlay on Image</span>
          </label>
        </div>
      )}

      <div className="p-6 bg-white dark:bg-gradient-to-r dark:from-blue-900 dark:to-purple-900 rounded-xl border-2 border-indigo-200 dark:border-blue-700 shadow-xl">
        <h3 className="font-bold text-2xl mb-4 text-indigo-700 dark:text-yellow-300">Current Kernel Matrix</h3>
        <pre className="font-mono text-lg bg-gray-900 dark:bg-black p-4 rounded mb-4 text-green-400 whitespace-pre">
          {getKernelVisualization()}
        </pre>

        <div className="space-y-2 text-sm">
          <p className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-2">What's Happening:</p>
          {selectedFilter === 'blur' && (
            <p className="text-gray-700 dark:text-white">For each pixel, we average all {kernelSize}x{kernelSize} = {kernelSize * kernelSize} surrounding pixels. This removes noise but loses detail.</p>
          )}
          {selectedFilter === 'gaussian' && (
            <p className="text-gray-700 dark:text-white">Like blur, but center pixels have more weight (Gaussian bell curve). Preserves edges better than box blur.</p>
          )}
          {selectedFilter === 'sharpen' && (
            <p className="text-gray-700 dark:text-white">Center pixel multiplied by 5, neighbors subtracted. This emphasizes differences = sharper edges. Formula: 5×center - 4×neighbors</p>
          )}
          {selectedFilter === 'edge' && (
            <p className="text-gray-700 dark:text-white">Uses Sobel operators to find horizontal/vertical gradients. Magnitude = √(gx² + gy²). High gradient = edge detected.</p>
          )}
          {selectedFilter === 'emboss' && (
            <p className="text-gray-700 dark:text-white">Asymmetric kernel detects directional changes. Positive on one side, negative on other = 3D embossed effect.</p>
          )}
          {selectedFilter === 'original' && (
            <p className="text-gray-700 dark:text-white">No transformation. Each pixel keeps its original RGB values. Select a filter to see convolution in action!</p>
          )}
        </div>
      </div>

      <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:bg-slate-800 rounded-xl border-l-4 border-amber-500 shadow-lg">
        <p className="font-bold text-xl text-amber-700 dark:text-yellow-300 mb-3">💡 Key Concept: Convolution</p>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
          Convolution slides a small matrix (kernel) across the image. At each position, it multiplies overlapping values
          and sums them. This single operation creates blur, sharpening, edge detection, and more - the foundation of computer vision!
        </p>
      </div>
      </div>
    </div>
  );
};

export default OpenCVConvolutionLab;