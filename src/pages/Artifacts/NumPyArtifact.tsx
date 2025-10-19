import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, Zap, Calculator, Brain, Target } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';

const NumPyArtifact = () => {
  const navigate = useNavigate();
  
  // Performance Demo State
  const [isPerformanceRunning, setIsPerformanceRunning] = useState(false);
  const [performanceResults, setPerformanceResults] = useState({ python: 0, numpy: 0 });
  const [dataSize, setDataSize] = useState(10000);
  
  // Array Dimensions Demo
  const [selectedDimension, setSelectedDimension] = useState('1D');
  const [arrayData, setArrayData] = useState({
    '1D': [72, 75, 78, 74, 71, 73, 76, 79],
    '2D': [[22.5, 23.1], [22.7, 24.2], [22.4, 23.8]],
    '3D': 'RGB(64, 64, 3)',
    '4D': 'Batch(32, 64, 64, 3)'
  });
  
  // Broadcasting Demo
  const [broadcastStep, setBroadcastStep] = useState(0);
  const [showBroadcastResult, setShowBroadcastResult] = useState(false);
  
  // Real World Applications State
  const [activeApplication, setActiveApplication] = useState('astronomy');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  
  // FFT Demo State
  const [audioFrequencies, setAudioFrequencies] = useState([50, 120, 200]);
  const [fftResult, setFFTResult] = useState('Analizează semnalul...');
  
  // Performance comparison simulation
  const runPerformanceDemo = () => {
    setIsPerformanceRunning(true);
    setPerformanceResults({ python: 0, numpy: 0 });
    
    // Simulate Python performance
    let pythonTime = 0;
    let numpyTime = 0;
    
    const interval = setInterval(() => {
      pythonTime += Math.random() * 100;
      numpyTime += Math.random() * 2;
      
      setPerformanceResults({ python: pythonTime, numpy: numpyTime });
      
      if (pythonTime >= 1000 || numpyTime >= 50) {
        clearInterval(interval);
        setIsPerformanceRunning(false);
      }
    }, 50);
  };
  
  // Broadcasting demo
  const runBroadcastingDemo = () => {
    setBroadcastStep(0);
    setShowBroadcastResult(false);
    
    const steps = [
      "Creez batch de 32 imagini (32, 64, 64, 3)...",
      "Definesc normalizarea RGB [0.485, 0.456, 0.406]...", 
      "Broadcasting magic: normalizez toate imaginile simultan!",
      "Rezultat: Toate cele 32 de imagini procesate!"
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      setBroadcastStep(currentStep);
      currentStep++;
      
      if (currentStep > steps.length) {
        setShowBroadcastResult(true);
        clearInterval(interval);
      }
    }, 1500);
  };
  
  // Real world simulation
  const runRealWorldSimulation = () => {
    setSimulationRunning(true);
    setSimulationStep(0);
    
    const interval = setInterval(() => {
      setSimulationStep(prev => {
        const newStep = prev + 1;
        if (newStep > 5) {
          setSimulationRunning(false);
          return 0;
        }
        return newStep;
      });
    }, 1000);
  };
  
  // FFT Analysis
  const analyzeAudioSignal = () => {
    setFFTResult('Analizez frecvențele...');
    
    setTimeout(() => {
      const dominantFreq = audioFrequencies[Math.floor(Math.random() * audioFrequencies.length)];
      setFFTResult(`Frecvența dominantă detectată: ${dominantFreq}Hz`);
    }, 1500);
  };
  
  const toggleCode = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Add scroll animations
    const cards = document.querySelectorAll('.artifact-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
          <div className="text-6xl mb-6 animate-pulse-glow">🌌</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
            NumPy - Gateway către Știința Computațională
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
            De la liste naive la calcule care mișcă lumea<br/>
            <strong>Descoperă puterea care stă în spatele întregii științe moderne! ⚡</strong>
          </p>
        </div>

        {/* Origin Story */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
            🧠 Povestea Originilor - Anul 2000
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-6 relative">
            <div className="absolute top-2 left-2 text-2xl">🔬</div>
            <div className="ml-8 text-lg">
              Imaginează-te în anul 2000: <strong>biologi analizează secvențe ADN</strong>, 
              fizicienii studiază date de la telescoape, economiștii procesează piețe financiare...<br/>
              Toți folosesc Python pentru că e simplu și intuitiv.<br/>
              <strong>Dar când trebuie să analizeze MILIOANE de puncte de date?</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                🐌 Problema: Listele Python
              </h3>
              <div className="text-red-800 space-y-2">
                <p>• 1 milion de calcule = minute întregi</p>
                <p>• Memorie consumată enorm</p>
                <p>• Calculatorul "se sufocă" cu date mari</p>
                <p>• Cercetătorii pierd ore prețioase</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                ⚡ Soluția: NumPy de Travis Oliphant
              </h3>
              <div className="text-green-800 space-y-2">
                <p>• Date stocate compact în C</p>
                <p>• Operații vectorizate (SIMD)</p>
                <p>• 1000x mai rapid ca listele Python</p>
                <p>• Nervul central al științei în Python</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl text-center">
            <h4 className="text-xl font-bold mb-3">💡 Conexiunea Reală</h4>
            <p className="text-lg">
              Fiecare imagine medicală (CT, RMN) = matrice de milioane de pixeli<br/>
              Fiecare rețea neuronală = milioane/miliarde de parametri<br/>
              <strong>Diferența dintre secunde și millisecunde = ani de viață salvați!</strong>
            </p>
          </div>
        </div>

        {/* Performance Demo */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-6 flex items-center gap-3">
            🚀 Demo: Python Lists vs NumPy Performance
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="mb-4 text-gray-700">
              Simulează calculul distanței pentru poziții de stele. Observă diferența dramatică de performanță!
            </p>
            
            <div className="flex gap-4 items-center flex-wrap mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numărul de stele:
                </label>
                <input 
                  type="number" 
                  value={dataSize}
                  onChange={(e) => setDataSize(parseInt(e.target.value) || 1000)}
                  min="1000" 
                  max="100000"
                  step="1000"
                  disabled={isPerformanceRunning}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-24"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={runPerformanceDemo}
                  disabled={isPerformanceRunning}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  {isPerformanceRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPerformanceRunning ? 'Rulează...' : 'Compară Performanța'}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border-2 border-red-300">
                <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                  🐌 Python Lists
                </h4>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {performanceResults.python.toFixed(0)}ms
                </div>
                <div className="w-full bg-red-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-red-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (performanceResults.python / 1000) * 100)}%` }}
                  />
                </div>
                <p className="text-sm text-red-700">
                  Procesare secvențială, obiect Python pentru fiecare număr
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                  ⚡ NumPy Arrays
                </h4>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {performanceResults.numpy.toFixed(0)}ms
                </div>
                <div className="w-full bg-green-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (performanceResults.numpy / 50) * 100)}%` }}
                  />
                </div>
                <p className="text-sm text-green-700">
                  Procesare vectorizată, memorie continuă, operații în C
                </p>
              </div>
            </div>

            {performanceResults.python > 0 && performanceResults.numpy > 0 && (
              <div className="mt-6 p-4 bg-purple-100 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-800">
                  🏆 NumPy este {(performanceResults.python / performanceResults.numpy).toFixed(0)}x mai rapid!
                </div>
                <p className="text-purple-700 mt-2">
                  Pentru {dataSize.toLocaleString()} stele, NumPy economisește {(performanceResults.python - performanceResults.numpy).toFixed(0)}ms
                </p>
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-red-700 mb-3">Codul din spate:</h3>
          <div className="rounded-lg overflow-hidden border border-gray-700">
            <CodeBlockR language="python">
{`# Python Lists - slow and memory hungry
stars_python = []
for i in range(${dataSize}):
    distance = (i**2 + (i*2)**2)**0.5
    stars_python.append(distance)

# NumPy - vectorized magic!
import numpy as np
positions = np.arange(${dataSize})
distances = np.sqrt(positions**2 + (positions*2)**2)
# One line does what ${dataSize} steps did!`}
            </CodeBlockR>
          </div>
        </div>

        {/* Array Dimensions Demo */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 flex items-center gap-3">
            🔬 Dimensiunile NumPy - De la 1D la nD
          </h2>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <p className="mb-4 text-blue-800">
              Explorează cum NumPy organizează datele în dimensiuni diferite, de la semnale audio la rețele neuronale.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              {[
                { id: '1D', title: '1D - Audio', icon: '🎵', desc: 'Semnal cardiac', color: 'green' },
                { id: '2D', title: '2D - Imagine', icon: '🖼️', desc: 'Temperaturi cameră', color: 'blue' },
                { id: '3D', title: '3D - Video', icon: '📹', desc: 'Imagine RGB', color: 'purple' },
                { id: '4D', title: '4D - AI', icon: '🤖', desc: 'Batch pentru AI', color: 'orange' }
              ].map((dim) => (
                <Button
                  key={dim.id}
                  onClick={() => setSelectedDimension(dim.id)}
                  className={`px-4 py-3 text-sm font-semibold transition-all ${
                    selectedDimension === dim.id
                      ? `bg-${dim.color}-600 text-white shadow-lg scale-105`
                      : `bg-${dim.color}-100 text-${dim.color}-700 hover:bg-${dim.color}-200`
                  }`}
                >
                  <span className="mr-2">{dim.icon}</span>
                  <div className="text-left">
                    <div className="font-bold">{dim.title}</div>
                    <div className="text-xs opacity-75">{dim.desc}</div>
                  </div>
                </Button>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
              {selectedDimension === '1D' && (
                <div>
                  <h4 className="text-lg font-bold text-green-700 mb-4">🎵 1D Array - Pulsul Cardiac</h4>
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-100 rounded-lg p-4 border-2 border-green-300">
                      <div className="flex gap-2 flex-wrap justify-center">
                        {arrayData['1D'].map((value: number, index: number) => (
                          <div key={index} className="bg-green-600 text-white px-3 py-2 rounded text-sm font-mono">
                            {value}
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-2 text-green-700 text-sm">
                        Shape: ({arrayData['1D'].length},) - Vector de {arrayData['1D'].length} bătăi pe minut
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <CodeBlockR language="python">
{`heartbeat = np.array([${arrayData['1D'].join(', ')}])
print(f"Forma: {heartbeat.shape}")  # (${arrayData['1D'].length},)
print(f"Puls mediu: {np.mean(heartbeat)} BPM")`}
                    </CodeBlockR>
                  </div>
                </div>
              )}

              {selectedDimension === '2D' && (
                <div>
                  <h4 className="text-lg font-bold text-blue-700 mb-4">🖼️ 2D Array - Temperaturi în Cameră</h4>
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-100 rounded-lg p-4 border-2 border-blue-300">
                      <div className="grid grid-cols-2 gap-2">
                        {arrayData['2D'].map((row: number[], rowIndex: number) => 
                          row.map((temp: number, colIndex: number) => (
                            <div key={`${rowIndex}-${colIndex}`} className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-mono text-center">
                              {temp}°C
                            </div>
                          ))
                        )}
                      </div>
                      <div className="text-center mt-2 text-blue-700 text-sm">
                        Shape: ({arrayData['2D'].length}, {arrayData['2D'][0].length}) - Matrice {arrayData['2D'].length}x{arrayData['2D'][0].length} senzori
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <CodeBlockR language="python">
{`room_temp = np.array([
    [22.5, 23.1],
    [22.7, 24.2],
    [22.4, 23.8]
])
print(f"Forma: {room_temp.shape}")  # (3, 2)
print(f"Temperatura medie: {np.mean(room_temp)}°C")`}
                    </CodeBlockR>
                  </div>
                </div>
              )}

              {selectedDimension === '3D' && (
                <div>
                  <h4 className="text-lg font-bold text-purple-700 mb-4">📹 3D Array - Imagine RGB</h4>
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-purple-100 rounded-lg p-6 border-2 border-purple-300 text-center">
                      <div className="text-4xl mb-4">🖼️</div>
                      <div className="bg-purple-600 text-white px-4 py-2 rounded font-mono text-sm mb-2">
                        RGB(64, 64, 3)
                      </div>
                      <div className="text-purple-700 text-sm">
                        64x64 pixeli × 3 canale de culoare<br/>
                        Roșu, Verde, Albastru
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <CodeBlockR language="python">
{`rgb_image = np.random.randint(0, 256, (64, 64, 3))
print(f"Forma: {rgb_image.shape}")  # (64, 64, 3)
red_channel = rgb_image[:, :, 0]  # Extrage canalul roșu
print(f"Valoare pixel (0,0): R={rgb_image[0,0,0]} G={rgb_image[0,0,1]} B={rgb_image[0,0,2]}")`}
                    </CodeBlockR>
                  </div>
                </div>
              )}

              {selectedDimension === '4D' && (
                <div>
                  <h4 className="text-lg font-bold text-orange-700 mb-4">🤖 4D Array - Batch pentru AI</h4>
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-orange-100 rounded-lg p-6 border-2 border-orange-300 text-center">
                      <div className="text-4xl mb-4">🧠</div>
                      <div className="bg-orange-600 text-white px-4 py-2 rounded font-mono text-sm mb-2">
                        Batch(32, 64, 64, 3)
                      </div>
                      <div className="text-orange-700 text-sm">
                        32 imagini × 64x64 pixeli × RGB<br/>
                        Gata pentru rețeaua neuronală
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <CodeBlockR language="python">
{`batch_images = np.random.rand(32, 64, 64, 3)
print(f"Forma batch: {batch_images.shape}")  # (32, 64, 64, 3)
print(f"Prima imagine: {batch_images[0].shape}")  # (64, 64, 3)
print(f"Total parametri: {batch_images.size:,} float-uri")  # 393,216!`}
                    </CodeBlockR>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Broadcasting Demo */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6 flex items-center gap-3">
            🌀 Broadcasting - Superputerea NumPy
          </h2>
          
          <div className="bg-green-50 rounded-2xl p-6 mb-6">
            <p className="mb-4 text-green-800">
              <strong>Broadcasting</strong> = capacitatea NumPy de a efectua operații între array-uri de forme diferite, 
              fără să copieze datele. Este motivul pentru care poți normaliza 32 de imagini cu o singură operație!
            </p>
            
            <div className="text-center mb-6">
              <Button 
                onClick={runBroadcastingDemo}
                disabled={broadcastStep > 0}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3"
              >
                <Zap className="w-4 h-4 mr-2" />
                Demonstrează Broadcasting
              </Button>
            </div>
            
            {broadcastStep > 0 && (
              <div className="space-y-4">
                {broadcastStep >= 1 && (
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 animate-fadeInUp">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <div className="font-semibold">Batch de imagini pentru AI</div>
                        <div className="text-sm text-gray-600 font-mono">batch.shape = (32, 64, 64, 3)</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {broadcastStep >= 2 && (
                  <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500 animate-fadeInUp">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <div className="font-semibold">Definesc normalizarea RGB</div>
                        <div className="text-sm text-gray-600 font-mono">mean.shape = (3,) → [0.485, 0.456, 0.406]</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {broadcastStep >= 3 && (
                  <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 animate-fadeInUp">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <div className="font-semibold">Broadcasting Magic!</div>
                        <div className="text-sm text-gray-600">NumPy "extinde" automat (3,) la (32, 64, 64, 3)</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {showBroadcastResult && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-6 animate-fadeInUp">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎉</div>
                      <div className="text-lg font-bold mb-2">Rezultat: Toate cele 32 imagini normalizate!</div>
                      <div className="text-sm opacity-90">
                        O singură operație: (batch - mean) / std<br/>
                        Aplicată simultan pe 393,216 valori!
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-green-700 mb-3">Codul din spate:</h3>
          <div className="rounded-lg overflow-hidden border border-gray-700">
            <CodeBlockR language="python">
{`# Batch-ul de imagini pentru AI
batch = np.random.rand(32, 64, 64, 3)
mean = np.array([0.485, 0.456, 0.406])
std = np.array([0.229, 0.224, 0.225])

# Broadcasting magic - o singură linie!
normalized = (batch - mean) / std

# Fără NumPy ar fi fost:
# for i in range(32):           # Pentru fiecare imagine
#   for y in range(64):         # Pentru fiecare rând
#     for x in range(64):       # Pentru fiecare pixel
#       for c in range(3):      # Pentru fiecare canal RGB
#         normalized[i,y,x,c] = (batch[i,y,x,c] - mean[c]) / std[c]
# TOTAL: 393,216 operații individuale!`}
            </CodeBlockR>
          </div>
        </div>

        {/* Real World Applications */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 mb-6 flex items-center gap-3">
            🌍 Aplicații în Lumea Reală
          </h2>
          
          <div className="flex flex-wrap gap-4 mb-6 justify-center">
            {[
              { id: 'astronomy', title: '🌌 Astronomie', desc: 'Galaxii și stele' },
              { id: 'medicine', title: '🏥 Medicină', desc: 'Analiză EKG' },
              { id: 'finance', title: '💰 Finanțe', desc: 'Piețe de capital' },
              { id: 'ai', title: '🤖 AI/ML', desc: 'Rețele neuronale' }
            ].map((app) => (
              <Button
                key={app.id}
                onClick={() => setActiveApplication(app.id)}
                className={`px-6 py-4 text-sm font-semibold transition-all min-h-[80px] ${
                  activeApplication === app.id
                    ? 'bg-cyan-600 text-white shadow-lg scale-105'
                    : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                }`}
              >
                <div className="text-center space-y-1">
                  <div className="text-lg">{app.title}</div>
                  <div className="text-xs opacity-75 leading-relaxed">{app.desc}</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="bg-cyan-50 rounded-2xl p-6 border-2 border-cyan-200">
            {activeApplication === 'astronomy' && (
              <div>
                <h3 className="text-2xl font-bold text-cyan-700 mb-4">🌌 Astronomie - Centrul Galaxiei</h3>
                <p className="text-cyan-800 mb-4">
                  Calcularea centrului de masă pentru 100,000 de stele din galaxia Andromeda.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Simulare NASA:</h4>
                    <Button 
                      onClick={runRealWorldSimulation}
                      disabled={simulationRunning}
                      className="mb-4 bg-cyan-600 hover:bg-cyan-700"
                    >
                      {simulationRunning ? 'Calculez...' : 'Calculează Centrul Galaxiei'}
                    </Button>
                    
                    {simulationStep > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm">
                          <strong>Stele analizate:</strong> {(simulationStep * 20000).toLocaleString()}/100,000
                        </div>
                        <div className="w-full bg-cyan-200 rounded-full h-2">
                          <div 
                            className="bg-cyan-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(simulationStep / 5) * 100}%` }}
                          />
                        </div>
                        {simulationStep === 5 && (
                          <div className="mt-4 p-3 bg-green-100 rounded">
                            <strong>Rezultat:</strong> Centrul de masă la (-2.3, 15.7, 8.1) kpc<br/>
                            <small>Calculat în {simulationStep} secunde cu NumPy!</small>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <CodeBlockR language="python">
{`# Centrul de masă galactic
star_positions = np.random.normal(0, 25, (100000, 3))
star_masses = np.random.exponential(1, 100000)

# Formula: CM = Σ(mi × xi) / Σ(mi)
total_mass = np.sum(star_masses)
center_of_mass = np.sum(
    star_positions * star_masses[:, np.newaxis],
    axis=0
) / total_mass

print(f"Centrul galaxiei: {center_of_mass}")`}
                    </CodeBlockR>
                  </div>
                </div>
              </div>
            )}

            {activeApplication === 'medicine' && (
              <div>
                <h3 className="text-2xl font-bold text-cyan-700 mb-4">🏥 Medicină - Analiza EKG</h3>
                <p className="text-cyan-800 mb-4">
                  Detectarea aritmiilor cardiace prin analiza frecvențelor unui semnal EKG.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Semnal audio simulat:</h4>
                    <div className="flex gap-2 mb-3">
                      {audioFrequencies.map((freq, index) => (
                        <div key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                          {freq}Hz
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={analyzeAudioSignal}
                      className="mb-4 bg-red-600 hover:bg-red-700"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Analizează cu FFT
                    </Button>
                    
                    <div className="p-3 bg-gray-100 rounded">
                      <strong>Rezultat FFT:</strong> {fftResult}
                    </div>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <CodeBlockR language="python">
{`# Analiza EKG cu FFT
time = np.linspace(0, 10, 1000)
heart_rate = 75

# Semnal cardiac cu zgomot
signal = np.sin(2 * np.pi * heart_rate/60 * time)
noise = np.random.normal(0, 0.1, len(time))
ekg = signal + noise

# Transformata Fourier
fft_result = np.fft.fft(ekg)
frequencies = np.fft.fftfreq(len(ekg), 1/100)

# Detectarea frecvenței dominante
dominant_freq = frequencies[np.argmax(np.abs(fft_result))]
print(f"Frecvență cardiacă: {dominant_freq * 60} BPM")`}
                    </CodeBlockR>
                  </div>
                </div>
              </div>
            )}

            {activeApplication === 'finance' && (
              <div>
                <h3 className="text-2xl font-bold text-cyan-700 mb-4">💰 Finanțe - Optimizare Portofoliu</h3>
                <p className="text-cyan-800 mb-4">
                  Analiza corelațiilor și optimizarea unui portofoliu de investiții cu teoria Markowitz.
                </p>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-100 rounded">
                      <div className="text-2xl font-bold text-green-700">50</div>
                      <div className="text-sm text-green-600">Acțiuni</div>
                    </div>
                    <div className="p-3 bg-blue-100 rounded">
                      <div className="text-2xl font-bold text-blue-700">8.2%</div>
                      <div className="text-sm text-blue-600">Randament</div>
                    </div>
                    <div className="p-3 bg-orange-100 rounded">
                      <div className="text-2xl font-bold text-orange-700">1.89</div>
                      <div className="text-sm text-orange-600">Sharpe Ratio</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border border-gray-700">
                  <CodeBlockR language="python">
{`# Optimizare portofoliu Markowitz
returns = np.random.normal(0.001, 0.02, (252, 50))
correlation_matrix = np.corrcoef(returns.T)

# Calcularea riscului și randamentului
mean_returns = np.mean(returns, axis=0) * 252
volatility = np.std(returns, axis=0) * np.sqrt(252)

# Sharpe ratio pentru fiecare activ
risk_free_rate = 0.03
sharpe_ratios = (mean_returns - risk_free_rate) / volatility

print(f"Cel mai bun Sharpe ratio: {np.max(sharpe_ratios):.3f}")`}
                  </CodeBlockR>
                </div>
              </div>
            )}

            {activeApplication === 'ai' && (
              <div>
                <h3 className="text-2xl font-bold text-cyan-700 mb-4">🤖 AI/ML - Rețele Neuronale</h3>
                <p className="text-cyan-800 mb-4">
                  NumPy este baza pentru TensorFlow, PyTorch, scikit-learn - toate operațiile de algebra liniară.
                </p>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🧠</div>
                    <div className="font-bold text-gray-800">Rețeaua Neuronală</div>
                    <div className="text-sm text-gray-600 mt-2">
                      Input: 784 pixeli → Hidden: 128 neuroni → Output: 10 clase
                    </div>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border border-gray-700">
                  <CodeBlockR language="python">
{`# Rețea neuronală simplă cu NumPy
class SimpleNeuralNetwork:
    def __init__(self):
        # Matrici de greutăți
        self.W1 = np.random.randn(784, 128) * 0.1
        self.W2 = np.random.randn(128, 10) * 0.1

    def forward(self, X):
        # Propagarea înainte - doar operații NumPy!
        self.z1 = np.dot(X, self.W1)
        self.a1 = np.tanh(self.z1)  # Activare
        self.z2 = np.dot(self.a1, self.W2)
        return np.softmax(self.z2)

# TensorFlow, PyTorch fac exact asta, dar optimizat!`}
                  </CodeBlockR>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Final Inspiration */}
        <div className="artifact-card bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-3xl p-8 md:p-12 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            🌟 Gateway către Știința Computațională
          </h2>
          
          <div className="text-lg leading-relaxed mb-6">
            <p className="mb-4">
              Astăzi ai experientat <strong>prima întâlnire cu puterea adevărată</strong> care stă în spatele științei moderne.
              NumPy nu e doar o librărie - e <strong>poarta către un univers</strong> unde calculele devin artă.
            </p>
            <p className="mb-4">
              Fiecare array NumPy pe care îl creezi te conectează la o tradiție de <strong>60+ ani </strong> 
              de dezvoltare în științele computaționale.
            </p>
            <p className="mb-6">
              De aici, totul devine posibil: <em>machine learning</em>, <em>computer vision </em>, 
              <em>bioinformatică</em>, <em>astrofizică</em>, <em>fintech</em>...
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">🎭 Ce ai învățat:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2">
                <li>✅ <strong>De ce există NumPy:</strong> listele Python sunt prea lente pentru știință</li>
                <li>✅ <strong>Performanță:</strong> 1000x mai rapid decât listele native</li>
                <li>✅ <strong>Dimensiuni:</strong> de la 1D la nD, pentru orice tip de date</li>
              </ul>
              <ul className="space-y-2">
                <li>✅ <strong>Broadcasting:</strong> operații pe array-uri de forme diferite</li>
                <li>✅ <strong>Aplicații reale:</strong> de la astronomie la AI</li>
                <li>✅ <strong>Fundația:</strong> baza pentru TensorFlow, PyTorch, scikit-learn</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-2xl mb-2">🔬</div>
              <div className="font-bold">Cercetare</div>
              <div className="text-xs opacity-75">Științifică</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-2xl mb-2">💊</div>
              <div className="font-bold">Medicină</div>
              <div className="text-xs opacity-75">Salvează vieți</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-bold">Spațiu</div>
              <div className="text-xs opacity-75">Explorare</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-bold">AI</div>
              <div className="text-xs opacity-75">Viitorul</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🧠 × 🔢 × ⚡ = 🌍</div>
            <p className="text-xl font-bold mb-2">
              Mintea Ta × NumPy × Știință = Codul care Schimbă Lumea
            </p>
            <p className="text-sm opacity-90">
              Bun venit în clubul celor care construiesc viitorul cu matematică și cod!
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

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .artifact-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default NumPyArtifact;