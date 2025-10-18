import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, Brain, Zap, Target, Sparkles } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LinearAlgebraArtifact = () => {
  const navigate = useNavigate();
  
  // Matrix Operations Demo State
  const [matrixA, setMatrixA] = useState([[2, 1], [1, 3]]);
  const [matrixB, setMatrixB] = useState([[4, 0], [1, 2]]);
  const [matrixResult, setMatrixResult] = useState([[0, 0], [0, 0]]);
  const [operation, setOperation] = useState('multiply');
  const [showResult, setShowResult] = useState(false);
  
  // Neural Network Demo State
  const [networkStep, setNetworkStep] = useState(0);
  const [isNetworkRunning, setIsNetworkRunning] = useState(false);
  const [networkData, setNetworkData] = useState({
    input: [0.8, 0.3, 0.5],
    weights: [[0.2, 0.8, 0.5], [0.7, 0.1, 0.9], [0.3, 0.6, 0.4]],
    result: [0, 0, 0]
  });
  
  // Image Recognition Demo
  const [imagePixels, setImagePixels] = useState(Array(64).fill(0));
  const [recognitionResult, setRecognitionResult] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  
  // Transformation Demo
  const [transformationType, setTransformationType] = useState('rotation');
  const [transformationAngle, setTransformationAngle] = useState(45);
  const [originalPoints, setOriginalPoints] = useState([
    [1, 0], [0, 1], [-1, 0], [0, -1]
  ]);
  const [transformedPoints, setTransformedPoints] = useState([]);
  const [showTransformation, setShowTransformation] = useState(false);
  
  // Eigenvalues Demo
  const [eigenMatrix, setEigenMatrix] = useState([[4, 1], [2, 3]]);
  const [eigenValues, setEigenValues] = useState([]);
  const [eigenVectors, setEigenVectors] = useState([]);
  const [showEigenAnalysis, setShowEigenAnalysis] = useState(false);
  
  // Active Section
  const [activeSection, setActiveSection] = useState('basics');

  // Matrix multiplication
  const multiplyMatrices = (a: number[][], b: number[][]) => {
    const result = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < b.length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = Math.round(sum * 100) / 100;
      }
    }
    return result;
  };

  // Matrix addition
  const addMatrices = (a: number[][], b: number[][]) => {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Perform matrix operation
  const performMatrixOperation = () => {
    let result;
    if (operation === 'multiply') {
      result = multiplyMatrices(matrixA, matrixB);
    } else {
      result = addMatrices(matrixA, matrixB);
    }
    setMatrixResult(result);
    setShowResult(true);
  };

  // Neural network forward pass
  const runNeuralNetwork = () => {
    setIsNetworkRunning(true);
    setNetworkStep(0);
    
    const interval = setInterval(() => {
      setNetworkStep(prev => {
        const newStep = prev + 1;
        if (newStep === 1) {
          // Calculate dot product
          const result = networkData.weights.map(row =>
            row.reduce((sum, weight, i) => sum + weight * networkData.input[i], 0)
          );
          setNetworkData(prev => ({ ...prev, result: result.map(val => Math.round(val * 100) / 100) }));
        }
        if (newStep >= 4) {
          setIsNetworkRunning(false);
          clearInterval(interval);
          return 4;
        }
        return newStep;
      });
    }, 1500);
  };

  // Image processing simulation
  const processImage = () => {
    setIsProcessingImage(true);
    
    // Simulate edge detection with simple filter
    setTimeout(() => {
      const hasVerticalEdge = imagePixels.slice(0, 32).some((val, i) => 
        Math.abs(val - (imagePixels[i + 32] || 0)) > 0.5
      );
      const hasHorizontalEdge = imagePixels.some((val, i) => 
        i < 56 && Math.abs(val - (imagePixels[i + 8] || 0)) > 0.5
      );
      
      if (hasVerticalEdge && hasHorizontalEdge) {
        setRecognitionResult('📦 Obiect geometric detectat');
      } else if (hasVerticalEdge) {
        setRecognitionResult('📏 Linie verticală detectată');
      } else if (hasHorizontalEdge) {
        setRecognitionResult('📏 Linie orizontală detectată');
      } else {
        setRecognitionResult('⚪ Formă uniformă detectată');
      }
      setIsProcessingImage(false);
    }, 2000);
  };

  // Apply transformation
  const applyTransformation = () => {
    const angle = (transformationAngle * Math.PI) / 180;
    let transformMatrix;
    
    if (transformationType === 'rotation') {
      transformMatrix = [
        [Math.cos(angle), -Math.sin(angle)],
        [Math.sin(angle), Math.cos(angle)]
      ];
    } else if (transformationType === 'scaling') {
      const scale = transformationAngle / 45; // Use angle as scale factor
      transformMatrix = [
        [scale, 0],
        [0, scale]
      ];
    } else { // reflection
      transformMatrix = [
        [1, 0],
        [0, -1]
      ];
    }
    
    const transformed = originalPoints.map(point => [
      Math.round((transformMatrix[0][0] * point[0] + transformMatrix[0][1] * point[1]) * 100) / 100,
      Math.round((transformMatrix[1][0] * point[0] + transformMatrix[1][1] * point[1]) * 100) / 100
    ]);
    
    setTransformedPoints(transformed);
    setShowTransformation(true);
  };

  // Calculate eigenvalues (simplified 2x2 case)
  const calculateEigenvalues = () => {
    const [[a, b], [c, d]] = eigenMatrix;
    const trace = a + d;
    const determinant = a * d - b * c;
    const discriminant = trace * trace - 4 * determinant;
    
    if (discriminant >= 0) {
      const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
      const lambda2 = (trace - Math.sqrt(discriminant)) / 2;
      setEigenValues([
        Math.round(lambda1 * 1000) / 1000,
        Math.round(lambda2 * 1000) / 1000
      ]);
      
      // Simplified eigenvector calculation
      setEigenVectors([
        b !== 0 ? [b, lambda1 - a] : [1, 0],
        b !== 0 ? [b, lambda2 - a] : [0, 1]
      ]);
    }
    setShowEigenAnalysis(true);
  };

  const toggleCode = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
  };

  useEffect(() => {
    // Add scroll animations
    const cards = document.querySelectorAll('.artifact-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 80%, #f5576c 100%)',
      color: '#333'
    }}>
      {/* Back Button */}
      <div className="sticky top-4 left-4 z-10 p-4">
        <Button
          onClick={() => navigate('/data-calculus')}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Data: Calculus
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-16 text-white relative">
          <div className="text-6xl mb-6 animate-brain-pulse">🧠</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
            Linear Algebra pentru AI
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
            Când matematica întâlnește imaginația<br/>
            <strong>Poarta către vârful calculului computațional: Inteligența Artificială! 🌟</strong>
          </p>
        </div>

        {/* The Grand Story */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 flex items-center gap-3">
            ✨ Povestea Supremă: De la Matematică la Minte Artificială
          </h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-6 relative">
            <div className="absolute top-2 left-2 text-2xl">🎭</div>
            <div className="ml-8 text-lg">
              În secolele XVII-XVIII, <strong>Gauss, Euler și Lagrange</strong> dezvoltă algebra liniară pentru 
              a rezolva probleme de astronomie și fizică. Nu își imaginau că aceleași operații cu matrici 
              vor deveni, peste 300 de ani, <strong>creierul artificial al omenirii</strong>.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
              <div className="text-4xl mb-4">📐</div>
              <h4 className="font-bold text-blue-800 mb-2">1750</h4>
              <p className="text-sm text-blue-700">
                Euler dezvoltă <strong>transformările liniare</strong><br/>
                pentru a calcula orbitele planetelor
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl">
              <div className="text-4xl mb-4">🔬</div>
              <h4 className="font-bold text-green-800 mb-2">1950</h4>
              <p className="text-sm text-green-700">
                Primele calculatoare folosesc <strong>matrici</strong><br/>
                pentru a simula fenomene fizice complexe
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="font-bold text-pink-800 mb-2">2023</h4>
              <p className="text-sm text-pink-700">
                <strong>ChatGPT și GPT-4</strong> sunt pure<br/>
                operații de algebră liniară masive!
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl text-center">
            <h4 className="text-xl font-bold mb-3">🎨 Revelația Epocii Noastre</h4>
            <p className="text-lg leading-relaxed">
              <strong>Inteligența Artificială</strong> nu este magie. Este <em>algebră liniară aplicată</em> 
              la o scară de care matematicienii din secolul XVIII nu au visat niciodată:<br/>
              <strong>miliarde de operații cu matrici pe secundă!</strong>
            </p>
          </div>
        </div>

        {/* Section Navigator */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
            🚀 Explorează Universul Algebrei Liniare
          </h2>
          
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {[
              { id: 'basics', title: 'Fundamente', icon: '🏗️', desc: 'Matrici și Vectori' },
              { id: 'neural', title: 'Rețele Neuronale', icon: '🧠', desc: 'Forward Pass' },
              { id: 'vision', title: 'Computer Vision', icon: '👁️', desc: 'Procesare Imagini' },
              { id: 'transforms', title: 'Transformări', icon: '🔄', desc: 'Rotații și Scalări' },
              { id: 'eigen', title: 'Eigenvalori', icon: '💎', desc: 'Analiza Componentelor' }
            ].map((section) => (
              <Button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-6 text-sm font-semibold transition-all min-h-[100px] ${
                  activeSection === section.id
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                }`}
              >
                <div className="text-center space-y-1">
                  <div className="text-lg">{section.icon}</div>
                  <div className="font-bold text-sm">{section.title}</div>
                  <div className="text-xs opacity-75 leading-relaxed">{section.desc}</div>
                </div>
              </Button>
            ))}
          </div>

          {/* Basics Section */}
          {activeSection === 'basics' && (
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                🏗️ Fundamente - Operații cu Matrici
              </h3>
              <p className="text-blue-800 mb-6">
                Matricile sunt <strong>inima algebrei liniare</strong>. Fiecare pixel dintr-o imagine, 
                fiecare conexiune dintr-o rețea neuronală, fiecare transformare 3D din jocuri - toate sunt matrici!
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">🎯 Calculator Interactiv de Matrici:</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-2">Operația:</label>
                      <select 
                        value={operation} 
                        onChange={(e) => setOperation(e.target.value)}
                        className="w-full border border-blue-300 rounded-lg px-3 py-2"
                      >
                        <option value="multiply">Înmulțire (A × B)</option>
                        <option value="add">Adunare (A + B)</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-2">Matricea A:</label>
                        <div className="bg-white p-3 rounded border-2 border-blue-300">
                          <div className="grid grid-cols-2 gap-2">
                            {matrixA.flat().map((val, idx) => (
                              <input
                                key={idx}
                                type="number"
                                value={val}
                                onChange={(e) => {
                                  const newMatrix = [...matrixA];
                                  const row = Math.floor(idx / 2);
                                  const col = idx % 2;
                                  newMatrix[row][col] = parseFloat(e.target.value) || 0;
                                  setMatrixA(newMatrix);
                                }}
                                className="w-full text-center border rounded px-2 py-1 text-sm"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-2">Matricea B:</label>
                        <div className="bg-white p-3 rounded border-2 border-blue-300">
                          <div className="grid grid-cols-2 gap-2">
                            {matrixB.flat().map((val, idx) => (
                              <input
                                key={idx}
                                type="number"
                                value={val}
                                onChange={(e) => {
                                  const newMatrix = [...matrixB];
                                  const row = Math.floor(idx / 2);
                                  const col = idx % 2;
                                  newMatrix[row][col] = parseFloat(e.target.value) || 0;
                                  setMatrixB(newMatrix);
                                }}
                                className="w-full text-center border rounded px-2 py-1 text-sm"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={performMatrixOperation}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Calculează {operation === 'multiply' ? 'A × B' : 'A + B'}
                    </Button>
                    
                    {showResult && (
                      <div className="bg-green-100 rounded-lg p-4 border-2 border-green-300">
                        <h5 className="font-bold text-green-700 mb-2">Rezultat:</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {matrixResult.flat().map((val, idx) => (
                            <div key={idx} className="bg-green-600 text-white text-center py-2 rounded font-mono">
                              {val}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">💻 Codul NumPy:</h4>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        fontSize: '0.875rem',
                        borderRadius: '0.5rem',
                      }}
                      showLineNumbers={false}
                    >{`# Operații fundamentale cu matrici
import numpy as np

# Definirea matricilor
A = np.array(${JSON.stringify(matrixA)})
B = np.array(${JSON.stringify(matrixB)})

# Operații
${operation === 'multiply' ? 'rezultat = np.dot(A, B)  # Înmulțire matriceală' : 'rezultat = A + B  # Adunare element cu element'}

# În spatele fiecărei rețele neuronale!
print(f"Rezultat: \\n{rezultat}")`}</SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Neural Networks Section */}
          {activeSection === 'neural' && (
            <div className="bg-pink-50 rounded-2xl p-6 border-2 border-pink-200">
              <h3 className="text-2xl font-bold text-pink-700 mb-4 flex items-center gap-2">
                🧠 Rețele Neuronale - Forward Pass
              </h3>
              <p className="text-pink-800 mb-6">
                <strong>Fiecare rețea neuronală</strong> este, în esență, o secvență de înmulțiri matriceale! 
                Input-urile se înmulțesc cu matricile de greutăți, trecând prin funcții de activare.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-pink-700 mb-3">🎯 Simulare Rețea Neuronală:</h4>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-pink-300">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-pink-600 mb-2">Input Layer (3 neuroni):</h5>
                        <div className="flex gap-2 justify-center">
                          {networkData.input.map((val, idx) => (
                            <div key={idx} className="bg-blue-500 text-white px-3 py-2 rounded text-sm font-mono">
                              {val}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-pink-600 mb-2">Weight Matrix (3×3):</h5>
                        <div className="grid grid-cols-3 gap-1">
                          {networkData.weights.flat().map((val, idx) => (
                            <div key={idx} className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-mono text-center">
                              {val}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={runNeuralNetwork}
                        disabled={isNetworkRunning}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        {isNetworkRunning ? 'Procesează...' : 'Rulează Forward Pass'}
                      </Button>
                      
                      {networkStep > 0 && (
                        <div className="space-y-2">
                          {networkStep >= 1 && (
                            <div className="bg-yellow-100 p-3 rounded animate-fadeInUp">
                              <strong>Pasul 1:</strong> Înmulțire matriceală: Input × Weights
                            </div>
                          )}
                          {networkStep >= 2 && (
                            <div className="bg-orange-100 p-3 rounded animate-fadeInUp">
                              <strong>Pasul 2:</strong> Aplicare funcție de activare (tanh)
                            </div>
                          )}
                          {networkStep >= 3 && (
                            <div className="bg-green-100 p-3 rounded animate-fadeInUp">
                              <strong>Pasul 3:</strong> Output Layer generat!
                              <div className="flex gap-2 justify-center mt-2">
                                {networkData.result.map((val, idx) => (
                                  <div key={idx} className="bg-green-600 text-white px-3 py-2 rounded font-mono">
                                    {val}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {networkStep >= 4 && (
                            <div className="bg-purple-100 p-3 rounded animate-fadeInUp text-center">
                              <strong>🎉 Felicitări!</strong> Ai simulat o rețea neuronală cu NumPy!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-pink-700 mb-3">💻 Implementare NumPy:</h4>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        fontSize: '0.875rem',
                        borderRadius: '0.5rem',
                      }}
                      showLineNumbers={false}
                    >{`# Rețea neuronală simplă
import numpy as np

# Date de intrare
inputs = np.array(${JSON.stringify(networkData.input)})
weights = np.array(${JSON.stringify(networkData.weights)})

# Forward pass
def forward_pass(x, W):
    # Înmulțirea magică!
    z = np.dot(x, W.T)
    # Funcția de activare
    a = np.tanh(z)
    return a

# Rularea rețelei
output = forward_pass(inputs, weights)
print(f"Output: {output}")

# ChatGPT face exact asta, dar cu
# miliarde de parametri! 🤯`}</SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Computer Vision Section */}
          {activeSection === 'vision' && (
            <div className="bg-cyan-50 rounded-2xl p-6 border-2 border-cyan-200">
              <h3 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
                👁️ Computer Vision - Procesarea Imaginilor
              </h3>
              <p className="text-cyan-800 mb-6">
                <strong>Fiecare imagine</strong> este o matrice de numere. Computer vision aplică filtre matematice 
                (tot matrici!) pentru a detecta margini, forme, și obiecte complexe.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-cyan-700 mb-3">🎨 Editor Imagine Simplă (8×8):</h4>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-cyan-300">
                    <div className="grid grid-cols-8 gap-1 mb-4">
                      {imagePixels.map((pixel, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const newPixels = [...imagePixels];
                            newPixels[idx] = newPixels[idx] === 0 ? 1 : 0;
                            setImagePixels(newPixels);
                          }}
                          className={`w-8 h-8 border border-gray-300 transition-colors ${
                            pixel === 1 ? 'bg-gray-900' : 'bg-white'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setImagePixels(Array(64).fill(0))}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-sm"
                        >
                          Clear
                        </Button>
                        <Button
                          onClick={() => {
                            // Draw a simple square
                            const newPixels = Array(64).fill(0);
                            for (let i = 2; i < 6; i++) {
                              for (let j = 2; j < 6; j++) {
                                newPixels[i * 8 + j] = 1;
                              }
                            }
                            setImagePixels(newPixels);
                          }}
                          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white text-sm"
                        >
                          Draw Square
                        </Button>
                      </div>
                      
                      <Button 
                        onClick={processImage}
                        disabled={isProcessingImage}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        {isProcessingImage ? 'Procesez cu AI...' : 'Analizează cu Computer Vision'}
                      </Button>
                      
                      {recognitionResult && (
                        <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300 text-center">
                          <h5 className="font-bold text-green-700 mb-2">Rezultatul AI:</h5>
                          <div className="text-lg">{recognitionResult}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-cyan-700 mb-3">💻 Detectarea Marginilor:</h4>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        fontSize: '0.875rem',
                        borderRadius: '0.5rem',
                      }}
                      showLineNumbers={false}
                    >{`# Computer Vision cu NumPy
import numpy as np

# Imaginea ca matrice 8×8
imagine = np.array(imagePixels).reshape(8, 8)

# Filtrul Sobel pentru detectarea marginilor
sobel_x = np.array([
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
])

# Convoluția - operația fundamentală!
def detecteaza_margini(img, filtru):
    # Aplicăm filtrul pe toată imaginea
    return np.abs(np.convolve(img.flatten(),
                              filtru.flatten()))

margini = detecteaza_margini(imagine, sobel_x)
print("Margini detectate!")

# Exact așa funcționează
# recunoașterea facială! 📸`}</SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transformations Section */}
          {activeSection === 'transforms' && (
            <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
              <h3 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                🔄 Transformări Geometrice - Magia Jocurilor 3D
              </h3>
              <p className="text-orange-800 mb-6">
                <strong>Totul ce vezi în jocuri</strong> - rotații, scalări, reflexii - sunt transformări liniare! 
                Fiecare obiect 3D se mișcă prin înmulțiri cu matrici de transformare.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">🎮 Simulator de Transformări:</h4>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-orange-700 mb-2">Tipul transformării:</label>
                        <select 
                          value={transformationType} 
                          onChange={(e) => setTransformationType(e.target.value)}
                          className="w-full border border-orange-300 rounded-lg px-3 py-2"
                        >
                          <option value="rotation">Rotație</option>
                          <option value="scaling">Scalare</option>
                          <option value="reflection">Reflexie</option>
                        </select>
                      </div>
                      
                      {transformationType === 'rotation' && (
                        <div>
                          <label className="block text-sm font-medium text-orange-700 mb-2">
                            Unghiul de rotație: {transformationAngle}°
                          </label>
                          <input 
                            type="range"
                            min="0"
                            max="360"
                            value={transformationAngle}
                            onChange={(e) => setTransformationAngle(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      )}
                      
                      {transformationType === 'scaling' && (
                        <div>
                          <label className="block text-sm font-medium text-orange-700 mb-2">
                            Factorul de scalare: {(transformationAngle / 45).toFixed(1)}x
                          </label>
                          <input 
                            type="range"
                            min="10"
                            max="200"
                            value={transformationAngle}
                            onChange={(e) => setTransformationAngle(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-orange-600 mb-2">Puncte Originale:</h5>
                          <div className="bg-blue-100 p-3 rounded">
                            {originalPoints.map((point, idx) => (
                              <div key={idx} className="text-sm font-mono">
                                ({point[0]}, {point[1]})
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {showTransformation && (
                          <div>
                            <h5 className="font-medium text-orange-600 mb-2">Puncte Transformate:</h5>
                            <div className="bg-green-100 p-3 rounded">
                              {transformedPoints.map((point, idx) => (
                                <div key={idx} className="text-sm font-mono">
                                  ({point[0]}, {point[1]})
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={applyTransformation}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Aplică Transformarea
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">💻 Matrici de Transformare:</h4>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        fontSize: '0.875rem',
                        borderRadius: '0.5rem',
                      }}
                      showLineNumbers={false}
                    >{`# Transformări geometrice
import numpy as np
import math

# Puncte originale (4 puncte cardinale)
puncte = np.array(${JSON.stringify(originalPoints)})

${transformationType === 'rotation' ? `# Matricea de rotație
unghi = math.radians(${transformationAngle})
R = np.array([
    [math.cos(unghi), -math.sin(unghi)],
    [math.sin(unghi), math.cos(unghi)]
])
` : transformationType === 'scaling' ? `# Matricea de scalare
factor = ${(transformationAngle / 45).toFixed(1)}
S = np.array([
    [factor, 0],
    [0, factor]
])
` : `# Matricea de reflexie (pe axa X)
Ref = np.array([
    [1, 0],
    [0, -1]
])
`}
# Aplicarea transformării
puncte_noi = np.dot(puncte, ${transformationType === 'rotation' ? 'R' : transformationType === 'scaling' ? 'S' : 'Ref'}.T)
print(f"Transformare aplicată: {puncte_noi}")

# Așa se mișcă personajele în jocuri! 🎮
# Unity, Unreal Engine - toate folosesc
# aceste matrici de transformare!`}</SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Eigenvalues Section */}
          {activeSection === 'eigen' && (
            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200">
              <h3 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                💎 Eigenvalori și Eigenvectori - Sufletul Matricilor
              </h3>
              <p className="text-emerald-800 mb-6">
                <strong>Eigenvalori și eigenvectori</strong> sunt "sufletul" unei matrici - direcțiile și magnitudinile 
                în care matricea "preferă" să transforme spațiul. Esențiali în PCA, face recognition, și compresie!
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-3">💎 Analizator Eigenvalori (2×2):</h4>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-emerald-300">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-2">Matricea A (2×2):</label>
                        <div className="grid grid-cols-2 gap-2">
                          {eigenMatrix.flat().map((val, idx) => (
                            <input
                              key={idx}
                              type="number"
                              value={val}
                              onChange={(e) => {
                                const newMatrix = [...eigenMatrix];
                                const row = Math.floor(idx / 2);
                                const col = idx % 2;
                                newMatrix[row][col] = parseFloat(e.target.value) || 0;
                                setEigenMatrix(newMatrix);
                              }}
                              className="w-full text-center border border-emerald-300 rounded px-2 py-1"
                            />
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={calculateEigenvalues}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Calculează Eigenvalori & Eigenvectori
                      </Button>
                      
                      {showEigenAnalysis && (
                        <div className="space-y-3">
                          <div className="bg-purple-100 p-3 rounded border-2 border-purple-300">
                            <h5 className="font-bold text-purple-700 mb-2">Eigenvalori (λ):</h5>
                            <div className="flex gap-2 justify-center">
                              {eigenValues.map((val, idx) => (
                                <div key={idx} className="bg-purple-600 text-white px-3 py-2 rounded font-mono">
                                  λ{idx + 1} = {val}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-blue-100 p-3 rounded border-2 border-blue-300">
                            <h5 className="font-bold text-blue-700 mb-2">Eigenvectori:</h5>
                            {eigenVectors.map((vec, idx) => (
                              <div key={idx} className="text-sm font-mono mb-1">
                                v{idx + 1} = [{vec[0].toFixed(2)}, {vec[1].toFixed(2)}]
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-yellow-100 p-3 rounded border-2 border-yellow-300">
                            <h5 className="font-bold text-yellow-700 mb-2">🧠 Interpretare:</h5>
                            <p className="text-sm text-yellow-800">
                              Eigenvalori = cât de mult "întinde" matricea în direcțiile principale<br/>
                              Eigenvectori = direcțiile principale de transformare
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-3">💻 Analiza Componentelor Principale:</h4>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        fontSize: '0.875rem',
                        borderRadius: '0.5rem',
                      }}
                      showLineNumbers={false}
                    >{`# Principal Component Analysis (PCA)
import numpy as np
from numpy.linalg import eig

# Matricea de covarianță (date multidimensionale)
A = np.array(${JSON.stringify(eigenMatrix)})

# Calcularea eigenvalori și eigenvectori
eigenvalori, eigenvectori = eig(A)

print(f"Eigenvalori: {eigenvalori}")
print(f"Eigenvectori:\\n{eigenvectori}")

# Sortăm după importanță
idx = eigenvalori.argsort()[::-1]
eigenvalori_sortati = eigenvalori[idx]
eigenvectori_sortati = eigenvectori[:, idx]

# Primele componente principale
componenta_1 = eigenvectori_sortati[:, 0]
componenta_2 = eigenvectori_sortati[:, 1]

# Folosit în:
# • Recunoașterea facială (eigenfaces)
# • Compresie imagini
# • Analiză big data
# • Machine Learning dimensionality reduction`}</SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real World Impact */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-6 flex items-center gap-3">
            🌍 Impactul în Lumea Reală - Unde Trăiește Algebra Liniară
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🤖",
                title: "ChatGPT & AI",
                description: "Fiecare răspuns = miliarde de înmulțiri matriceale",
                tech: "Transformers, attention mechanisms",
                color: "purple"
              },
              {
                icon: "📱",
                title: "Face ID",
                description: "Eigenfaces pentru recunoașterea facială",
                tech: "PCA, eigenvalue decomposition",
                color: "blue"
              },
              {
                icon: "🎮",
                title: "Jocuri 3D",
                description: "Fiecare pixel = transformări matriceale în timp real",
                tech: "OpenGL, DirectX, Vulkan",
                color: "green"
              },
              {
                icon: "🎵",
                title: "Spotify",
                description: "Recomandări prin factorizarea matriceală",
                tech: "Collaborative filtering, SVD",
                color: "orange"
              },
              {
                icon: "🚗",
                title: "Tesla Autopilot",
                description: "Computer vision pentru detecția obiectelor",
                tech: "CNN, convoluții, edge detection",
                color: "red"
              },
              {
                icon: "💊",
                title: "Descoperirea Medicamentelor",
                description: "Simulări moleculare masive",
                tech: "Quantum chemistry, eigenvalue problems",
                color: "cyan"
              }
            ].map((app, index) => (
              <div key={index} className={`p-6 rounded-2xl text-white bg-gradient-to-br from-${app.color}-500 to-${app.color}-600 transform hover:scale-105 transition-all`}>
                <div className="text-3xl mb-3 text-center">{app.icon}</div>
                <h4 className="text-lg font-bold mb-2 text-center">{app.title}</h4>
                <p className="text-sm mb-3 text-center opacity-90">{app.description}</p>
                <div className="text-xs bg-white/20 rounded-lg p-2 text-center">
                  <strong>Tech:</strong> {app.tech}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl text-center">
            <h4 className="text-xl font-bold mb-3">🎯 Adevărul Revelator</h4>
            <p className="text-lg leading-relaxed">
              <strong>Totul ce consideri "inteligent"</strong> în tehnologia modernă - de la asistentul virtual 
              la mașinile autonome - este, la bază, <em>algebră liniară aplicată magistral</em>.<br/>
              <strong>NumPy este instrumentul care face toate acestea posibile în Python!</strong>
            </p>
          </div>
        </div>

        {/* Final Inspiration */}
        <div className="artifact-card bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-3xl p-8 md:p-12 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            ✨ Momentul Revelației: Când Matematica Devine Conștiință
          </h2>
          
          <div className="text-lg leading-relaxed mb-6">
            <p className="mb-4">
              Astăzi ai atins <strong>esența înțelegerii supreme</strong>: cum matematica pură, 
              dezvoltată în secolele trecute, devine <strong>inteligența artificială modernă</strong>.
            </p>
            <p className="mb-4">
              <strong>Fiecare matrice pe care ai manipulat-o astăzi</strong> te conectează direct la modul 
              în care <em>ChatGPT gândește</em>, cum <em>Tesla vede drumul</em>, și cum <em>Netflix știe ce filme îți plac</em>.
            </p>
            <p className="mb-6">
              Nu este doar programare - este <strong>participarea la cea mai fascinantă aventură </strong> 
              a minții umane: <em>crearea de inteligență artificială</em>.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">🎭 Ce ai descoperit:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2">
                <li>✅ <strong>Matrici și vectori:</strong> building blocks-urile AI-ului</li>
                <li>✅ <strong>Rețele neuronale:</strong> doar înmulțiri matriceale în cascade</li>
                <li>✅ <strong>Computer vision:</strong> filtrarea imaginilor cu matrici</li>
              </ul>
              <ul className="space-y-2">
                <li>✅ <strong>Transformări 3D:</strong> magia jocurilor video</li>
                <li>✅ <strong>Eigenvalori:</strong> sufletul analizei de date</li>
                <li>✅ <strong>Aplicații reale:</strong> de la ChatGPT la Tesla</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-2xl mb-2">📐</div>
              <div className="font-bold">Matematică</div>
              <div className="text-xs opacity-75">Secolele XVII-XVIII</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-2xl mb-2">🔢</div>
              <div className="font-bold">NumPy</div>
              <div className="text-xs opacity-75">Instrumentul perfect</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-2xl mb-2">🧠</div>
              <div className="font-bold">Algoritmi</div>
              <div className="text-xs opacity-75">Implementarea genială</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-2xl mb-2">🌟</div>
              <div className="font-bold">AI</div>
              <div className="text-xs opacity-75">Viitorul nostru</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🧮 × 🔢 × 🧠 = 🌟</div>
            <p className="text-xl font-bold mb-2">
              Algebră Liniară × NumPy × Imaginație = Inteligență Artificială
            </p>
            <p className="text-sm opacity-90">
              Ești acum pregătit să înțelegi cum funcționează cu adevărat AI-ul modern!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes brain-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease;
        }

        .animate-brain-pulse {
          animation: brain-pulse 2s ease-in-out infinite;
        }

        .artifact-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default LinearAlgebraArtifact;