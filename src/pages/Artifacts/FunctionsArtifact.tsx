import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, User, Calculator, Coffee, FileText, Users, Zap } from 'lucide-react';

const FunctionsArtifact = () => {
  const navigate = useNavigate();
  
  // Basic Functions Demo State
  const [greetingName, setGreetingName] = useState('');
  const [greetingOutput, setGreetingOutput] = useState('');
  
  // Parameters Demo State (Coffee Orders)
  const [coffeeType, setCoffeeType] = useState('Espresso');
  const [sugarLevel, setSugarLevel] = useState('fără zahăr');
  const [coffeeOrder, setCoffeeOrder] = useState('');
  
  // Return Values Demo State (Salary Calculator)
  const [salary, setSalary] = useState(5000);
  const [experience, setExperience] = useState(2);
  const [calculatedBonus, setCalculatedBonus] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  
  // Employee Management System State
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Ana Popescu', position: 'Developer', salary: 8000, experience: 3 },
    { id: 2, name: 'Ion Marinescu', position: 'Designer', salary: 6500, experience: 2 },
    { id: 3, name: 'Maria Ionescu', position: 'Manager', salary: 12000, experience: 8 }
  ]);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', salary: 0, experience: 0 });
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [totalPayroll, setTotalPayroll] = useState(0);
  const [averageSalary, setAverageSalary] = useState(0);
  
  // Lambda Functions Demo State (Sorting Demo)
  const [products, setProducts] = useState([
    { name: 'Laptop', price: 3500, rating: 4.5 },
    { name: 'Mouse', price: 150, rating: 4.8 },
    { name: 'Keyboard', price: 300, rating: 4.3 },
    { name: 'Monitor', price: 1200, rating: 4.7 }
  ]);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedProducts, setSortedProducts] = useState([...products]);
  
  // Function Composition Demo State (Student System)
  const [studentData, setStudentData] = useState([
    { name: 'Alex Popescu', grades: [9, 8, 10, 7], subject: 'Matematică' },
    { name: 'Maria Ionescu', grades: [10, 9, 9, 8], subject: 'Informatică' },
    { name: 'Ion Marinescu', grades: [7, 8, 6, 9], subject: 'Fizică' }
  ]);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [calculatedAverage, setCalculatedAverage] = useState(0);
  const [studentStatus, setStudentStatus] = useState('');
  
  // Active demo selector
  const [activeDemo, setActiveDemo] = useState('basic');

  // Basic Functions Demo
  const createGreeting = () => {
    if (greetingName.trim()) {
      setGreetingOutput(`Salut, ${greetingName}! 👋 Bun venit în lumea funcțiilor!`);
    }
  };

  // Parameters Demo (Coffee Orders)
  const orderCoffee = () => {
    const order = `☕ Comandă: ${coffeeType} ${sugarLevel}. Comanda ta este pregătită!`;
    setCoffeeOrder(order);
  };

  // Return Values Demo (Salary Calculator)
  const calculateSalary = () => {
    const bonus = experience >= 5 ? salary * 0.2 : 
                  experience >= 3 ? salary * 0.15 : 
                  experience >= 1 ? salary * 0.1 : 0;
    
    setCalculatedBonus(bonus);
    setTotalSalary(salary + bonus);
  };

  // Employee Management Functions
  const addEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.salary > 0) {
      const employee = {
        id: employees.length + 1,
        ...newEmployee
      };
      setEmployees(prev => [...prev, employee]);
      setNewEmployee({ name: '', position: '', salary: 0, experience: 0 });
      setShowEmployeeForm(false);
      calculatePayroll([...employees, employee]);
    }
  };

  const calculatePayroll = (employeeList = employees) => {
    const total = employeeList.reduce((sum, emp) => sum + emp.salary, 0);
    const average = employeeList.length > 0 ? total / employeeList.length : 0;
    setTotalPayroll(total);
    setAverageSalary(average);
  };

  const removeEmployee = (id: number) => {
    const newEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(newEmployees);
    calculatePayroll(newEmployees);
  };

  // Lambda Functions Demo (Sorting)
  const sortProducts = () => {
    let sorted = [...products];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'rating') {
        comparison = a.rating - b.rating;
      }
      
      return sortDirection === 'desc' ? -comparison : comparison;
    });
    
    setSortedProducts(sorted);
  };

  // Function Composition Demo (Student System)
  const calculateStudentAverage = (grades: number[]) => {
    return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
  };

  const determineStatus = (average: number) => {
    if (average >= 9) return '🏆 Excelent';
    if (average >= 8) return '⭐ Foarte bine';
    if (average >= 7) return '✅ Bine';
    if (average >= 5) return '📝 Suficient';
    return '❌ Insuficient';
  };

  const processStudent = () => {
    const student = studentData[selectedStudent];
    const average = calculateStudentAverage(student.grades);
    const status = determineStatus(average);
    
    setCalculatedAverage(Number(average.toFixed(2)));
    setStudentStatus(status);
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
    // Initialize payroll calculation
    calculatePayroll();
    
    // Initialize product sorting
    setSortedProducts([...products]);
    
    // Add scroll animations
    const cards = document.querySelectorAll('.artifact-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/foundations')}
            className="hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi la Fundamente
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🌀 Sesiunea 5: Funcțiile - Super-puterea din Python
          </h1>
        </div>

        {/* Introduction */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-lg artifact-card">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 Primul pas către arhitectura codului
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Dacă buclele ne-au arătat <strong>repetiția</strong>, funcțiile ne dau puterea <strong>organizării</strong>.
              <br></br>Ele sunt ca niște asistenți personali: Tu spui ce să facă, iar ei execută perfect de fiecare dată.
            </p>
          </div>
        </div>

        {/* Demo Selector */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Demonstrații Interactive
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { id: 'basic', label: 'Funcții de Bază', icon: User },
              { id: 'parameters', label: 'Parametri', icon: Coffee },
              { id: 'returns', label: 'Return Values', icon: Calculator },
              { id: 'system', label: 'Sistem Complex', icon: Users },
              { id: 'lambda', label: 'Lambda', icon: Zap },
              { id: 'composition', label: 'Compoziție', icon: FileText }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeDemo === id ? "default" : "outline"}
                onClick={() => setActiveDemo(id)}
                className="h-auto p-3 flex flex-col items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs text-center">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Basic Functions Demo */}
        {activeDemo === 'basic' && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <User className="h-6 w-6" />
              1. Funcții de Bază - Primul Asistent Personal
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">✨ Demonstrație Interactivă</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Introdu numele tău:
                    </label>
                    <input
                      type="text"
                      value={greetingName}
                      onChange={(e) => setGreetingName(e.target.value)}
                      placeholder="ex: Ana"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <Button 
                    onClick={createGreeting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!greetingName.trim()}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Apelează funcția salut()
                  </Button>
                  
                  {greetingOutput && (
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <p className="text-green-800 font-medium">📤 Output:</p>
                      <p className="text-green-700">{greetingOutput}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`def salut(nume):
    """
    Funcție simplă care salută o persoană
    Parametru: nume (string)
    """
    mesaj = f"Salut, {'{'}nume{'}'}! 👋"
    mesaj += " Bun venit în lumea funcțiilor!"
    print(mesaj)

# Apelare funcție
salut("${greetingName || 'Ana'}")

# Rezultat: ${greetingOutput || 'Salut, Ana! 👋 Bun venit în lumea funcțiilor!'}`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">🎯 De ce funcții?</h5>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• <strong>Reutilizare</strong>: O singură definiție, folosită oriunde</li>
                    <li>• <strong>Claritate</strong>: Codul este organizat în piese logice</li>
                    <li>• <strong>Modularitate</strong>: Bucăți mici, independente</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Parameters Demo */}
        {activeDemo === 'parameters' && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2">
              <Coffee className="h-6 w-6" />
              2. Parametri - Flexibilitatea Funcțiilor
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">☕ Comandă Personalizată</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tip de cafea:
                    </label>
                    <select
                      value={coffeeType}
                      onChange={(e) => setCoffeeType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Espresso">Espresso</option>
                      <option value="Cappuccino">Cappuccino</option>
                      <option value="Latte">Latte</option>
                      <option value="Americano">Americano</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zahăr:
                    </label>
                    <select
                      value={sugarLevel}
                      onChange={(e) => setSugarLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="fără zahăr">Fără zahăr</option>
                      <option value="cu puțin zahăr">Cu puțin zahăr</option>
                      <option value="cu mult zahăr">Cu mult zahăr</option>
                    </select>
                  </div>
                  
                  <Button 
                    onClick={orderCoffee}
                    className="w-full bg-amber-600 hover:bg-amber-700"
                  >
                    <Coffee className="h-4 w-4 mr-2" />
                    Comandă Cafea
                  </Button>
                  
                  {coffeeOrder && (
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <p className="text-green-800 font-medium">📤 Comanda ta:</p>
                      <p className="text-green-700">{coffeeOrder}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`def comanda_cafea(tip_cafea, nivel_zahar):
    """
    Funcție cu parametri pentru comenzi personalizate
    Parametri:
    - tip_cafea (string): Tipul de cafea dorit
    - nivel_zahar (string): Preferința pentru zahăr
    """
    comanda = f"☕ Comandă: {tip_cafea} {nivel_zahar}"
    comanda += ". Comanda ta este pregătită!"
    return comanda

# Apelare cu parametri diferiți
rezultat = comanda_cafea("${coffeeType}", "${sugarLevel}")
print(rezultat)

# Același cod, rezultate diferite:
# comanda_cafea("Espresso", "fără zahăr")
# comanda_cafea("Cappuccino", "cu zahăr")`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-amber-50 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-800 mb-2">🔧 Puterea Parametrilor</h5>
                  <ul className="text-amber-700 space-y-1 text-sm">
                    <li>• <strong>Flexibilitate</strong>: Aceeași funcție, rezultate diferite</li>
                    <li>• <strong>Personalizare</strong>: Adaptare la nevoi specifice</li>
                    <li>• <strong>Eficiență</strong>: Nu repeți codul pentru variații</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Return Values Demo */}
        {activeDemo === 'returns' && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              3. Return Values - Funcții care Dau Înapoi
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">💰 Calculator Salariu + Bonus</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salariu de bază (RON):
                    </label>
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      min="1000"
                      max="50000"
                      step="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experiență (ani): {experience}
                    </label>
                    <input
                      type="range"
                      value={experience}
                      onChange={(e) => setExperience(Number(e.target.value))}
                      min="0"
                      max="10"
                      step="1"
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 ani</span>
                      <span>10+ ani</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={calculateSalary}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculează Salariul Total
                  </Button>
                  
                  {totalSalary > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                      <div className="space-y-2">
                        <p className="text-blue-800"><strong>Salariu de bază:</strong> {salary.toLocaleString()} RON</p>
                        <p className="text-blue-800"><strong>Bonus ({experience >= 5 ? '20%' : experience >= 3 ? '15%' : experience >= 1 ? '10%' : '0%'}):</strong> {calculatedBonus.toLocaleString()} RON</p>
                        <p className="text-blue-800 text-lg font-bold border-t pt-2">
                          <strong>Total:</strong> {totalSalary.toLocaleString()} RON
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`def calculeaza_bonus(salariu, experienta):
    """
    Calculează bonusul pe baza experienței
    Returnează: valoarea bonusului
    """
    if experienta >= 5:
        return salariu * 0.20  # 20% bonus
    elif experienta >= 3:
        return salariu * 0.15  # 15% bonus
    elif experienta >= 1:
        return salariu * 0.10  # 10% bonus
    else:
        return 0  # Fără bonus

def salariu_total(salariu_baza, experienta):
    """
    Calculează salariul total (baza + bonus)
    """
    bonus = calculeaza_bonus(salariu_baza, experienta)
    return salariu_baza + bonus

# Exemple de utilizare:
bonus = calculeaza_bonus(${salary}, ${experience})
total = salariu_total(${salary}, ${experience})
print(f"Bonus: {'{'}bonus{'}'} RON")
print(f"Total: {'{'}total{'}'} RON")`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-green-50 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">🎯 Puterea Return</h5>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• <strong>Compoziție</strong>: Rezultatul unei funcții → input pentru alta</li>
                    <li>• <strong>Calcule complexe</strong>: Împarte logica în pași mici</li>
                    <li>• <strong>Testabilitate</strong>: Fiecare funcție poate fi testată separat</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employee Management System Demo */}
        {activeDemo === 'system' && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center gap-2">
              <Users className="h-6 w-6" />
              4. Sistem Complex - Funcții în Echipă
            </h3>
            
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                  <h5 className="font-semibold text-gray-700">👥 Total Angajați</h5>
                  <p className="text-2xl font-bold text-purple-600">{employees.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                  <h5 className="font-semibold text-gray-700">💰 Masa Salarială</h5>
                  <p className="text-2xl font-bold text-green-600">{totalPayroll.toLocaleString()} RON</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                  <h5 className="font-semibold text-gray-700">📊 Salariul Mediu</h5>
                  <p className="text-2xl font-bold text-blue-600">{Math.round(averageSalary).toLocaleString()} RON</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-700">👥 Lista Angajaților</h4>
                    <Button 
                      onClick={() => setShowEmployeeForm(!showEmployeeForm)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Adaugă Angajat
                    </Button>
                  </div>
                  
                  {showEmployeeForm && (
                    <div className="bg-white rounded-xl p-6 mb-4 shadow-sm border space-y-4">
                      <h5 className="font-semibold text-gray-700">Angajat Nou</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Nume"
                          value={newEmployee.name}
                          onChange={(e) => setNewEmployee(prev => ({...prev, name: e.target.value}))}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Poziție"
                          value={newEmployee.position}
                          onChange={(e) => setNewEmployee(prev => ({...prev, position: e.target.value}))}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="number"
                          placeholder="Salariu"
                          value={newEmployee.salary || ''}
                          onChange={(e) => setNewEmployee(prev => ({...prev, salary: Number(e.target.value)}))}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="number"
                          placeholder="Experiență (ani)"
                          value={newEmployee.experience || ''}
                          onChange={(e) => setNewEmployee(prev => ({...prev, experience: Number(e.target.value)}))}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addEmployee} className="flex-1 bg-green-600 hover:bg-green-700">
                          Adaugă
                        </Button>
                        <Button onClick={() => setShowEmployeeForm(false)} variant="outline" className="flex-1">
                          Anulează
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    {employees.map((employee) => (
                      <div key={employee.id} className="bg-white rounded-xl p-4 shadow-sm border">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold text-gray-800">{employee.name}</h5>
                            <p className="text-sm text-gray-600">{employee.position}</p>
                            <p className="text-sm text-purple-600">{employee.salary.toLocaleString()} RON • {employee.experience} ani exp.</p>
                          </div>
                          <Button 
                            onClick={() => removeEmployee(employee.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Șterge
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                  <div className="bg-gray-900 rounded-xl p-6 text-sm">
                    <pre className="text-green-400">
{`# Sistem de management angajați

def adauga_angajat(lista_angajati, nume, pozitie, salariu, exp):
    """Adaugă un angajat nou în sistem"""
    angajat_nou = {
        'nume': nume,
        'pozitie': pozitie,  
        'salariu': salariu,
        'experienta': exp
    }
    lista_angajati.append(angajat_nou)
    return lista_angajati

def calculeaza_masa_salariala(angajati):
    """Calculează masa salarială totală"""
    return sum(emp['salariu'] for emp in angajati)

def salariu_mediu(angajati):
    """Calculează salariul mediu"""
    if len(angajati) == 0:
        return 0
    return calculeaza_masa_salariala(angajati) / len(angajati)

def afiseaza_raport(angajati):
    """Generează raport complet"""
    total = calculeaza_masa_salariala(angajati)
    mediu = salariu_mediu(angajati)
    
    print(f"👥 Angajați: {'{'}len(angajati){'}'}")
    print(f"💰 Masa salarială: {'{'}total:,{'}'} RON")
    print(f"📊 Salariu mediu: {'{'}mediu:,.0f{'}'} RON")

# Cooperarea funcțiilor pentru sistem complet!`}
                    </pre>
                  </div>
                  
                  <div className="mt-4 bg-purple-50 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-800 mb-2">🏗️ Arhitectură Funcțională</h5>
                    <ul className="text-purple-700 space-y-1 text-sm">
                      <li>• <strong>Modularitate</strong>: Fiecare funcție are un scop clar</li>
                      <li>• <strong>Cooperare</strong>: Funcțiile colaborează pentru rezultate complexe</li>
                      <li>• <strong>Scalabilitate</strong>: Ușor de extins cu noi funcționalități</li>
                      <li>• <strong>Mentenanță</strong>: Modifici o funcție → nu strici restul</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lambda Functions Demo */}
        {activeDemo === 'lambda' && (
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6" />
              5. Lambda Functions - Scurtături Elegante
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🛍️ Sortare Produse Dinamică</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
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
                        <option value="name">Nume</option>
                        <option value="price">Preț</option>
                        <option value="rating">Rating</option>
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
                    onClick={sortProducts}
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Sortează cu Lambda
                  </Button>
                  
                  <div className="space-y-2">
                    <h5 className="font-semibold text-gray-700">📦 Produse sortate:</h5>
                    {sortedProducts.map((product, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <span className="font-medium">{product.name}</span>
                          <div className="text-sm text-gray-600">
                            {product.price} RON • ⭐ {product.rating}
                          </div>
                        </div>
                        <span className="text-sm font-mono text-gray-500">#{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`# Lista produselor
produse = [
    {'nume': 'Laptop', 'pret': 3500, 'rating': 4.5},
    {'nume': 'Mouse', 'pret': 150, 'rating': 4.8},
    {'nume': 'Keyboard', 'pret': 300, 'rating': 4.3},
    {'nume': 'Monitor', 'pret': 1200, 'rating': 4.7}
]

# Funcții Lambda pentru sortare
# Sortare după nume:
sorted_by_name = sorted(produse, 
                       key=lambda x: x['nume'])

# Sortare după preț (descrescător):
sorted_by_price = sorted(produse, 
                        key=lambda x: x['pret'], 
                        reverse=True)

# Sortare după rating:
sorted_by_rating = sorted(produse, 
                         key=lambda x: x['rating'])

# Filtrare cu lambda (produse > 500 RON):
scumpe = list(filter(lambda x: x['pret'] > 500, produse))

# Mapare cu lambda (doar numele):
nume_produse = list(map(lambda x: x['nume'], produse))

print("Sortate după ${sortBy} (${sortDirection}):")`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-yellow-50 rounded-lg p-4">
                  <h5 className="font-semibold text-yellow-800 mb-2">⚡ Puterea Lambda</h5>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• <strong>Conciziune</strong>: Funcții simple într-o singură linie</li>
                    <li>• <strong>Inline</strong>: Definite exact unde sunt folosite</li>
                    <li>• <strong>Perfecte pentru</strong>: sort(), filter(), map()</li>
                    <li>• <strong>Alternativă</strong>: La funcții mici, temporare</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Function Composition Demo */}
        {activeDemo === 'composition' && (
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              6. Compoziția Funcțiilor - Orchestra Codului
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">📚 Sistem de Evaluare Studenți</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selectează studentul:
                    </label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {studentData.map((student, index) => (
                        <option key={index} value={index}>
                          {student.name} - {student.subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-700 mb-2">📊 Date student:</h5>
                    <p><strong>Nume:</strong> {studentData[selectedStudent].name}</p>
                    <p><strong>Materia:</strong> {studentData[selectedStudent].subject}</p>
                    <p><strong>Note:</strong> {studentData[selectedStudent].grades.join(', ')}</p>
                  </div>
                  
                  <Button 
                    onClick={processStudent}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Procesează Student
                  </Button>
                  
                  {calculatedAverage > 0 && (
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                        <h5 className="font-semibold text-blue-800 mb-2">📈 Rezultate:</h5>
                        <p className="text-blue-700"><strong>Media calculată:</strong> {calculatedAverage}</p>
                        <p className="text-blue-700"><strong>Status:</strong> {studentStatus}</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                        <h5 className="font-semibold text-green-800 mb-2">🔄 Flux de execuție:</h5>
                        <div className="space-y-1 text-sm text-green-700">
                          <p>1. calculeaza_media([{studentData[selectedStudent].grades.join(', ')}])</p>
                          <p>2. → Rezultat: {calculatedAverage}</p>
                          <p>3. determina_status({calculatedAverage})</p>
                          <p>4. → Rezultat: {studentStatus}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`# Funcții componente care cooperează

def calculeaza_media(note):
    """
    Calculează media aritmetică a notelor
    Input: listă de note
    Output: media (float)
    """
    return sum(note) / len(note)

def determina_status(media):
    """
    Determină statusul pe baza mediei
    Input: media (float)
    Output: status (string)
    """
    if media >= 9:
        return "🏆 Excelent"
    elif media >= 8:
        return "⭐ Foarte bine"
    elif media >= 7:
        return "✅ Bine"
    elif media >= 5:
        return "📝 Suficient"
    else:
        return "❌ Insuficient"

def proceseaza_student(nume, note, materia):
    """
    Funcție orchestratoare - combină alte funcții
    """
    # Pas 1: Calculează media
    media = calculeaza_media(note)
    
    # Pas 2: Determină statusul
    status = determina_status(media)
    
    # Pas 3: Generează raportul
    raport = {
        'nume': nume,
        'materia': materia,
        'media': round(media, 2),
        'status': status
    }
    
    return raport

# Utilizare:
student = proceseaza_student(
    "${studentData[selectedStudent].name}",
    ${JSON.stringify(studentData[selectedStudent].grades)},
    "${studentData[selectedStudent].subject}"
)`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-teal-50 rounded-lg p-4">
                  <h5 className="font-semibold text-teal-800 mb-2">🎼 Compoziția Funcțională</h5>
                  <ul className="text-teal-700 space-y-1 text-sm">
                    <li>• <strong>Separarea responsabilităților</strong>: O funcție = o sarcină</li>
                    <li>• <strong>Reutilizabilitate</strong>: Funcțiile pot fi folosite separat</li>
                    <li>• <strong>Testabilitate</strong>: Poți testa fiecare componentă</li>
                    <li>• <strong>Scalabilitate</strong>: Adaugi funcții noi fără să strici existentele</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Final Message */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">🏗️ The Software Architect</h2>
          <p className="text-xl mb-6 opacity-90">
            Prin funcții, programatorul devine Arhitect, nu doar constructor.
            În loc să ridice cărămidă cu cărămidă, el definește procese, reguli și instrumente care pot fi refolosite oricând.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">🎯 Organizare</h3>
              <p className="text-sm opacity-90">Codul devine modular, clar și ușor de înțeles</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">🔄 Reutilizare</h3>
              <p className="text-sm opacity-90">O funcție definită o dată, folosită oriunde</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">🏗️ Scalabilitate</h3>
              <p className="text-sm opacity-90">Sisteme complexe din bucăți simple</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-lg font-medium mb-4">
              🎨 Aici începe adevărata Artă a modularității în programare
            </p>
            <Button 
              onClick={() => navigate('/foundations')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
            >
              Înapoi la Fundamente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionsArtifact;