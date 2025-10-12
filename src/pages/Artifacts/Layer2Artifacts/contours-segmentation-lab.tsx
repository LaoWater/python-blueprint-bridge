import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Target, Scan, Move, ArrowLeft, Home, Upload, Play, Pause, RefreshCw, Info } from 'lucide-react';

const ContoursSegmentationLab = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState('contours');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [minContourArea, setMinContourArea] = useState(500);
  const [threshold, setThreshold] = useState(127);
  const [showHelp, setShowHelp] = useState(true);

  const canvasRef = useRef(null);
  const originalCanvasRef = useRef(null);
  const motionCanvasRef = useRef(null);

  // Create demo image with clear objects
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, 600, 400);

    // Create objects with clear boundaries
    // Circle (coin-like object)
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(150, 150, 60, 0, Math.PI * 2);
    ctx.fill();

    // Rectangle (book/phone)
    ctx.fillStyle = '#3498db';
    ctx.fillRect(300, 80, 180, 140);

    // Triangle (play button)
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(150, 320);
    ctx.lineTo(250, 260);
    ctx.lineTo(250, 380);
    ctx.closePath();
    ctx.fill();

    // Small circle (button)
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.arc(450, 300, 40, 0, Math.PI * 2);
    ctx.fill();

    setUploadedImage(canvas);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 600;
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

  // Process image for contours
  useEffect(() => {
    if (!uploadedImage || !canvasRef.current || !originalCanvasRef.current) return;

    setProcessing(true);
    setTimeout(() => {
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
      const imageData = origCtx.getImageData(0, 0, canvas.width, canvas.height);

      if (activeDemo === 'contours') {
        processContours(imageData, ctx, canvas.width, canvas.height);
      } else if (activeDemo === 'segmentation') {
        processSegmentation(imageData, ctx, canvas.width, canvas.height);
      } else if (activeDemo === 'motion') {
        simulateMotionDetection(imageData, ctx, canvas.width, canvas.height);
      }

      setProcessing(false);
    }, 100);
  }, [uploadedImage, activeDemo, minContourArea, threshold]);

  const processContours = (imageData, ctx, width, height) => {
    const data = imageData.data;

    // Convert to grayscale
    const gray = new Uint8Array(width * height);
    for (let i = 0; i < data.length; i += 4) {
      gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }

    // Threshold to binary
    const binary = new Uint8Array(width * height);
    for (let i = 0; i < gray.length; i++) {
      binary[i] = gray[i] > threshold ? 255 : 0;
    }

    // Find contours (simplified edge detection)
    const edges = new Uint8Array(width * height);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        if (binary[idx] === 255) {
          // Check if it's an edge pixel
          if (binary[idx - 1] === 0 || binary[idx + 1] === 0 ||
              binary[idx - width] === 0 || binary[idx + width] === 0) {
            edges[idx] = 255;
          }
        }
      }
    }

    // Draw original image
    ctx.putImageData(imageData, 0, 0);

    // Draw contours
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;

    let contourCount = 0;
    const visited = new Set();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (edges[idx] === 255 && !visited.has(idx)) {
          // Trace contour
          const points = traceContour(edges, x, y, width, height, visited);
          if (points.length > minContourArea / 10) {
            contourCount++;

            // Draw contour
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
              ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.closePath();
            ctx.stroke();

            // Draw bounding box
            const minX = Math.min(...points.map(p => p.x));
            const maxX = Math.max(...points.map(p => p.x));
            const minY = Math.min(...points.map(p => p.y));
            const maxY = Math.max(...points.map(p => p.y));

            ctx.strokeStyle = '#ffff00';
            ctx.lineWidth = 1;
            ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);

            // Label
            ctx.fillStyle = '#ffff00';
            ctx.font = '12px monospace';
            ctx.fillText(`Object ${contourCount}`, minX, minY - 5);

            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
          }
        }
      }
    }

    // Draw stats
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 200, 60);
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`Objects Found: ${contourCount}`, 20, 35);
    ctx.fillText(`Min Area: ${minContourArea}px`, 20, 55);
  };

  const traceContour = (edges, startX, startY, width, height, visited) => {
    const points = [];
    const stack = [{x: startX, y: startY}];
    const directions = [
      {dx: -1, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: -1}, {dx: 0, dy: 1},
      {dx: -1, dy: -1}, {dx: 1, dy: -1}, {dx: -1, dy: 1}, {dx: 1, dy: 1}
    ];

    while (stack.length > 0 && points.length < 1000) {
      const {x, y} = stack.pop();
      const idx = y * width + x;

      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      if (visited.has(idx)) continue;
      if (edges[idx] === 0) continue;

      visited.add(idx);
      points.push({x, y});

      for (const {dx, dy} of directions) {
        stack.push({x: x + dx, y: y + dy});
      }
    }

    return points;
  };

  const processSegmentation = (imageData, ctx, width, height) => {
    const data = imageData.data;

    // Simple color-based segmentation
    const segments = new Uint8Array(width * height);
    const colors = [
      {r: 255, g: 0, b: 0, label: 1},    // Red objects
      {r: 0, g: 255, b: 0, label: 2},    // Green objects
      {r: 0, g: 0, b: 255, label: 3},    // Blue objects
      {r: 255, g: 255, b: 0, label: 4},  // Yellow objects
    ];

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const pixelIdx = i / 4;

      // Find closest color
      let minDist = Infinity;
      let bestLabel = 0;

      for (const color of colors) {
        const dist = Math.sqrt(
          Math.pow(r - color.r, 2) +
          Math.pow(g - color.g, 2) +
          Math.pow(b - color.b, 2)
        );

        if (dist < minDist && dist < 150) {
          minDist = dist;
          bestLabel = color.label;
        }
      }

      segments[pixelIdx] = bestLabel;
    }

    // Draw segmentation
    const output = ctx.createImageData(width, height);
    const segmentColors = [
      {r: 50, g: 50, b: 50},      // Background
      {r: 255, g: 100, b: 100},   // Red segment
      {r: 100, g: 255, b: 100},   // Green segment
      {r: 100, g: 100, b: 255},   // Blue segment
      {r: 255, g: 255, b: 100},   // Yellow segment
    ];

    for (let i = 0; i < segments.length; i++) {
      const label = segments[i];
      const color = segmentColors[label];
      const idx = i * 4;

      output.data[idx] = color.r;
      output.data[idx + 1] = color.g;
      output.data[idx + 2] = color.b;
      output.data[idx + 3] = 255;
    }

    ctx.putImageData(output, 0, 0);

    // Draw legend
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 150, 120);
    ctx.font = '14px monospace';

    const labels = ['Background', 'Red Objects', 'Green Objects', 'Blue Objects', 'Yellow Objects'];
    segmentColors.forEach((color, idx) => {
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.fillRect(20, 20 + idx * 20, 15, 15);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(labels[idx], 40, 32 + idx * 20);
    });
  };

  const simulateMotionDetection = (imageData, ctx, width, height) => {
    // Create a motion simulation with animated regions
    ctx.putImageData(imageData, 0, 0);

    // Simulate motion detected regions
    const time = Date.now() / 1000;
    const motionRegions = [
      {x: 100 + Math.sin(time) * 50, y: 150, w: 100, h: 80, label: 'Movement 1'},
      {x: 400, y: 200 + Math.cos(time) * 30, w: 120, h: 100, label: 'Movement 2'},
    ];

    motionRegions.forEach(region => {
      // Draw motion bounding box
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 3;
      ctx.strokeRect(region.x, region.y, region.w, region.h);

      // Draw motion overlay
      ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
      ctx.fillRect(region.x, region.y, region.w, region.h);

      // Label
      ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
      ctx.fillRect(region.x, region.y - 25, 120, 25);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(region.label, region.x + 5, region.y - 8);
    });

    // Stats overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(10, 10, 200, 80);
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('⚠ MOTION DETECTED', 20, 35);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.fillText(`Regions: ${motionRegions.length}`, 20, 55);
    ctx.fillText(`Status: ACTIVE`, 20, 75);

    // Animate continuously
    requestAnimationFrame(() => {
      if (activeDemo === 'motion' && uploadedImage) {
        const imgData = ctx.getImageData(0, 0, width, height);
        simulateMotionDetection({data: imgData.data}, ctx, width, height);
      }
    });
  };

  const demos = [
    {
      id: 'contours',
      name: 'Contour Detection',
      icon: Target,
      description: 'Find and outline objects in images',
      bestImages: ['Coins on table', 'Toys on floor', 'Fruits in bowl', 'Books on desk'],
    },
    {
      id: 'segmentation',
      name: 'Color Segmentation',
      icon: Scan,
      description: 'Separate objects by color',
      bestImages: ['Colorful toys', 'Traffic lights', 'Colored blocks', 'Mixed fruits'],
    },
    {
      id: 'motion',
      name: 'Motion Detection (Simulated)',
      icon: Move,
      description: 'See what motion tracking looks like (animated demo)',
      bestImages: ['Any image works - this is animated', 'Shows how security cameras work', 'Real version needs video/webcam'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/artifacts/computer-vision-session28')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Session 28</span>
          </button>
          <button
            onClick={() => navigate('/machine-learning')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>ML Overview</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Contours & Segmentation Lab
          </h1>
          <p className="text-xl text-gray-300">
            Find objects, separate them, track motion - the foundation of computer vision intelligence
          </p>
        </div>

        {/* Help Panel */}
        {showHelp && (
          <div className="mb-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-2 border-blue-400 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-300">💡 Pro Tips for Best Results</h3>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-black/30 p-4 rounded-lg">
                <h4 className="font-bold text-green-400 mb-2">✅ GREAT Images:</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Objects with clear edges</li>
                  <li>• Good contrast with background</li>
                  <li>• Well-lit photos</li>
                  <li>• Multiple distinct objects</li>
                  <li>• Solid colored items</li>
                </ul>
              </div>

              <div className="bg-black/30 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">📸 Example Subjects:</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Coins on a table</li>
                  <li>• Colorful Lego blocks</li>
                  <li>• Fruits in a bowl</li>
                  <li>• Your phone on desk</li>
                  <li>• Hand tools organized</li>
                </ul>
              </div>

              <div className="bg-black/30 p-4 rounded-lg">
                <h4 className="font-bold text-red-400 mb-2">❌ Avoid:</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Blurry photos</li>
                  <li>• Low lighting</li>
                  <li>• Busy patterns</li>
                  <li>• Objects same color as background</li>
                  <li>• Transparent objects</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="mb-6 bg-slate-800 rounded-xl p-6 border-2 border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Upload Your Image</h3>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-slate-300 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white hover:file:from-blue-700 hover:file:to-purple-700 file:cursor-pointer"
          />
          <p className="mt-2 text-xs text-gray-400">
            Try uploading a photo with distinct objects on a plain background for best results!
          </p>
        </div>

        {/* Demo Selection */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {demos.map(demo => {
            const Icon = demo.icon;
            return (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
                  activeDemo === demo.id
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-blue-400 shadow-xl'
                    : 'bg-slate-800 border-2 border-slate-700 hover:border-blue-500'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-6 h-6" />
                  <h3 className="font-bold text-lg">{demo.name}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-3">{demo.description}</p>
                <div className="text-xs text-gray-400">
                  <strong className="text-blue-300">Best with:</strong>
                  <div className="mt-1 space-y-1">
                    {demo.bestImages.map((img, idx) => (
                      <div key={idx}>• {img}</div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        {activeDemo === 'contours' && (
          <div className="mb-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-blue-300">
                  Threshold: {threshold}
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Adjust to separate objects from background
                </p>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-purple-300">
                  Min Object Size: {minContourArea}px
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={minContourArea}
                  onChange={(e) => setMinContourArea(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Filter out small noise/artifacts
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Canvas Display */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-blue-300">Original Image</h3>
              {processing && <span className="text-yellow-400 text-sm">Processing...</span>}
            </div>
            <canvas
              ref={originalCanvasRef}
              className="w-full border-4 border-slate-700 rounded-lg bg-black"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-purple-300">
                {demos.find(d => d.id === activeDemo)?.name} Result
              </h3>
              {activeDemo === 'motion' && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                  LIVE
                </span>
              )}
            </div>
            <canvas
              ref={canvasRef}
              className="w-full border-4 border-purple-600 rounded-lg bg-black shadow-2xl shadow-purple-500/50"
            />
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border border-indigo-400">
          <h3 className="text-xl font-bold text-indigo-300 mb-4">🔬 What's Happening Under the Hood</h3>

          {activeDemo === 'contours' && (
            <div className="space-y-3 text-gray-300">
              <p className="leading-relaxed">
                <strong className="text-green-400">Step 1:</strong> Convert image to grayscale (intensity values only)
              </p>
              <p className="leading-relaxed">
                <strong className="text-blue-400">Step 2:</strong> Apply threshold - pixels above {threshold} become white, below become black
              </p>
              <p className="leading-relaxed">
                <strong className="text-purple-400">Step 3:</strong> Find edges where white meets black (object boundaries)
              </p>
              <p className="leading-relaxed">
                <strong className="text-yellow-400">Step 4:</strong> Trace connected edge pixels to form contours
              </p>
              <p className="leading-relaxed">
                <strong className="text-red-400">Step 5:</strong> Filter contours by size (ignore tiny noise)
              </p>
              <p className="mt-4 p-4 bg-black/30 rounded-lg border-l-4 border-green-400">
                <strong>Real Applications:</strong> This exact process is used in: 📱 Document scanning apps,
                🚗 Autonomous vehicle object detection, 🏥 Medical image analysis, 🏭 Quality control in manufacturing
              </p>
            </div>
          )}

          {activeDemo === 'segmentation' && (
            <div className="space-y-3 text-gray-300">
              <p className="leading-relaxed">
                <strong className="text-green-400">Color-based Segmentation:</strong> Group pixels by similar colors
              </p>
              <p className="leading-relaxed">
                Each pixel is assigned to the nearest color cluster - this separates objects of different colors
              </p>
              <p className="mt-4 p-4 bg-black/30 rounded-lg border-l-4 border-blue-400">
                <strong>Real Applications:</strong> 🎨 Green screen effects (chroma keying),
                🚦 Traffic light detection, 🌱 Agricultural crop health monitoring, 🎯 Sports tracking (separating teams by uniform color)
              </p>
            </div>
          )}

          {activeDemo === 'motion' && (
            <div className="space-y-3 text-gray-300">
              <p className="leading-relaxed">
                <strong className="text-red-400">Motion Detection SIMULATION:</strong> This is an animated demo showing how motion detection works
              </p>
              <p className="leading-relaxed bg-yellow-900/30 p-3 rounded border-l-4 border-yellow-500">
                <strong>⚠️ Important:</strong> Real motion detection needs <strong>VIDEO</strong> (multiple frames over time), not a single image!
                This mode shows you what the algorithm would detect if objects were moving between frames.
              </p>
              <p className="leading-relaxed">
                <strong className="text-green-400">How it really works:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4 text-sm">
                <li>Capture Frame 1 (your room at time 0:00)</li>
                <li>Capture Frame 2 (your room at time 0:01)</li>
                <li>Calculate difference: abs(Frame2 - Frame1)</li>
                <li>Threshold the difference (ignore small changes)</li>
                <li>Find contours in the difference image</li>
                <li>Draw boxes around moving regions!</li>
              </ol>
              <p className="mt-4 p-4 bg-black/30 rounded-lg border-l-4 border-red-400">
                <strong>Real Applications:</strong> 🏠 Home security cameras (compare frames every second),
                🏋️ Workout rep counters (track body position changes), 🚗 Parking lot monitoring (detect cars entering/leaving),
                🎮 Motion-controlled gaming (track hand movements)
              </p>
              <p className="mt-3 p-3 bg-blue-900/30 rounded-lg text-blue-200 text-sm">
                💡 <strong>Try this at home:</strong> Use your webcam with OpenCV's VideoCapture to get real consecutive frames,
                then apply the frame differencing algorithm from Part 5 of the code examples!
              </p>
            </div>
          )}
        </div>

        {/* Quick Challenge */}
        <div className="mt-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">🎯 Quick Challenge!</h3>
          <div className="space-y-3 text-gray-200">
            <p className="text-lg">
              <strong>Try this right now:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Place 3-5 coins on a dark surface</li>
              <li>Take a photo with good lighting</li>
              <li>Upload it to Contour Detection mode</li>
              <li>Adjust the threshold until all coins are detected</li>
              <li>Count the objects - does it match your coins?</li>
            </ol>
            <p className="mt-4 p-3 bg-black/40 rounded-lg text-yellow-200">
              💡 <strong>Pro Tip:</strong> If coins aren't detected, try adjusting the "Min Object Size" slider!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContoursSegmentationLab;
