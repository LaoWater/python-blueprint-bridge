import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, Zap, Brain, Target, Layers, Clock, ChevronRight, ChevronDown } from 'lucide-react';

const AdvancedAlgorithmsArtifact = () => {
  const navigate = useNavigate();
  
  // Main demo selector
  const [activeSection, setActiveSection] = useState('overview');
  
  // Divide & Conquer - Merge Sort Visualization
  const [mergeArray, setMergeArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42]);
  const [mergeSortSteps, setMergeSortSteps] = useState([]);
  const [currentMergeStep, setCurrentMergeStep] = useState(-1);
  const [isMergeSorting, setIsMergeSorting] = useState(false);
  const [mergeComparisons, setMergeComparisons] = useState(0);
  
  // Fibonacci Memoization
  const [fibInput, setFibInput] = useState(30);
  const [fibResults, setFibResults] = useState({ naive: null, memo: null });
  const [fibTimes, setFibTimes] = useState({ naive: 0, memo: 0 });
  const [fibMemoCache, setFibMemoCache] = useState({});
  const [fibCalculating, setFibCalculating] = useState({ naive: false, memo: false });
  
  // Greedy Algorithm - Activity Selection
  const [activities, setActivities] = useState([
    { id: 1, name: 'Prezentare Matinală', start: 9, end: 10, value: 100 },
    { id: 2, name: 'Întâlnire Client', start: 9, end: 11, value: 200 },
    { id: 3, name: 'Code Review', start: 11, end: 12, value: 80 },
    { id: 4, name: 'Lunch Meeting', start: 12, end: 13, value: 120 },
    { id: 5, name: 'Training Session', start: 13, end: 15, value: 300 },
    { id: 6, name: 'Standup', start: 14, end: 15, value: 90 },
    { id: 7, name: 'Planning', start: 15, end: 17, value: 250 }
  ]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [greedyAnimation, setGreedyAnimation] = useState(false);
  
  // Backtracking - N-Queens
  const [queensSize, setQueensSize] = useState(4);
  const [queensBoard, setQueensBoard] = useState([]);
  const [queensSolutions, setQueensSolutions] = useState([]);
  const [queensSolving, setQueensSolving] = useState(false);
  const [queensSteps, setQueensSteps] = useState(0);
  
  // Performance comparison data
  const [performanceData, setPerformanceData] = useState([]);
  const [performanceSize, setPerformanceSize] = useState(1000);
  
  // Code visibility toggles
  const [visibleCode, setVisibleCode] = useState({});

  // Merge Sort Implementation with Step Tracking
  const mergeSort = useCallback((arr, depth = 0, start = 0) => {
    const steps = [];
    
    function mergeSortRecursive(array, d, s) {
      if (array.length <= 1) {
        steps.push({
          type: 'base_case',
          array: [...array],
          depth: d,
          start: s,
          message: `Base case: array of length ${array.length}`
        });
        return array;
      }
      
      const mid = Math.floor(array.length / 2);
      const left = array.slice(0, mid);
      const right = array.slice(mid);
      
      steps.push({
        type: 'divide',
        array: [...array],
        left: [...left],
        right: [...right],
        depth: d,
        start: s,
        message: `Dividing array at position ${mid}`
      });
      
      const sortedLeft = mergeSortRecursive(left, d + 1, s);
      const sortedRight = mergeSortRecursive(right, d + 1, s + mid);
      
      return merge(sortedLeft, sortedRight, d, s);
    }
    
    function merge(left, right, d, s) {
      const result = [];
      let leftIndex = 0;
      let rightIndex = 0;
      
      steps.push({
        type: 'merge_start',
        left: [...left],
        right: [...right],
        depth: d,
        start: s,
        message: `Merging arrays of length ${left.length} and ${right.length}`
      });
      
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
        
        steps.push({
          type: 'merge_step',
          result: [...result],
          leftRemaining: left.slice(leftIndex),
          rightRemaining: right.slice(rightIndex),
          depth: d,
          start: s,
          message: `Merged: [${result.join(', ')}]`
        });
      }
      
      result.push(...left.slice(leftIndex), ...right.slice(rightIndex));
      
      steps.push({
        type: 'merge_complete',
        result: [...result],
        depth: d,
        start: s,
        message: `Merge complete: [${result.join(', ')}]`
      });
      
      return result;
    }
    
    const sorted = mergeSortRecursive(arr, depth, start);
    return { sorted, steps };
  }, []);

  // Fibonacci implementations
  const fibonacciNaive = (n) => {
    if (n <= 1) return n;
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
  };

  const fibonacciMemo = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Greedy Activity Selection
  const greedyActivitySelection = () => {
    setGreedyAnimation(true);
    setSelectedActivities([]);
    
    // Sort by end time (greedy choice)
    const sortedActivities = [...activities].sort((a, b) => a.end - b.start);
    const selected = [];
    let lastEndTime = 0;
    
    setTimeout(() => {
      sortedActivities.forEach((activity, index) => {
        setTimeout(() => {
          if (activity.start >= lastEndTime) {
            selected.push(activity);
            lastEndTime = activity.end;
            setSelectedActivities([...selected]);
          }
        }, index * 800);
      });
      
      setTimeout(() => {
        setGreedyAnimation(false);
      }, sortedActivities.length * 800 + 500);
    }, 500);
  };

  // N-Queens Backtracking
  const solveNQueens = (size) => {
    setQueensSolving(true);
    setQueensSteps(0);
    setQueensSolutions([]);
    setQueensBoard(Array(size).fill(null).map(() => Array(size).fill(0)));
    
    const solutions = [];
    let steps = 0;
    
    const isSafe = (board, row, col) => {
      steps++;
      // Check column
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
      }
      
      // Check diagonal (top-left)
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
      }
      
      // Check diagonal (top-right)
      for (let i = row - 1, j = col + 1; i >= 0 && j < size; i--, j++) {
        if (board[i][j] === 1) return false;
      }
      
      return true;
    };
    
    const solve = (board, row) => {
      if (row === size) {
        solutions.push(board.map(r => [...r]));
        return true;
      }
      
      for (let col = 0; col < size; col++) {
        if (isSafe(board, row, col)) {
          board[row][col] = 1;
          
          if (solve(board, row + 1)) {
            return true;
          }
          
          board[row][col] = 0; // Backtrack
        }
      }
      
      return false;
    };
    
    setTimeout(() => {
      const board = Array(size).fill(null).map(() => Array(size).fill(0));
      solve(board, 0);
      setQueensSolutions(solutions);
      setQueensSteps(steps);
      setQueensSolving(false);
      if (solutions.length > 0) {
        setQueensBoard(solutions[0]);
      }
    }, 1000);
  };

  // Run merge sort animation
  const runMergeSort = () => {
    setIsMergeSorting(true);
    setCurrentMergeStep(-1);
    setMergeComparisons(0);
    
    const { steps } = mergeSort(mergeArray);
    setMergeSortSteps(steps);
    
    let stepIndex = 0;
    const timer = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentMergeStep(stepIndex);
        setMergeComparisons(prev => prev + 1);
        stepIndex++;
      } else {
        setIsMergeSorting(false);
        clearInterval(timer);
      }
    }, 1500);
  };

  // Calculate Fibonacci with timing
  const calculateFibonacci = async (type) => {
    if (type === 'naive') {
      setFibCalculating({ ...fibCalculating, naive: true });
      const start = performance.now();
      
      // Use setTimeout to prevent UI blocking for large numbers
      setTimeout(() => {
        try {
          const result = fibonacciNaive(Math.min(fibInput, 35)); // Limit for performance
          const end = performance.now();
          setFibResults({ ...fibResults, naive: result });
          setFibTimes({ ...fibTimes, naive: end - start });
        } catch (error) {
          setFibResults({ ...fibResults, naive: 'Too large!' });
        }
        setFibCalculating({ ...fibCalculating, naive: false });
      }, 100);
      
    } else {
      setFibCalculating({ ...fibCalculating, memo: true });
      const start = performance.now();
      const memo = {};
      const result = fibonacciMemo(fibInput, memo);
      const end = performance.now();
      
      setFibResults({ ...fibResults, memo: result });
      setFibTimes({ ...fibTimes, memo: end - start });
      setFibMemoCache(memo);
      setFibCalculating({ ...fibCalculating, memo: false });
    }
  };

  // Performance comparison
  const runPerformanceTest = () => {
    const sizes = [100, 500, 1000, 2000, 5000];
    const results = [];
    
    sizes.forEach(size => {
      const data = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
      
      // Bubble Sort timing
      const bubbleStart = performance.now();
      const bubbleData = [...data];
      for (let i = 0; i < Math.min(bubbleData.length, 1000); i++) {
        for (let j = 0; j < bubbleData.length - i - 1; j++) {
          if (bubbleData[j] > bubbleData[j + 1]) {
            [bubbleData[j], bubbleData[j + 1]] = [bubbleData[j + 1], bubbleData[j]];
          }
        }
      }
      const bubbleTime = performance.now() - bubbleStart;
      
      // Merge Sort timing
      const mergeStart = performance.now();
      mergeSort(data);
      const mergeTime = performance.now() - mergeStart;
      
      // Native Sort timing
      const nativeStart = performance.now();
      [...data].sort((a, b) => a - b);
      const nativeTime = performance.now() - nativeStart;
      
      results.push({
        size,
        bubble: size <= 1000 ? bubbleTime : null,
        merge: mergeTime,
        native: nativeTime
      });
    });
    
    setPerformanceData(results);
  };

  const toggleCode = (section) => {
    setVisibleCode(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    // Initialize performance test
    runPerformanceTest();
    
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-16 text-white relative">
          <div className="text-6xl mb-6 animate-pulse">🧠</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
            Sesiunea 10: Algoritmi Avansați
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
            Gândirea Algoritmistului - Unde fiecare milisecundă contează<br/>
            <strong>și eleganța se îmbină cu performanța ⚡</strong>
          </p>
        </div>

        {/* Central Philosophy */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 flex items-center gap-3">
            🌟 Cum Gândește un Algoritmist
          </h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl mb-6 relative">
            <div className="absolute top-2 left-2 text-3xl">🏗️</div>
            <div className="ml-12 text-lg">
              Un milion de utilizatori intră zilnic pe platforma ta. Trebuie să personalizezi feed-uri,
              să cauți în istoric, să sortezi mii de produse. <strong>Aici metodele naive eșuează</strong>.<br/>
              <em>Acum gândești nu doar ca programator, ci ca arhitect al eficienței.</em>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl text-center transform hover:scale-105 transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-lg mb-2">Divide et Impera</h4>
              <p className="text-sm opacity-90">Problemele mari sunt doar probleme mici puse laolaltă</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl text-center transform hover:scale-105 transition-all">
              <div className="text-3xl mb-3">💾</div>
              <h4 className="font-bold text-lg mb-2">Memoizare</h4>
              <p className="text-sm opacity-90">Amintește-ți ce ai făcut ca să nu repeți inutil</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl text-center transform hover:scale-105 transition-all">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-lg mb-2">Greedy</h4>
              <p className="text-sm opacity-90">Alege mereu cea mai bună opțiune locală</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl text-center transform hover:scale-105 transition-all">
              <div className="text-3xl mb-3">🔄</div>
              <h4 className="font-bold text-lg mb-2">Backtracking</h4>
              <p className="text-sm opacity-90">Explorează inteligent, retrage-te când nu merge</p>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="artifact-card bg-white rounded-3xl p-6 mb-8 shadow-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Explorează Algoritmii Avansați
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { id: 'overview', label: 'Prezentare', icon: Brain },
              { id: 'divide', label: 'Divide & Conquer', icon: Layers },
              { id: 'memoization', label: 'Memoization', icon: Brain },
              { id: 'greedy', label: 'Greedy', icon: Target },
              { id: 'backtracking', label: 'Backtracking', icon: Zap }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "outline"}
                onClick={() => setActiveSection(id)}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs text-center">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
              <Brain className="h-6 w-6" />
              Fundamentele Gândirii Algoritmice
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">📈 Evoluția Complexității</h4>
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">O(1) - Constant</span>
                      <span className="text-sm text-green-600">Instant</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Hash table lookup, array access</p>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">O(log n) - Logaritmic</span>
                      <span className="text-sm text-blue-600">Foarte rapid</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Binary search, balanced tree operations</p>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">O(n log n) - Linearitmic</span>
                      <span className="text-sm text-yellow-600">Optim</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Merge sort, heap sort, quick sort (avg)</p>
                  </div>
                  
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">O(n²) - Pătratic</span>
                      <span className="text-sm text-red-600">Evită!</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Bubble sort, naive algorithms</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🎯 Strategii de Optimizare</h4>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
                    <h5 className="font-bold text-purple-800 mb-2">1. Analiză Preliminară</h5>
                    <p className="text-sm">Înțelege problema înainte să codezi. Identifică bottleneck-urile potențiale.</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl">
                    <h5 className="font-bold text-blue-800 mb-2">2. Alege Structura Potrivită</h5>
                    <p className="text-sm">Hash maps pentru lookup-uri rapide, heap-uri pentru priorități.</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl">
                    <h5 className="font-bold text-green-800 mb-2">3. Evită Redundanța</h5>
                    <p className="text-sm">Memoization, caching și precomputing pentru calcule repetitive.</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-xl">
                    <h5 className="font-bold text-orange-800 mb-2">4. Măsoară și Optimizează</h5>
                    <p className="text-sm">Profile codul, identifică hotspot-urile, optimizează iterativ.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl">
              <h4 className="text-xl font-bold mb-3 text-center">⚖️ Echilibrul Perfect</h4>
              <p className="text-center text-lg">
                Algoritmii avansați nu sunt despre complexitate, ci despre <strong>eleganța simplității</strong>.<br/>
                Găsești soluția care e suficient de rapidă, suficient de clară, și suficient de mentenabilă.
              </p>
            </div>
          </div>
        )}

        {/* Divide & Conquer - Merge Sort */}
        {activeSection === 'divide' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
              <Layers className="h-6 w-6" />
              Divide et Impera - Merge Sort
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🔀 Visualizare Merge Sort</h4>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Array de sortat:
                    </label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mergeArray.map((num, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center font-bold text-blue-800"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={runMergeSort}
                      disabled={isMergeSorting}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isMergeSorting ? (
                        <>
                          <Pause className="w-4 h-4 mr-2 animate-spin" />
                          Sortare...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Merge Sort
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => setMergeArray([...mergeArray].sort(() => Math.random() - 0.5))}
                      variant="outline"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Randomize
                    </Button>
                  </div>
                  
                  {currentMergeStep >= 0 && mergeSortSteps[currentMergeStep] && (
                    <div className="mt-6">
                      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                        <h5 className="font-semibold text-blue-800 mb-2">
                          Pasul {currentMergeStep + 1}: {mergeSortSteps[currentMergeStep].type}
                        </h5>
                        <p className="text-sm text-blue-700 mb-3">
                          {mergeSortSteps[currentMergeStep].message}
                        </p>
                        
                        <div className="grid grid-cols-1 gap-3">
                          {mergeSortSteps[currentMergeStep].left && (
                            <div>
                              <span className="text-xs font-medium text-gray-600">Stânga:</span>
                              <div className="flex gap-1 mt-1">
                                {mergeSortSteps[currentMergeStep].left.map((num, i) => (
                                  <div key={i} className="w-8 h-8 bg-green-100 border border-green-300 rounded flex items-center justify-center text-xs">
                                    {num}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {mergeSortSteps[currentMergeStep].right && (
                            <div>
                              <span className="text-xs font-medium text-gray-600">Dreapta:</span>
                              <div className="flex gap-1 mt-1">
                                {mergeSortSteps[currentMergeStep].right.map((num, i) => (
                                  <div key={i} className="w-8 h-8 bg-orange-100 border border-orange-300 rounded flex items-center justify-center text-xs">
                                    {num}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {mergeSortSteps[currentMergeStep].result && (
                            <div>
                              <span className="text-xs font-medium text-gray-600">Rezultat:</span>
                              <div className="flex gap-1 mt-1">
                                {mergeSortSteps[currentMergeStep].result.map((num, i) => (
                                  <div key={i} className="w-8 h-8 bg-purple-100 border border-purple-300 rounded flex items-center justify-center text-xs">
                                    {num}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-3 text-xs text-gray-600">
                          Depth: {mergeSortSteps[currentMergeStep].depth} | Comparări: {mergeComparisons}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">💻 Implementarea Merge Sort</h4>
                
                <Button
                  onClick={() => toggleCode('merge-sort')}
                  variant="outline"
                  className="mb-4"
                >
                  {visibleCode['merge-sort'] ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                  {visibleCode['merge-sort'] ? 'Ascunde' : 'Arată'} Codul
                </Button>
                
                {visibleCode['merge-sort'] && (
                  <div className="bg-gray-900 text-green-400 rounded-xl p-6 text-sm font-mono">
                    <pre>
{`def merge_sort(arr):
    # Base case: array cu 1 element e deja sortat
    if len(arr) <= 1:
        return arr
    
    # Divide: împarte array-ul în două părți
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # Conquer: sortează recursiv fiecare parte
    left_sorted = merge_sort(left)
    right_sorted = merge_sort(right)
    
    # Combine: îmbină cele două părți sortate
    return merge(left_sorted, right_sorted)

def merge(left, right):
    result = []
    left_idx = right_idx = 0
    
    # Compară elementele și adaugă pe cel mai mic
    while left_idx < len(left) and right_idx < len(right):
        if left[left_idx] <= right[right_idx]:
            result.append(left[left_idx])
            left_idx += 1
        else:
            result.append(right[right_idx])
            right_idx += 1
    
    # Adaugă elementele rămase
    result.extend(left[left_idx:])
    result.extend(right[right_idx:])
    
    return result

# Complexitate: O(n log n) - garantat!
# Space: O(n) - pentru array-urile temporare`}
                    </pre>
                  </div>
                )}
                
                <div className="mt-4 space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">🧠 De ce Merge Sort?</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Consistent O(n log n):</strong> Performanță garantată</li>
                      <li>• <strong>Stable:</strong> Păstrează ordinea elementelor egale</li>
                      <li>• <strong>Predictibil:</strong> Ideal pentru sistem critice</li>
                      <li>• <strong>Paralel:</strong> Se poate paraleliza ușor</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Trade-offs</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• <strong>Memorie extra:</strong> O(n) space complexity</li>
                      <li>• <strong>Overhead:</strong> Pentru array-uri mici</li>
                      <li>• <strong>Not in-place:</strong> Creează array-uri noi</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Memoization - Fibonacci */}
        {activeSection === 'memoization' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
              <Brain className="h-6 w-6" />
              Memoization - Fibonacci Optimization
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🔢 Comparație Fibonacci</h4>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calculează Fibonacci pentru n = {fibInput}
                    </label>
                    <input
                      type="range"
                      value={fibInput}
                      onChange={(e) => setFibInput(Number(e.target.value))}
                      min="1"
                      max="50"
                      className="w-full mb-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1</span>
                      <span>50</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => calculateFibonacci('naive')}
                      disabled={fibCalculating.naive || fibInput > 35}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {fibCalculating.naive ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Calculez...
                        </>
                      ) : (
                        'Naive O(2ⁿ)'
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => calculateFibonacci('memo')}
                      disabled={fibCalculating.memo}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {fibCalculating.memo ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Calculez...
                        </>
                      ) : (
                        'Memoized O(n)'
                      )}
                    </Button>
                  </div>
                  
                  {(fibResults.naive || fibResults.memo) && (
                    <div className="space-y-3">
                      {fibResults.naive && (
                        <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
                          <h5 className="font-semibold text-red-800">🐌 Fibonacci Naive</h5>
                          <p className="text-red-700">Rezultat: {fibResults.naive}</p>
                          <p className="text-sm text-red-600">Timp: {fibTimes.naive.toFixed(2)}ms</p>
                        </div>
                      )}
                      
                      {fibResults.memo && (
                        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                          <h5 className="font-semibold text-green-800">⚡ Fibonacci Memoized</h5>
                          <p className="text-green-700">Rezultat: {fibResults.memo}</p>
                          <p className="text-sm text-green-600">Timp: {fibTimes.memo.toFixed(2)}ms</p>
                          <p className="text-xs text-green-600">Cache entries: {Object.keys(fibMemoCache).length}</p>
                        </div>
                      )}
                      
                      {fibResults.naive && fibResults.memo && fibTimes.naive > 0 && (
                        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                          <h5 className="font-semibold text-blue-800">📊 Speedup</h5>
                          <p className="text-blue-700">
                            Memoization e <strong>{(fibTimes.naive / fibTimes.memo).toFixed(0)}x mai rapid</strong>!
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">💻 Implementări Fibonacci</h4>
                
                <div className="space-y-4">
                  <div>
                    <Button
                      onClick={() => toggleCode('fibonacci-naive')}
                      variant="outline"
                      className="mb-2"
                    >
                      {visibleCode['fibonacci-naive'] ? 'Ascunde' : 'Arată'} Fibonacci Naive
                    </Button>
                    
                    {visibleCode['fibonacci-naive'] && (
                      <div className="bg-gray-900 text-red-400 rounded-xl p-4 text-sm font-mono">
                        <pre>
{`# Fibonacci Naive - O(2^n) - FOARTE LENT!
def fibonacci_naive(n):
    if n <= 1:
        return n
    
    # Calculează din nou aceleași valori!
    return fibonacci_naive(n-1) + fibonacci_naive(n-2)

# Pentru n=30: ~1.000.000 de apeluri recursive!
# Pentru n=40: ~1.000.000.000 de apeluri!
# Crește exponențial - inutil pentru n > 35`}
                        </pre>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Button
                      onClick={() => toggleCode('fibonacci-memo')}
                      variant="outline"
                      className="mb-2"
                    >
                      {visibleCode['fibonacci-memo'] ? 'Ascunde' : 'Arată'} Fibonacci Memoized
                    </Button>
                    
                    {visibleCode['fibonacci-memo'] && (
                      <div className="bg-gray-900 text-green-400 rounded-xl p-4 text-sm font-mono">
                        <pre>
{`# Fibonacci Memoized - O(n) - RAPID!
def fibonacci_memo(n, memo={}):
    # Dacă deja am calculat, returnez din cache
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    # Calculez o singură dată și salvez în cache
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# Pentru orice n: doar n apeluri!
# Diferența: de la 2^n la n - incredibil!`}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">🎯 Principiul Memoization</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>Store results:</strong> Salvează răspunsurile calculate</li>
                      <li>• <strong>Check cache first:</strong> Verifică înainte să calculezi</li>
                      <li>• <strong>Avoid redundancy:</strong> Nu recalcula niciodată</li>
                      <li>• <strong>Trade memory for time:</strong> Folosești mai multă memorie pentru viteză</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">🌍 Aplicații Practice</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Web APIs:</strong> Cache răspunsuri scumpe</li>
                      <li>• <strong>Database queries:</strong> Evită query-uri repetitive</li>
                      <li>• <strong>Image processing:</strong> Cache transformări</li>
                      <li>• <strong>Machine Learning:</strong> Cache predicții</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Greedy Algorithm */}
        {activeSection === 'greedy' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-orange-600 mb-6 flex items-center gap-2">
              <Target className="h-6 w-6" />
              Greedy Algorithm - Activity Selection
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">📅 Planificare Optimă</h4>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Ai o zi plină cu activități. Algoritmul Greedy alege întotdeauna activitatea care se termină cel mai devreme și nu se suprapune cu cele deja selectate.
                  </p>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-700">🕐 Activități disponibile:</h5>
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedActivities.find(a => a.id === activity.id)
                            ? 'bg-green-100 border-green-500'
                            : greedyAnimation
                            ? 'bg-yellow-50 border-yellow-300 animate-pulse'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{activity.name}</div>
                            <div className="text-sm text-gray-600">
                              {activity.start}:00 - {activity.end}:00 | Valoare: {activity.value}
                            </div>
                          </div>
                          {selectedActivities.find(a => a.id === activity.id) && (
                            <span className="text-green-600 font-bold">✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={greedyActivitySelection}
                    disabled={greedyAnimation}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    {greedyAnimation ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Selecție în progres...
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Aplică Greedy Selection
                      </>
                    )}
                  </Button>
                  
                  {selectedActivities.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <h5 className="font-semibold text-green-800 mb-2">✅ Activități selectate:</h5>
                      <div className="space-y-1">
                        {selectedActivities.map((activity, index) => (
                          <div key={activity.id} className="text-sm text-green-700">
                            {index + 1}. {activity.name} ({activity.start}:00 - {activity.end}:00)
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-green-300">
                        <span className="font-medium text-green-800">
                          Total valoare: {selectedActivities.reduce((sum, a) => sum + a.value, 0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">💻 Greedy Algorithm</h4>
                
                <Button
                  onClick={() => toggleCode('greedy')}
                  variant="outline"
                  className="mb-4"
                >
                  {visibleCode['greedy'] ? 'Ascunde' : 'Arată'} Codul
                </Button>
                
                {visibleCode['greedy'] && (
                  <div className="bg-gray-900 text-orange-400 rounded-xl p-6 text-sm font-mono">
                    <pre>
{`def activity_selection(activities):
    """
    Greedy Activity Selection Problem
    Selectează numărul maxim de activități non-overlapping
    """
    # Sortează după timpul de sfârșit (greedy choice!)
    sorted_activities = sorted(activities, key=lambda x: x['end'])
    
    selected = []
    last_end_time = 0
    
    for activity in sorted_activities:
        # Dacă activitatea nu se suprapune cu ultima selectată
        if activity['start'] >= last_end_time:
            selected.append(activity)
            last_end_time = activity['end']
    
    return selected

# De ce funcționează?
# 1. Alegând mereu activitatea care se termină cel mai devreme
# 2. Lăsăm cât mai mult spațiu pentru activitățile următoare
# 3. Dovada matematică: această alegere e întotdeauna optimă!

# Complexitate: O(n log n) - din sortare
# Space: O(1) - în afara spațiului pentru rezultat`}
                    </pre>
                  </div>
                )}
                
                <div className="mt-4 space-y-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-semibold text-orange-800 mb-2">🎯 Principii Greedy</h5>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• <strong>Greedy Choice Property:</strong> Alegerea locală optimă duce la optimul global</li>
                      <li>• <strong>Optimal Substructure:</strong> Problema se descompune optim</li>
                      <li>• <strong>Never look back:</strong> Nu reconsideri deciziile</li>
                      <li>• <strong>Simple & fast:</strong> Adesea O(n log n) sau mai bun</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Limitări Greedy</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• <strong>Nu garantează optimul:</strong> Pentru multe probleme</li>
                      <li>• <strong>Knapsack problem:</strong> Greedy e suboptimal</li>
                      <li>• <strong>Shortest path:</strong> Dijkstra e greedy și optim</li>
                      <li>• <strong>Coin change:</strong> Depinde de valorile monedelor</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">🌍 Aplicații Practice</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>CPU Scheduling:</strong> Shortest Job First</li>
                      <li>• <strong>Huffman Coding:</strong> Compresie optimă</li>
                      <li>• <strong>Network routing:</strong> Dijkstra's algorithm</li>
                      <li>• <strong>Cache replacement:</strong> LRU policies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backtracking - N-Queens */}
        {activeSection === 'backtracking' && (
          <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
            <h3 className="text-2xl font-bold text-purple-600 mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Backtracking - N-Queens Problem
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">♛ Problema celor N Regine</h4>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Plasează {queensSize} regine pe o tablă de șah {queensSize}×{queensSize} astfel încât să nu se atace între ele 
                    (nici pe linie, coloană sau diagonală).
                  </p>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mărimea tablei: {queensSize}×{queensSize}
                    </label>
                    <input
                      type="range"
                      value={queensSize}
                      onChange={(e) => setQueensSize(Number(e.target.value))}
                      min="4"
                      max="8"
                      disabled={queensSolving}
                      className="w-full mb-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>4×4</span>
                      <span>8×8</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => solveNQueens(queensSize)}
                    disabled={queensSolving}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {queensSolving ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Rezolvare...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Rezolvă N-Queens
                      </>
                    )}
                  </Button>
                  
                  {queensBoard.length > 0 && (
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                        <h5 className="font-semibold text-purple-800 mb-3">♛ Soluția găsită:</h5>
                        <div className={`grid gap-1 mx-auto`} style={{ gridTemplateColumns: `repeat(${queensSize}, 1fr)`, maxWidth: '300px' }}>
                          {queensBoard.map((row, i) =>
                            row.map((cell, j) => (
                              <div
                                key={`${i}-${j}`}
                                className={`w-8 h-8 flex items-center justify-center text-lg font-bold border ${
                                  (i + j) % 2 === 0 
                                    ? 'bg-amber-100 border-amber-300' 
                                    : 'bg-amber-200 border-amber-400'
                                }`}
                              >
                                {cell === 1 ? '♛' : ''}
                              </div>
                            ))
                          )}
                        </div>
                        
                        <div className="mt-3 text-sm text-purple-700">
                          Soluții găsite: {queensSolutions.length} | Pași de verificare: {queensSteps}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">💻 Backtracking Implementation</h4>
                
                <Button
                  onClick={() => toggleCode('backtracking')}
                  variant="outline"
                  className="mb-4"
                >
                  {visibleCode['backtracking'] ? 'Ascunde' : 'Arată'} Codul
                </Button>
                
                {visibleCode['backtracking'] && (
                  <div className="bg-gray-900 text-purple-400 rounded-xl p-6 text-sm font-mono">
                    <pre>
{`def solve_n_queens(n):
    """
    Rezolvă problema N-Queens folosind backtracking
    """
    board = [[0 for _ in range(n)] for _ in range(n)]
    solutions = []
    
    def is_safe(board, row, col):
        # Verifică coloana
        for i in range(row):
            if board[i][col] == 1:
                return False
        
        # Verifică diagonala stânga-sus
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 1:
                return False
            i -= 1
            j -= 1
        
        # Verifică diagonala dreapta-sus
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 1:
                return False
            i -= 1
            j += 1
        
        return True
    
    def backtrack(board, row):
        # Caz de bază: toate reginele sunt plasate
        if row == n:
            solutions.append([row[:] for row in board])
            return True
        
        # Încearcă fiecare coloană din rândul curent
        for col in range(n):
            if is_safe(board, row, col):
                # Plasează regina
                board[row][col] = 1
                
                # Recursia: încearcă rândul următor
                if backtrack(board, row + 1):
                    return True
                
                # BACKTRACK: elimină regina și încearcă următoarea poziție
                board[row][col] = 0
        
        return False
    
    backtrack(board, 0)
    return solutions

# Complexitate: O(N!) în worst case
# Dar cu pruning inteligent, mult mai rapid în practică!`}
                    </pre>
                  </div>
                )}
                
                <div className="mt-4 space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-800 mb-2">🔄 Principii Backtracking</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <strong>Try:</strong> Încearcă o soluție parțială</li>
                      <li>• <strong>Check:</strong> Verifică dacă e validă</li>
                      <li>• <strong>Recurse:</strong> Continuă cu următorul pas</li>
                      <li>• <strong>Backtrack:</strong> Redu pasul și încearcă altceva</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-semibold text-orange-800 mb-2">⚡ Optimizări</h5>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• <strong>Pruning:</strong> Elimină ramurile imposibile devreme</li>
                      <li>• <strong>Constraint propagation:</strong> Dedu restricții</li>
                      <li>• <strong>Heuristics:</strong> Alege ordinea încercărilor inteligent</li>
                      <li>• <strong>Memoization:</strong> Cache stări intermediate</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">🌍 Aplicații Practice</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Sudoku solver:</strong> Constraint satisfaction</li>
                      <li>• <strong>Path finding:</strong> Maze și labirint</li>
                      <li>• <strong>Puzzle games:</strong> Word search, crosswords</li>
                      <li>• <strong>AI planning:</strong> Strategy games</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Final Performance Comparison */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h3 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Comparație Finală de Performanță
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-700">📊 Benchmark Results</h4>
              {performanceData.length > 0 && (
                <div className="space-y-3">
                  {performanceData.map((result, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold mb-2">{result.size.toLocaleString()} elements</h5>
                      <div className="space-y-2">
                        {result.bubble && (
                          <div className="flex justify-between">
                            <span className="text-red-600">Bubble Sort O(n²)</span>
                            <span className="font-mono text-sm">{result.bubble.toFixed(2)}ms</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-blue-600">Merge Sort O(n log n)</span>
                          <span className="font-mono text-sm">{result.merge.toFixed(2)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-600">Native Sort O(n log n)</span>
                          <span className="font-mono text-sm">{result.native.toFixed(2)}ms</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-700">🎯 Lecții Învățate</h4>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-xl">
                  <h5 className="font-bold text-purple-800 mb-2">🧠 Algorithmic Thinking</h5>
                  <p className="text-sm">Nu e despre memorarea algoritmilor, ci despre recunoașterea pattern-urilor și alegerea strategiei potrivite.</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl">
                  <h5 className="font-bold text-blue-800 mb-2">⚖️ Trade-offs Everywhere</h5>
                  <p className="text-sm">Fiecare algoritm are compromisuri: timp vs memorie, simplicitate vs performanță, optimalitate vs viteză.</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl">
                  <h5 className="font-bold text-green-800 mb-2">📈 Scalability Matters</h5>
                  <p className="text-sm">La scară mică diferențele sunt neglijabile. La scară mare, O(n²) vs O(n log n) înseamnă secunde vs ore.</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl">
                  <h5 className="font-bold text-orange-800 mb-2">🎨 Elegance in Simplicity</h5>
                  <p className="text-sm">Cei mai buni algoritmi sunt cei care rezolvă probleme complexe cu soluții elegante și ușor de înțeles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="artifact-card bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-8 md:p-12 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            🎓 Incepi sa Gândești ca un Arhitect
          </h2>
          
          <div className="text-lg leading-relaxed mb-8">
            <p className="mb-4">
              Felicitări! Acum nu doar <strong>știi algoritmi</strong> - gândești cu <strong>performanța în minte</strong>.
            </p>
            <p className="mb-4">
              <strong>Divide et Impera</strong> te învață să vezi problemele în bucăți.<br/>
              <strong>Memoization</strong> te învață să nu repeți inutil.<br/>
              <strong>Greedy</strong> îți arată că uneori soluția bună e cea mai rapidă.<br/>
              <strong>Backtracking</strong> te învață răbdarea și explorarea sistematică.
            </p>
            <p className="mb-6">
              <em>Aceasta este arta programării: un dans între logică, eficiență și creativitate.</em>
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">🎭 Masterclass completă:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2">
                <li>✅ <strong>Divide & Conquer</strong> - Merge Sort mastery</li>
                <li>✅ <strong>Memoization</strong> - De la O(2ⁿ) la O(n)</li>
                <li>✅ <strong>Greedy algorithms</strong> - Optimizări locale</li>
              </ul>
              <ul className="space-y-2">
                <li>✅ <strong>Backtracking</strong> - Explorare sistematică</li>
                <li>✅ <strong>Performance analysis</strong> - Benchmarking real</li>
                <li>✅ <strong>Trade-off thinking</strong> - Decizie algoritmică</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🧠 + ⚡ + 🎯 + 🔄 = 🏆</div>
            <p className="text-xl font-bold mb-4">
              Logică + Eficiență + Optimizare + Explorare = Maestria Algoritmică
            </p>
            <p className="text-sm opacity-90 mb-6">
              Drumul continuă spre: Algoritmi pe grafuri, Dynamic Programming avansat,<br/>
              Hashing și structuri eficiente, Analiza Big-O detaliată
            </p>
            
            <div className="bg-white/20 rounded-xl p-4">
              <p className="font-semibold text-lg">
                🚀 Ești pregătit pentru următoarea frontieră: <br/>
                <strong>Systeme distribuite și algoritmi la scară globală!</strong>
              </p>
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

export default AdvancedAlgorithmsArtifact;