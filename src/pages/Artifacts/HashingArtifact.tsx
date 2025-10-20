import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Hash, Users, Search, FileText, BarChart3, Clock, Zap, Shield, Database, CheckCircle, ArrowLeft } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';

const HashingArtifact = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('overview');
  const [animationStep, setAnimationStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [hashResults, setHashResults] = useState([]);
  const [duplicateEmails, setDuplicateEmails] = useState([]);
  const [wordsAnalysis, setWordsAnalysis] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  // Library Story Animation
  const libraryBooks = ['Python Basics', 'Data Science', 'Machine Learning', 'Web Development', 'Algorithms'];
  
  // Email duplicate detection
  const sampleEmails = [
    'john@example.com', 'mary@company.org', 'admin@site.com', 'john@example.com',
    'support@service.net', 'mary@company.org', 'info@business.co', 'contact@firm.net'
  ];

  // Hash function simulation
  const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % 1000; // Keep it reasonable for display
  };

  // Dictionary operations
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Popescu',
    email: 'alex@example.com',
    age: 28,
    city: 'București',
    job: 'Software Developer'
  });

  // Set operations
  const [guestLists, setGuestLists] = useState({
    wedding: new Set(['Ana', 'Bogdan', 'Cristina', 'David']),
    birthday: new Set(['Ana', 'Elena', 'Florin', 'David']),
    corporate: new Set(['Bogdan', 'Elena', 'George', 'Ioana'])
  });

  // Hash collision demonstration
  const [collisionDemo, setCollisionDemo] = useState([]);

  // File hashing simulation
  const [files, setFiles] = useState([
    { name: 'Report_2024_Q1.pdf', content: 'Financial report for Q1 2024 showing 15% growth...', hash: null },
    { name: 'Budget_Analysis.pdf', content: 'Budget analysis document for fiscal year 2024...', hash: null },
    { name: 'Report_2024_Q1_Copy.pdf', content: 'Financial report for Q1 2024 showing 15% growth...', hash: null },
    { name: 'Marketing_Strategy.pdf', content: 'Marketing strategy document for product launch...', hash: null }
  ]);

  const performSearch = (searchType, query) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (searchType === 'hash') {
        const hash = simpleHash(query);
        setHashResults(prev => [...prev, { input: query, hash: hash, timestamp: Date.now() }]);
      }
      setIsAnimating(false);
    }, 800);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const detectDuplicates = () => {
    setIsAnimating(true);
    const seen = new Set();
    const duplicates = [];
    
    sampleEmails.forEach((email, index) => {
      setTimeout(() => {
        if (seen.has(email)) {
          duplicates.push(email);
        }
        seen.add(email);
        
        if (index === sampleEmails.length - 1) {
          setDuplicateEmails([...new Set(duplicates)]);
          setIsAnimating(false);
        }
      }, index * 200);
    });
  };

  const analyzeText = () => {
    const sampleText = "Python este un limbaj de programare. Python este folosit în machine learning. Machine learning folosește algoritmi. Algoritmi sunt folosiți în Python pentru machine learning.";
    const words = sampleText.toLowerCase().split(/\s+/);
    const wordCount = {};
    
    words.forEach(word => {
      const cleanWord = word.replace(/[.,]/g, '');
      wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
    });
    
    setWordsAnalysis(wordCount);
  };

  const hashFiles = () => {
    const updatedFiles = files.map(file => ({
      ...file,
      hash: simpleHash(file.content)
    }));
    setFiles(updatedFiles);
  };

  const simulateCollisions = () => {
    const testStrings = ['abc', 'bca', 'cab', 'hello', 'world'];
    const results = testStrings.map(str => ({
      string: str,
      hash: simpleHash(str) % 10, // Force small range for collisions
      bucket: simpleHash(str) % 10
    }));
    setCollisionDemo(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hash className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sesiunea 11: Tehnici de Hashing și Structuri Optimizate
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Descoperă puterea hashing-ului - de la biblioteca infinită la scalabilitatea Google. 
            Învață cum să transformi căutări lente în acces instant O(1).
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'overview', label: 'Povestea Hashing-ului', icon: Hash },
            { id: 'dictionaries', label: 'Dicționare Python', icon: Database },
            { id: 'sets', label: 'Seturi și Operații', icon: Users },
            { id: 'collisions', label: 'Hash și Coliziuni', icon: AlertCircle },
            { id: 'duplicates', label: 'Detectare Duplicate', icon: Search },
            { id: 'optimized', label: 'Structuri Optimizate', icon: Zap },
            { id: 'realworld', label: 'Aplicații Reale', icon: FileText }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={currentSection === id ? 'default' : 'outline'}
              onClick={() => setCurrentSection(id)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          
          {/* Overview Section */}
          {currentSection === 'overview' && (
            <div className="space-y-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Hash className="w-6 h-6 text-blue-600" />
                    <CardTitle className="text-2xl">Povestea Bibliotecii Infinite</CardTitle>
                  </div>
                  <CardDescription>
                    Imaginează-ți că lucrezi la cea mai mare bibliotecă din lume...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-blue-800">🏛️ Problema: Biblioteca Haotică</h3>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-red-500" />
                            <span>Căutare liniară: 30 minute pentru o carte</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span>10 milioane de cărți, toate amestecate</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-red-500" />
                            <span>1000 de oameni așteptând zilnic</span>
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-green-800">⚡ Soluția: Hashing Magic</h3>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-green-500" />
                            <span>Acces instant: 1 secundă pentru orice carte</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-500" />
                            <span>Fiecare carte are o "adresă magică"</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Scalabilitate: 1M sau 1B cărți, aceeași viteză</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Search className="w-5 h-5 text-purple-600" />
                          Căutări Rapide
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Google procesează 8.5 miliarde căutări zilnic folosind hashing pentru indexare.</p>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Database className="w-5 h-5 text-green-600" />
                          Baze de Date
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Facebook și Instagram folosesc hash tables pentru profilurile a miliarde de utilizatori.</p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="w-5 h-5 text-orange-600" />
                          Securitate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Parolele sunt stocate ca hash-uri SHA256 pentru securitate maximă.</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border-orange-400">
                    <h4 className="font-bold text-orange-800 mb-2">💡 Big O Magic</h4>
                    <p className="text-orange-700">
                      <strong>Căutare liniară:</strong> O(n) - cu cât ai mai multe date, cu atât aștepți mai mult<br/>
                      <strong>Hashing perfect:</strong> O(1) - același timp indiferent de cantitatea de date!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Dictionaries Section */}
          {currentSection === 'dictionaries' && (
            <div className="space-y-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Database className="w-6 h-6 text-blue-600" />
                    <CardTitle className="text-2xl">Dicționare Python - Structura Regină</CardTitle>
                  </div>
                  <CardDescription>
                    Cum funcționează dicționarele în spate și de ce sunt atât de puternice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-blue-800">👤 Profil de Utilizator Interactiv</h3>
                      <div className="space-y-3">
                        {Object.entries(userProfile).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <span className="font-medium text-blue-700 capitalize">{key}:</span>
                            <Input
                              value={value}
                              onChange={(e) => setUserProfile(prev => ({
                                ...prev,
                                [key]: e.target.value
                              }))}
                              className="w-40 text-right"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-2">⚡ Operații O(1)</h4>
                        <div className="space-y-1 text-sm text-green-700">
                          <p>• <code>profile["email"]</code> - Acces instant</p>
                          <p>• <code>profile["email"] = "nou@email.com"</code> - Modificare instant</p>
                          <p>• <code>"age" in profile</code> - Verificare instant</p>
                          <p>• <code>del profile["age"]</code> - Ștergere instant</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4 text-purple-800">🏪 Aplicații în Viața Reală</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <h4 className="font-bold text-purple-700">E-commerce: Coș de cumpărături</h4>
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                            <CodeBlockR language="python">{`cart = {
    "laptop": {"price": 2500, "qty": 1},
    "mouse": {"price": 50, "qty": 2},
    "keyboard": {"price": 150, "qty": 1}
}`}</CodeBlockR>
                          </div>
                        </div>

                        <div className="p-3 bg-indigo-50 rounded-lg">
                          <h4 className="font-bold text-indigo-700">Gaming: Statistici jucător</h4>
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                            <CodeBlockR language="python">{`player_stats = {
    "level": 47,
    "exp": 125430,
    "items": {"sword": 1, "potion": 5},
    "location": "Forest Temple"
}`}</CodeBlockR>
                          </div>
                        </div>

                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-bold text-green-700">Config: Setări aplicație</h4>
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                            <CodeBlockR language="python">{`settings = {
    "theme": "dark",
    "language": "ro",
    "notifications": True,
    "api_timeout": 30
}`}</CodeBlockR>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-bold text-blue-800 mb-2">🧠 Cum funcționează în spate?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-blue-700">1. Hash Function</strong>
                        <p className="text-blue-600">Cheia "email" devine numărul 1247</p>
                      </div>
                      <div>
                        <strong className="text-blue-700">2. Array Index</strong>
                        <p className="text-blue-600">Valoarea se stochează la poziția 1247</p>
                      </div>
                      <div>
                        <strong className="text-blue-700">3. Direct Access</strong>
                        <p className="text-blue-600">Acces direct fără căutare = O(1)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Sets Section */}
          {currentSection === 'sets' && (
            <div className="space-y-6">
              <Card className="border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-green-600" />
                    <CardTitle className="text-2xl">Seturi - Colecții fără Duplicate</CardTitle>
                  </div>
                  <CardDescription>
                    Povestea listei de invitați unde fiecare persoană intră o singură dată
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-green-800">🎉 Lista de Invitați - Operații Set</h3>
                      
                      <div className="space-y-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-bold text-green-700 mb-2">Nuntă:</h4>
                          <div className="flex flex-wrap gap-2">
                            {[...guestLists.wedding].map(guest => (
                              <Badge key={guest} variant="outline" className="bg-white">
                                {guest}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-bold text-blue-700 mb-2">Ziua de Naștere:</h4>
                          <div className="flex flex-wrap gap-2">
                            {[...guestLists.birthday].map(guest => (
                              <Badge key={guest} variant="outline" className="bg-white">
                                {guest}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-purple-50 rounded-lg">
                          <h4 className="font-bold text-purple-700 mb-2">Event Corporate:</h4>
                          <div className="flex flex-wrap gap-2">
                            {[...guestLists.corporate].map(guest => (
                              <Badge key={guest} variant="outline" className="bg-white">
                                {guest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <Button 
                          onClick={() => {
                            const intersection = new Set([...guestLists.wedding].filter(x => guestLists.birthday.has(x)));
                            alert(`Invitați comuni (nuntă ∩ ziua de naștere): ${[...intersection].join(', ')}`);
                          }}
                          className="w-full"
                          variant="outline"
                        >
                          🤝 Intersecție: Cine vine la ambele?
                        </Button>
                        
                        <Button 
                          onClick={() => {
                            const union = new Set([...guestLists.wedding, ...guestLists.birthday]);
                            alert(`Toți invitații unici (nuntă ∪ ziua de naștere): ${[...union].join(', ')}`);
                          }}
                          className="w-full"
                          variant="outline"
                        >
                          🌍 Reuniune: Toți invitații unici
                        </Button>

                        <Button 
                          onClick={() => {
                            const difference = new Set([...guestLists.wedding].filter(x => !guestLists.corporate.has(x)));
                            alert(`Doar la nuntă (nuntă - corporate): ${[...difference].join(', ')}`);
                          }}
                          className="w-full"
                          variant="outline"
                        >
                          ➖ Diferență: Doar la nuntă, nu la corporate
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4 text-purple-800">🔍 Aplicații Practice</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                          <h4 className="font-bold text-yellow-800">📧 Detectare Email Duplicate</h4>
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                            <CodeBlockR language="python">{`emails = ["a@ex.com", "b@ex.com", "a@ex.com"]
unique_emails = set(emails)
print(len(unique_emails))  # 2 (nu 3!)`}</CodeBlockR>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <h4 className="font-bold text-blue-800">🏷️ Tag-uri Articole</h4>
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                            <CodeBlockR language="python">{`article1_tags = {"python", "ai", "tech"}
article2_tags = {"python", "data", "science"}
common_tags = article1_tags & article2_tags
# {'python'}`}</CodeBlockR>
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <h4 className="font-bold text-green-800">🎯 Permisiuni Utilizator</h4>
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                            <CodeBlockR language="python">{`admin_perms = {"read", "write", "delete"}
user_perms = {"read", "write"}
can_delete = "delete" in user_perms  # False`}</CodeBlockR>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-2">⚡ Performanță Set vs Listă</h4>
                        <div className="text-sm space-y-1">
                          <p><strong>Listă:</strong> <code>item in list</code> → O(n)</p>
                          <p><strong>Set:</strong> <code>item in set</code> → O(1)</p>
                          <p className="text-green-600 font-medium">Pentru 1M elemente: 1000x mai rapid!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Hash Collisions Section */}
          {currentSection === 'collisions' && (
            <div className="space-y-6">
              <Card className="border-orange-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                    <CardTitle className="text-2xl">Funcții Hash și Coliziuni</CardTitle>
                  </div>
                  <CardDescription>
                    Înțelegerea hash-urilor numerice și gestionarea coliziunilor în lumea reală
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-orange-800">🧮 Hash Function Demo</h3>
                      
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Scrie orice text..."
                            className="flex-1"
                          />
                          <Button 
                            onClick={() => performSearch('hash', userInput)}
                            disabled={!userInput || isAnimating}
                          >
                            Hash It!
                          </Button>
                        </div>

                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {hashResults.slice(-5).map((result, index) => (
                            <div key={result.timestamp} className="p-3 bg-orange-50 rounded-lg border">
                              <div className="flex justify-between items-center">
                                <span className="font-mono text-sm">{result.input}</span>
                                <Badge variant="outline" className="bg-orange-100">
                                  Hash: {result.hash}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-bold text-blue-800 mb-2">🔬 Testează Coliziuni</h4>
                          <Button onClick={simulateCollisions} className="w-full mb-3">
                            Simulează Hash Collisions
                          </Button>
                          
                          {collisionDemo.length > 0 && (
                            <div className="space-y-2">
                              {collisionDemo.map((item, index) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                  <span className="font-mono">"{item.string}"</span>
                                  <span className="text-gray-600">→</span>
                                  <Badge 
                                    variant={collisionDemo.filter(x => x.bucket === item.bucket).length > 1 ? "destructive" : "default"}
                                  >
                                    Bucket {item.bucket}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4 text-red-800">💥 Probleme Reale cu Coliziunile</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                          <h4 className="font-bold text-red-800">🚨 Atacuri Hash DoS</h4>
                          <p className="text-sm text-red-700 mt-2">
                            În 2011, atacatori au descobrit coliziuni în hash functions și au blocat 
                            servere prin trimiterea de date care toate hash-uiau la aceeași valoare.
                          </p>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                          <h4 className="font-bold text-yellow-800">⚠️ Performance Degradation</h4>
                          <p className="text-sm text-yellow-700 mt-2">
                            Când multe chei hash-uiesc la aceeași poziție, căutarea devine O(n) 
                            în loc de O(1) - exact ca o listă normală!
                          </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <h4 className="font-bold text-green-800">✅ Soluții Practice</h4>
                          <div className="text-sm text-green-700 mt-2 space-y-1">
                            <p><strong>1. Open Addressing:</strong> Dacă poziția e ocupată, încearcă următoarea</p>
                            <p><strong>2. Chaining:</strong> Fiecare poziție are o listă de elemente</p>
                            <p><strong>3. Robin Hood Hashing:</strong> Redistribuie pentru echilibru</p>
                          </div>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                          <h4 className="font-bold text-purple-800">🔒 Hash în Securitate</h4>
                          <div className="text-sm text-purple-700 mt-2 space-y-1">
                            <p><strong>MD5:</strong> Spart în 2004 (coliziuni găsite)</p>
                            <p><strong>SHA1:</strong> Vulnerabil din 2017</p>
                            <p><strong>SHA256:</strong> Standard actual pentru securitate</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-3">🎯 De ce nu există Hashing "Perfect"?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-bold text-blue-700">Pigeonhole Principle</h5>
                        <p className="text-gray-600">Dacă ai ∞ input-uri posibile și doar n poziții în hash table, vor fi coliziuni</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-blue-700">Trade-offs Real-World</h5>
                        <p className="text-gray-600">Hash functions perfecte pentru domenii mici (DNS), dar imposibil pentru text arbitrar</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Duplicate Detection Section */}
          {currentSection === 'duplicates' && (
            <div className="space-y-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Search className="w-6 h-6 text-purple-600" />
                    <CardTitle className="text-2xl">Hash Table Reală - Detectare Duplicate</CardTitle>
                  </div>
                  <CardDescription>
                    Aplicație directă: listă imensă de emailuri → detectare instant a duplicatelor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-purple-800">📧 Lista de Email-uri</h3>
                      
                      <div className="space-y-2 mb-4">
                        {sampleEmails.map((email, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                            <span className="font-mono">{email}</span>
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                          </div>
                        ))}
                      </div>

                      <Button 
                        onClick={detectDuplicates}
                        disabled={isAnimating}
                        className="w-full"
                      >
                        {isAnimating ? 'Procesez...' : '🔍 Detectează Duplicate'}
                      </Button>

                      {duplicateEmails.length > 0 && (
                        <div className="mt-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                          <h4 className="font-bold text-red-800 mb-2">🚨 Duplicate Găsite:</h4>
                          <div className="space-y-1">
                            {duplicateEmails.map((email, index) => (
                              <div key={index} className="text-sm font-mono text-red-700">
                                {email}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4 text-blue-800">⚡ Scale Real-World</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-bold text-blue-700">📊 Performanță Comparație</h4>
                          <div className="mt-2 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>1,000 emails:</span>
                              <span className="font-mono">0.01s</span>
                            </div>
                            <div className="flex justify-between">
                              <span>100,000 emails:</span>
                              <span className="font-mono">0.1s</span>
                            </div>
                            <div className="flex justify-between">
                              <span>10,000,000 emails:</span>
                              <span className="font-mono">2s</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 font-bold">
                              <span>Complexitate:</span>
                              <span className="text-green-600">O(n)</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-red-50 rounded-lg">
                          <h4 className="font-bold text-red-700">🐌 Fără Hashing (Listă)</h4>
                          <div className="mt-2 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>1,000 emails:</span>
                              <span className="font-mono">5s</span>
                            </div>
                            <div className="flex justify-between">
                              <span>100,000 emails:</span>
                              <span className="font-mono">8 minute</span>
                            </div>
                            <div className="flex justify-between">
                              <span>10,000,000 emails:</span>
                              <span className="font-mono">14 ore</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 font-bold">
                              <span>Complexitate:</span>
                              <span className="text-red-600">O(n²)</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <h4 className="font-bold text-green-800">💡 Algoritm Hashing</h4>
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                            <CodeBlockR language="python">{`def find_duplicates(emails):
    seen = set()          # Hash table O(1)
    duplicates = set()
    
    for email in emails:  # O(n)
        if email in seen: # O(1) lookup!
            duplicates.add(email)
        seen.add(email)   # O(1) insert!
    
    return duplicates     # Total: O(n)`}</CodeBlockR>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                    <h4 className="font-bold text-indigo-800 mb-3">🏢 Aplicații în Industrie</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-bold text-purple-700">📧 Email Marketing</h5>
                        <p className="text-gray-600">Mailchimp procesează miliarde de emailuri, detectând instant duplicatele pentru compliance</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-purple-700">💳 Fraud Detection</h5>
                        <p className="text-gray-600">Băncile folosesc hashing pentru detectarea tranzacțiilor duplicate în real-time</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-purple-700">🔄 Data Deduplication</h5>
                        <p className="text-gray-600">Dropbox și Google Drive folosesc hash-uri pentru a evita stocarea acelorași fișiere</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Optimized Structures Section */}
          {currentSection === 'optimized' && (
            <div className="space-y-6">
              <Card className="border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-green-600" />
                    <CardTitle className="text-2xl">Structuri Optimizate - defaultdict și Counter</CardTitle>
                  </div>
                  <CardDescription>
                    Poveste: magazin online → inventar dinamic și analiza log-urilor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-green-800">🏪 Magazin Online - defaultdict</h3>
                      
                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                        <h4 className="font-bold text-green-700 mb-3">📦 Inventar Dinamic</h4>
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <CodeBlockR language="python">{`from collections import defaultdict

# Fără defaultdict - cod verbos
inventory = {}
def add_product(category, product, qty):
    if category not in inventory:
        inventory[category] = {}
    if product not in inventory[category]:
        inventory[category][product] = 0
    inventory[category][product] += qty

# Cu defaultdict - elegant și simplu  
inventory = defaultdict(lambda: defaultdict(int))
def add_product(category, product, qty):
    inventory[category][product] += qty  # That's it!`}</CodeBlockR>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-bold text-blue-700">🔧 Categorii Produse</h4>
                          <div className="text-sm mt-2 space-y-1">
                            <p><span className="font-mono">electronics["laptop"]</span> = 15</p>
                            <p><span className="font-mono">electronics["phone"]</span> = 32</p>
                            <p><span className="font-mono">books["python"]</span> = 8</p>
                            <p><span className="font-mono">books["javascript"]</span> = 12</p>
                          </div>
                        </div>

                        <div className="p-3 bg-purple-50 rounded-lg">
                          <h4 className="font-bold text-purple-700">⚡ Avantaje defaultdict</h4>
                          <div className="text-sm mt-2 space-y-1">
                            <p>• Elimină verificările KeyError</p>
                            <p>• Cod mai curat și mai lizibil</p>
                            <p>• Performanță mai bună (mai puține if-uri)</p>
                            <p>• Gestionare automată a valorilor noi</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4 text-purple-800">📊 Analiza Text - Counter</h3>
                      
                      <div className="space-y-4">
                        <Button 
                          onClick={analyzeText}
                          className="w-full"
                        >
                          📝 Analizează Text Pagina Curenta
                        </Button>

                        {Object.keys(wordsAnalysis).length > 0 && (
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-bold text-purple-700 mb-3">🏆 Top Cuvinte:</h4>
                            <div className="space-y-2">
                              {Object.entries(wordsAnalysis)
                                .sort(([,a], [,b]) => (Number(b) - Number(a)))
                                .slice(0, 5)
                                .map(([word, count], index) => (
                                <div key={word} className="flex justify-between items-center">
                                  <span className="font-mono text-sm">{word}</span>
                                  <div className="flex items-center gap-2">
                                    <Progress value={(Number(count) / Math.max(...Object.values(wordsAnalysis).map(Number))) * 100} className="w-20 h-2" />
                                    <Badge>{String(count)}</Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                          <h4 className="font-bold text-yellow-800">🔍 Counter în Practice</h4>
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                            <CodeBlockR language="python">{`from collections import Counter

# Analiza log-urilor server
logs = ["GET /home", "GET /about", "POST /login", 
        "GET /home", "GET /home", "POST /signup"]

# Instant word counting
request_counts = Counter(logs)
print(request_counts.most_common(3))

# Rezultat: [('GET /home', 3), ('POST /login', 1), ...]`}</CodeBlockR>
                          </div>
                        </div>

                        <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                          <h4 className="font-bold text-indigo-800">📈 Aplicații Real-World</h4>
                          <div className="text-sm mt-2 space-y-2">
                            <p><strong>Netflix:</strong> Counter pentru tracking vizualizări filme</p>
                            <p><strong>Twitter:</strong> Hashtag trending folosind Counter</p>
                            <p><strong>Spotify:</strong> Most played songs per user</p>
                            <p><strong>E-commerce:</strong> Product popularity analysis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg">
                    <h4 className="font-bold text-teal-800 mb-3">🚀 Performance Boost</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-bold text-green-700">Manual Counting (Slow)</h5>
                        <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                          <CodeBlockR language="python">{`word_count = {}
for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1`}</CodeBlockR>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-bold text-green-700">Counter (Fast & Clean)</h5>
                        <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                          <CodeBlockR language="python">{`from collections import Counter
word_count = Counter(words)
# Done! Optimized C implementation`}</CodeBlockR>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Real World Applications Section */}
          {currentSection === 'realworld' && (
            <div className="space-y-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <CardTitle className="text-2xl">Aplicații Reale - Hash pentru Fișiere Mari</CardTitle>
                  </div>
                  <CardDescription>
                    Folosirea hashing-ului pe fișiere PDF pentru indexare și detectarea duplicatelor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-blue-800">📄 Sistem Indexare Fișiere</h3>
                      
                      <div className="space-y-3 mb-4">
                        {files.map((file, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-mono text-sm font-bold">{file.name}</span>
                              {file.hash && (
                                <Badge variant="outline" className="bg-blue-100">
                                  #{file.hash}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 truncate">{file.content}</p>
                          </div>
                        ))}
                      </div>

                      <Button 
                        onClick={hashFiles}
                        className="w-full mb-4"
                      >
                        🔢 Calculează Hash-uri pentru Fișiere
                      </Button>

                      {files[0].hash && (
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <h4 className="font-bold text-green-800 mb-2">✅ Duplicate Detectate:</h4>
                          <div className="text-sm">
                            {files.filter(f => f.hash === files[0].hash).length > 1 ? (
                              <p className="text-green-700">
                                <strong>{files[0].name}</strong> și <strong>{files[2].name}</strong> au același hash ({files[0].hash}) 
                                → conținut identic!
                              </p>
                            ) : (
                              <p className="text-gray-600">Nu s-au găsit duplicate în această selecție.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4 text-indigo-800">🏢 Scenarii Industriale</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                          <h4 className="font-bold text-indigo-700">📊 Firmă de Consultanță</h4>
                          <div className="text-sm text-indigo-600 mt-2">
                            <p><strong>Problema:</strong> 10,000 rapoarte PDF primite lunar</p>
                            <p><strong>Soluția:</strong> Hash pe conținut pentru detectarea duplicatelor</p>
                            <p><strong>Rezultat:</strong> 30% reducere spațiu stocare + organizare automată</p>
                          </div>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                          <h4 className="font-bold text-purple-700">🎓 Universitate - Lucrări Studenți</h4>
                          <div className="text-sm text-purple-600 mt-2">
                            <p><strong>Problema:</strong> Detectarea plagiatului în 5,000 lucrări</p>
                            <p><strong>Soluția:</strong> SHA256 hash pe paragrafe și secțiuni</p>
                            <p><strong>Rezultat:</strong> Detectare instant vs. 3 luni manual</p>
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <h4 className="font-bold text-green-700">☁️ Cloud Storage (Dropbox-style)</h4>
                          <div className="text-sm text-green-600 mt-2">
                            <p><strong>Problema:</strong> Milioane utilizatori upload-uiesc aceleași fișiere</p>
                            <p><strong>Soluția:</strong> Hash-based deduplication</p>
                            <p><strong>Rezultat:</strong> 60% reducere costuri stocare</p>
                          </div>
                        </div>

                        <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                          <h4 className="font-bold text-red-700">🔒 Securitate - File Integrity</h4>
                          <div className="text-sm text-red-600 mt-2">
                            <p><strong>Problema:</strong> Verificarea integrității fișierelor sistem</p>
                            <p><strong>Soluția:</strong> MD5/SHA checksums pentru monitorizare</p>
                            <p><strong>Rezultat:</strong> Detectarea modificărilor malițioase</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-3">🎯 De ce Hashing = Coloana Vertebrală a Tech Giants?</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <h5 className="font-bold text-blue-700">🔍 Google Search</h5>
                          <p className="text-gray-600">Hash tables pentru indexarea a trilioane de pagini web</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-blue-700">📘 Facebook Posts</h5>
                          <p className="text-gray-600">Hash-uri pentru rapid access la posts și comentarii</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-blue-700">🛒 Amazon Catalog</h5>
                          <p className="text-gray-600">Product lookup în mai putin de 1ms din milioane produse</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-blue-700">🎵 Spotify Playlists</h5>
                          <p className="text-gray-600">Instant access la 70M+ songs</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-l-4 border-amber-400">
                      <h4 className="font-bold text-amber-800 mb-2">💡 Lecția Finală: Când să folosești ce?</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h5 className="font-bold text-green-700">✅ Dict când:</h5>
                          <ul className="text-green-600 space-y-1">
                            <li>• Key-value relationships</li>
                            <li>• Configuration settings</li>
                            <li>• Lookup tables</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-bold text-blue-700">✅ Set când:</h5>
                          <ul className="text-blue-600 space-y-1">
                            <li>• Unique collections</li>
                            <li>• Membership testing</li>
                            <li>• Set operations needed</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-bold text-purple-700">✅ Counter când:</h5>
                          <ul className="text-purple-600 space-y-1">
                            <li>• Frequency counting</li>
                            <li>• Analytics & stats</li>
                            <li>• Top-K problems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Final Summary */}
              <Card className="border-gradient-to-r from-blue-200 to-purple-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardHeader>
                  <div className="text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      🎓 Încheiere: Hashing = Viteză, Eficiență, Scalabilitate
                    </h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                      De la biblioteca infinită la sistemele Google și Amazon - hashing-ul este invizibila forță 
                      care face internetul să funcționeze la viteza gândului. Acum știi secretul scalabilității infinite! 
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="p-4 bg-white rounded-lg shadow-sm border border-blue-200">
                        <div className="text-2xl mb-2">⚡</div>
                        <h4 className="font-bold text-blue-800">O(1) Access</h4>
                        <p className="text-sm text-gray-600">Aceeași viteză pentru 1 sau 1 miliard de elemente</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm border border-green-200">
                        <div className="text-2xl mb-2">🚀</div>
                        <h4 className="font-bold text-green-800">Scalabilitate</h4>
                        <p className="text-sm text-gray-600">De la prototip la scale global fără schimbări majore</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-200">
                        <div className="text-2xl mb-2">🎯</div>
                        <h4 className="font-bold text-purple-800">Versatilitate</h4>
                        <p className="text-sm text-gray-600">Căutări, securitate, deduplicare - o soluție, multiple aplicații</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
                      <p className="text-indigo-800 font-medium">
                        🚀 <strong>Next Level:</strong> Graph algorithms, distributed hashing, și blockchain - 
                        unde hashing-ul devine fundamentul pentru sisteme descentralizate globale!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default HashingArtifact;
