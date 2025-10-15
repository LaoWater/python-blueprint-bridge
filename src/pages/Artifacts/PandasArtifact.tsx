import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, Database, FileSpreadsheet, Filter, BarChart3, Calendar, Target, Trash2, Download, Calculator, Copy, Code } from 'lucide-react';

const PandasArtifact = () => {
  const navigate = useNavigate();
  
  // Origin Story State
  const [storyStep, setStoryStep] = useState(-1);
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [showStoryDetails, setShowStoryDetails] = useState(false);
  const [storyChapter, setStoryChapter] = useState(0);
  
  // Data Chaos Demo State
  const [chaosData, setChaosData] = useState([
    { id: 1, nume: 'Alex', varsta: 28, salariu: null, oras: 'București' },
    { id: 2, nume: '', varsta: 34, salariu: 4500, oras: 'Cluj' },
    { id: 3, nume: 'Maria', varsta: null, salariu: 5200, oras: '' },
    { id: 4, nume: 'Ion', varsta: 45, salariu: 3800, oras: 'Timișoara' },
    { id: 5, nume: 'Ana', varsta: 29, salariu: 4200, oras: 'București' }
  ]);
  const [showCleanedData, setShowCleanedData] = useState(false);
  const [cleaningStep, setCleaningStep] = useState(0);
  
  // DataFrame Operations State
  const [selectedOperation, setSelectedOperation] = useState('filter');
  const [operationResult, setOperationResult] = useState('');
  const [isOperationRunning, setIsOperationRunning] = useState(false);
  
  // E-commerce Demo Data
  const [ecommerceData, setEcommerceData] = useState([
    { produs: 'Laptop', pret: 2500, cantitate: 2, data: '2024-01-15', oras: 'București' },
    { produs: 'Mouse', pret: 150, cantitate: 5, data: '2024-01-16', oras: 'Cluj' },
    { produs: 'Tastatură', pret: 200, cantitate: 3, data: '2024-01-17', oras: 'București' },
    { produs: 'Monitor', pret: 800, cantitate: 1, data: '2024-01-18', oras: 'Timișoara' },
    { produs: 'Laptop', pret: 2500, cantitate: 1, data: '2024-01-19', oras: 'Cluj' },
    { produs: 'Mouse', pret: 150, cantitate: 8, data: '2024-01-20', oras: 'București' }
  ]);
  
  // Time Series State
  const [timeSeriesData, setTimeSeriesData] = useState({
    'Ianuarie': { vanzari: 25000, comenzi: 120 },
    'Februarie': { vanzari: 28000, comenzi: 135 },
    'Martie': { vanzari: 32000, comenzi: 150 },
    'Aprilie': { vanzari: 29000, comenzi: 140 },
    'Mai': { vanzari: 35000, comenzi: 165 }
  });
  const [showTrendAnalysis, setShowTrendAnalysis] = useState(false);
  
  // Pivot Table State
  const [pivotResult, setPivotResult] = useState(null);
  const [showPivotTable, setShowPivotTable] = useState(false);
  
  // Data Pipeline State
  const [pipelineStep, setPipelineStep] = useState(0);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [processedData, setProcessedData] = useState(null);
  
  // Code Snippets State
  const [expandedCode, setExpandedCode] = useState({});
  const [copiedCode, setCopiedCode] = useState('');
  
  // Story progression
  const storyChapters = [
    {
      title: "🏢 Contextul: Wall Street 2008",
      content: "AQR Capital Management - unul dintre cei mai mari hedge funds din lume. Wes McKinney, 28 ani, matematician și programator, se confruntă zilnic cu volume uriașe de date financiare.",
      details: "Fiecare zi: 50+ fișiere Excel, milioane de tranzacții, sute de strategii quantitative care trebuie analizate în timp real."
    },
    {
      title: "💥 Criza: Limitele Excel",
      content: "Excel se prăbușește constant la peste 1 milion de rânduri. Calculele durează ore. Analizele complexe sunt imposibile.",
      details: "Un singur raport de risc lua 6 ore să fie generat. În timpul unei crize financiare, 6 ore înseamnă pierderi de milioane."
    },
    {
      title: "💡 Inspirația: R și SQL nu erau suficiente",
      content: "Wes cunoștea R pentru statistici și SQL pentru baze de date, dar avea nevoie de ceva care să combine puterea ambelor în Python.",
      details: "'Voiam să fac în Python ceea ce făceau R și SQL împreună, dar 100x mai rapid și mai elegant' - Wes McKinney"
    },
    {
      title: "🚀 Eureka: Panel Data Analysis",
      content: "Ianuarie 2008: Prima linie de cod Pandas. Un DataFrame care să trateze datele ca matrici multidimensionale, nu ca foi de calcul.",
      details: "Numele vine de la 'Panel Data' - un termen econometric pentru seturi de date cu multiple dimensiuni (timp, entități, variabile)."
    },
    {
      title: "🌟 Revoluția: De la ore la secunde",
      content: "Primul test: o analiză care lua 6 ore în Excel a fost redusă la 30 de secunde în Pandas. Echipa a rămas șocată.",
      details: "În 2009, Pandas devine open-source. Astăzi: peste 40 milioane de downloads pe lună, backbone-ul data science-ului mondial."
    }
  ];
  
  const storySteps = storyChapters.map(chapter => chapter.title);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const runOriginStory = () => {
    setIsStoryRunning(true);
    setStoryStep(0);
    setShowStoryDetails(true);
    setStoryChapter(0);
    
    const interval = setInterval(() => {
      setStoryChapter(prev => {
        const nextChapter = prev + 1;
        if (nextChapter >= storyChapters.length) {
          setIsStoryRunning(false);
          clearInterval(interval);
          return storyChapters.length - 1;
        }
        setStoryStep(nextChapter);
        return nextChapter;
      });
    }, 3000);
  };
  
  // Data cleaning simulation
  const runDataCleaning = () => {
    setShowCleanedData(false);
    setCleaningStep(0);
    
    const steps = [
      "Identific valorile lipsă (null)...",
      "Completez numele lipsă cu 'Necunoscut'...",
      "Înlocuiesc vârsta lipsă cu media: 34 ani...",
      "Completez orașul lipsă cu 'Bucuresti'...", 
      "Datele sunt curate și gata pentru analiză!"
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      setCleaningStep(currentStep);
      currentStep++;
      
      if (currentStep > steps.length) {
        setShowCleanedData(true);
        clearInterval(interval);
      }
    }, 1200);
  };
  
  // DataFrame operations
  const runDataFrameOperation = (operation: string) => {
    setSelectedOperation(operation);
    setIsOperationRunning(true);
    setOperationResult('');
    
    setTimeout(() => {
      let result = '';
      
      switch (operation) {
        case 'filter':
          const filtered = ecommerceData.filter(item => item.pret > 500);
          result = `Produse cu preț > 500 lei:\n${filtered.map(item => `${item.produs}: ${item.pret} lei`).join('\n')}`;
          break;
        case 'group':
          const grouped = ecommerceData.reduce((acc, item) => {
            if (!acc[item.oras]) acc[item.oras] = 0;
            acc[item.oras] += item.pret * item.cantitate;
            return acc;
          }, {} as Record<string, number>);
          result = `Vânzări pe orașe:\n${Object.entries(grouped).map(([oras, total]) => `${oras}: ${total} lei`).join('\n')}`;
          break;
        case 'stats':
          const totalVanzari = ecommerceData.reduce((sum, item) => sum + (item.pret * item.cantitate), 0);
          const avgPrice = ecommerceData.reduce((sum, item) => sum + item.pret, 0) / ecommerceData.length;
          result = `Statistici:\nTotal vânzări: ${totalVanzari} lei\nPreț mediu: ${Math.round(avgPrice)} lei\nNumărul comenzilor: ${ecommerceData.length}`;
          break;
        case 'sort':
          const sorted = [...ecommerceData].sort((a, b) => (b.pret * b.cantitate) - (a.pret * a.cantitate));
          result = `Top comenzi după valoare:\n${sorted.slice(0, 3).map(item => `${item.produs}: ${item.pret * item.cantitate} lei`).join('\n')}`;
          break;
      }
      
      setOperationResult(result);
      setIsOperationRunning(false);
    }, 1500);
  };
  
  // Pivot table generation
  const generatePivotTable = () => {
    setShowPivotTable(false);
    
    setTimeout(() => {
      // Simulate pivot table creation: Oras x Produs
      const pivot = ecommerceData.reduce((acc, item) => {
        if (!acc[item.oras]) acc[item.oras] = {};
        if (!acc[item.oras][item.produs]) acc[item.oras][item.produs] = 0;
        acc[item.oras][item.produs] += item.pret * item.cantitate;
        return acc;
      }, {} as Record<string, Record<string, number>>);
      
      setPivotResult(pivot);
      setShowPivotTable(true);
    }, 1000);
  };
  
  // Time series analysis
  const runTimeSeriesAnalysis = () => {
    setShowTrendAnalysis(false);
    
    setTimeout(() => {
      setShowTrendAnalysis(true);
    }, 800);
  };
  
  // Data pipeline simulation
  const runDataPipeline = () => {
    setPipelineRunning(true);
    setPipelineStep(0);
    setProcessedData(null);
    
    const pipelineSteps = [
      "📄 Citesc fișierul CSV...",
      "🧹 Curăț datele lipsă...",
      "🔢 Convertesc tipurile de date...",
      "📊 Calculez statistici...",
      "💾 Export rezultate în Excel...",
      "✅ Pipeline complet!"
    ];
    
    const interval = setInterval(() => {
      setPipelineStep(prev => {
        const nextStep = prev + 1;
        if (nextStep >= pipelineSteps.length) {
          setPipelineRunning(false);
          setProcessedData({
            rowsProcessed: 1247,
            missingDataFilled: 23,
            duplicatesRemoved: 8,
            finalRows: 1216
          });
          clearInterval(interval);
          return pipelineSteps.length - 1;
        }
        return nextStep;
      });
    }, 1200);
  };
  
  // Code snippet functionality
  const toggleCodeExpansion = (codeId: string) => {
    setExpandedCode(prev => ({
      ...prev,
      [codeId]: !prev[codeId]
    }));
  };
  
  const copyToClipboard = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };
  
  // CodeSnippet component
  const CodeSnippet = ({ code, title, codeId }: { code: string; title: string; codeId: string }) => (
    <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div 
        className="bg-gray-100 dark:bg-gray-800 px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
        onClick={() => toggleCodeExpansion(codeId)}
      >
        <div className="flex items-center gap-2">
          <Code size={16} className="text-blue-600" />
          <span className="font-semibold text-sm text-gray-800 dark:text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {expandedCode[codeId] ? 'Ascunde codul' : 'Vezi codul'}
          </span>
          <div className={`transform transition-transform ${expandedCode[codeId] ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </div>
      {expandedCode[codeId] && (
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
            <code>{code}</code>
          </pre>
          <Button
            onClick={() => copyToClipboard(code, codeId)}
            className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white"
            size="sm"
          >
            {copiedCode === codeId ? '✓' : <Copy size={14} />}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/data-calculus')}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Data: Calculus
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Sesiunile 16-17: Pandas
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              De la haosul datelor brute la insight-uri curate
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Database className="text-blue-500" size={24} />
            <FileSpreadsheet className="text-green-500" size={24} />
            <BarChart3 className="text-purple-500" size={24} />
          </div>
        </div>

        {/* Origin Story Section */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-blue-900 dark:to-indigo-900 rounded-xl shadow-2xl p-8 mb-8 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Target className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                🏦 Povestea Pandas: Când Excel nu mai ajungea
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">O poveste adevărată de inovație născută din desperare</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">2008</span>
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-white">Criza care a schimbat totul</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                    <strong>Wes McKinney, 28 ani</strong>, matematician și programator la <span className="text-blue-600 font-semibold">AQR Capital Management</span> 
                    (unul dintre cei mai mari hedge funds din lume) se confruntă cu o problemă aparent banală: 
                    <span className="text-red-600 font-semibold"> cum să analizezi milioane de tranzacții financiare zilnic?</span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-500 text-lg">💥</span>
                    <span className="text-red-700 dark:text-red-300 font-bold text-sm">Realitatea brutală cu Excel</span>
                  </div>
                  <p className="text-red-700 dark:text-red-300 text-xs leading-relaxed">
                    • Limitare la ~1M rânduri (crash constant)<br/>
                    • Un raport de risc: 6 ore să fie generat<br/>
                    • În timpul unei crize financiare, 6 ore = pierderi de milioane $
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-500 text-lg">🚀</span>
                    <span className="text-green-700 dark:text-green-300 font-bold text-sm">Visionul Pandas</span>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-xs leading-relaxed">
                    • Milioane de rânduri procesate în secunde<br/>
                    • Același raport: de la 6 ore la 30 secunde<br/>
                    • Operații complexe simplificate într-o singură linie
                  </p>
                </div>
              </div>
              
              <Button
                onClick={runOriginStory}
                disabled={isStoryRunning}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  {isStoryRunning ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Povestea se desfășoară...</span>
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      <span>🎭 Descoperă povestea completă</span>
                      <span className="text-sm opacity-75">(5 capitole interactive)</span>
                    </>
                  )}
                </div>
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📖</span>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Capitolele Revoluției</h3>
              </div>
              
              {!showStoryDetails ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4 opacity-30">🎭</div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                    Apasă butonul de mai jos pentru a descoperi<br/>
                    povestea fascinantă a nașterii Pandas...
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {storyChapters.map((chapter, index) => (
                    <div
                      key={index}
                      className={`rounded-lg transition-all duration-700 overflow-hidden ${
                        index <= storyChapter
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700 opacity-50'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index <= storyChapter
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          <span className={`font-bold text-sm ${
                            index <= storyChapter
                              ? 'text-blue-700 dark:text-blue-300'
                              : 'text-gray-500'
                          }`}>
                            {chapter.title}
                          </span>
                        </div>
                        
                        {index <= storyChapter && (
                          <div className="animate-fadeIn">
                            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                              {chapter.content}
                            </p>
                            <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border-l-2 border-blue-400">
                              💡 {chapter.details}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Chaos to Clean Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="text-orange-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🗂️ De la Haos la Ordine: Data Cleaning
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📊 Date brute (cu probleme)</h3>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-red-600 dark:text-red-400">
                      <th className="text-left p-2">ID</th>
                      <th className="text-left p-2">Nume</th>
                      <th className="text-left p-2">Vârstă</th>
                      <th className="text-left p-2">Salariu</th>
                      <th className="text-left p-2">Oraș</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chaosData.map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{row.id}</td>
                        <td className="p-2 text-red-600">{row.nume || '❌ lipsă'}</td>
                        <td className="p-2 text-red-600">{row.varsta || '❌ null'}</td>
                        <td className="p-2 text-red-600">{row.salariu || '❌ null'}</td>
                        <td className="p-2 text-red-600">{row.oras || '❌ lipsă'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <Button
                onClick={runDataCleaning}
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3"
              >
                <Target size={20} className="mr-2" />
                Curăță datele cu Pandas
              </Button>
              
              {cleaningStep > 0 && (
                <div className="mt-4 space-y-2">
                  {Array.from({ length: Math.min(cleaningStep + 1, 5) }, (_, i) => (
                    <div key={i} className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-blue-800 dark:text-blue-200 text-sm">
                      {i === 0 && "🔍 Identific valorile lipsă (null)..."}
                      {i === 1 && "📝 Completez numele lipsă cu 'Necunoscut'..."}
                      {i === 2 && "📊 Înlocuiesc vârsta lipsă cu media: 34 ani..."}
                      {i === 3 && "🏙️ Completez orașul lipsă cu 'București'..."}
                      {i === 4 && "✅ Datele sunt curate și gata pentru analiză!"}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">✨ Date curate</h3>
              {showCleanedData && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-green-600 dark:text-green-400">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Nume</th>
                        <th className="text-left p-2">Vârstă</th>
                        <th className="text-left p-2">Salariu</th>
                        <th className="text-left p-2">Oraș</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">1</td>
                        <td className="p-2">Alex</td>
                        <td className="p-2">28</td>
                        <td className="p-2">4000</td>
                        <td className="p-2">București</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">2</td>
                        <td className="p-2 text-green-600">Necunoscut</td>
                        <td className="p-2">34</td>
                        <td className="p-2">4500</td>
                        <td className="p-2">Cluj</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">3</td>
                        <td className="p-2">Maria</td>
                        <td className="p-2 text-green-600">34</td>
                        <td className="p-2">5200</td>
                        <td className="p-2 text-green-600">București</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">4</td>
                        <td className="p-2">Ion</td>
                        <td className="p-2">45</td>
                        <td className="p-2">3800</td>
                        <td className="p-2">Timișoara</td>
                      </tr>
                      <tr>
                        <td className="p-2">5</td>
                        <td className="p-2">Ana</td>
                        <td className="p-2">29</td>
                        <td className="p-2">4200</td>
                        <td className="p-2">București</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              <CodeSnippet 
                codeId="data-cleaning"
                title="🐼 Cod complet pentru curățarea datelor"
                code={`import pandas as pd
import numpy as np

# Creăm DataFrame-ul cu date problematice
data = {
    'id': [1, 2, 3, 4, 5],
    'nume': ['Alex', None, 'Maria', 'Ion', 'Ana'],
    'varsta': [28, 34, None, 45, 29],
    'salariu': [None, 4500, 5200, 3800, 4200],
    'oras': ['București', 'Cluj', '', 'Timișoara', 'București']
}
df = pd.DataFrame(data)

print("Date brute:")
print(df)
print("\\n" + "="*50 + "\\n")

# Pasul 1: Identificăm valorile lipsă
print("Valorile lipsă pe coloane:")
print(df.isnull().sum())
print()

# Pasul 2: Curățăm datele
# Completăm numele lipsă
df['nume'].fillna('Necunoscut', inplace=True)

# Completăm vârsta cu media
varsta_medie = df['varsta'].mean()
df['varsta'].fillna(varsta_medie, inplace=True)

# Completăm salariul cu media
salariu_mediu = df['salariu'].mean()
df['salariu'].fillna(salariu_mediu, inplace=True)

# Completăm orașul lipsă
df['oras'].replace('', 'București', inplace=True)

print("Date curate:")
print(df)
print("\\nGata! Datele sunt curate și ready pentru analiză! 🎉")`}
              />
            </div>
          </div>
        </div>

        {/* DataFrame Operations Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="text-purple-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🛍️ E-commerce în acțiune: Operații DataFrame
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📦 Date comenzi e-commerce</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-gray-600 dark:text-gray-400">
                      <th className="text-left p-2">Produs</th>
                      <th className="text-left p-2">Preț</th>
                      <th className="text-left p-2">Cantitate</th>
                      <th className="text-left p-2">Oraș</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ecommerceData.slice(0, 4).map((order, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{order.produs}</td>
                        <td className="p-2">{order.pret} lei</td>
                        <td className="p-2">{order.cantitate}</td>
                        <td className="p-2">{order.oras}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => runDataFrameOperation('filter')}
                  disabled={isOperationRunning}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Filter size={16} className="mr-2" />
                  Filtrare
                </Button>
                <Button
                  onClick={() => runDataFrameOperation('group')}
                  disabled={isOperationRunning}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <BarChart3 size={16} className="mr-2" />
                  Grupare
                </Button>
                <Button
                  onClick={() => runDataFrameOperation('stats')}
                  disabled={isOperationRunning}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Calculator size={16} className="mr-2" />
                  Statistici
                </Button>
                <Button
                  onClick={() => runDataFrameOperation('sort')}
                  disabled={isOperationRunning}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Download size={16} className="mr-2" />
                  Sortare
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📊 Rezultate analiză</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
                {isOperationRunning ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">Procesez datele...</span>
                  </div>
                ) : operationResult ? (
                  <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {operationResult}
                  </pre>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 text-center h-full flex items-center justify-center">
                    Alege o operație pentru a vedea rezultatele
                  </div>
                )}
              </div>
              
              <CodeSnippet 
                codeId="ecommerce-analysis"
                title="🛍️ Analiza completă e-commerce cu Pandas"
                code={`import pandas as pd

# Creăm DataFrame-ul cu comenzi e-commerce
comenzi_data = {
    'produs': ['Laptop', 'Mouse', 'Tastatură', 'Monitor', 'Laptop', 'Mouse'],
    'pret': [2500, 150, 200, 800, 2500, 150],
    'cantitate': [2, 5, 3, 1, 1, 8],
    'data': ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19', '2024-01-20'],
    'oras': ['București', 'Cluj', 'București', 'Timișoara', 'Cluj', 'București']
}

df = pd.DataFrame(comenzi_data)
df['data'] = pd.to_datetime(df['data'])  # Convertim în datetime
df['valoare_totala'] = df['pret'] * df['cantitate']  # Calculăm valoarea

print("DataFrame-ul nostru e-commerce:")
print(df)
print("\\n" + "="*60 + "\\n")

# 1. FILTRARE - Produse scumpe (> 500 lei)
print("1. FILTRARE - Produse cu preț > 500 lei:")
produse_scumpe = df[df['pret'] > 500]
print(produse_scumpe[['produs', 'pret', 'oras']])
print()

# 2. GRUPARE - Vânzări pe orașe
print("2. GRUPARE - Total vânzări pe orașe:")
vanzari_oras = df.groupby('oras')['valoare_totala'].sum().sort_values(ascending=False)
print(vanzari_oras)
print()

# 3. STATISTICI - Descrierea datelor
print("3. STATISTICI - Analiza prețurilor:")
print(df['pret'].describe())
print()

# 4. SORTARE - Top comenzi după valoare
print("4. SORTARE - Top 3 comenzi după valoare:")
top_comenzi = df.nlargest(3, 'valoare_totala')
print(top_comenzi[['produs', 'valoare_totala', 'oras']])
print()

# BONUS: Analiza avansată
print("BONUS - Câte produse diferite pe oraș:")
print(df.groupby('oras')['produs'].nunique())

print("\\n🎉 Gata! Ai învățat să analizezi date e-commerce ca un PRO!")`}
              />
            </div>
          </div>
        </div>

        {/* Time Series Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-green-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              📈 Time Series: Când datele au ritm
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📅 Vânzări pe luni</h3>
              <div className="space-y-3">
                {Object.entries(timeSeriesData).map(([luna, data]) => (
                  <div key={luna} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800 dark:text-white">{luna}</span>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{data.vanzari.toLocaleString()} lei</div>
                        <div className="text-sm text-gray-500">{data.comenzi} comenzi</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={runTimeSeriesAnalysis}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3"
              >
                <Calendar size={20} className="mr-2" />
                Analizează trendurile
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📊 Analiza trendurilor</h3>
              {showTrendAnalysis && (
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">📈 Trend crescător</h4>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Vânzările au crescut cu 40% din ianuarie în mai (25.000 → 35.000 lei)
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">🎯 Pattern sezonier</h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      Mai este luna de vârf (165 comenzi), aprilie cel mai slab (140 comenzi)
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">💡 Insight</h4>
                    <p className="text-purple-700 dark:text-purple-300 text-sm">
                      Valoarea medie per comandă: 211 lei în ianuarie → 212 lei în mai (stabil)
                    </p>
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-lg mt-4">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">🐼 Time Series cu Pandas:</h4>
                <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">pd.date_range('2024-01-01', periods=5, freq='M')</code><br/>
                  <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">df.set_index('data').resample('M').sum()</code><br/>
                  <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">df.rolling(window=3).mean()</code> - media mobilă
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pivot Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-indigo-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🎯 Pivot Tables: Din haos la rapoarte
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Problema reală:</strong> Managerul vrea să vadă vânzările pe orașe și produse. 
                În loc să calculezi manual, folosești o pivot table.
              </p>
              
              <Button
                onClick={generatePivotTable}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3"
              >
                <BarChart3 size={20} className="mr-2" />
                Generează Pivot Table
              </Button>
              
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg mt-4">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">🐼 Pandas Pivot:</h4>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded block mb-2">
                    df.pivot_table(<br/>
                    &nbsp;&nbsp;values='pret',<br/>
                    &nbsp;&nbsp;index='oras',<br/>
                    &nbsp;&nbsp;columns='produs',<br/>
                    &nbsp;&nbsp;aggfunc='sum'<br/>
                    )
                  </code>
                </div>
              </div>
            </div>
            
            <div>
              {showPivotTable && pivotResult && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📊 Vânzări: Oraș × Produs</h3>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-indigo-600 dark:text-indigo-400">
                          <th className="text-left p-2">Oraș</th>
                          <th className="text-right p-2">Laptop</th>
                          <th className="text-right p-2">Monitor</th>
                          <th className="text-right p-2">Mouse</th>
                          <th className="text-right p-2">Tastatură</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(pivotResult).map(([oras, produse]) => (
                          <tr key={oras} className="border-b">
                            <td className="p-2 font-semibold">{oras}</td>
                            <td className="p-2 text-right">{(produse as any).Laptop || '-'}</td>
                            <td className="p-2 text-right">{(produse as any).Monitor || '-'}</td>
                            <td className="p-2 text-right">{(produse as any).Mouse || '-'}</td>
                            <td className="p-2 text-right">{(produse as any).Tastatură || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-4">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">💡 Insight-uri instant:</h4>
                    <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                      <li>• București domină vânzările de Mouse-uri și Tastaturi</li>
                      <li>• Cluj este pe locul 2 la Laptop-uri</li>
                      <li>• Timișoara are cel mai mare Monitor vândut</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Pipeline Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-teal-200 dark:border-teal-700">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-teal-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🔄 Pipeline-uri de procesare: Tunelul de curățare
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Scenariul real:</strong> Primești săptămânal un CSV cu mii de tranzacții. 
                În loc să faci manual aceleași pași, creezi un pipeline automat.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">📝 Funcția ta de curățare:</h4>
                <code className="text-sm text-gray-700 dark:text-gray-300 block whitespace-pre">
{`def curata_datele(df):
    # 1. Elimină duplicatele
    df = df.drop_duplicates()
    
    # 2. Completează valorile lipsă
    df['nume'].fillna('Necunoscut', inplace=True)
    df['pret'].fillna(df['pret'].mean(), inplace=True)
    
    # 3. Convertește tipurile
    df['data'] = pd.to_datetime(df['data'])
    
    # 4. Returnează DataFrame curat
    return df`}
                </code>
              </div>
              
              <Button
                onClick={runDataPipeline}
                disabled={pipelineRunning}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3"
              >
                {pipelineRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Rulează Pipeline...
                  </>
                ) : (
                  <>
                    <Play size={20} className="mr-2" />
                    Rulează Pipeline Complet
                  </>
                )}
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">🔄 Progres pipeline</h3>
              <div className="space-y-3">
                {pipelineRunning && (
                  <div className="space-y-2">
                    {["📄 Citesc fișierul CSV...", "🧹 Curăț datele lipsă...", "🔢 Convertesc tipurile de date...", "📊 Calculez statistici...", "💾 Export rezultate în Excel...", "✅ Pipeline complet!"].map((step, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg transition-all duration-500 ${
                          index <= pipelineStep
                            ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 border border-teal-300'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-500'
                        }`}
                      >
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {processedData && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">📈 Rezultate procesare:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{processedData.rowsProcessed}</div>
                        <div className="text-gray-600 dark:text-gray-400">Rânduri procesate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{processedData.missingDataFilled}</div>
                        <div className="text-gray-600 dark:text-gray-400">Valori completate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{processedData.duplicatesRemoved}</div>
                        <div className="text-gray-600 dark:text-gray-400">Duplicate eliminate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{processedData.finalRows}</div>
                        <div className="text-gray-600 dark:text-gray-400">Rânduri finale</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Epic Final Summary */}
        <div className="relative overflow-hidden">
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 via-blue-900 to-cyan-900"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/20 to-purple-500/20 animate-pulse"></div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
          
          <div className="relative z-10 p-12 text-white">
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="text-8xl mb-4 animate-bounce">🐼</div>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                De la Haos la Magia Datelor
              </h2>
              
              <p className="text-2xl text-blue-100 mb-4 max-w-4xl mx-auto leading-relaxed">
                Tocmai ai parcurs o călătorie extraordinară prin universul Pandas
              </p>
              
              <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
                De la povestea lui Wes McKinney în 2008, până la pipelines complexe de date - 
                ai descoperit cum să transformi haosul în insight-uri valoroase
              </p>
            </div>

            {/* Achievement Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4 animate-pulse">🏗️</div>
                <h3 className="text-xl font-bold mb-3">Arhitectul Datelor</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Stăpânești DataFrames și Series ca un adevărat meșter al structurilor de date
                </p>
                <div className="mt-3 flex items-center text-xs text-cyan-300">
                  <span className="mr-2">💪</span>
                  <span>Nivel: Expert</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4 animate-pulse">⚡</div>
                <h3 className="text-xl font-bold mb-3">Vrăjitorul Vitezei</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Procesezi milioane de rânduri în secunde cu operații vectorizate
                </p>
                <div className="mt-3 flex items-center text-xs text-cyan-300">
                  <span className="mr-2">🚀</span>
                  <span>De la 6 ore la 30 secunde</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4 animate-pulse">🎯</div>
                <h3 className="text-xl font-bold mb-3">Detectivul Insight-urilor</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Transformi CSV-uri brute în rapoarte executive cu câteva linii magice
                </p>
                <div className="mt-3 flex items-center text-xs text-cyan-300">
                  <span className="mr-2">🔍</span>
                  <span>Patterns ascunse dezvăluite</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4 animate-pulse">🧹</div>
                <h3 className="text-xl font-bold mb-3">Maestrul Curățeniei</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Îmblânzești datele dezordonate și le dai sens cu pipeline-uri elegante
                </p>
                <div className="mt-3 flex items-center text-xs text-cyan-300">
                  <span className="mr-2">✨</span>
                  <span>Din haos în ordine</span>
                </div>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-center">🗺️ Călătoria ta prin Pandas</h3>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <p className="text-sm text-blue-200">Povestea originii</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce" style={{animationDelay: '0.2s'}}>
                    <span className="text-white font-bold">2</span>
                  </div>
                  <p className="text-sm text-blue-200">Curățare date</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce" style={{animationDelay: '0.4s'}}>
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p className="text-sm text-blue-200">Operații magice</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce" style={{animationDelay: '0.6s'}}>
                    <span className="text-white font-bold">4</span>
                  </div>
                  <p className="text-sm text-blue-200">Analize avansate</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce" style={{animationDelay: '0.8s'}}>
                    <span className="text-white font-bold">5</span>
                  </div>
                  <p className="text-sm text-blue-200">Pipeline-uri</p>
                </div>
              </div>
            </div>

            {/* Next Adventure */}
            <div className="bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-orange-600/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">🎨</div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Următoarea Aventură: Data Visualizing
                </h3>
                <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                  Datele tale curate cu Pandas sunt gata să prindă viață prin vizualizări spectaculoase!
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-3xl mb-2">📈</div>
                    <h4 className="font-bold mb-2">Matplotlib</h4>
                    <p className="text-sm text-blue-200">Grafice profesionale și customizabile</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-3xl mb-2">🎯</div>
                    <h4 className="font-bold mb-2">Seaborn</h4>
                    <p className="text-sm text-blue-200">Statistici vizuale elegante</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-3xl mb-2">⚡</div>
                    <h4 className="font-bold mb-2">Streamlit</h4>
                    <p className="text-sm text-blue-200">Dashboard-uri interactive în timp real</p>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-6 max-w-2xl mx-auto">
                  <p className="text-blue-100 text-lg font-semibold mb-2">
                    🌟 "Datele spun povești, vizualizările le dau viață!"
                  </p>
                  <p className="text-blue-200 text-sm">
                    Cu Pandas ai pregătit scena, acum să pictezi tablouri de date care vor uimi lumea!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PandasArtifact;