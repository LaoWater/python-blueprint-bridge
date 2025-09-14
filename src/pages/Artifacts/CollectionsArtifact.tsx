import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, Plus, Minus, Search } from 'lucide-react';

const CollectionsArtifact = () => {
  const navigate = useNavigate();
  
  // Shopping List State (Lists Demo)
  const [shoppingItems, setShoppingItems] = useState(['🍎 Mere', '🥛 Lapte', '🍞 Pâine']);
  const [newItem, setNewItem] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  // GPS Coordinates State (Tuples Demo)
  const [locations, setLocations] = useState([
    { name: 'Casa', coords: [44.4268, 26.1025], locked: true },
    { name: 'Școala', coords: [44.4378, 26.0967], locked: true },
    { name: 'Parc', coords: [44.4345, 26.1005], locked: true }
  ]);
  
  // Survey Responses State (Sets Demo)
  const [allResponses, setAllResponses] = useState(['Da', 'Nu', 'Da', 'Nu', 'Da', 'Poate', 'Da', 'Nu', 'Poate']);
  const [uniqueResponses, setUniqueResponses] = useState(new Set());
  const [showSetDemo, setShowSetDemo] = useState(false);
  
  // Student Catalog State (Dictionaries Demo)
  const [students, setStudents] = useState({
    'Ana123': { nume: 'Ana Popescu', clasa: '10A', note: [9, 8, 10] },
    'Ion456': { nume: 'Ion Marinescu', clasa: '10B', note: [7, 9, 8] },
    'Maria789': { nume: 'Maria Ionescu', clasa: '10A', note: [10, 9, 9] }
  });
  const [selectedStudent, setSelectedStudent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Collection Type Selector
  const [activeCollection, setActiveCollection] = useState('lists');

  // Shopping List Functions
  const addShoppingItem = () => {
    if (newItem.trim()) {
      setShoppingItems(prev => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeShoppingItem = (index: number) => {
    setShoppingItems(prev => prev.filter((_, i) => i !== index));
  };

  const moveItemUp = (index: number) => {
    if (index > 0) {
      const newItems = [...shoppingItems];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setShoppingItems(newItems);
    }
  };

  const moveItemDown = (index: number) => {
    if (index < shoppingItems.length - 1) {
      const newItems = [...shoppingItems];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setShoppingItems(newItems);
    }
  };

  // Sets Demo Functions
  const processResponses = () => {
    const uniqueSet = new Set(allResponses);
    setUniqueResponses(uniqueSet);
    setShowSetDemo(true);
  };

  const resetSetsDemo = () => {
    setUniqueResponses(new Set());
    setShowSetDemo(false);
  };

  // Dictionary Functions
  const getAverageGrade = (grades: number[]) => {
    return (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1);
  };

  const filteredStudents = Object.entries(students).filter(([id, student]) =>
    student.nume.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.clasa.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="text-6xl mb-6 animate-bounce-slow">📦</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
            Colecții în Python
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
            Organizarea lumii prin structuri de date<br/>
            <strong>De la valori izolate la sisteme care reflectă viața reală! ✨</strong>
          </p>
        </div>

        {/* Introduction Card */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 flex items-center gap-3">
            🎨 Pensulele Programatorului
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-6 relative">
            <div className="absolute top-2 left-2 text-2xl">🖼️</div>
            <div className="ml-8 text-lg">
              În viața reală, nu gândim în termeni de „o singură variabilă", ci în <strong>liste de cumpărături</strong>, 
              <strong> seturi de reguli</strong>, <strong>dicționare de contacte</strong>.<br/>
              Python ne oferă patru instrumente fundamentale pentru a organiza lumea:
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-bold">Liste</h4>
              <p className="text-xs opacity-90">Cutii flexibile</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">📍</div>
              <h4 className="font-bold">Tupluri</h4>
              <p className="text-xs opacity-90">Cutii sigilate</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-bold">Seturi</h4>
              <p className="text-xs opacity-90">Mulțimi unice</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-bold">Dicționare</h4>
              <p className="text-xs opacity-90">Tabele cu sens</p>
            </div>
          </div>
        </div>

        {/* Collection Type Selector */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
            🚀 Explorează Colecțiile Interactive
          </h2>
          
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {[
              { id: 'lists', title: 'Liste', icon: '📝', color: 'green' },
              { id: 'tuples', title: 'Tupluri', icon: '📍', color: 'blue' },
              { id: 'sets', title: 'Seturi', icon: '🎯', color: 'purple' },
              { id: 'dicts', title: 'Dicționare', icon: '📚', color: 'orange' }
            ].map((type) => (
              <Button
                key={type.id}
                onClick={() => setActiveCollection(type.id)}
                className={`px-6 py-3 text-lg font-semibold transition-all ${
                  activeCollection === type.id
                    ? `bg-${type.color}-600 text-white shadow-lg scale-105`
                    : `bg-${type.color}-100 text-${type.color}-700 hover:bg-${type.color}-200`
                }`}
              >
                <span className="mr-2">{type.icon}</span>
                {type.title}
              </Button>
            ))}
          </div>

          {/* Lists Demo */}
          {activeCollection === 'lists' && (
            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                📝 Liste - Lista de Cumpărături
              </h3>
              <p className="text-green-800 mb-6">
                <strong>Caracteristici:</strong> Flexibile, ordonate, modificabile. Ca un carneț unde tot poți adăuga și șterge.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">🛒 Lista ta de cumpărături:</h4>
                  <div className="bg-white rounded-lg p-4 min-h-[200px] border-2 border-green-300">
                    {shoppingItems.length === 0 ? (
                      <p className="text-gray-500 italic">Lista este goală...</p>
                    ) : (
                      <ul className="space-y-2">
                        {shoppingItems.map((item, index) => (
                          <li
                            key={index}
                            className={`flex items-center justify-between p-2 rounded transition-all ${
                              selectedIndex === index ? 'bg-green-200' : 'hover:bg-green-100'
                            }`}
                            onClick={() => setSelectedIndex(index === selectedIndex ? -1 : index)}
                          >
                            <span>{index + 1}. {item}</span>
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); moveItemUp(index); }}
                                disabled={index === 0}
                                className="text-green-600 hover:text-green-800 disabled:opacity-30 text-sm"
                                title="Mută în sus"
                              >
                                ↑
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); moveItemDown(index); }}
                                disabled={index === shoppingItems.length - 1}
                                className="text-green-600 hover:text-green-800 disabled:opacity-30 text-sm"
                                title="Mută în jos"
                              >
                                ↓
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeShoppingItem(index); }}
                                className="text-red-600 hover:text-red-800 ml-2"
                                title="Șterge"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addShoppingItem()}
                      placeholder="Adaugă un produs..."
                      className="flex-1 px-3 py-2 border border-green-300 rounded-lg"
                    />
                    <Button
                      onClick={addShoppingItem}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">💻 Codul din spate:</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <span className="text-gray-500"># Crearea unei liste</span><br/>
                    lista_cumparaturi = [<span className="text-yellow-300">"🍎 Mere"</span>, <span className="text-yellow-300">"🥛 Lapte"</span>]<br/><br/>
                    
                    <span className="text-gray-500"># Adăugarea unui element</span><br/>
                    lista_cumparaturi.append(<span className="text-yellow-300">"🍞 Pâine"</span>)<br/><br/>
                    
                    <span className="text-gray-500"># Accesarea unui element</span><br/>
                    primul_produs = lista_cumparaturi[<span className="text-purple-400">0</span>]<br/><br/>
                    
                    <span className="text-gray-500"># Numărul de elemente</span><br/>
                    numar_produse = len(lista_cumparaturi)<br/><br/>
                    
                    <span className="text-gray-500"># Parcurgerea listei</span><br/>
                    <span className="text-blue-400">for</span> produs <span className="text-blue-400">in</span> lista_cumparaturi:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">f"Cumpără: </span>{'{'}produs{'}'}<span className="text-yellow-300">"</span>)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tuples Demo */}
          {activeCollection === 'tuples' && (
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                📍 Tupluri - Coordonate GPS
              </h3>
              <p className="text-blue-800 mb-6">
                <strong>Caracteristici:</strong> Fixe, sigure, neschimbabile. Ca o fotografie care surprinde un moment pentru totdeauna.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">🗺️ Locații importante:</h4>
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                    {locations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-b border-blue-100 last:border-b-0">
                        <div>
                          <span className="font-medium">{location.name}</span>
                          <div className="text-sm text-gray-600">
                            Lat: {location.coords[0]}, Long: {location.coords[1]}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {location.locked ? '🔒 Blocat' : '🔓 Editabil'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>💡 Observație:</strong> Coordonatele GPS nu se pot modifica accidental. 
                      Sunt date fixe și de încredere - exact ca tuplurile în Python!
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">💻 Codul din spate:</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <span className="text-gray-500"># Crearea unui tuplu (coordonate fixe)</span><br/>
                    casa = (<span className="text-purple-400">44.4268</span>, <span className="text-purple-400">26.1025</span>)<br/>
                    scoala = (<span className="text-purple-400">44.4378</span>, <span className="text-purple-400">26.0967</span>)<br/><br/>
                    
                    <span className="text-gray-500"># Accesarea elementelor</span><br/>
                    latitudine = casa[<span className="text-purple-400">0</span>]<br/>
                    longitudine = casa[<span className="text-purple-400">1</span>]<br/><br/>
                    
                    <span className="text-gray-500"># Tuplurile nu se pot modifica!</span><br/>
                    <span className="text-gray-500"># casa[0] = 45.0  # Eroare!</span><br/><br/>
                    
                    <span className="text-gray-500"># Parcurgerea unui tuplu</span><br/>
                    <span className="text-blue-400">for</span> coordonata <span className="text-blue-400">in</span> casa:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;print(coordonata)<br/><br/>
                    
                    <span className="text-gray-500"># Unpacking (destructurare)</span><br/>
                    lat, lon = casa<br/>
                    print(<span className="text-yellow-300">f"Lat: </span>{'{'}lat{'}'}, <span className="text-yellow-300">Long: </span>{'{'}lon{'}'}<span className="text-yellow-300">"</span>)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sets Demo */}
          {activeCollection === 'sets' && (
            <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
              <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                🎯 Seturi - Sondaj cu Răspunsuri Unice
              </h3>
              <p className="text-purple-800 mb-6">
                <strong>Caracteristici:</strong> Fără duplicate, ordine fără repetiție. Ca un club exclusivist unde fiecare element intră o singură dată.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-3">📊 Toate răspunsurile la sondaj:</h4>
                  <div className="bg-white rounded-lg p-4 border-2 border-purple-300 min-h-[120px]">
                    <div className="flex flex-wrap gap-2">
                      {allResponses.map((response, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                        >
                          {response}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      Total răspunsuri: {allResponses.length}
                    </div>
                  </div>
                  
                  {showSetDemo && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-purple-700 mb-3">✨ Răspunsuri unice (după eliminarea duplicatelor):</h4>
                      <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                        <div className="flex flex-wrap gap-2">
                          {Array.from(uniqueResponses).map((response, index) => (
                            <span
                              key={index}
                              className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {response}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 text-sm text-gray-600">
                          Răspunsuri unice: {uniqueResponses.size}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={processResponses}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Elimină Duplicatele
                    </Button>
                    <Button
                      onClick={resetSetsDemo}
                      variant="outline"
                      className="border-purple-300 text-purple-700"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-700 mb-3">💻 Codul din spate:</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <span className="text-gray-500"># Lista cu duplicate</span><br/>
                    raspunsuri = [<span className="text-yellow-300">"Da"</span>, <span className="text-yellow-300">"Nu"</span>, <span className="text-yellow-300">"Da"</span>, <span className="text-yellow-300">"Poate"</span>]<br/><br/>
                    
                    <span className="text-gray-500"># Crearea unui set (elimină automat duplicatele)</span><br/>
                    raspunsuri_unice = set(raspunsuri)<br/><br/>
                    
                    <span className="text-gray-500"># Adăugarea unui element în set</span><br/>
                    raspunsuri_unice.add(<span className="text-yellow-300">"Da"</span>)  <span className="text-gray-500"># Nu se va duplica!</span><br/><br/>
                    
                    <span className="text-gray-500"># Verificarea existenței</span><br/>
                    <span className="text-blue-400">if</span> <span className="text-yellow-300">"Da"</span> <span className="text-blue-400">in</span> raspunsuri_unice:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">"Răspunsul 'Da' există"</span>)<br/><br/>
                    
                    <span className="text-gray-500"># Numărul de elemente unice</span><br/>
                    numar_unic = len(raspunsuri_unice)<br/><br/>
                    
                    <span className="text-gray-500"># Operații pe seturi</span><br/>
                    set1 = {'{'}1, 2, 3{'}'}<br/>
                    set2 = {'{'}3, 4, 5{'}'}<br/>
                    intersectie = set1 & set2  <span className="text-gray-500"># {3}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dictionaries Demo */}
          {activeCollection === 'dicts' && (
            <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
              <h3 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                📚 Dicționare - Catalog de Studenți
              </h3>
              <p className="text-orange-800 mb-6">
                <strong>Caracteristici:</strong> Relații cheie → valoare, informație cu sens. Ca o minidatabază personală.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">👨‍🎓 Căutare în catalog:</h4>
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Caută după nume sau clasă..."
                        className="flex-1 px-3 py-2 border border-orange-300 rounded-lg"
                      />
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-orange-300 max-h-[400px] overflow-y-auto">
                    {filteredStudents.length === 0 ? (
                      <p className="text-gray-500 italic">Nu am găsit studenți...</p>
                    ) : (
                      filteredStudents.map(([id, student]) => (
                        <div
                          key={id}
                          className={`p-4 border-b border-orange-100 last:border-b-0 cursor-pointer transition-all ${
                            selectedStudent === id ? 'bg-orange-100' : 'hover:bg-orange-50'
                          }`}
                          onClick={() => setSelectedStudent(selectedStudent === id ? '' : id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-orange-800">{student.nume}</h5>
                              <div className="text-sm text-gray-600">
                                ID: {id} | Clasa: {student.clasa}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-orange-600">
                                {getAverageGrade(student.note)}
                              </div>
                              <div className="text-xs text-gray-500">Medie</div>
                            </div>
                          </div>
                          
                          {selectedStudent === id && (
                            <div className="mt-3 pt-3 border-t border-orange-200">
                              <h6 className="font-medium text-orange-700 mb-2">Note detaliate:</h6>
                              <div className="flex gap-2">
                                {student.note.map((nota, index) => (
                                  <span
                                    key={index}
                                    className={`px-2 py-1 rounded text-sm ${
                                      nota >= 9 ? 'bg-green-100 text-green-800' :
                                      nota >= 7 ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {nota}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">💻 Codul din spate:</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <span className="text-gray-500"># Crearea unui dicționar</span><br/>
                    studenti = {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"Ana123"</span>: {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"nume"</span>: <span className="text-yellow-300">"Ana Popescu"</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"clasa"</span>: <span className="text-yellow-300">"10A"</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"note"</span>: [<span className="text-purple-400">9</span>, <span className="text-purple-400">8</span>, <span className="text-purple-400">10</span>]<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                    {'}'}<br/><br/>
                    
                    <span className="text-gray-500"># Accesarea datelor</span><br/>
                    nume = studenti[<span className="text-yellow-300">"Ana123"</span>][<span className="text-yellow-300">"nume"</span>]<br/>
                    note = studenti[<span className="text-yellow-300">"Ana123"</span>][<span className="text-yellow-300">"note"</span>]<br/><br/>
                    
                    <span className="text-gray-500"># Calcularea mediei</span><br/>
                    medie = sum(note) / len(note)<br/><br/>
                    
                    <span className="text-gray-500"># Parcurgerea dicționarului</span><br/>
                    <span className="text-blue-400">for</span> id_student, date <span className="text-blue-400">in</span> studenti.items():<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-yellow-300">f"</span>{'{'}id_student{'}'}: <span className="text-yellow-300">{'{'}date['nume']{'}'}"</span>)<br/><br/>
                    
                    <span className="text-gray-500"># Adăugarea unui student nou</span><br/>
                    studenti[<span className="text-yellow-300">"Maria999"</span>] = {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"nume"</span>: <span className="text-yellow-300">"Maria Vasile"</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"clasa"</span>: <span className="text-yellow-300">"10C"</span><br/>
                    {'}'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real World Applications */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 mb-6 flex items-center gap-3">
            🌍 Aplicații în Lumea Reală
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "🛒",
                title: "E-commerce",
                list: "Lista produselor în coș",
                tuple: "Coordonatele adresei de livrare",
                set: "Categoriile unice ale produselor",
                dict: "Datele clientului (nume, email, telefon)",
                color: "blue"
              },
              {
                icon: "🎵",
                title: "Spotify",
                list: "Playlist-urile tale favorite",
                tuple: "Durata și artistul unei melodii",
                set: "Genurile muzicale unice",
                dict: "Informații despre artist (nume, țară, albume)",
                color: "emerald"
              },
              {
                icon: "📱",
                title: "Instagram",
                list: "Feed-ul de postări",
                tuple: "Coordonatele unei fotografii",
                set: "Hashtag-urile unice",
                dict: "Profilul utilizatorului (followers, posts, bio)",
                color: "rose"
              },
              {
                icon: "🎮",
                title: "Gaming",
                list: "Inventarul jucătorului",
                tuple: "Poziția personajului (x, y, z)",
                set: "Achievement-urile unice obținute",
                dict: "Statisticile jucătorului (level, XP, skills)",
                color: "purple"
              }
            ].map((app, index) => (
              <div key={index} className={`${
                app.title === 'Instagram' 
                  ? 'bg-gradient-to-br from-pink-100 to-purple-100 text-purple-800' 
                  : `bg-gradient-to-br from-${app.color}-500 to-${app.color}-600 text-white`
              } p-6 rounded-2xl`}>
                <div className="text-3xl mb-4 text-center">{app.icon}</div>
                <h4 className="text-xl font-bold mb-4 text-center">{app.title}</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className={app.title === 'Instagram' ? 'text-pink-600' : 'text-yellow-300'}>📝</span>
                    <div>
                      <strong>Liste:</strong> {app.list}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className={app.title === 'Instagram' ? 'text-pink-600' : 'text-yellow-300'}>📍</span>
                    <div>
                      <strong>Tupluri:</strong> {app.tuple}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className={app.title === 'Instagram' ? 'text-pink-600' : 'text-yellow-300'}>🎯</span>
                    <div>
                      <strong>Seturi:</strong> {app.set}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className={app.title === 'Instagram' ? 'text-pink-600' : 'text-yellow-300'}>📚</span>
                    <div>
                      <strong>Dicționare:</strong> {app.dict}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Art of Programming */}
        <div className="artifact-card bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 flex items-center gap-3">
            🎨 Arta Programării cu Colecții
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-green-100 to-green-200 rounded-2xl">
              <div className="text-4xl mb-4">🖌️</div>
              <h4 className="font-bold text-green-800 mb-2">Liste</h4>
              <p className="text-sm text-green-700">
                <strong>Flexibilitate</strong><br/>
                Linii fluide care se adaptează la nevoile noastre
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl">
              <div className="text-4xl mb-4">📐</div>
              <h4 className="font-bold text-blue-800 mb-2">Tupluri</h4>
              <p className="text-sm text-blue-700">
                <strong>Stabilitate</strong><br/>
                Contururi rigide care protejează datele importante
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-purple-100 to-purple-200 rounded-2xl">
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="font-bold text-purple-800 mb-2">Seturi</h4>
              <p className="text-sm text-purple-700">
                <strong>Claritate</strong><br/>
                Culori pure fără amestec sau repetare
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-orange-100 to-orange-200 rounded-2xl">
              <div className="text-4xl mb-4">🗺️</div>
              <h4 className="font-bold text-orange-800 mb-2">Dicționare</h4>
              <p className="text-sm text-orange-700">
                <strong>Sens</strong><br/>
                Hărți clare care leagă idei prin relații
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl text-center">
            <h4 className="text-xl font-bold mb-3">🎼 Compunerea Structurilor de Date</h4>
            <p className="text-lg">
              Este ca în artă: uneori avem nevoie de <strong>linii fluide</strong> (liste), 
              alteori de <strong>contururi rigide</strong> (tupluri), 
              de <strong>culori pure</strong> (seturi) sau de <strong>hărți clare</strong> (dicționare).
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
              <h4 className="text-lg font-semibold text-indigo-700 mb-4">
                🤔 Ce colecție ai alege?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                  <p className="mb-2"><strong>Situația:</strong> "Stochezi numele jucătorilor într-o echipă de fotbal care se pot schimba."</p>
                  <Button 
                    onClick={() => toggleCode('exercise1')}
                    variant="outline"
                    size="sm"
                  >
                    Vezi Răspunsul
                  </Button>
                  <div id="exercise1" className="mt-4 text-sm text-gray-600 hidden">
                    <strong>LISTĂ!</strong> Jucătorii se pot schimba, pot fi transferați, ordinea poate conta (căpitanul primul).
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                  <p className="mb-2"><strong>Situația:</strong> "Coordonatele exacte ale unei cladiri istorice."</p>
                  <Button 
                    onClick={() => toggleCode('exercise2')}
                    variant="outline"
                    size="sm"
                  >
                    Vezi Răspunsul
                  </Button>
                  <div id="exercise2" className="mt-4 text-sm text-gray-600 hidden">
                    <strong>TUPLU!</strong> Coordonatele sunt fixe și nu trebuie să se schimbe niciodată.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                  <p className="mb-2"><strong>Situația:</strong> "Colectezi toate limbile de programare pe care le știi."</p>
                  <Button 
                    onClick={() => toggleCode('exercise3')}
                    variant="outline"
                    size="sm"
                  >
                    Vezi Răspunsul
                  </Button>
                  <div id="exercise3" className="mt-4 text-sm text-gray-600 hidden">
                    <strong>SET!</strong> Nu ai nevoie de duplicate - știi Python o singură dată, nu de 3 ori.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                  <p className="mb-2"><strong>Situația:</strong> "Stochezi informații despre produsele dintr-un magazin: nume, preț, stoc."</p>
                  <Button 
                    onClick={() => toggleCode('exercise4')}
                    variant="outline"
                    size="sm"
                  >
                    Vezi Răspunsul
                  </Button>
                  <div id="exercise4" className="mt-4 text-sm text-gray-600 hidden">
                    <strong>DICȚIONAR!</strong> Ai nevoie de relații cheie-valoare pentru a lega numele cu prețul și stocul.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Inspiration */}
        <div className="artifact-card bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-8 md:p-12 shadow-2xl animate-slideIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            ✨ De la Valori Izolate la Sisteme Vii
          </h2>
          
          <div className="text-lg leading-relaxed mb-6">
            <p className="mb-4">
              Astăzi ai învățat să <strong>organizezi lumea</strong> prin structuri de date. Nu mai gândești în termeni de variabile izolate,
              ci în <strong>sisteme care reflectă viața reală</strong>.
            </p>
            <p className="mb-4">
              <strong>Colecțiile sunt limbajul</strong> prin care programatorul trece de la simplicitate la complexitate,
              de la una la multe, de la caos la ordine.
            </p>
            <p className="mb-6">
              Ele sunt <em>pensulele, culorile și pânza</em> cu care pictezi sisteme complexe, pornind de la cele mai simple date.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">🎭 Ce ai învățat:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2">
                <li>✅ <strong>Liste</strong> = flexibile, ordonate, modificabile</li>
                <li>✅ <strong>Tupluri</strong> = fixe, sigure, neschimbabile</li>
              </ul>
              <ul className="space-y-2">
                <li>✅ <strong>Seturi</strong> = unice, fără duplicate</li>
                <li>✅ <strong>Dicționare</strong> = relații cheie-valoare cu sens</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">📦 + 🎨 + 🧠 = 🌍</div>
            <p className="text-xl font-bold">
              Colecții + Artă + Logică = Sisteme care Modelează Realitatea
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

        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .artifact-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CollectionsArtifact;