import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LoopsArtifact = () => {
  const navigate = useNavigate();
  const [countdownValue, setCountdownValue] = useState(10);
  const [currentCountdown, setCurrentCountdown] = useState(10);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const [countdownDisplay, setCountdownDisplay] = useState('');
  
  const [forLoopItems, setForLoopItems] = useState(['🍎', '🍌', '🍊', '🍓', '🥝']);
  const [currentForIndex, setCurrentForIndex] = useState(-1);
  const [isForRunning, setIsForRunning] = useState(false);
  const [forLoopOutput, setForLoopOutput] = useState('');
  
  const [pattern, setPattern] = useState('*');
  const [patternSize, setPatternSize] = useState(5);
  const [generatedPattern, setGeneratedPattern] = useState('');
  
  const [attempts, setAttempts] = useState(0);
  const [correctPassword] = useState('1234');
  const [passwordGuess, setPasswordGuess] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [showPasswordCode, setShowPasswordCode] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountdownRunning && currentCountdown > 0) {
      interval = setTimeout(() => {
        setCurrentCountdown(prev => {
          const newValue = prev - 1;
          setCountdownDisplay(prev => prev + newValue + (newValue > 0 ? ', ' : ' - Lansare! 🚀'));
          return newValue;
        });
      }, 800);
    } else if (currentCountdown === 0 && isCountdownRunning) {
      setIsCountdownRunning(false);
    }
    return () => clearTimeout(interval);
  }, [isCountdownRunning, currentCountdown]);

  // For loop effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isForRunning && currentForIndex < forLoopItems.length) {
      interval = setTimeout(() => {
        if (currentForIndex >= 0) {
          setForLoopOutput(prev => prev + `Procesez ${forLoopItems[currentForIndex]}\n`);
        }
        setCurrentForIndex(prev => prev + 1);
      }, 1000);
    } else if (currentForIndex >= forLoopItems.length && isForRunning) {
      setIsForRunning(false);
      setForLoopOutput(prev => prev + 'Toate fructele au fost procesate! ✅');
    }
    return () => clearTimeout(interval);
  }, [isForRunning, currentForIndex, forLoopItems]);

  const startCountdown = () => {
    setCurrentCountdown(countdownValue);
    setCountdownDisplay(countdownValue + ', ');
    setIsCountdownRunning(true);
  };

  const resetCountdown = () => {
    setIsCountdownRunning(false);
    setCurrentCountdown(countdownValue);
    setCountdownDisplay('');
  };

  const startForLoop = () => {
    setCurrentForIndex(0);
    setForLoopOutput('Începe procesarea fructelor:\n');
    setIsForRunning(true);
  };

  const resetForLoop = () => {
    setIsForRunning(false);
    setCurrentForIndex(-1);
    setForLoopOutput('');
  };

  const generatePattern = () => {
    let output = '';
    for (let i = 1; i <= patternSize; i++) {
      output += pattern.repeat(i) + '\n';
    }
    setGeneratedPattern(output);
  };

  const checkPassword = () => {
    setAttempts(prev => prev + 1);
    if (passwordGuess === correctPassword) {
      setPasswordMessage(`✅ Parolă corectă! Ai reușit în ${attempts + 1} încercări.`);
      setShowPasswordCode(true);
    } else {
      setPasswordMessage(`❌ Parolă greșită. Încercarea ${attempts + 1}. Încearcă din nou!`);
      setPasswordGuess('');
    }
  };

  const resetPassword = () => {
    setAttempts(0);
    setPasswordGuess('');
    setPasswordMessage('');
    setShowPasswordCode(false);
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
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
          <div className="text-6xl mb-6 animate-spin-slow">🔁</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
            Loops - Repetition & Magic
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
            Pentru prima dată, simțim cum o mașină poate depăși mintea umană în viteză și consistență,<br/>
            <strong>făcând mii de pași într-o clipă! ✨</strong>
          </p>
        </div>

        {/* Introduction Card */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 flex items-center gap-3">
            ✨ Primul Gust al Magiei
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl mb-6 relative">
            <div className="absolute top-2 left-2 text-2xl">⚡</div>
            <div className="ml-8 text-lg">
              Până acum, am lucrat cu variabile și condiții if-else – lucruri pe care le putem face și pe hârtie, cu răbdare.<br/>
              <strong>Dar aici apare primul pas în adevărata magie a calculatoarelor: repetiția automată.</strong>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            Imaginează-ți că trebuie să scrii "Bună ziua!" de 1000 de ori. Pe hârtie, ai nevoie de ore întregi și te-ai plictisi după primele 10.
            Un calculator face asta într-o fracțiune de secundă, fără să se plictisească vreodată.
          </p>

          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-2xl">
            <div className="text-center">
              <div className="text-3xl mb-4">🤖 vs 👤</div>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="font-bold text-lg mb-2">Calculator</div>
                  <div className="text-sm opacity-90">1,000,000 repetări în 0.001 secunde</div>
                  <div className="text-sm opacity-90">Zero greșeli, zero oboseală</div>
                </div>
                <div>
                  <div className="font-bold text-lg mb-2">Om</div>
                  <div className="text-sm opacity-90">10 repetări în 1 minut</div>
                  <div className="text-sm opacity-90">Plictiseală, greșeli inevitabile</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loop Concepts */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 flex items-center gap-3">
            🔄 Cele Două Tipuri de Bucle
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* While Loop */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                🌊 WHILE - "Cât timp..."
              </h3>
              <p className="mb-4 text-gray-700">
                <strong>Logica:</strong> "Cât timp condiția e adevărată, repetă acțiunea."
              </p>
              <div className="bg-white p-4 rounded-lg mb-4 border-l-4 border-purple-500">
                <p className="text-sm italic">"Cât timp nu știu parola corectă, continuă să întrebi."</p>
                <p className="text-sm italic">"Cât timp mașina nu e plină cu benzină, continuă să alimentezi."</p>
              </div>
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
                >{`while parola_gresita:
    parola = input("Introdu parola:")
    if parola == parola_corecta:
        parola_gresita = False`}</SyntaxHighlighter>
              </div>
            </div>

            {/* For Loop */}
            <div className="bg-gradient-to-br from-green-100 to-cyan-100 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                🎯 FOR - "Pentru fiecare..."
              </h3>
              <p className="mb-4 text-gray-700">
                <strong>Logica:</strong> "Pentru fiecare element dintr-o secvență, repetă acțiunea."
              </p>
              <div className="bg-white p-4 rounded-lg mb-4 border-l-4 border-green-500">
                <p className="text-sm italic">"Pentru fiecare student din clasă, acordă nota."</p>
                <p className="text-sm italic">"Pentru fiecare an din 2020-2030, afișează anul."</p>
              </div>
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
                >{`for student in clasa:
    nota = calculeaza_nota(student)
    print(f"{student}: {nota}")`}</SyntaxHighlighter>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl">
            <h4 className="text-xl font-bold mb-3">🎨 Diferența Esențială:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <strong>WHILE:</strong> urmărește o condiție deschisă<br/>
                <em>(nu știi când se va termina)</em>
              </div>
              <div>
                <strong>FOR:</strong> parcurge un drum deja trasat<br/>
                <em>(știi exact cati pași vor fi)</em>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Countdown Demo */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-6 flex items-center gap-3">
            🚀 Demo: Lansarea Rachetei (WHILE Loop)
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="mb-4 text-gray-700">
              Simulează numărătoarea inversă pentru lansarea unei rachete. Bucla WHILE va continua să numere
              cât timp contorul este mai mare decât 0.
            </p>
            
            <div className="flex gap-4 items-center flex-wrap mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pornește numărătoarea de la:
                </label>
                <input 
                  type="number" 
                  value={countdownValue}
                  onChange={(e) => setCountdownValue(parseInt(e.target.value) || 1)}
                  min="1" 
                  max="30"
                  disabled={isCountdownRunning}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={startCountdown}
                  disabled={isCountdownRunning}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
                <Button 
                  onClick={resetCountdown}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            
            {countdownDisplay && (
              <div className="bg-black text-green-400 p-6 rounded-lg font-mono text-lg">
                <div className="mb-2">🚀 NUMĂRĂTOARE LANSARE:</div>
                <div className="text-2xl">{countdownDisplay}</div>
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-red-700 mb-3">Codul din spate:</h3>
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
            >{`numaratoare = ${countdownValue}

while numaratoare > 0:
    print(numaratoare)
    numaratoare = numaratoare - 1
    time.sleep(1)  # Așteaptă o secundă

print("Lansare! 🚀")`}</SyntaxHighlighter>
          </div>
        </div>

        {/* Interactive For Loop Demo */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6 flex items-center gap-3">
            🍎 Demo: Procesarea Fructelor (FOR Loop)
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="mb-4 text-gray-700">
              Simulează procesarea unei liste de fructe. Bucla FOR va trece prin fiecare element din listă,
              unul câte unul, în ordine.
            </p>
            
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Lista de fructe:</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {forLoopItems.map((fruit, index) => (
                  <div 
                    key={index}
                    className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                      currentForIndex === index && isForRunning
                        ? 'border-green-500 bg-green-100 scale-110 shadow-lg'
                        : currentForIndex > index && isForRunning
                        ? 'border-gray-300 bg-gray-100 opacity-60'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {fruit}
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mb-6">
                <Button 
                  onClick={startForLoop}
                  disabled={isForRunning}
                  className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Procesează Fructele
                </Button>
                <Button 
                  onClick={resetForLoop}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            
            {forLoopOutput && (
              <div className="bg-black text-green-400 p-6 rounded-lg font-mono text-sm whitespace-pre-line">
                {forLoopOutput}
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-green-700 mb-3">Codul din spate:</h3>
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
            >{`fructe = ["🍎", "🍌", "🍊", "🍓", "🥝"]

for fruct in fructe:
    print(f"Procesez {fruct}")
    time.sleep(1)  # Simulează procesarea

print("Toate fructele au fost procesate! ✅")`}</SyntaxHighlighter>
          </div>
        </div>

        {/* Pattern Generator */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
            🎨 Generator de Modele
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="mb-4 text-gray-700">
              Creează modele vizuale folosind bucle FOR. Schimbă caracterul și mărimea pentru a vedea
              cum buclele pot genera arte ASCII.
            </p>
            
            <div className="flex gap-4 items-end flex-wrap mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caracterul pentru model:
                </label>
                <input 
                  type="text" 
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value.slice(0, 1) || '*')}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-16 text-center text-lg"
                  maxLength={1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mărimea modelului:
                </label>
                <input 
                  type="number" 
                  value={patternSize}
                  onChange={(e) => setPatternSize(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                  min="1" 
                  max="10"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20"
                />
              </div>
              <Button 
                onClick={generatePattern}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                Generează Model
              </Button>
            </div>
            
            {generatedPattern && (
              <div className="bg-black text-green-400 p-6 rounded-lg font-mono text-sm whitespace-pre">
                {generatedPattern}
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-indigo-700 mb-3">Codul din spate:</h3>
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
            >{`caracter = "${pattern}"
marime = ${patternSize}

for i in range(1, marime + 1):
    linie = caracter * i
    print(linie)`}</SyntaxHighlighter>
          </div>
        </div>

        {/* Password Demo */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6 flex items-center gap-3">
            🔒 Demo: Sistemul de Parolă
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="mb-4 text-gray-700">
              Simulează un sistem de autentificare care întreabă parola până când utilizatorul o introduce corect.
              <strong> Parola secretă este: 1234</strong>
            </p>
            
            <div className="flex gap-4 items-end flex-wrap mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Introdu parola:
                </label>
                <input 
                  type="password" 
                  value={passwordGuess}
                  onChange={(e) => setPasswordGuess(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkPassword()}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Încearcă 1234"
                />
              </div>
              <Button 
                onClick={checkPassword}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Verifică
              </Button>
              <Button 
                onClick={resetPassword}
                variant="outline"
              >
                Reset
              </Button>
            </div>
            
            {passwordMessage && (
              <div className={`p-4 rounded-lg mb-4 ${
                passwordMessage.includes('✅') 
                  ? 'bg-green-100 border border-green-500 text-green-800'
                  : 'bg-red-100 border border-red-500 text-red-800'
              }`}>
                {passwordMessage}
                <div className="text-sm mt-2">Încercări totale: {attempts}</div>
              </div>
            )}
            
            {showPasswordCode && (
              <div className="bg-black text-green-400 p-6 rounded-lg font-mono text-sm">
                <div className="text-yellow-300">Simulare completă a buclei WHILE:</div>
                <div className="mt-2">
                  Încercarea 1: ❌<br/>
                  Încercarea 2: ❌<br/>
                  ...<br/>
                  Încercarea {attempts}: ✅ Acces permis!
                </div>
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-orange-700 mb-3">Codul din spate:</h3>
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
            >{`parola_corecta = "1234"
incercari = 0
acces_permis = False

while not acces_permis:
    parola = input("Introdu parola: ")
    incercari = incercari + 1

    if parola == parola_corecta:
        print(f"Acces permis! Încercări: {incercari}")
        acces_permis = True
    else:
        print("Parolă greșită. Încearcă din nou!")`}</SyntaxHighlighter>
          </div>
        </div>

        {/* Real World Applications */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 mb-6 flex items-center gap-3">
            🌍 Unde Trăiesc Buclele în Lumea Reală
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: "🤖", 
                title: "Robotul de Fabrică", 
                description: "FOR: Pentru fiecare piesă din banda rulantă, execută 5 operații identice",
                type: "FOR"
              },
              { 
                icon: "🎵", 
                title: "Spotify Shuffle", 
                description: "FOR: Pentru fiecare piesă din playlist, calculează următoarea piesă aleatoare",
                type: "FOR"
              },
              { 
                icon: "📱", 
                title: "Notificări Push", 
                description: "WHILE: Cât timp aplicația e activă, verifică la fiecare 30 secunde mesaje noi",
                type: "WHILE"
              },
              { 
                icon: "🎮", 
                title: "Game Loop", 
                description: "WHILE: Cât timp jocul rulează, actualizează graficile la 60 FPS",
                type: "WHILE"
              },
              { 
                icon: "📊", 
                title: "Excel Calcule", 
                description: "FOR: Pentru fiecare rând din tabel, aplică formula și salvează rezultatul",
                type: "FOR"
              },
              { 
                icon: "🔍", 
                title: "Google Search", 
                description: "FOR: Pentru fiecare pagină web indexată, verifică dacă conține cuvintele căutate",
                type: "FOR"
              }
            ].map((example, index) => (
              <div key={index} className={`p-6 rounded-2xl transform hover:scale-105 transition-transform text-white ${
                example.type === 'FOR' 
                  ? 'bg-gradient-to-br from-green-500 to-cyan-600'
                  : 'bg-gradient-to-br from-purple-500 to-pink-600'
              }`}>
                <div className="text-3xl mb-3">{example.icon}</div>
                <div className={`text-xs px-2 py-1 rounded-full mb-3 inline-block ${
                  example.type === 'FOR' ? 'bg-white text-green-700' : 'bg-white text-purple-700'
                }`}>
                  {example.type} LOOP
                </div>
                <h4 className="text-lg font-semibold mb-2">{example.title}</h4>
                <p className="text-sm opacity-90">{example.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loop Dangers */}
        <div className="artifact-card bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            ⚠️ Atenție la Buclele Infinite!
          </h2>
          
          <p className="text-lg leading-relaxed mb-6">
            Cea mai mare putere a buclelor poate deveni și cea mai mare capcană: 
            <strong> bucla care nu se termină niciodată.</strong>
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Exemple de bucle infinite periculoase:</h3>
            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                <div className="text-red-300 mb-2"># PERICOL! Bucla infinită:</div>
                <span className="text-blue-400">while</span> <span className="text-purple-400">True</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">"Aceasta nu se va termina niciodată!"</span>)
              </div>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                <div className="text-red-300 mb-2"># PERICOL! Condiția nu se schimbă niciodată:</div>
                x = <span className="text-purple-400">5</span><br/>
                <span className="text-blue-400">while</span> x &gt; <span className="text-purple-400">0</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;print(x)  <span className="text-gray-400"># x rămâne 5 mereu!</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-400 text-green-900 p-6 rounded-2xl">
            <h4 className="text-lg font-bold mb-2">💡 Cum eviți buclele infinite:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Asigură-te că variabila din condiție se schimbă în bucla</li>
              <li>Adaugă un contor maxim de siguranță</li>
              <li>Testează bucla cu valori mici înainte să rulezi cu date mari</li>
              <li>Folosește Ctrl+C pentru a opri un program blocat</li>
            </ul>
          </div>
        </div>

        {/* Mental Models */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-600 mb-6 flex items-center gap-3">
            🧠 Modele Mentale pentru Bucle
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-yellow-700">🎨 Bucle ca Artă:</h3>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl">
                <p className="mb-4">
                  <strong>Pictor:</strong> Pentru fiecare pensulă din cutie, adaugă o nuanță pe pânză.
                </p>
                <p className="mb-4">
                  <strong>Muzician:</strong> Cât timp refrenul sună bine, repetă-l din nou.
                </p>
                <p>
                  <strong>Sculptor:</strong> Pentru fiecare lovitură de daltă, îndepărtează un fragment.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-yellow-700">🏃‍♂️ Bucle ca Sport:</h3>
              <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-xl">
                <p className="mb-4">
                  <strong>Antrenament:</strong> Cât timp nu ai ajuns la performanța dorită, repetă exercițiul.
                </p>
                <p className="mb-4">
                  <strong>Maraton:</strong> Pentru fiecare kilometru din traseu, menține ritmul.
                </p>
                <p>
                  <strong>Echipă:</strong> Pentru fiecare jucător, execută strategia stabilită.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl">
            <h4 className="text-xl font-bold mb-3 text-center">🎼 Bucle = Compozitori de Repetiții</h4>
            <p className="text-center text-lg">
              Prima dată când programatorul devine <strong>"compozitor de repetiții"</strong>,<br/>
              iar calculatorul – instrumentul său capabil să ducă această muzică<br/>
              <strong>mult dincolo de ce ar putea face mintea umană.</strong>
            </p>
          </div>
        </div>

        {/* Practice Exercises */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
            🧩 Exerciții de Gândire
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                🤔 Gândește: WHILE sau FOR?
              </h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                  <p className="mb-2"><strong>Situația:</strong> "Vreau să număr de la 1 la 100."</p>
                  <Button 
                    onClick={() => toggleCode('exercise1')}
                    variant="outline"
                    size="sm"
                  >
                    Vezi Răspunsul
                  </Button>
                  <div id="exercise1" className="mt-4 text-sm text-gray-600 hidden">
                    <strong>FOR!</strong> Știu exact câți pași: 100. Drumul e trasat dinainte.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                  <p className="mb-2"><strong>Situația:</strong> "Întreb utilizatorul să aleagă din meniu până face o alegere validă."</p>
                  <Button 
                    onClick={() => toggleCode('exercise2')}
                    variant="outline"
                    size="sm"
                  >
                    Vezi Răspunsul
                  </Button>
                  <div id="exercise2" className="mt-4 text-sm text-gray-600 hidden">
                    <strong>WHILE!</strong> Nu știu câte încercări va face. Condiția e deschisă.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                  <p className="mb-2"><strong>Situația:</strong> "Trimit notificare fiecărui user din baza de date."</p>
                  <Button 
                    onClick={() => toggleCode('exercise3')}
                    variant="outline"
                    size="sm"
                  >
                    Vezi Răspunsul
                  </Button>
                  <div id="exercise3" className="mt-4 text-sm text-gray-600 hidden">
                    <strong>FOR!</strong> Am o listă definită de useri. Trec prin fiecare.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trade-offs and Big O Section */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-6 flex items-center gap-3">
            ⚖️ Trade-offs
          </h2>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl mb-6">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Ca în toate aspectele vieții, și în programare avem <strong>trade-off-uri</strong> (compromisuri).
              În fiecare secundă când calculatorul execută operațiile noastre binare pe care le vedem ca bucle,
              <strong> el consumă energie</strong> care se exprimă ca <strong>"Compute"</strong>.
            </p>
            
            <div className="bg-white rounded-xl p-4 border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-800 mb-2">🔋 Fiecare linie de cod = Energie consumată</h4>
              <p className="text-gray-700 text-sm">
                Când scrii <code>for i in range(1000000)</code>, calculatorul va executa un milion de pași.
                Fiecare pas consumă o cantitate mică de energie, dar la scară mare, aceasta devine semnificativă.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">🐌 Algoritmul Lent</h3>
              <div className="bg-white p-4 rounded-lg mb-3 font-mono text-sm">
                <span className="text-blue-600">for</span> i <span className="text-blue-600">in</span> range(n):<br/>
                &nbsp;&nbsp;<span className="text-blue-600">for</span> j <span className="text-blue-600">in</span> range(n):<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;print(i, j)
              </div>
              <p className="text-blue-700 text-sm">
                <strong>Pași executați:</strong> n × n = n²<br/>
                <strong>Pentru 1000 elemente:</strong> 1,000,000 pași<br/>
                <strong>Timp:</strong> Mult mai lent
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-800 mb-4">⚡ Algoritmul Rapid</h3>
              <div className="bg-white p-4 rounded-lg mb-3 font-mono text-sm">
                <span className="text-blue-600">for</span> i <span className="text-blue-600">in</span> range(n):<br/>
                &nbsp;&nbsp;print(i)
              </div>
              <p className="text-green-700 text-sm">
                <strong>Pași executați:</strong> n<br/>
                <strong>Pentru 1000 elemente:</strong> 1,000 pași<br/>
                <strong>Timp:</strong> De 1000 de ori mai rapid!
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl mb-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              📊 Introducere în O(n) - Limbajul Eficienței
            </h3>
            <p className="text-lg mb-4">
              <strong>O(n)</strong> (citit "Big O de n") este modul în care măsurăm <strong>eficiența unui algoritm</strong>.
              Este ca o <em>amprentă energetică</em> a codului tău.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="font-bold text-green-300">O(1) - Constant</div>
                <div>print("Hello") - mereu la fel de rapid</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="font-bold text-yellow-300">O(n) - Linear</div>
                <div>for i in range(n) - proporțional cu n</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="font-bold text-red-300">O(n²) - Pătratic</div>
                <div>bucle imbricate - foarte lent pentru n mare</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">🎯 De ce e important să știi asta?</h4>
            <div className="space-y-3 text-blue-700">
              <p>• <strong>La scală mică:</strong> Diferențele sunt neglijabile - calculatorul tău face față ușor</p>
              <p>• <strong>La scară mare:</strong> (milioane de utilizatori, big data) - diferențele devin dramatice</p>
              <p>• <strong>În AI/ML:</strong> Algoritmii ineficienți pot dura ore în loc de minute</p>
              <p>• <strong>În producție:</strong> Diferența între o aplicație rapidă și una lentă</p>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={() => toggleCode('big-o-examples')}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              🔍 Vezi Exemple Practice de O(n)
            </Button>
            
            <div id="big-o-examples" className="mt-6 hidden">
              <div className="bg-gray-900 text-white rounded-2xl p-6">
                <h5 className="text-xl font-bold text-amber-400 mb-4">⚡ Comparație Practică: Căutare în Listă</h5>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h6 className="text-lg font-semibold text-red-400 mb-3">❌ Algoritmul Ineficient - O(n²)</h6>
                    <div className="bg-black p-4 rounded-lg font-mono text-sm mb-3">
                      <span className="text-gray-400"># Găsește toate perechile care se adună la 10</span><br/>
                      numere = [1, 2, 3, 4, 5, 6, 7, 8, 9]<br/><br/>
                      
                      <span className="text-blue-400">for</span> i <span className="text-blue-400">in</span> numere:&nbsp;&nbsp;&nbsp;<span className="text-gray-400"># n pași</span><br/>
                      &nbsp;&nbsp;<span className="text-blue-400">for</span> j <span className="text-blue-400">in</span> numere:&nbsp;<span className="text-gray-400"># n pași pentru fiecare i</span><br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">if</span> i + j == 10:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">f"</span>{'{'}i{'}'} + {'{'}j{'}'} = 10<span className="text-yellow-300">"</span>)
                    </div>
                    <div className="text-red-300 text-sm">
                      <strong>Complexitate:</strong> O(n²)<br/>
                      <strong>Pentru 1000 numere:</strong> 1,000,000 de verificări<br/>
                      <strong>Timp:</strong> ~10 secunde
                    </div>
                  </div>

                  <div>
                    <h6 className="text-lg font-semibold text-green-400 mb-3">✅ Algoritmul Eficient - O(n)</h6>
                    <div className="bg-black p-4 rounded-lg font-mono text-sm mb-3">
                      <span className="text-gray-400"># Același rezultat, mult mai rapid</span><br/>
                      numere = [1, 2, 3, 4, 5, 6, 7, 8, 9]<br/>
                      vazute = set()<br/><br/>
                      
                      <span className="text-blue-400">for</span> num <span className="text-blue-400">in</span> numere:&nbsp;&nbsp;<span className="text-gray-400"># n pași</span><br/>
                      &nbsp;&nbsp;complement = 10 - num<br/>
                      &nbsp;&nbsp;<span className="text-blue-400">if</span> complement <span className="text-blue-400">in</span> vazute:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">f"</span>{'{'}complement{'}'} + {'{'}num{'}'} = 10<span className="text-yellow-300">"</span>)<br/>
                      &nbsp;&nbsp;vazute.add(num)
                    </div>
                    <div className="text-green-300 text-sm">
                      <strong>Complexitate:</strong> O(n)<br/>
                      <strong>Pentru 1000 numere:</strong> 1,000 de verificări<br/>
                      <strong>Timp:</strong> ~0.01 secunde
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-900 rounded-lg">
                  <h6 className="text-amber-300 font-semibold mb-2">📈 Diferența la Scară:</h6>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <strong>100 elemente:</strong><br/>
                      O(n²): 10,000 pași<br/>
                      O(n): 100 pași<br/>
                      <span className="text-green-400">Diferența: 100x</span>
                    </div>
                    <div>
                      <strong>1,000 elemente:</strong><br/>
                      O(n²): 1,000,000 pași<br/>
                      O(n): 1,000 pași<br/>
                      <span className="text-yellow-400">Diferența: 1,000x</span>
                    </div>
                    <div>
                      <strong>10,000 elemente:</strong><br/>
                      O(n²): 100,000,000 pași<br/>
                      O(n): 10,000 pași<br/>
                      <span className="text-red-400">Diferența: 10,000x</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-900 rounded-lg">
                  <h6 className="text-blue-300 font-semibold mb-2">🌍 Aplicații în Lumea Reală:</h6>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>Google Search:</strong> Algoritmi O(log n) pentru a căuta prin miliarde de pagini în millisecunde</p>
                    <p>• <strong>Facebook Feed:</strong> Algoritmi O(n log n) pentru a sorta postările pentru miliarde de utilizatori</p>
                    <p>• <strong>Netflix Recommendations:</strong> Algoritmi optimizați pentru a procesa terabytes de date</p>
                    <p>• <strong>ChatGPT:</strong> Transformers cu complexitate O(n²) pentru secvențe, optimizați masiv</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Inspiration */}
        <div className="artifact-card bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-3xl p-8 md:p-12 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            ✨ Prima Experiență cu Magia Calculatoarelor
          </h2>
          
          <div className="text-lg leading-relaxed mb-6">
            <p className="mb-4">
              Astăzi ai experientat pentru prima dată <strong>adevărata putere</strong> care separă calculatoarele de orice alt instrument:
            </p>
            <p className="mb-4">
              <strong>Capacitatea de a executa milioane de repetări perfecte, fără greșeală, fără oboseală.</strong>
            </p>
            <p className="mb-4">
              Dar ai învățat și că <strong>puterea vine cu responsabilitate</strong>: fiecare buclă consumă energie,
              și modul în care o scrii poate face diferența între un algoritm rapid și unul lent.
            </p>
            <p className="mb-6">
              Asta nu e doar programare - e <em>prima colaborare</em> între mintea ta creativă și o mașină care poate 
              accelera infinit orice idee repetitivă, <strong>cu condiția să gândești eficient</strong>.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">🎭 Ce ai învățat:</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>WHILE</strong> = repetiție cât timp condiția e adevărată</li>
              <li>✅ <strong>FOR</strong> = repetiție pe o secvență sau colecție</li>
              <li>✅ <strong>Trade-offs</strong> = fiecare buclă consumă energie și timp</li>
              <li>✅ <strong>O(n)</strong> = limbajul pentru a măsura eficiența algoritmilor</li>
              <li>✅ Atenție la buclele infinite (energia irosită fără final)</li>
              <li>✅ Puterea reală: combinarea buclelor eficiente cu gândire algoritmică</li>
            </ul>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🧠 × 🔁 × ⚡ × ⚖️ = 🪄</div>
            <p className="text-xl font-bold">
              Gândire × Repetiție × Viteză × Eficiență = Magie Adevărată
            </p>
            <p className="text-sm mt-2 opacity-90">
              La baza tuturor algoritmilor și sistemelor AI moderne
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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .artifact-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default LoopsArtifact;