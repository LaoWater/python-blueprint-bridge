import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const IfElseArtifact = () => {
  const navigate = useNavigate();
  const [hours, setHours] = useState(5);
  const [genre, setGenre] = useState('action');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState('');

  const runRecommendation = () => {
    let result = '';
    let explanation = '';
    
    if (hours > 10) {
      explanation = '🔥 Utilizator foarte activ (>10 ore)<br>';
      if (genre === 'action') {
        result = 'Top 10 filme de acțiune exclusive pentru tine!';
      } else if (genre === 'comedy') {
        result = 'Stand-up comedy specials noi disponibile!';
      } else {
        result = 'Seriale premiate recent - perfect pentru marathon!';
      }
    } else if (hours > 3) {
      explanation = '👍 Utilizator moderat (3-10 ore)<br>';
      result = `Continuă să vezi mai multe din categoria ${genre}`;
    } else {
      explanation = '🆕 Utilizator nou/inactiv (<3 ore)<br>';
      result = 'Descoperă Top 5 trending acum pe platformă!';
    }
    
    setRecommendation(explanation + '<strong>Recomandare:</strong> ' + result);
    setShowRecommendation(true);
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
          <div className="text-6xl mb-6 animate-pulse">🧠</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
            Gândirea Condițională
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
            Mintea ta ia sute de decizii pe zi. Acum învățăm să le traducem în cod.<br/>
            <strong>If-else nu e nimic nou - deja știi să gândești așa!</strong>
          </p>
        </div>

        {/* Introduction Card */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 flex items-center gap-3">
            🌅 O Dimineață Obișnuită
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-6 relative">
            <div className="absolute top-2 left-2 text-2xl">💭</div>
            <div className="ml-8 italic">
              Te trezești. Prima decizie: <strong>DACĂ</strong> e însorit, porți ochelari de soare, <strong>ALTFEL</strong> iei umbrela.<br/>
              Ajungi la bucătărie: <strong>DACĂ</strong> ai cafea, o prepari, <strong>ALTFEL DACĂ</strong> ai ceai, faci ceai, <strong>ALTFEL</strong> bei apă.<br/>
              Verifici telefonul: <strong>DACĂ</strong> ai notificări importante <strong>ȘI</strong> ai timp, le citești.
            </div>
          </div>

          <p className="text-lg text-gray-700">
            <strong>Felicitări!</strong> Tocmai ai executat 3 structuri if-else-elif în primele 5 minute ale zilei. 
            Programarea nu face decât să dea nume acestor procese mentale naturale.
          </p>
        </div>

        {/* Mental Model vs Code */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 flex items-center gap-3">
            🎭 Modelul Mental vs Cod
          </h2>
          
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Cum gândești tu:</h3>
          <div className="bg-gradient-to-r from-gray-100 to-blue-100 p-6 rounded-2xl mb-6 relative italic">
            <div className="absolute top-2 left-2 text-2xl">💭</div>
            <div className="ml-8">
              "Hmm, plouă? Da... atunci iau umbrela. Ah, stai, e și frig? Iau și geaca."
            </div>
          </div>

          <h3 className="text-xl font-semibold text-purple-700 mb-3">Cum scrii în Python:</h3>
          <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
            <span className="text-blue-400">if</span> ploua:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">"Iau umbrela"</span>)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">if</span> temperatura &lt; <span className="text-purple-400">15</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">"Iau și geaca"</span>)
          </div>

          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <div className="bg-white border-3 border-blue-600 px-6 py-3 rounded-lg font-bold">Gând</div>
            <span className="text-blue-600 text-2xl">→</span>
            <div className="bg-white border-3 border-blue-600 px-6 py-3 rounded-lg font-bold">Condiție</div>
            <span className="text-blue-600 text-2xl">→</span>
            <div className="bg-white border-3 border-blue-600 px-6 py-3 rounded-lg font-bold">Decizie</div>
            <span className="text-blue-600 text-2xl">→</span>
            <div className="bg-white border-3 border-blue-600 px-6 py-3 rounded-lg font-bold">Acțiune</div>
          </div>
        </div>

        {/* Real World Applications */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
            🌍 Unde Trăiesc Aceste Decizii
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📱", title: "Instagram", description: "DACĂ ai > 1000 followers, afișează badge-ul 'Popular'" },
              { icon: "🎬", title: "Netflix", description: "DACĂ ai văzut > 3 comedii ȘI e weekend, recomandă comedii" },
              { icon: "🛒", title: "Amazon", description: "DACĂ produs > 100 lei ȘI ești Prime, livrare gratuită" },
              { icon: "🚗", title: "Uber", description: "DACĂ e ora de vârf SAU plouă, aplică tarif dinamic" },
              { icon: "🎮", title: "Spotify", description: "DACĂ asculți > 5 piese dintr-un artist, sugerează follow" },
              { icon: "✈️", title: "Booking", description: "DACĂ caută > 3 ori același hotel, trimite reducere 10%" }
            ].map((example, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl transform hover:scale-105 transition-transform">
                <div className="text-3xl mb-3">{example.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{example.title}</h4>
                <p className="text-sm opacity-90">{example.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6 flex items-center gap-3">
            🎯 Încearcă Tu - Sistemul de Recomandări
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="mb-4 text-gray-700">Simulează algoritmul de recomandare al unei aplicații de streaming:</p>
            
            <div className="flex gap-4 flex-wrap mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ore vizionate săptămâna asta:
                </label>
                <input 
                  type="number" 
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                  min="0" 
                  max="100"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gen preferat:
                </label>
                <select 
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="action">Acțiune</option>
                  <option value="comedy">Comedie</option>
                  <option value="drama">Dramă</option>
                </select>
              </div>
            </div>
            
            <Button 
              onClick={runRecommendation}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              Rulează Algoritmul
            </Button>
            
            {showRecommendation && (
              <div className="mt-6 p-4 bg-white border-2 border-green-500 rounded-lg animate-fadeIn">
                <strong>Decizia algoritmului:</strong>
                <div dangerouslySetInnerHTML={{ __html: recommendation }} />
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-green-700 mb-3">Codul din spate:</h3>
          <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
            ore_vizionate = <span className="text-purple-400">{hours}</span><br/>
            gen_preferat = <span className="text-yellow-300">"{genre}"</span><br/><br/>
            
            <span className="text-blue-400">if</span> ore_vizionate &gt; <span className="text-purple-400">10</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500"># Utilizator foarte activ</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">if</span> gen_preferat == <span className="text-yellow-300">"action"</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recomandare = <span className="text-yellow-300">"Top 10 filme de acțiune exclusive"</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">elif</span> gen_preferat == <span className="text-yellow-300">"comedy"</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recomandare = <span className="text-yellow-300">"Stand-up comedy specials noi"</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">else</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recomandare = <span className="text-yellow-300">"Seriale premiate recent"</span><br/>
            <span className="text-blue-400">elif</span> ore_vizionate &gt; <span className="text-purple-400">3</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;recomandare = <span className="text-yellow-300">f"Continuă să vezi {genre}"</span><br/>
            <span className="text-blue-400">else</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;recomandare = <span className="text-yellow-300">"Top 5 trending acum"</span>
          </div>
        </div>

        {/* Mental Exercises */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-600 mb-6 flex items-center gap-3">
            🧩 Exerciții Mentale
          </h2>
          
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-6 relative">
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm">💡</div>
            <strong>Secretul:</strong> Înainte să scrii cod, gândește-te cum ai explica decizia unui prieten.
          </div>

          <h3 className="text-xl font-semibold text-yellow-700 mb-4">Transformă gândurile în cod:</h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="mb-4"><strong>Gând:</strong> "Dacă e weekend și am terminat treaba, mă uit la un film, altfel lucrez."</p>
              <Button 
                onClick={() => toggleCode('code1')}
                variant="outline"
                className="mb-4"
              >
                Vezi Codul
              </Button>
              <div id="code1" className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm hidden">
                <span className="text-blue-400">if</span> e_weekend <span className="text-blue-400">and</span> treaba_terminata:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">"Film time! 🎬"</span>)<br/>
                <span className="text-blue-400">else</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">"La muncă! 💼"</span>)
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="mb-4"><strong>Gând:</strong> "Comanda e gratis dacă: e peste 100 lei SAU sunt client premium SAU e prima comandă."</p>
              <Button 
                onClick={() => toggleCode('code2')}
                variant="outline"
                className="mb-4"
              >
                Vezi Codul
              </Button>
              <div id="code2" className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm hidden">
                <span className="text-blue-400">if</span> total &gt; <span className="text-purple-400">100</span> <span className="text-blue-400">or</span> client_premium <span className="text-blue-400">or</span> prima_comanda:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;transport = <span className="text-purple-400">0</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">"Transport gratuit! 🚚"</span>)<br/>
                <span className="text-blue-400">else</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;transport = <span className="text-purple-400">15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Inspiration */}
        <div className="artifact-card bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-8 md:p-12 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            ✨ Gândește-te la Asta
          </h2>
          
          <p className="text-lg leading-relaxed mb-6">
            Fiecare aplicație pe care o folosești - de la alarma de dimineață până la ultima verificare a Instagram-ului seara - 
            e construită din mii de decizii if-else care lucrează împreună.
          </p>
          
          <p className="text-lg leading-relaxed mb-8">
            <strong>Tu deja știi să gândești algoritmic.</strong> Acum doar înveți să vorbești limba calculatorului.
          </p>
          
          <div className="text-center text-4xl">
            🧠 + 💻 = 🚀
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease;
        }

        .artifact-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default IfElseArtifact;