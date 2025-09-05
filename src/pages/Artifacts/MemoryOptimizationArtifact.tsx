import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, Zap, Clock, HardDrive } from 'lucide-react';

const MemoryOptimizationArtifact = () => {
  const navigate = useNavigate();
  
  // Memory simulation states
  const [simulationStep, setSimulationStep] = useState(0);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [simulationType, setSimulationType] = useState('naive');
  
  // Database query simulation
  const [databaseQueries, setDatabaseQueries] = useState([]);
  const [queryResults, setQueryResults] = useState([]);
  const [isQuerying, setIsQuerying] = useState(false);
  
  // Real world examples
  const [selectedExample, setSelectedExample] = useState('none');

  // Fibonacci demonstration
  const [fibInput, setFibInput] = useState(30);
  const [fibResult, setFibResult] = useState('');
  const [fibStats, setFibStats] = useState({ calls: 0, time: 0 });
  const [isCalculating, setIsCalculating] = useState(false);

  const toggleCode = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
  };

  const simulateMemoryProblem = async () => {
    setIsSimulationRunning(true);
    setSimulationStep(0);
    setMemoryUsage(0);
    setRequestCount(0);
    
    for (let i = 1; i <= 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSimulationStep(i);
      setRequestCount(i);
      
      if (simulationType === 'naive') {
        // Naive approach - memory keeps growing
        setMemoryUsage(prev => prev + Math.random() * 50 + 20);
      } else {
        // Optimized approach - memory usage is controlled
        setMemoryUsage(prev => Math.min(100, prev + Math.random() * 10 + 5));
      }
    }
    
    setIsSimulationRunning(false);
  };

  const resetSimulation = () => {
    setIsSimulationRunning(false);
    setSimulationStep(0);
    setMemoryUsage(0);
    setRequestCount(0);
  };

  const fibonacciNaive = (n) => {
    if (n <= 1) return n;
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
  };

  const calculateFibonacci = () => {
    setIsCalculating(true);
    setFibResult('');
    setFibStats({ calls: 0, time: 0 });
    
    const startTime = performance.now();
    let callCount = 0;
    
    const fibWithCount = (n) => {
      callCount++;
      if (n <= 1) return n;
      return fibWithCount(n - 1) + fibWithCount(n - 2);
    };
    
    setTimeout(() => {
      const result = fibWithCount(fibInput);
      const endTime = performance.now();
      
      setFibResult(result.toString());
      setFibStats({
        calls: callCount,
        time: Math.round(endTime - startTime)
      });
      setIsCalculating(false);
    }, 100);
  };

  const simulateDatabase = () => {
    setIsQuerying(true);
    const queries = [
      'SELECT * FROM users WHERE id = 123',
      'SELECT * FROM products WHERE category = "electronics"',
      'SELECT * FROM orders WHERE date >= "2024-01-01"',
      'SELECT * FROM users WHERE id = 123',  // Duplicate!
      'SELECT * FROM products WHERE category = "electronics"'  // Duplicate!
    ];
    
    const results = [];
    setDatabaseQueries([]);
    setQueryResults([]);
    
    queries.forEach((query, index) => {
      setTimeout(() => {
        setDatabaseQueries(prev => [...prev, query]);
        
        // Simulate database response time
        setTimeout(() => {
          const isExpensive = query.includes('products') || query.includes('orders');
          const responseTime = isExpensive ? '250ms' : '50ms';
          results.push(`Query ${index + 1}: ${responseTime}`);
          setQueryResults([...results]);
        }, Math.random() * 300 + 100);
      }, index * 400);
    });
    
    setTimeout(() => {
      setIsQuerying(false);
    }, queries.length * 400 + 1000);
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.artifact-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      color: '#333'
    }}>
      {/* Back Button */}
      <div className="sticky top-4 left-4 z-10 p-4">
        <Button
          onClick={() => navigate('/foundations')}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Foundations
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-16 text-white relative">
          <div className="text-6xl mb-6 animate-pulse">🧠💾</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
            Sesiunea 5: Memoria & Eficiența
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
            Cum memoria limitată a calculatoarelor a născut nevoile de optimizare<br/>
            <strong>Povestea din spatele ideii de "reutilizare inteligentă" ✨</strong>
          </p>
        </div>

        {/* The Problem Discovery */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-rose-600 mb-6 flex items-center gap-3">
            📖 Povestea: Când Calculatoarele au Întâlnit Limitele
          </h2>
          
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl mb-6 relative">
            <div className="absolute top-2 left-2 text-2xl">🕐</div>
            <div className="ml-8">
              <h3 className="text-xl font-semibold text-rose-700 mb-3">Anii 1960-1970: Memoria Era Scumpă Și Limitată</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Imaginați-vă: un calculator cu <strong>4KB de memorie RAM</strong> (cât încape un email mic),
                încercând să ruleze programe complexe pentru navigația spațială sau calculele științifice.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Programatorii au realizat rapid că <strong>nu-și pot permite să recalculeze același lucru de mai multe ori</strong>.
                Prima idee: "Ce dacă păstrăm rezultatul într-un loc și îl reutilizăm?"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { year: "1965", problem: "Apollo Program", memory: "4KB RAM", solution: "Tabele de căutare pre-calculate pentru navigație" },
              { year: "1970", problem: "Primele Baze de Date", memory: "64KB RAM", solution: "Index-uri pentru căutări rapide" },
              { year: "1975", problem: "Grafică Computerizată", memory: "256KB RAM", solution: "Buffer-e pentru pixeli des accesați" }
            ].map((era, index) => (
              <div key={index} className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl">
                <div className="text-2xl mb-3 font-bold">{era.year}</div>
                <h4 className="font-semibold mb-2">{era.problem}</h4>
                <p className="text-sm opacity-90 mb-3">{era.memory}</p>
                <p className="text-xs italic">{era.solution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Memory Pressure Simulation */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 flex items-center gap-3">
            ⚡ Simulare: Presiunea Memoriei
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Simuleaza cum se comportă un sistem când memoria devine o resursa limitată.
              Observă diferența între abordarea naivă și cea optimizată.
            </p>
            
            <div className="flex gap-4 items-center flex-wrap mb-6">
              <div className="flex gap-2">
                <Button
                  onClick={() => setSimulationType('naive')}
                  className={simulationType === 'naive' ? 'bg-red-600' : 'bg-gray-400'}
                >
                  🔥 Abordare Naivă
                </Button>
                <Button
                  onClick={() => setSimulationType('optimized')}
                  className={simulationType === 'optimized' ? 'bg-green-600' : 'bg-gray-400'}
                >
                  ✅ Abordare Optimizată
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={simulateMemoryProblem}
                  disabled={isSimulationRunning}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Simulare
                </Button>
                <Button 
                  onClick={resetSimulation}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            
            {simulationStep > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border-2 border-blue-300">
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <HardDrive className="w-5 h-5" />
                    Utilizare Memorie
                  </h4>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>RAM Folosită</span>
                      <span>{Math.round(memoryUsage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-300 ${
                          memoryUsage > 80 ? 'bg-red-500' : memoryUsage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(memoryUsage, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Request-uri procesate:</span>
                      <span>{requestCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pasul curent:</span>
                      <span>{simulationStep}/10</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-purple-300">
                  <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Observații
                  </h4>
                  {simulationType === 'naive' ? (
                    <div className="space-y-2 text-sm">
                      <div className="text-red-600">❌ Memorie în creștere constantă</div>
                      <div className="text-red-600">❌ Recalculări repetate</div>
                      <div className="text-red-600">❌ Risca să umple RAM-ul</div>
                      <div className="text-red-600">❌ Performanță în scădere</div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <div className="text-green-600">✅ Memorie controlată</div>
                      <div className="text-green-600">✅ Reutilizare inteligentă</div>
                      <div className="text-green-600">✅ RAM stabil sub limita</div>
                      <div className="text-green-600">✅ Performanță constantă</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-blue-700 mb-3">Ce se întâmplă în cod:</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-red-700 mb-2">🔥 Abordarea Naivă:</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <span className="text-blue-400">def</span> proces_user_data(user_id):<br/>
                &nbsp;&nbsp;<span className="text-gray-500"># Recalculează de fiecare dată</span><br/>
                &nbsp;&nbsp;raw_data = database.get(user_id)<br/>
                &nbsp;&nbsp;processed = heavy_calculation(raw_data)<br/>
                &nbsp;&nbsp;formatted = format_data(processed)<br/>
                &nbsp;&nbsp;<span className="text-blue-400">return</span> formatted<br/><br/>
                
                <span className="text-gray-500"># Pentru același user, recalculează tot!</span><br/>
                result1 = proces_user_data(<span className="text-purple-400">123</span>)  <span className="text-gray-500"># 200ms</span><br/>
                result2 = proces_user_data(<span className="text-purple-400">123</span>)  <span className="text-gray-500"># Din nou 200ms!</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-green-700 mb-2">✅ Abordarea Optimizată:</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <span className="text-gray-500"># Dicționar simplu pentru rezultate</span><br/>
                rezultate_calculate = {'{}'}<br/><br/>
                
                <span className="text-blue-400">def</span> proces_user_data(user_id):<br/>
                &nbsp;&nbsp;<span className="text-blue-400">if</span> user_id <span className="text-blue-400">in</span> rezultate_calculate:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> rezultate_calculate[user_id]<br/><br/>
                
                &nbsp;&nbsp;<span className="text-gray-500"># Doar dacă nu există în memorie</span><br/>
                &nbsp;&nbsp;result = heavy_calculation(user_id)<br/>
                &nbsp;&nbsp;rezultate_calculate[user_id] = result<br/>
                &nbsp;&nbsp;<span className="text-blue-400">return</span> result
              </div>
            </div>
          </div>
        </div>

        {/* Fibonacci Example */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6 flex items-center gap-3">
            🔢 Exemplul Clasic: Fibonacci
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Fibonacci este exemplul perfect pentru a înțelege de ce "memoria inteligentă" e necesară.
              Calculează F({fibInput}) și observă câte operații face calculatorul.
            </p>
            
            <div className="flex gap-4 items-center flex-wrap mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calculează F(n) pentru n =
                </label>
                <input 
                  type="number" 
                  value={fibInput}
                  onChange={(e) => setFibInput(Math.min(40, Math.max(1, parseInt(e.target.value) || 1)))}
                  min="1" 
                  max="40"
                  disabled={isCalculating}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20"
                />
              </div>
              
              <Button 
                onClick={calculateFibonacci}
                disabled={isCalculating}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Clock className="w-4 h-4 mr-2" />
                {isCalculating ? 'Calculând...' : 'Calculează'}
              </Button>
            </div>
            
            {(fibResult || isCalculating) && (
              <div className="bg-white border-2 border-green-500 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Rezultat:</h4>
                    <div className="text-2xl font-mono text-green-800">
                      {isCalculating ? 'Calculând...' : fibResult}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Apeluri funcție:</h4>
                    <div className="text-2xl font-mono text-orange-600">
                      {isCalculating ? '...' : fibStats.calls.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Timp:</h4>
                    <div className="text-2xl font-mono text-red-600">
                      {isCalculating ? '...' : `${fibStats.time}ms`}
                    </div>
                  </div>
                </div>
                
                {!isCalculating && fibStats.calls > 1000 && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
                    <h5 className="font-semibold text-red-800 mb-2">🚨 Observația Crucială:</h5>
                    <p className="text-red-700 text-sm">
                      Pentru F({fibInput}), calculatorul a făcut <strong>{fibStats.calls.toLocaleString()} apeluri</strong>!
                      Multe din aceste calcule erau <strong>identice și repetate</strong>.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-red-700 mb-3">🔥 Fără Memorie (Ineficient):</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <span className="text-blue-400">def</span> fibonacci(n):<br/>
                &nbsp;&nbsp;<span className="text-blue-400">if</span> n &lt;= <span className="text-purple-400">1</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> n<br/>
                &nbsp;&nbsp;<span className="text-blue-400">return</span> fibonacci(n-<span className="text-purple-400">1</span>) + fibonacci(n-<span className="text-purple-400">2</span>)
              </div>
              <div className="text-sm text-red-700 bg-red-50 p-3 rounded">
                <strong>Problemă:</strong> fibonacci(5) calculează fibonacci(3) de 2 ori,
                fibonacci(2) de 3 ori, etc. Foarte ineficient!
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-green-700 mb-3">✅ Cu Memorie (Efficient):</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                cache = {'{}'}<br/><br/>
                
                <span className="text-blue-400">def</span> fibonacci_cu_cache(n):<br/>
                &nbsp;&nbsp;<span className="text-blue-400">if</span> n <span className="text-blue-400">in</span> cache:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> cache[n]<br/><br/>
                
                &nbsp;&nbsp;<span className="text-blue-400">if</span> n &lt;= <span className="text-purple-400">1</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;result = n<br/>
                &nbsp;&nbsp;<span className="text-blue-400">else</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;result = fibonacci_cu_cache(n-<span className="text-purple-400">1</span>) + fibonacci_cu_cache(n-<span className="text-purple-400">2</span>)<br/><br/>
                
                &nbsp;&nbsp;cache[n] = result<br/>
                &nbsp;&nbsp;<span className="text-blue-400">return</span> result
              </div>
              <div className="text-sm text-green-700 bg-green-50 p-3 rounded">
                <strong>Soluție:</strong> Fiecare calcul se face o singură dată și se păstrează în cache.
                De mii de ori mai rapid!
              </div>
            </div>
          </div>
        </div>

        {/* Database Query Simulation */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 flex items-center gap-3">
            🗄️ Problema Bazelor de Date
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Simulează o aplicație web care face query-uri către baza de date.
              Observă cum query-urile duplicate consumă timp și resurse.
            </p>
            
            <Button 
              onClick={simulateDatabase}
              disabled={isQuerying}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 mb-6"
            >
              <Play className="w-4 h-4 mr-2" />
              Simulează Query-uri Database
            </Button>
            
            {(databaseQueries.length > 0 || isQuerying) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-purple-300 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-700 mb-3">📤 Query-uri trimise:</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {databaseQueries.map((query, index) => {
                      const isDuplicate = databaseQueries.slice(0, index).some(q => q === query);
                      return (
                        <div 
                          key={index} 
                          className={`text-sm font-mono p-2 rounded ${
                            isDuplicate ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          <span className="font-bold">Q{index + 1}:</span> {query}
                          {isDuplicate && <span className="ml-2 text-red-600">🔁 DUPLICAT!</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-white border-2 border-green-300 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 mb-3">⏱️ Răspunsuri database:</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {queryResults.map((result, index) => (
                      <div key={index} className="text-sm font-mono p-2 bg-green-100 text-green-800 rounded">
                        {result}
                      </div>
                    ))}
                  </div>
                  
                  {!isQuerying && queryResults.length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                      <h5 className="font-semibold text-red-800 mb-2">💡 Problema Evidentă:</h5>
                      <p className="text-red-700 text-sm">
                        Query-urile duplicate au consumat timp și resurse suplimentare.
                        Cu un cache simplu, puteau fi evitate complet!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-purple-700 mb-3">Soluția emergentă:</h3>
          <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
            <span className="text-gray-500"># Implementarea primelor cache-uri simple</span><br/>
            query_cache = {'{}'}  <span className="text-gray-500"># Dicționar pentru rezultate</span><br/><br/>
            
            <span className="text-blue-400">def</span> query_database(sql):<br/>
            &nbsp;&nbsp;<span className="text-gray-500"># Verifică dacă avem rezultatul în cache</span><br/>
            &nbsp;&nbsp;<span className="text-blue-400">if</span> sql <span className="text-blue-400">in</span> query_cache:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">"🎯 Cache HIT! Returnez rezultatul instant"</span>)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> query_cache[sql]<br/><br/>
            
            &nbsp;&nbsp;<span className="text-gray-500"># Dacă nu există, execută query-ul</span><br/>
            &nbsp;&nbsp;print(<span className="text-yellow-300">"💾 Cache MISS. Execut query-ul..."</span>)<br/>
            &nbsp;&nbsp;result = database.execute(sql)  <span className="text-gray-500"># Operație scumpă</span><br/>
            &nbsp;&nbsp;query_cache[sql] = result<br/>
            &nbsp;&nbsp;<span className="text-blue-400">return</span> result
          </div>
        </div>

        {/* Real World Impact */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-6 flex items-center gap-3">
            🌍 Impactul în Lumea Reală
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🚗",
                title: "Industria Auto",
                story: "Calculele pentru navigație GPS repetau același traseu. Prima idee: 'Să păstrăm rutele frecvente în memorie!'",
                impact: "De la 30 secunde la 2 secunde pentru recalcularea traseului"
              },
              {
                icon: "🏦", 
                title: "Băncile",
                story: "Verificarea soldurilor făcea același calcul pentru fiecare client. Soluția: cache pentru solduri frecvent accesate.",
                impact: "De la 5 secunde la 0.1 secunde pentru verificarea soldului"
              },
              {
                icon: "📺",
                title: "Televiziune",
                story: "Procesarea imaginilor TV recalcula aceleași transformări. Ideea: buffer pentru frame-urile des folosite.",
                impact: "Calitate video îmbunătățită cu 60% mai puține resurse"
              },
              {
                icon: "🎮",
                title: "Gaming",
                story: "Randarea 3D recalcula aceleași texturi. Breakthrough: texture cache pentru elemente repetitive.",
                impact: "FPS-ul a crescut de la 15 la 60 pe același hardware"
              },
              {
                icon: "☁️",
                title: "Internetul",
                story: "Web server-ele serveau aceleași pagini. Revoluția: cache pentru HTML-ul frecvent accesat.",
                impact: "Timpul de încărcare redus de la 10 secunde la 0.5 secunde"
              },
              {
                icon: "🧬",
                title: "Bioinformatica",
                story: "Analiza DNA-ului repetă aceleași secvențe. Descoperirea: cache pentru pattern-urile genetice comune.",
                impact: "Timpul de analiză redus de la ore la minute"
              }
            ].map((example, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedExample(selectedExample === example.title ? 'none' : example.title)}
              >
                <div className="text-3xl mb-3">{example.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{example.title}</h4>
                <p className="text-sm opacity-90 mb-3">{example.story}</p>
                
                {selectedExample === example.title && (
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <div className="text-xs font-bold text-yellow-200 mb-2">IMPACTUL MĂSURAT:</div>
                    <div className="text-sm font-medium">{example.impact}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The Evolution Teaser */}
        <div className="artifact-card bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            🔮 Ce Vine în Continuare
          </h2>
          
          <div className="text-lg leading-relaxed mb-6">
            <p className="mb-4">
              Aceste experimente simple cu <strong>dicționare pentru cache</strong> au fost doar începutul.
            </p>
            <p className="mb-4">
              Programatorii și-au dat seama rapid că <strong>memoria nu e infinită</strong>.
              Ce se întâmplă când cache-ul nostru devine prea mare?
            </p>
            <p className="mb-4">
              Care rezultate păstrăm? Care eliminăm? Cum decidem?
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">🎯 În Următoarele Sesiuni:</h3>
            <ul className="space-y-2 text-sm">
              <li>✨ <strong>Sesiunea 6:</strong> Strategii de eliminare inteligentă (LRU naște din necesitate)</li>
              <li>✨ <strong>Sesiunea 7:</strong> Cache distribuit și probleme de sincronizare</li>
              <li>✨ <strong>Sesiunea 8:</strong> Sisteme moderne (Redis, Memcached)</li>
              <li>✨ <strong>Sesiunea 9:</strong> Cache în AI/ML - de ce ChatGPT nu recalculează tot</li>
            </ul>
          </div>
          
          <div className="text-center mt-8">
            <div className="text-4xl mb-4">💾 → ⚡ → 🧠 → 🌐</div>
            <p className="text-xl font-bold">
              Memorie → Viteză → Inteligență → Sisteme Globale
            </p>
          </div>
        </div>

        {/* Practice Section */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-6 flex items-center gap-3">
            🧩 Gândește ca un Pioneer
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-emerald-700 mb-4">
                🤔 Exercițiu Mental: Identifică Oportunități de Cache
              </h4>
              <div className="space-y-4">
                {[
                  {
                    scenario: "O aplicație meteo care întreabă server-ul pentru aceeași locație de mai multe ori pe oră",
                    hint: "Ce s-ar întâmpla dacă ai păstra vremea pentru fiecare oraș pentru 10 minute?"
                  },
                  {
                    scenario: "Un magazin online care calculează prețul total + transport pentru același coș de mai multe ori",
                    hint: "Cum ai putea evita recalcularea dacă coșul nu s-a schimbat?"
                  },
                  {
                    scenario: "O aplicație de traducere care traduce același text de mai multe ori",
                    hint: "Ce rezultate ai păstra în memorie pentru acces rapid?"
                  }
                ].map((exercise, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-emerald-500">
                    <p className="mb-2"><strong>Situația:</strong> {exercise.scenario}</p>
                    <Button 
                      onClick={() => toggleCode(`hint${index}`)}
                      variant="outline"
                      size="sm"
                    >
                      💡 Vezi Hint-ul
                    </Button>
                    <div id={`hint${index}`} className="mt-4 text-sm text-emerald-600 hidden">
                      <strong>Gândește-te:</strong> {exercise.hint}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease;
        }

        .artifact-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default MemoryOptimizationArtifact;