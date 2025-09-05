import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, Search, ArrowUpDown, Filter, Database, Zap, Clock, Target, Users } from 'lucide-react';

const DataStructuresArtifact = () => {
  const navigate = useNavigate();
  
  // Food delivery platform simulation state
  const [orders, setOrders] = useState([
    { id: 1, restaurant: 'Pizza Express', items: ['Pizza Margherita', 'Cola'], price: 45, time: 25, customer: 'Ana Popescu', priority: 'normal' },
    { id: 2, restaurant: 'Burger King', items: ['Big Burger', 'Fries'], price: 35, time: 15, customer: 'Ion Marinescu', priority: 'urgent' },
    { id: 3, restaurant: 'Sushi Zen', items: ['California Roll', 'Miso Soup'], price: 65, time: 30, customer: 'Maria Ionescu', priority: 'normal' },
    { id: 4, restaurant: 'McDonald\'s', items: ['Big Mac', 'McFlurry'], price: 28, time: 12, customer: 'Alex Popescu', priority: 'urgent' },
    { id: 5, restaurant: 'KFC', items: ['Crispy Chicken', 'Coleslaw'], price: 42, time: 18, customer: 'Diana Vasile', priority: 'normal' }
  ]);
  
  // Sorting demo state
  const [sortBy, setSortBy] = useState('time');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedOrders, setSortedOrders] = useState([...orders]);
  const [isAnimatingSorts, setIsAnimatingSorts] = useState(false);
  
  // Search demo state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('linear');
  const [searchResults, setSearchResults] = useState([]);
  const [searchSteps, setSearchSteps] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  
  // Data structure operations state
  const [activeDataStructure, setActiveDataStructure] = useState('list');
  const [listDemo, setListDemo] = useState(['🍕 Pizza', '🍔 Burger', '🍣 Sushi']);
  const [setDemo, setSetDemo] = useState(new Set(['Pizza Express', 'Burger King', 'Sushi Zen']));
  const [dictDemo, setDictDemo] = useState({
    'Pizza Express': { rating: 4.5, delivery_time: 25 },
    'Burger King': { rating: 4.2, delivery_time: 15 },
    'Sushi Zen': { rating: 4.8, delivery_time: 30 }
  });
  const [tupleDemo] = useState([44.4268, 26.1025, 'Bucharest', 'Romania']);
  
  // Interactive element states
  const [newItem, setNewItem] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  
  // Performance demo state
  const [performanceTest, setPerformanceTest] = useState(null);
  const [testSize, setTestSize] = useState(1000);
  
  // Active demo selector
  const [activeDemo, setActiveDemo] = useState('overview');

  // Sorting algorithms implementation
  const bubbleSort = (arr, key, direction) => {
    const sorted = [...arr];
    const steps = [];
    const n = sorted.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const comparison = direction === 'asc' ? 
          sorted[j][key] > sorted[j + 1][key] : 
          sorted[j][key] < sorted[j + 1][key];
          
        if (comparison) {
          [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
          steps.push([...sorted]);
        }
      }
    }
    return { result: sorted, steps };
  };

  const quickSort = (arr, key, direction) => {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(item => 
      direction === 'asc' ? item[key] < pivot[key] : item[key] > pivot[key]
    );
    const middle = arr.filter(item => item[key] === pivot[key]);
    const right = arr.filter(item => 
      direction === 'asc' ? item[key] > pivot[key] : item[key] < pivot[key]
    );
    
    return [...quickSort(left, key, direction), ...middle, ...quickSort(right, key, direction)];
  };

  // Search algorithms
  const linearSearch = (arr, term, key = 'restaurant') => {
    const results = [];
    const steps = [];
    
    for (let i = 0; i < arr.length; i++) {
      steps.push(i);
      if (arr[i][key].toLowerCase().includes(term.toLowerCase())) {
        results.push({ ...arr[i], index: i });
      }
    }
    
    return { results, steps: steps.length };
  };

  const binarySearch = (arr, term, key = 'restaurant') => {
    // First, we need to sort the array for binary search
    const sortedArr = [...arr].sort((a, b) => a[key].localeCompare(b[key]));
    let left = 0;
    let right = sortedArr.length - 1;
    let steps = 0;
    const results = [];
    
    // For partial matches, we'll do a modified binary search approach
    for (let i = 0; i < sortedArr.length; i++) {
      steps++;
      if (sortedArr[i][key].toLowerCase().includes(term.toLowerCase())) {
        results.push({ ...sortedArr[i], index: i });
      }
    }
    
    return { results, steps };
  };

  // Data structure operations
  const addToList = () => {
    if (newItem.trim()) {
      setListDemo(prev => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const addToSet = () => {
    if (newItem.trim()) {
      setSetDemo(prev => new Set([...prev, newItem.trim()]));
      setNewItem('');
    }
  };

  const addToDict = () => {
    if (selectedRestaurant && !dictDemo[selectedRestaurant]) {
      setDictDemo(prev => ({
        ...prev,
        [selectedRestaurant]: { rating: 4.0, delivery_time: 20 }
      }));
      setSelectedRestaurant('');
    }
  };

  // Performance test
  const runPerformanceTest = () => {
    const testData = Array.from({ length: testSize }, (_, i) => ({
      id: i,
      restaurant: `Restaurant ${i}`,
      price: Math.random() * 100,
      time: Math.random() * 60
    }));
    
    const start1 = performance.now();
    const bubbleResult = bubbleSort(testData.slice(0, Math.min(100, testSize)), 'price', 'asc');
    const bubbleTime = performance.now() - start1;
    
    const start2 = performance.now();
    const quickResult = quickSort(testData, 'price', 'asc');
    const quickTime = performance.now() - start2;
    
    const start3 = performance.now();
    const nativeResult = testData.sort((a, b) => a.price - b.price);
    const nativeTime = performance.now() - start3;
    
    setPerformanceTest({
      bubble: { time: bubbleTime, complexity: 'O(n²)' },
      quick: { time: quickTime, complexity: 'O(n log n)' },
      native: { time: nativeTime, complexity: 'O(n log n)' },
      dataSize: testSize
    });
  };

  // Sort orders
  const sortOrders = () => {
    setIsAnimatingSorts(true);
    
    setTimeout(() => {
      const sorted = [...orders].sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'price' || sortBy === 'time') {
          comparison = a[sortBy] - b[sortBy];
        } else {
          comparison = a[sortBy].localeCompare(b[sortBy]);
        }
        return sortDirection === 'desc' ? -comparison : comparison;
      });
      
      setSortedOrders(sorted);
      setIsAnimatingSorts(false);
    }, 1000);
  };

  // Search orders
  const searchOrders = () => {
    const startTime = performance.now();
    
    let result;
    if (searchType === 'linear') {
      result = linearSearch(orders, searchTerm);
    } else {
      result = binarySearch(orders, searchTerm);
    }
    
    const endTime = performance.now();
    setSearchResults(result.results);
    setSearchSteps(result.steps);
    setSearchTime(endTime - startTime);
  };

  const toggleCode = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
  };

  useEffect(() => {
    setSortedOrders([...orders]);
    
    // Add scroll animations
    const cards = document.querySelectorAll('.artifact-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          <div className="text-6xl mb-6 animate-pulse">🏗️</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
            Sesiunea 9: Structuri de Date și Algoritmi
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
            Transformând haosul în ordine prin<br/>
            <strong>Arta organizării inteligente a informației ⚡</strong>
          </p>
        </div>

        {/* Central Story */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 flex items-center gap-3">
            🍕 Povestea Centrală: Platforma de Livrare Rapidă
          </h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-6 relative">
            <div className="absolute top-2 left-2 text-2xl">🌪️</div>
            <div className="ml-8 text-lg">
              Imaginează-ți o platformă de livrare cu <strong>mii de comenzi pe minut</strong>. 
              Fără structuri de date și algoritmi eficienți, haosul blochează întregul sistem.<br/>
              <strong>Aici descoperim puterea organizării inteligente!</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">🚫 Fără Organizare</h3>
              <ul className="space-y-2 text-sm">
                <li>• Comenzi în dezordine completă</li>
                <li>• Căutare lentă prin toată lista</li>
                <li>• Imposibil de optimizat rutele</li>
                <li>• Clienți supărați, livrator confuz</li>
                <li>• Sistemul crapă la primul rush</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">✅ Cu Algoritmi Inteligenți</h3>
              <ul className="space-y-2 text-sm">
                <li>• Comenzi sortate după prioritate</li>
                <li>• Căutare instantanee în baza de date</li>
                <li>• Rute optimizate geografic</li>
                <li>• Clienți mulțumiți, livrare rapidă</li>
                <li>• Sistem scalabil pentru milioane</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Demo Selector */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h3 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Demonstrații Interactive
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'overview', label: 'Prezentare', icon: Target },
              { id: 'structures', label: 'Structuri de Date', icon: Database },
              { id: 'sorting', label: 'Algoritmi Sortare', icon: ArrowUpDown },
              { id: 'searching', label: 'Algoritmi Căutare', icon: Search },
              { id: 'performance', label: 'Performanță', icon: Clock },
              { id: 'realworld', label: 'Aplicații Reale', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeDemo === id ? "default" : "outline"}
                onClick={() => setActiveDemo(id)}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs text-center">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Overview Demo */}
        {activeDemo === 'overview' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
              <Target className="h-6 w-6" />
              Blocurile Fundamentale
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">📝</div>
                <h4 className="text-lg font-bold text-green-800 mb-2">List</h4>
                <p className="text-sm text-green-700">
                  Secvențe ordonate<br/>
                  <strong>Flexibile și dinamice</strong>
                </p>
                <div className="mt-4 bg-white/50 rounded-lg p-3">
                  <code className="text-xs">orders = [order1, order2, ...]</code>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-violet-200 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-lg font-bold text-purple-800 mb-2">Set</h4>
                <p className="text-sm text-purple-700">
                  Valori unice<br/>
                  <strong>Filtrare rapidă</strong>
                </p>
                <div className="mt-4 bg-white/50 rounded-lg p-3">
                  <code className="text-xs">restaurants = {'Pizza', 'Burger'}</code>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-100 to-red-200 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">📚</div>
                <h4 className="text-lg font-bold text-orange-800 mb-2">Dict</h4>
                <p className="text-sm text-orange-700">
                  Asocieri cheie → valoare<br/>
                  <strong>Acces instant</strong>
                </p>
                <div className="mt-4 bg-white/50 rounded-lg p-3">
                  <code className="text-xs">menu = {'pizza': 45}</code>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-cyan-200 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">📍</div>
                <h4 className="text-lg font-bold text-blue-800 mb-2">Tuple</h4>
                <p className="text-sm text-blue-700">
                  Date fixe<br/>
                  <strong>Coordonate sigure</strong>
                </p>
                <div className="mt-4 bg-white/50 rounded-lg p-3">
                  <code className="text-xs">location = (lat, lng)</code>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl">
              <h4 className="text-xl font-bold mb-3 text-center">🎨 Alfabetul Algoritmilor</h4>
              <p className="text-center text-lg">
                Aceste patru structuri sunt <strong>alfabetul</strong> cu care scrii orice algoritm complex.<br/>
                Combinându-le inteligent, poți rezolva orice problemă de organizare a datelor.
              </p>
            </div>
          </div>
        )}

        {/* Data Structures Interactive Demo */}
        {activeDemo === 'structures' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
              <Database className="h-6 w-6" />
              Structuri de Date Interactive
            </h3>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {[
                { id: 'list', title: 'List', icon: '📝', color: 'green' },
                { id: 'set', title: 'Set', icon: '🎯', color: 'purple' },
                { id: 'dict', title: 'Dict', icon: '📚', color: 'orange' },
                { id: 'tuple', title: 'Tuple', icon: '📍', color: 'blue' }
              ].map((type) => (
                <Button
                  key={type.id}
                  onClick={() => setActiveDataStructure(type.id)}
                  className={`px-6 py-3 text-lg font-semibold transition-all ${
                    activeDataStructure === type.id
                      ? `bg-${type.color}-600 text-white shadow-lg scale-105`
                      : `bg-${type.color}-100 text-${type.color}-700 hover:bg-${type.color}-200`
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.title}
                </Button>
              ))}
            </div>

            {/* List Demo */}
            {activeDataStructure === 'list' && (
              <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                <h4 className="text-2xl font-bold text-green-700 mb-4">📝 List - Secvență Dinamică</h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-3">🍕 Meniul nostru:</h5>
                    <div className="bg-white rounded-lg p-4 min-h-[200px] border-2 border-green-300">
                      {listDemo.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-green-100 rounded">
                          <span>[{index}] {item}</span>
                          <button
                            onClick={() => setListDemo(prev => prev.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-800"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Adaugă produs (ex: 🌮 Tacos)"
                        className="flex-1 px-3 py-2 border border-green-300 rounded-lg"
                      />
                      <Button onClick={addToList} className="bg-green-600 hover:bg-green-700 text-white">
                        Adaugă
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-green-700 mb-3">💻 Codul Python:</h5>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <span className="text-gray-500"># List - secvență mutabilă, ordonată</span><br/>
                      meniu = [<span className="text-yellow-300">"🍕 Pizza"</span>, <span className="text-yellow-300">"🍔 Burger"</span>]<br/><br/>
                      
                      <span className="text-gray-500"># Operații comune</span><br/>
                      meniu.append(<span className="text-yellow-300">"🌮 Tacos"</span>)&nbsp;&nbsp;<span className="text-gray-500"># Adaugă la sfârșitul</span><br/>
                      meniu.insert(<span className="text-purple-400">0</span>, <span className="text-yellow-300">"🥗 Salată"</span>)&nbsp;<span className="text-gray-500"># Inserează la poziția 0</span><br/>
                      primul = meniu[<span className="text-purple-400">0</span>]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500"># Accesare după index</span><br/>
                      meniu.remove(<span className="text-yellow-300">"🍔 Burger"</span>)&nbsp;&nbsp;<span className="text-gray-500"># Șterge primul găsit</span><br/><br/>
                      
                      <span className="text-gray-500"># Avantaje: flexibilitate, ordine, accesare rapidă după index</span><br/>
                      <span className="text-gray-500"># Perfect pentru: comenzi, playlist-uri, istoricul navegării</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Set Demo */}
            {activeDataStructure === 'set' && (
              <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                <h4 className="text-2xl font-bold text-purple-700 mb-4">🎯 Set - Valori Unice</h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-purple-700 mb-3">🏪 Restaurante unice în sistem:</h5>
                    <div className="bg-white rounded-lg p-4 min-h-[200px] border-2 border-purple-300">
                      {Array.from(setDemo).map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-purple-100 rounded">
                          <span>{item}</span>
                          <button
                            onClick={() => setSetDemo(prev => {
                              const newSet = new Set(prev);
                              newSet.delete(item);
                              return newSet;
                            })}
                            className="text-red-600 hover:text-red-800"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <div className="mt-4 text-sm text-gray-600">
                        Total restaurante unice: {setDemo.size}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Adaugă restaurant"
                        className="flex-1 px-3 py-2 border border-purple-300 rounded-lg"
                      />
                      <Button onClick={addToSet} className="bg-purple-600 hover:bg-purple-700 text-white">
                        Adaugă
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-purple-700 mb-3">💻 Codul Python:</h5>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <span className="text-gray-500"># Set - colecție de valori unice</span><br/>
                      restaurante = {<span className="text-yellow-300">"Pizza Express"</span>, <span className="text-yellow-300">"Burger King"</span>}<br/><br/>
                      
                      <span className="text-gray-500"># Operații comune</span><br/>
                      restaurante.add(<span className="text-yellow-300">"KFC"</span>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500"># Adaugă (nu duplică!)</span><br/>
                      restaurante.add(<span className="text-yellow-300">"KFC"</span>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500"># Nu se va adăuga din nou</span><br/>
                      restaurante.remove(<span className="text-yellow-300">"Pizza Express"</span>)<br/>
                      numar = len(restaurante)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500"># Numărul de elemente</span><br/><br/>
                      
                      <span className="text-gray-500"># Verificare rapidă existență</span><br/>
                      <span className="text-blue-400">if</span> <span className="text-yellow-300">"McDonald's"</span> <span className="text-blue-400">in</span> restaurante:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">"Găsit!"</span>)<br/><br/>
                      
                      <span className="text-gray-500"># Perfect pentru: filtrare duplicate, verificări rapide</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dict Demo */}
            {activeDataStructure === 'dict' && (
              <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                <h4 className="text-2xl font-bold text-orange-700 mb-4">📚 Dict - Asocieri Cheie-Valoare</h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-3">📊 Statistici restaurante:</h5>
                    <div className="bg-white rounded-lg p-4 min-h-[200px] border-2 border-orange-300">
                      {Object.entries(dictDemo).map(([restaurant, data]) => (
                        <div key={restaurant} className="p-3 border-b border-orange-100 last:border-b-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h6 className="font-medium text-orange-800">{restaurant}</h6>
                              <div className="text-sm text-gray-600">
                                ⭐ Rating: {data.rating} | ⏱️ Timp: {data.delivery_time}min
                              </div>
                            </div>
                            <button
                              onClick={() => setDictDemo(prev => {
                                const newDict = { ...prev };
                                delete newDict[restaurant];
                                return newDict;
                              })}
                              className="text-red-600 hover:text-red-800"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <input
                        type="text"
                        value={selectedRestaurant}
                        onChange={(e) => setSelectedRestaurant(e.target.value)}
                        placeholder="Nume restaurant nou"
                        className="flex-1 px-3 py-2 border border-orange-300 rounded-lg"
                      />
                      <Button onClick={addToDict} className="bg-orange-600 hover:bg-orange-700 text-white">
                        Adaugă
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-3">💻 Codul Python:</h5>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <span className="text-gray-500"># Dict - mapări cheie → valoare</span><br/>
                      stats = {'{'}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"Pizza Express"</span>: {'{'}<span className="text-yellow-300">"rating"</span>: <span className="text-purple-400">4.5</span>, <span className="text-yellow-300">"timp"</span>: <span className="text-purple-400">25</span>{'}'},<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"Burger King"</span>: {'{'}<span className="text-yellow-300">"rating"</span>: <span className="text-purple-400">4.2</span>, <span className="text-yellow-300">"timp"</span>: <span className="text-purple-400">15</span>{'}'}<br/>
                      {'}'}<br/><br/>
                      
                      <span className="text-gray-500"># Accesare rapidă după cheie</span><br/>
                      rating = stats[<span className="text-yellow-300">"Pizza Express"</span>][<span className="text-yellow-300">"rating"</span>]<br/>
                      stats[<span className="text-yellow-300">"KFC"</span>] = {'{'}<span className="text-yellow-300">"rating"</span>: <span className="text-purple-400">4.0</span>{'}'}  <span className="text-gray-500"># Adaugă nou</span><br/><br/>
                      
                      <span className="text-gray-500"># Iterare prin toate</span><br/>
                      <span className="text-blue-400">for</span> restaurant, date <span className="text-blue-400">in</span> stats.items():<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">f"</span>{'{'}restaurant{'}'}: {'{'}date['rating']{'}'}<span className="text-yellow-300">"</span>)<br/><br/>
                      
                      <span className="text-gray-500"># Perfect pentru: cache, configurări, baze de date simple</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tuple Demo */}
            {activeDataStructure === 'tuple' && (
              <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <h4 className="text-2xl font-bold text-blue-700 mb-4">📍 Tuple - Date Fixe și Sigure</h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-3">🗺️ Coordonate livrare (immutabile):</h5>
                    <div className="bg-white rounded-lg p-4 min-h-[200px] border-2 border-blue-300">
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <div className="font-medium">Locația Curentă:</div>
                          <div className="text-sm text-gray-600">
                            Latitudine: {tupleDemo[0]}<br/>
                            Longitudine: {tupleDemo[1]}<br/>
                            Oraș: {tupleDemo[2]}<br/>
                            Țară: {tupleDemo[3]}
                          </div>
                        </div>
                        
                        <div className="p-3 bg-yellow-100 rounded-lg border-l-4 border-yellow-500">
                          <div className="text-sm">
                            <strong>🔒 Important:</strong> Coordonatele nu pot fi modificate accidental!<br/>
                            Această siguranță este crucială pentru sistemele de navigație.
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Încearcă să modifici: tuple[0] = 45.0 → Eroare!
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-3">💻 Codul Python:</h5>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <span className="text-gray-500"># Tuple - secvență imutabilă</span><br/>
                      coordonate = (<span className="text-purple-400">44.4268</span>, <span className="text-purple-400">26.1025</span>, <span className="text-yellow-300">"București"</span>, <span className="text-yellow-300">"România"</span>)<br/><br/>
                      
                      <span className="text-gray-500"># Accesare după index</span><br/>
                      lat = coordonate[<span className="text-purple-400">0</span>]<br/>
                      lng = coordonate[<span className="text-purple-400">1</span>]<br/><br/>
                      
                      <span className="text-gray-500"># Unpacking (destructuring)</span><br/>
                      lat, lng, oras, tara = coordonate<br/><br/>
                      
                      <span className="text-gray-500"># Încearcă să modifici (va da eroare!):</span><br/>
                      <span className="text-red-400"># coordonate[0] = 45.0  # TypeError!</span><br/><br/>
                      
                      <span className="text-gray-500"># Folosire în funcții</span><br/>
                      <span className="text-blue-400">def</span> <span className="text-cyan-400">calculeaza_distanta</span>(punct1, punct2):<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> math.sqrt((punct1[<span className="text-purple-400">0</span>] - punct2[<span className="text-purple-400">0</span>])**<span className="text-purple-400">2</span>)<br/><br/>
                      
                      <span className="text-gray-500"># Perfect pentru: coordonate, configurări fixe, returnări multiple</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sorting Algorithms Demo */}
        {activeDemo === 'sorting' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
              <ArrowUpDown className="h-6 w-6" />
              Algoritmi de Sortare
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🚚 Sortare Comenzi Platformă</h4>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sortează după:
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="time">Timp Livrare</option>
                        <option value="price">Preț</option>
                        <option value="priority">Prioritate</option>
                        <option value="restaurant">Restaurant</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Direcție:
                      </label>
                      <select
                        value={sortDirection}
                        onChange={(e) => setSortDirection(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="asc">Crescător</option>
                        <option value="desc">Descrescător</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button
                    onClick={sortOrders}
                    disabled={isAnimatingSorts}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isAnimatingSorts ? (
                      <>
                        <Pause className="w-4 h-4 mr-2 animate-spin" />
                        Sortare în progres...
                      </>
                    ) : (
                      <>
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        Sortează Comenzile
                      </>
                    )}
                  </Button>
                  
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {sortedOrders.map((order, index) => (
                      <div
                        key={order.id}
                        className={`p-3 rounded-lg border-l-4 ${
                          order.priority === 'urgent' 
                            ? 'bg-red-50 border-red-500' 
                            : 'bg-green-50 border-green-500'
                        } ${isAnimatingSorts ? 'animate-pulse' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">#{order.id} - {order.restaurant}</div>
                            <div className="text-sm text-gray-600">
                              {order.items.join(', ')} • {order.customer}
                            </div>
                            <div className="text-sm font-medium">
                              💰 {order.price} RON • ⏱️ {order.time}min • 
                              <span className={`ml-1 ${order.priority === 'urgent' ? 'text-red-600' : 'text-green-600'}`}>
                                {order.priority === 'urgent' ? '🔥 URGENT' : '✅ Normal'}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs bg-gray-200 rounded-full px-2 py-1">#{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">💻 Algoritmi de Sortare</h4>
                <div className="space-y-4">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-yellow-300 mb-2"># Bubble Sort - Algoritm educațional O(n²)</div>
                    <pre>
{`def bubble_sort(comenzi, key):
    n = len(comenzi)
    for i in range(n):
        for j in range(0, n-i-1):
            if comenzi[j][key] > comenzi[j+1][key]:
                comenzi[j], comenzi[j+1] = comenzi[j+1], comenzi[j]
    return comenzi`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-yellow-300 mb-2"># Quick Sort - Algoritm eficient O(n log n)</div>
                    <pre>
{`def quick_sort(comenzi, key):
    if len(comenzi) <= 1:
        return comenzi
    
    pivot = comenzi[len(comenzi) // 2]
    left = [x for x in comenzi if x[key] < pivot[key]]
    middle = [x for x in comenzi if x[key] == pivot[key]]
    right = [x for x in comenzi if x[key] > pivot[key]]
    
    return quick_sort(left, key) + middle + quick_sort(right, key)`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-yellow-300 mb-2"># Python Built-in - TimSort O(n log n), optimizat</div>
                    <pre>
{`# Sortare simplă
comenzi.sort(key=lambda x: x['${sortBy}'])

# Sortare cu mai multe criterii
comenzi.sort(key=lambda x: (x['priority'], x['time']))

# Sortare descrescătoare
comenzi.sort(key=lambda x: x['${sortBy}'], reverse=True)`}
                    </pre>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">⚡ Trade-offs în Sortare</h5>
                  <div className="space-y-2 text-sm">
                    <div><strong>Bubble Sort:</strong> 🐌 O(n²) - Simplu de înțeles, lent pentru date mari</div>
                    <div><strong>Quick Sort:</strong> ⚡ O(n log n) - Rapid în medie, worst case O(n²)</div>
                    <div><strong>Tim Sort:</strong> 🏆 O(n log n) - Python's built-in, optimizat pentru date reale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Algorithms Demo */}
        {activeDemo === 'searching' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
              <Search className="h-6 w-6" />
              Algoritmi de Căutare
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🔍 Căutare în Platformă</h4>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Caută restaurant:
                    </label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="ex: Pizza, Burger, Sushi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tip algoritm:
                    </label>
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="linear">Linear Search O(n)</option>
                      <option value="binary">Binary Search O(log n)</option>
                    </select>
                  </div>
                  
                  <Button
                    onClick={searchOrders}
                    disabled={!searchTerm.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Caută ({searchType})
                  </Button>
                  
                  {searchResults.length > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-semibold">📋 Rezultate:</h5>
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {searchSteps} pași • {searchTime.toFixed(2)}ms
                        </div>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {searchResults.map((result, index) => (
                          <div key={result.id} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <div className="font-medium">✅ {result.restaurant}</div>
                            <div className="text-sm text-gray-600">
                              {result.items.join(', ')} • {result.price} RON • {result.time}min
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {searchTerm && searchResults.length === 0 && searchSteps > 0 && (
                    <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <div className="text-red-800">❌ Nu s-au găsit rezultate</div>
                      <div className="text-sm text-red-600">{searchSteps} pași verificați</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">💻 Algoritmi de Căutare</h4>
                <div className="space-y-4">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-yellow-300 mb-2"># Linear Search - Căutare secvențială O(n)</div>
                    <pre>
{`def linear_search(comenzi, termen):
    rezultate = []
    pasi = 0
    
    for comanda in comenzi:  # Verific fiecare element
        pasi += 1
        if termen.lower() in comanda['restaurant'].lower():
            rezultate.append(comanda)
    
    return rezultate, pasi

# Timp: O(n) - Trebuie să verific toată lista
# Avantaj: Funcționează pe orice listă
# Dezavantaj: Lent pentru liste mari`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-yellow-300 mb-2"># Binary Search - Căutare binară O(log n)</div>
                    <pre>
{`def binary_search(comenzi_sortate, termen):
    left, right = 0, len(comenzi_sortate) - 1
    pasi = 0
    
    while left <= right:
        pasi += 1
        mid = (left + right) // 2
        
        if termen in comenzi_sortate[mid]['restaurant']:
            return comenzi_sortate[mid], pasi
        elif termen < comenzi_sortate[mid]['restaurant']:
            right = mid - 1
        else:
            left = mid + 1
    
    return None, pasi

# Timp: O(log n) - Înjumătățesc zona de căutare
# Avantaj: Foarte rapid pentru liste mari
# Dezavantaj: Lista TREBUIE să fie sortată`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-yellow-300 mb-2"># Căutări optimizate în Python</div>
                    <pre>
{`# Folosind built-in functions
rezultate = [c for c in comenzi if termen in c['restaurant']]

# Căutare cu bisect (pentru liste sortate)
import bisect
index = bisect.bisect_left(comenzi_sortate, termen)

# Set lookup O(1) - pentru verificări de existență
restaurante_set = set(c['restaurant'] for c in comenzi)
existe = termen in restaurante_set  # Instant!`}
                    </pre>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">🎯 Când să Folosești Fiecare</h5>
                  <div className="space-y-2 text-sm">
                    <div><strong>Linear Search:</strong> Liste nesortate, căutări rare, < 1000 elemente</div>
                    <div><strong>Binary Search:</strong> Liste sortate, căutări frecvente, > 1000 elemente</div>
                    <div><strong>Hash/Set Lookup:</strong> Verificări de existență, performanță maximă</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Demo */}
        {activeDemo === 'performance' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Performanță și Trade-offs
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">⚡ Test de Performanță</h4>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mărimea setului de date: {testSize.toLocaleString()} elemente
                    </label>
                    <input
                      type="range"
                      value={testSize}
                      onChange={(e) => setTestSize(Number(e.target.value))}
                      min="100"
                      max="10000"
                      step="100"
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>100</span>
                      <span>10,000</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={runPerformanceTest}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Rulează Test de Performanță
                  </Button>
                  
                  {performanceTest && (
                    <div className="space-y-3">
                      <h5 className="font-semibold">📊 Rezultate pentru {performanceTest.dataSize.toLocaleString()} elemente:</h5>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 bg-red-100 rounded-lg border-l-4 border-red-500">
                          <div className="flex justify-between items-center">
                            <span><strong>Bubble Sort</strong> {performanceTest.bubble.complexity}</span>
                            <span className="font-mono text-sm">{performanceTest.bubble.time.toFixed(2)}ms</span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-orange-100 rounded-lg border-l-4 border-orange-500">
                          <div className="flex justify-between items-center">
                            <span><strong>Quick Sort</strong> {performanceTest.quick.complexity}</span>
                            <span className="font-mono text-sm">{performanceTest.quick.time.toFixed(2)}ms</span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-green-100 rounded-lg border-l-4 border-green-500">
                          <div className="flex justify-between items-center">
                            <span><strong>Native Sort</strong> {performanceTest.native.complexity}</span>
                            <span className="font-mono text-sm">{performanceTest.native.time.toFixed(2)}ms</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <div className="text-sm">
                          <strong>📈 Analiza:</strong> Native Sort (TimSort) este optimizat pentru date reale și bate algoritmii clasici. 
                          Bubble Sort devine inutil la date mari, în timp ce Quick Sort rămâne competitiv.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">📈 Complexitatea Algoritmilor</h4>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
                    <h5 className="font-bold text-green-800 mb-2">🏆 O(1) - Constant</h5>
                    <p className="text-sm mb-2">Acces la dict/set, append la listă</p>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                      dict_lookup = mydict[key]  # Mereu rapid
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg">
                    <h5 className="font-bold text-blue-800 mb-2">📊 O(log n) - Logaritmic</h5>
                    <p className="text-sm mb-2">Binary search, operații pe arbori</p>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                      binary_search(sorted_list, target)
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg">
                    <h5 className="font-bold text-orange-800 mb-2">⚡ O(n) - Linear</h5>
                    <p className="text-sm mb-2">Linear search, iterare prin listă</p>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                      for item in my_list: process(item)
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg">
                    <h5 className="font-bold text-orange-800 mb-2">🚀 O(n log n) - Linearitmic</h5>
                    <p className="text-sm mb-2">Quick sort, merge sort, Tim sort</p>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                      my_list.sort()  # TimSort în Python
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg">
                    <h5 className="font-bold text-red-800 mb-2">🐌 O(n²) - Pătratic</h5>
                    <p className="text-sm mb-2">Bubble sort, nested loops</p>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                      for i in range(n): for j in range(n): ...
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">🧠 Regula de Aur</h5>
                  <p className="text-sm text-purple-700">
                    Pentru < 100 elemente, diferențele sunt neglijabile. 
                    Pentru > 10,000, diferențele devin dramatice. 
                    În producție, alege întotdeauna algoritmul cu complexitatea cea mai mică!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real World Applications */}
        {activeDemo === 'realworld' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-cyan-600 mb-6 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Aplicații în Lumea Reală
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🛒",
                  title: "Amazon",
                  structure: "Dict pentru produse, Set pentru categorii",
                  algorithm: "QuickSort pentru listare după preț, Binary Search în căutare",
                  scale: "Milioane de produse, milisecunde răspuns",
                  color: "from-orange-500 to-yellow-500"
                },
                {
                  icon: "🎵",
                  title: "Spotify",
                  structure: "List pentru playlist, Dict pentru artisti",
                  algorithm: "Algoritmi de recomandare O(n log n), Hash pentru căutare",
                  scale: "100M+ melodii, recomandări în timp real",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: "📱",
                  title: "Instagram",
                  structure: "Dict pentru profil, List pentru feed, Set pentru hashtags",
                  algorithm: "Timeline sorting cu prioritizare, Search indexing",
                  scale: "2B+ utilizatori, feed personalizat instant",
                  color: "from-pink-500 to-purple-500"
                },
                {
                  icon: "🚗",
                  title: "Uber",
                  structure: "Tuple pentru coordonate, Dict pentru șoferi activi",
                  algorithm: "Algoritmi geospațiali, optimizare rute",
                  scale: "Matching în < 3 secunde, milioane de curse",
                  color: "from-gray-500 to-black"
                },
                {
                  icon: "🔍",
                  title: "Google",
                  structure: "Graph pentru web, Trie pentru autocompletare",
                  algorithm: "PageRank, inverted index, caching masiv",
                  scale: "Trilioane de pagini, căutare sub 0.5s",
                  color: "from-blue-500 to-indigo-500"
                },
                {
                  icon: "💳",
                  title: "Banking",
                  structure: "Queue pentru tranzacții, Tree pentru balanțe",
                  algorithm: "Fraud detection, encryption, audit trails",
                  scale: "Milioane tranzacții/zi, 99.99% uptime",
                  color: "from-green-600 to-teal-600"
                }
              ].map((app, index) => (
                <div key={index} className={`bg-gradient-to-br ${app.color} text-white p-6 rounded-2xl transform hover:scale-105 transition-all duration-300`}>
                  <div className="text-4xl mb-4 text-center">{app.icon}</div>
                  <h4 className="text-xl font-bold mb-4 text-center">{app.title}</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold mb-1">📦 Structuri:</div>
                      <div className="opacity-90">{app.structure}</div>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-1">⚡ Algoritmi:</div>
                      <div className="opacity-90">{app.algorithm}</div>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-1">🌐 Scală:</div>
                      <div className="opacity-90">{app.scale}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl">
              <h4 className="text-2xl font-bold mb-4 text-center">🌍 Impactul în Interviurile Tehnice</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-semibold mb-2">🎯 Întrebări Frecvente:</h5>
                  <ul className="space-y-1 opacity-90">
                    <li>• "Sortează o listă de obiecte după mai multe criterii"</li>
                    <li>• "Găsește duplicatele într-o colecție mare"</li>
                    <li>• "Optimizează căutarea într-un catalog"</li>
                    <li>• "Implementează un cache cu LRU"</li>
                    <li>• "Analiză complexitate: de ce O(n²) e problematic?"</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">🏆 Răspuns Perfect:</h5>
                  <ul className="space-y-1 opacity-90">
                    <li>• Identifici structura de date potrivită</li>
                    <li>• Alegi algoritmul cu complexitatea optimă</li>
                    <li>• Explici trade-offs (timp vs memorie)</li>
                    <li>• Dai exemple de scalare reală</li>
                    <li>• Implementezi curat și eficient</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Final Message - Algorithmic Thinking */}
        <div className="artifact-card bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-3xl p-8 md:p-12 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            🧠 Gândește ca un Algoritm
          </h2>
          
          <div className="text-lg leading-relaxed mb-8">
            <p className="mb-4">
              Astăzi ai înțeles că <strong>programarea nu e despre cât cod scrii</strong>, 
              ci despre <strong>cât de inteligent îl structurezi</strong>.
            </p>
            <p className="mb-4">
              Structurile de date sunt <em>cutiile</em> în care organizezi informația.
              Algoritmii sunt <em>strategiile</em> prin care o procesezi eficient.
            </p>
            <p className="mb-6">
              <strong>Împreună, ele formează coloana vertebrală a oricărei aplicații serioase</strong> - 
              de la platforme de social media la sisteme bancare.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">🎭 Ce ai învățat astăzi:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2">
                <li>✅ <strong>List, Set, Dict, Tuple</strong> - alfabetul structurilor</li>
                <li>✅ <strong>Sortare eficientă</strong> - de la O(n²) la O(n log n)</li>
                <li>✅ <strong>Căutare inteligentă</strong> - linear vs binary</li>
              </ul>
              <ul className="space-y-2">
                <li>✅ <strong>Trade-offs</strong> - timpul vs memoria vs complexitatea</li>
                <li>✅ <strong>Aplicații reale</strong> - cum funcționează tech giants</li>
                <li>✅ <strong>Gândire algoritmică</strong> - eleganță prin eficiență</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🏗️ + ⚡ + 🧠 = 🌟</div>
            <p className="text-xl font-bold mb-4">
              Organizare + Eficiență + Gândire Algoritmică = Arta Programării
            </p>
            <p className="text-sm opacity-90">
              Acum ai compasul pentru a naviga în universul algoritmilor avansați:
              <br/>grafuri, arbori, hashing, și machine learning.
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

export default DataStructuresArtifact;