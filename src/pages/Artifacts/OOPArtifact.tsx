import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, User, Shield, Users, Zap, BookOpen, Building2, Car, Coins, GraduationCap } from 'lucide-react';

interface Student {
  nume: string;
  clasa: string;
  note: number[];
  id: string;
}

interface BankAccount {
  id: string;
  nume: string;
  sold: number;
  isLocked: boolean;
}

interface Animal {
  nume: string;
  tip: string;
}

interface Utilizator {
  id: string;
  nume: string;
  email: string;
  rol: 'utilizator' | 'admin';
}

const OOPArtifact = () => {
  const navigate = useNavigate();
  
  // Classes and Objects Demo State (Students)
  const [students, setStudents] = useState<Student[]>([
    { id: 'stud1', nume: 'Ana Popescu', clasa: '10A', note: [9, 8, 10] },
    { id: 'stud2', nume: 'Ion Marinescu', clasa: '10B', note: [7, 9, 8] }
  ]);
  const [newStudent, setNewStudent] = useState({ nume: '', clasa: '', nota: '' });
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  
  // Encapsulation Demo State (Bank Account)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    { id: 'acc1', nume: 'Ana Popescu', sold: 1500, isLocked: false },
    { id: 'acc2', nume: 'Ion Marinescu', sold: 3200, isLocked: false }
  ]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionMessage, setTransactionMessage] = useState('');
  
  // Inheritance Demo State (Person -> Teacher)
  const [people, setPeople] = useState([
    { id: 'p1', nume: 'Maria Ionescu', tip: 'persoana', specializare: '' },
    { id: 'p2', nume: 'Prof. Andrei Popescu', tip: 'profesor', specializare: 'Matematică' },
    { id: 'p3', nume: 'Dr. Elena Vasile', tip: 'profesor', specializare: 'Informatică' }
  ]);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonType, setNewPersonType] = useState('persoana');
  const [newPersonSpecialization, setNewPersonSpecialization] = useState('');
  const [inheritanceOutput, setInheritanceOutput] = useState('');
  
  // Polymorphism Demo State (Animals)
  const [animals, setAnimals] = useState<Animal[]>([
    { nume: 'Rex', tip: 'caine' },
    { nume: 'Mimi', tip: 'pisica' },
    { nume: 'Tweety', tip: 'papagal' },
    { nume: 'Goldy', tip: 'peste' }
  ]);
  const [polymorphismOutput, setPolymorphismOutput] = useState('');
  
  // User Management System Demo State
  const [users, setUsers] = useState<Utilizator[]>([
    { id: 'u1', nume: 'Ana User', email: 'ana@email.com', rol: 'utilizator' },
    { id: 'u2', nume: 'Admin Ion', email: 'ion@admin.com', rol: 'admin' },
    { id: 'u3', nume: 'Maria Client', email: 'maria@email.com', rol: 'utilizator' }
  ]);
  const [currentUser, setCurrentUser] = useState<string>('u2'); // Admin by default
  const [newUser, setNewUser] = useState({ nume: '', email: '', rol: 'utilizator' as 'utilizator' | 'admin' });
  const [userSystemOutput, setUserSystemOutput] = useState('');
  
  // Advanced OOP Demo State (Cars)
  const [cars, setCars] = useState([
    { id: 'c1', marca: 'Toyota', model: 'Corolla', an: 2020, pret: 25000, tip: 'sedan' },
    { id: 'c2', marca: 'BMW', model: 'X5', an: 2021, pret: 55000, tip: 'suv' },
    { id: 'c3', marca: 'Tesla', model: 'Model 3', an: 2022, pret: 45000, tip: 'electric' }
  ]);
  const [sortBy, setSortBy] = useState('marca');
  const [filterBy, setFilterBy] = useState('all');
  
  // Active demo selector
  const [activeDemo, setActiveDemo] = useState('classes');

  // Student Class Methods
  const addStudent = () => {
    if (newStudent.nume && newStudent.clasa) {
      const student: Student = {
        id: `stud${students.length + 1}`,
        nume: newStudent.nume,
        clasa: newStudent.clasa,
        note: []
      };
      setStudents(prev => [...prev, student]);
      setNewStudent({ nume: '', clasa: '', nota: '' });
    }
  };

  const addGradeToStudent = (studentId: string) => {
    if (newStudent.nota && selectedStudent === studentId) {
      const grade = parseFloat(newStudent.nota);
      if (grade >= 1 && grade <= 10) {
        setStudents(prev => prev.map(student => 
          student.id === studentId 
            ? { ...student, note: [...student.note, grade] }
            : student
        ));
        setNewStudent(prev => ({ ...prev, nota: '' }));
      }
    }
  };

  const calculateAverage = (notes: number[]): number => {
    if (notes.length === 0) return 0;
    return notes.reduce((sum, note) => sum + note, 0) / notes.length;
  };

  // Bank Account Encapsulation Methods
  const deposit = () => {
    if (selectedAccount && transactionAmount > 0) {
      setBankAccounts(prev => prev.map(account =>
        account.id === selectedAccount
          ? { ...account, sold: account.sold + transactionAmount }
          : account
      ));
      setTransactionMessage(`✅ Depozit de ${transactionAmount} RON efectuat cu succes!`);
      setTransactionAmount(0);
      setTimeout(() => setTransactionMessage(''), 3000);
    }
  };

  const withdraw = () => {
    const account = bankAccounts.find(acc => acc.id === selectedAccount);
    if (account && transactionAmount > 0) {
      if (account.sold >= transactionAmount) {
        setBankAccounts(prev => prev.map(acc =>
          acc.id === selectedAccount
            ? { ...acc, sold: acc.sold - transactionAmount }
            : acc
        ));
        setTransactionMessage(`✅ Retragere de ${transactionAmount} RON efectuată cu succes!`);
      } else {
        setTransactionMessage(`❌ Fonduri insuficiente! Sold disponibil: ${account.sold} RON`);
      }
      setTransactionAmount(0);
      setTimeout(() => setTransactionMessage(''), 3000);
    }
  };

  const toggleAccountLock = (accountId: string) => {
    setBankAccounts(prev => prev.map(account =>
      account.id === accountId
        ? { ...account, isLocked: !account.isLocked }
        : account
    ));
  };

  // Inheritance Demo Methods
  const addPerson = () => {
    if (newPersonName) {
      const person = {
        id: `p${people.length + 1}`,
        nume: newPersonName,
        tip: newPersonType,
        specializare: newPersonType === 'profesor' ? newPersonSpecialization : ''
      };
      setPeople(prev => [...prev, person]);
      setNewPersonName('');
      setNewPersonSpecialization('');
    }
  };

  const demonstrateInheritance = (personId: string) => {
    const person = people.find(p => p.id === personId);
    if (person) {
      let output = `🗣️ ${person.nume} vorbește: "Salut!"`;
      if (person.tip === 'profesor') {
        output += `\n📚 ${person.nume} predă: "Astăzi învățăm despre ${person.specializare}!"`;
      }
      setInheritanceOutput(output);
    }
  };

  // Polymorphism Demo Methods
  const demonstratePolymorphism = () => {
    const sounds = animals.map(animal => {
      let sound = '';
      switch (animal.tip) {
        case 'caine': sound = 'Ham ham!'; break;
        case 'pisica': sound = 'Miau!'; break;
        case 'papagal': sound = 'Polly wants a cracker!'; break;
        case 'peste': sound = 'Blub blub... (nu face sunet)'; break;
        default: sound = '...';
      }
      return `🐾 ${animal.nume} (${animal.tip}): ${sound}`;
    });
    
    setPolymorphismOutput(sounds.join('\n'));
  };

  // User Management System Methods
  const addUser = () => {
    if (newUser.nume && newUser.email) {
      const user: Utilizator = {
        id: `u${users.length + 1}`,
        nume: newUser.nume,
        email: newUser.email,
        rol: newUser.rol
      };
      setUsers(prev => [...prev, user]);
      setNewUser({ nume: '', email: '', rol: 'utilizator' });
      setUserSystemOutput(`✅ Utilizator ${user.nume} a fost adăugat cu succes!`);
    }
  };

  const deleteUser = (userId: string) => {
    const currentUserData = users.find(u => u.id === currentUser);
    if (currentUserData?.rol === 'admin') {
      const userToDelete = users.find(u => u.id === userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
      setUserSystemOutput(`🗑️ Admin ${currentUserData.nume} a șters utilizatorul ${userToDelete?.nume}`);
    } else {
      setUserSystemOutput(`❌ Doar administratorii pot șterge utilizatori!`);
    }
  };

  const changePassword = () => {
    const user = users.find(u => u.id === currentUser);
    setUserSystemOutput(`🔒 ${user?.nume} și-a schimbat parola cu succes!`);
  };

  // Advanced OOP Methods
  const getSortedAndFilteredCars = () => {
    let filtered = cars;
    
    if (filterBy !== 'all') {
      filtered = cars.filter(car => car.tip === filterBy);
    }
    
    return filtered.sort((a, b) => {
      if (sortBy === 'marca' || sortBy === 'model') {
        return a[sortBy].localeCompare(b[sortBy]);
      }
      return a[sortBy] - b[sortBy];
    });
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
    
    // Clear output messages after time
    const timer = setTimeout(() => {
      setUserSystemOutput('');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [userSystemOutput]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-6">
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            📘 Sesiunea 6: Programarea Orientată pe Obiecte (OOP)
          </h1>
        </div>

        {/* Introduction */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-lg artifact-card">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🏗️ Gândește ca un arhitect - Modelează realitatea în cod
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              În aplicațiile reale lucrăm cu entități: studenți, angajați, mașini, conturi bancare.
              OOP îți dă posibilitatea să le modelezi exact ca în realitate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">🏭 Clasa = Șablonul</h3>
                <p className="text-blue-700 text-sm">Modelul unei mașini cu toate specificațiile</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">🚗 Obiectul = Instanța</h3>
                <p className="text-green-700 text-sm">O mașină concretă, cu culoare și serie unică</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Selector */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-violet-600" />
            Concepte OOP Interactive
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { id: 'classes', label: 'Clase & Obiecte', icon: Building2 },
              { id: 'encapsulation', label: 'Incapsulare', icon: Shield },
              { id: 'inheritance', label: 'Moștenire', icon: Users },
              { id: 'polymorphism', label: 'Polimorfism', icon: Zap },
              { id: 'usersystem', label: 'Sistem Users', icon: User },
              { id: 'advanced', label: 'OOP Avansat', icon: GraduationCap }
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

        {/* Classes and Objects Demo */}
        {activeDemo === 'classes' && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              1. Clase și Obiecte - Fabrica de Entități
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">👨‍🎓 Sistem de Studenți</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* Add New Student */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h5 className="font-medium text-gray-700">Creează Student Nou</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Nume"
                        value={newStudent.nume}
                        onChange={(e) => setNewStudent(prev => ({...prev, nume: e.target.value}))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Clasa (ex: 10A)"
                        value={newStudent.clasa}
                        onChange={(e) => setNewStudent(prev => ({...prev, clasa: e.target.value}))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <Button onClick={addStudent} className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                      Creează Obiect Student
                    </Button>
                  </div>

                  {/* Students List */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700">📚 Instanțe Student (Obiecte)</h5>
                    {students.map((student) => (
                      <div key={student.id} className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h6 className="font-semibold text-blue-800">{student.nume}</h6>
                            <p className="text-sm text-blue-600">Clasa: {student.clasa}</p>
                            <p className="text-sm text-blue-600">
                              Note: {student.note.length > 0 ? student.note.join(', ') : 'Fără note'}
                            </p>
                            <p className="text-sm font-medium text-blue-700">
                              Media: {student.note.length > 0 ? calculateAverage(student.note).toFixed(2) : 'N/A'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            placeholder="Notă (1-10)"
                            value={selectedStudent === student.id ? newStudent.nota : ''}
                            onChange={(e) => {
                              setSelectedStudent(student.id);
                              setNewStudent(prev => ({...prev, nota: e.target.value}));
                            }}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <Button 
                            onClick={() => addGradeToStudent(student.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            disabled={!newStudent.nota || selectedStudent !== student.id}
                          >
                            Adaugă Notă
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`class Student:
    """
    Clasa Student - șablonul pentru obiecte student
    """
    def __init__(self, nume, clasa):
        self.nume = nume          # Atribut
        self.clasa = clasa        # Atribut
        self.note = []            # Atribut (listă goală)
    
    def adauga_nota(self, nota):
        """Metodă pentru adăugarea unei note"""
        if 1 <= nota <= 10:
            self.note.append(nota)
            return True
        return False
    
    def calculeaza_media(self):
        """Metodă pentru calcularea mediei"""
        if len(self.note) == 0:
            return 0
        return sum(self.note) / len(self.note)
    
    def __str__(self):
        """Reprezentarea string a obiectului"""
        return f"Student: {'{'}self.nume{'}'} din clasa {'{'}self.clasa{'}'}"

# Crearea obiectelor (instanțiere)
student1 = Student("Ana Popescu", "10A")
student2 = Student("Ion Marinescu", "10B")

# Folosirea metodelor
student1.adauga_nota(9)
student1.adauga_nota(8)
student2.adauga_nota(7)

print(f"Media lui {'{'}student1.nume{'}'}: {'{'}student1.calculeaza_media():.2f{'}'}")
print(f"Media lui {'{'}student2.nume{'}'}: {'{'}student2.calculeaza_media():.2f{'}'}")`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">🎯 Concepte Cheie</h5>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• <strong>Clasă</strong>: Definiția (blueprint) pentru obiecte</li>
                    <li>• <strong>Obiect</strong>: Instanța concretă a unei clase</li>
                    <li>• <strong>Atribute</strong>: Datele obiectului (nume, clasa, note)</li>
                    <li>• <strong>Metode</strong>: Funcțiile care aparțin clasei</li>
                    <li>• <strong>__init__</strong>: Constructorul (inițializare obiect)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Encapsulation Demo */}
        {activeDemo === 'encapsulation' && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              2. Incapsulare - Protejarea Datelor Sensibile
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🏦 Conturi Bancare Securizate</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* Account Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selectează contul:
                    </label>
                    <select
                      value={selectedAccount}
                      onChange={(e) => setSelectedAccount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Alege un cont...</option>
                      {bankAccounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.nume} - {account.sold} RON
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Account Details */}
                  {selectedAccount && (
                    <div className="space-y-4">
                      {bankAccounts.filter(acc => acc.id === selectedAccount).map((account) => (
                        <div key={account.id} className={`rounded-lg p-4 border-2 ${account.isLocked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <h5 className="font-semibold text-gray-800">{account.nume}</h5>
                              <p className="text-sm text-gray-600">
                                Status: {account.isLocked ? '🔒 Blocat' : '🔓 Activ'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                {account.sold.toLocaleString()} RON
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mb-3">
                            <Button
                              onClick={() => toggleAccountLock(account.id)}
                              variant="outline"
                              size="sm"
                              className={account.isLocked ? "border-green-600 text-green-600 hover:bg-green-50" : "border-red-600 text-red-600 hover:bg-red-50"}
                            >
                              {account.isLocked ? '🔓 Deblochează' : '🔒 Blochează'}
                            </Button>
                          </div>

                          {!account.isLocked && (
                            <>
                              <div className="flex gap-2 mb-3">
                                <input
                                  type="number"
                                  min="1"
                                  step="10"
                                  placeholder="Sumă (RON)"
                                  value={transactionAmount || ''}
                                  onChange={(e) => setTransactionAmount(Number(e.target.value))}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  onClick={deposit}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                  size="sm"
                                  disabled={transactionAmount <= 0}
                                >
                                  <Coins className="w-4 h-4 mr-1" />
                                  Depune
                                </Button>
                                <Button 
                                  onClick={withdraw}
                                  className="flex-1 bg-red-600 hover:bg-red-700"
                                  size="sm"
                                  disabled={transactionAmount <= 0}
                                >
                                  <Coins className="w-4 h-4 mr-1" />
                                  Retrage
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      
                      {transactionMessage && (
                        <div className={`rounded-lg p-3 border-2 ${transactionMessage.includes('✅') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                          <p className="text-sm font-medium">{transactionMessage}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`class ContBancar:
    """
    Clasă cu incapsulare - sold privat, acces controlat
    """
    def __init__(self, nume, sold_initial=0):
        self.nume = nume
        self.__sold = sold_initial      # Atribut PRIVAT
        self.__este_blocat = False      # Atribut PRIVAT
    
    def depune(self, suma):
        """Metodă publică pentru depunere"""
        if self.__este_blocat:
            return "❌ Contul este blocat!"
        
        if suma > 0:
            self.__sold += suma
            return f"✅ Depozit: +{'{'}suma{'}'} RON"
        return "❌ Suma trebuie să fie pozitivă!"
    
    def retrage(self, suma):
        """Metodă publică pentru retragere"""
        if self.__este_blocat:
            return "❌ Contul este blocat!"
        
        if suma > self.__sold:
            return f"❌ Fonduri insuficiente! Sold: {'{'}self.__sold{'}'}"
        
        if suma > 0:
            self.__sold -= suma
            return f"✅ Retragere: -{'{'}suma{'}'} RON"
        return "❌ Suma trebuie să fie pozitivă!"
    
    def consulta_sold(self):
        """Metodă publică pentru consultare sold"""
        return self.__sold
    
    def blocheaza_cont(self):
        """Metodă pentru blocarea contului"""
        self.__este_blocat = True
    
    def deblocheaza_cont(self):
        """Metodă pentru deblocarea contului"""
        self.__este_blocat = False

# Utilizare:
cont = ContBancar("Ana Popescu", 1500)

# Accesul direct la __sold NU funcționează:
# print(cont.__sold)  # AttributeError!

# Accesul controlat prin metode:
print(cont.consulta_sold())    # ✅ 1500
print(cont.depune(500))        # ✅ Depozit: +500 RON  
print(cont.retrage(200))       # ✅ Retragere: -200 RON`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-emerald-50 rounded-lg p-4">
                  <h5 className="font-semibold text-emerald-800 mb-2">🛡️ Principiile Incapsulării</h5>
                  <ul className="text-emerald-700 space-y-1 text-sm">
                    <li>• <strong>Atribute private</strong>: Prefix __ (dublu underscore)</li>
                    <li>• <strong>Acces controlat</strong>: Prin metode publice (getter/setter)</li>
                    <li>• <strong>Securitate</strong>: Datele sensibile nu pot fi modificate direct</li>
                    <li>• <strong>Validare</strong>: Metodele verifică datele înainte de modificare</li>
                    <li>• <strong>Mentenanță</strong>: Poți schimba implementarea fără să afectezi exterior</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inheritance Demo */}
        {activeDemo === 'inheritance' && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-orange-800 mb-6 flex items-center gap-2">
              <Users className="h-6 w-6" />
              3. Moștenire - Reutilizare și Extindere
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">👨‍🏫 Ierarhia Persoane → Profesori</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* Add New Person */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h5 className="font-medium text-gray-700">Adaugă Persoană Nouă</h5>
                    <input
                      type="text"
                      placeholder="Nume complet"
                      value={newPersonName}
                      onChange={(e) => setNewPersonName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={newPersonType}
                        onChange={(e) => setNewPersonType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="persoana">Persoană</option>
                        <option value="profesor">Profesor</option>
                      </select>
                      {newPersonType === 'profesor' && (
                        <input
                          type="text"
                          placeholder="Specializare"
                          value={newPersonSpecialization}
                          onChange={(e) => setNewPersonSpecialization(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      )}
                    </div>
                    <Button onClick={addPerson} className="w-full bg-orange-600 hover:bg-orange-700" size="sm">
                      Creează {newPersonType === 'profesor' ? 'Profesor' : 'Persoană'}
                    </Button>
                  </div>

                  {/* People List */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700">👥 Lista Persoanelor</h5>
                    {people.map((person) => (
                      <div key={person.id} className={`rounded-lg p-4 border-2 ${person.tip === 'profesor' ? 'bg-purple-50 border-purple-200' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h6 className="font-semibold text-gray-800">{person.nume}</h6>
                            <p className="text-sm text-gray-600 capitalize">
                              {person.tip === 'profesor' ? '👨‍🏫 Profesor' : '👤 Persoană'}
                            </p>
                            {person.specializare && (
                              <p className="text-sm text-purple-600">Specializare: {person.specializare}</p>
                            )}
                          </div>
                          <Button 
                            onClick={() => demonstrateInheritance(person.id)}
                            size="sm"
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Demonstrează
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {inheritanceOutput && (
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <h5 className="font-semibold text-green-800 mb-2">🎭 Demonstrația Moștenirii:</h5>
                      <pre className="text-green-700 text-sm whitespace-pre-line">{inheritanceOutput}</pre>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`class Persoana:
    """
    Clasa de bază (parent class)
    """
    def __init__(self, nume):
        self.nume = nume
    
    def vorbeste(self):
        """Metodă comună pentru toate persoanele"""
        return f"🗣️ {'{'}self.nume{'}'} vorbește: 'Salut!'"
    
    def prezinta(self):
        return f"👤 Sunt {'{'}self.nume{'}'}"

class Profesor(Persoana):
    """
    Clasa derivată (child class) - MOȘTENEȘTE din Persoana
    """
    def __init__(self, nume, specializare):
        super().__init__(nume)  # Apelează constructorul părinte
        self.specializare = specializare
    
    def preda(self):
        """Metodă NOUĂ, specifică doar profesorilor"""
        return f"📚 {'{'}self.nume{'}'} predă: 'Astăzi învățăm despre {'{'}self.specializare{'}'}!'"
    
    def prezinta(self):
        """Metodă SUPRASCRISĂ (override)"""
        return f"👨‍🏫 Sunt Prof. {'{'}self.nume{'}'}, specializat în {'{'}self.specializare{'}'}"

# Utilizare:
persoana = Persoana("Ana Popescu")
profesor = Profesor("Ion Marinescu", "Matematică")

# Persoana poate doar să vorbească:
print(persoana.vorbeste())    # ✅ Funcționează
# print(persoana.preda())     # ❌ AttributeError!

# Profesorul poate și să vorbească (moștenit) și să predea:
print(profesor.vorbeste())    # ✅ Moștenit din Persoana
print(profesor.preda())       # ✅ Metodă nouă din Profesor

# Polimorfism - aceeași interfață, comportamente diferite:
print(persoana.prezinta())    # "👤 Sunt Ana Popescu"
print(profesor.prezinta())    # "👨‍🏫 Sunt Prof. Ion..."`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-orange-50 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-800 mb-2">🔄 Avantajele Moștenirii</h5>
                  <ul className="text-orange-700 space-y-1 text-sm">
                    <li>• <strong>Reutilizare cod</strong>: Clasa copil primește tot din părinte</li>
                    <li>• <strong>Extindere</strong>: Adaugi metode noi fără să modifici părintele</li>
                    <li>• <strong>Override</strong>: Poți suprascrie metodele moștenite</li>
                    <li>• <strong>super()</strong>: Accesează funcționalitatea din clasa părinte</li>
                    <li>• <strong>Ierarhie</strong>: Organizare logică: Persoană → Student, Profesor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Polymorphism Demo */}
        {activeDemo === 'polymorphism' && (
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-pink-800 mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6" />
              4. Polimorfism - O Interfață, Multe Comportamente
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐾 Grădina Zoologică</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* Animals Display */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h5 className="font-medium text-gray-700">🦁 Animalele din Zoo</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {animals.map((animal, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="text-center">
                            <div className="text-2xl mb-1">
                              {animal.tip === 'caine' && '🐕'}
                              {animal.tip === 'pisica' && '🐱'}
                              {animal.tip === 'papagal' && '🦜'}
                              {animal.tip === 'peste' && '🐟'}
                            </div>
                            <p className="font-medium text-gray-800">{animal.nume}</p>
                            <p className="text-sm text-gray-600 capitalize">{animal.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Polymorphism Demonstration */}
                  <div className="space-y-3">
                    <Button 
                      onClick={demonstratePolymorphism}
                      className="w-full bg-pink-600 hover:bg-pink-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Demonstrează Polimorfismul - Toate Animalele Vorbesc!
                    </Button>
                    
                    {polymorphismOutput && (
                      <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                        <h5 className="font-semibold text-green-800 mb-2">🎵 Concert Animal:</h5>
                        <pre className="text-green-700 text-sm whitespace-pre-line">{polymorphismOutput}</pre>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2">🔮 Magia Polimorfismului</h5>
                    <p className="text-blue-700 text-sm">
                      O singură comandă: <code className="bg-blue-200 px-2 py-1 rounded">animal.vorbeste()</code>
                      <br />
                      Rezultate diferite pentru fiecare animal! 🎭
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`class Animal:
    """
    Clasa de bază pentru toate animalele
    """
    def __init__(self, nume):
        self.nume = nume
    
    def vorbeste(self):
        """Metodă abstractă - va fi suprascrisă"""
        pass
    
    def mananca(self):
        return f"{'{'}self.nume{'}'} mănâncă"

class Caine(Animal):
    def vorbeste(self):
        return f"{'{'}self.nume{'}'}: Ham ham! 🐕"

class Pisica(Animal):
    def vorbeste(self):
        return f"{'{'}self.nume{'}'}: Miau! 🐱"

class Papagal(Animal):
    def vorbeste(self):
        return f"{'{'}self.nume{'}'}: Polly wants a cracker! 🦜"

class Peste(Animal):
    def vorbeste(self):
        return f"{'{'}self.nume{'}'}: Blub blub... (nu face sunet) 🐟"

# Crearea unei liste cu animale diferite:
animale = [
    Caine("Rex"),
    Pisica("Mimi"),
    Papagal("Tweety"),
    Peste("Goldy")
]

# POLIMORFISM în acțiune:
def concert_animal(lista_animale):
    """
    O singură funcție pentru toate animalele!
    """
    for animal in lista_animale:
        # Aceeași metodă, comportamente diferite:
        print(animal.vorbeste())

# Apelare:
concert_animal(animale)

# Rezultat:
# Rex: Ham ham! 🐕
# Mimi: Miau! 🐱  
# Tweety: Polly wants a cracker! 🦜
# Goldy: Blub blub... (nu face sunet) 🐟`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-pink-50 rounded-lg p-4">
                  <h5 className="font-semibold text-pink-800 mb-2">🎭 Puterea Polimorfismului</h5>
                  <ul className="text-pink-700 space-y-1 text-sm">
                    <li>• <strong>O interfață</strong>: Aceeași metodă pentru toate clasele</li>
                    <li>• <strong>Comportamente diferite</strong>: Fiecare clasă implementează diferit</li>
                    <li>• <strong>Cod flexibil</strong>: O funcție lucrează cu orice tip de animal</li>
                    <li>• <strong>Extensibilitate</strong>: Adaugi animale noi fără să modifici codul existent</li>
                    <li>• <strong>Abstractizare</strong>: Nu trebuie să știi tipul exact al obiectului</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management System Demo */}
        {activeDemo === 'usersystem' && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center gap-2">
              <User className="h-6 w-6" />
              5. Sistem Complet - Utilizatori și Administratori
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">👥 Gestionare Utilizatori</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* Current User */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-700 mb-2">👤 Utilizator Curent</h5>
                    <select
                      value={currentUser}
                      onChange={(e) => setCurrentUser(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.nume} ({user.rol})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add New User (Admin Only) */}
                  {users.find(u => u.id === currentUser)?.rol === 'admin' && (
                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-3">➕ Adaugă Utilizator Nou (Admin Only)</h5>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nume"
                          value={newUser.nume}
                          onChange={(e) => setNewUser(prev => ({...prev, nume: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={newUser.email}
                          onChange={(e) => setNewUser(prev => ({...prev, email: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <select
                          value={newUser.rol}
                          onChange={(e) => setNewUser(prev => ({...prev, rol: e.target.value as 'utilizator' | 'admin'}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="utilizator">Utilizator</option>
                          <option value="admin">Administrator</option>
                        </select>
                        <Button onClick={addUser} className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                          Creează Utilizator
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Users List */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700">📋 Lista Utilizatorilor</h5>
                    {users.map((user) => (
                      <div key={user.id} className={`rounded-lg p-4 border-2 ${user.rol === 'admin' ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h6 className="font-semibold text-gray-800">{user.nume}</h6>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${user.rol === 'admin' ? 'bg-purple-200 text-purple-800' : 'bg-gray-200 text-gray-800'}`}>
                              {user.rol === 'admin' ? '👑 Admin' : '👤 User'}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {user.id === currentUser && (
                              <Button 
                                onClick={changePassword}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                🔒 Schimbă Parola
                              </Button>
                            )}
                            {users.find(u => u.id === currentUser)?.rol === 'admin' && user.id !== currentUser && (
                              <Button 
                                onClick={() => deleteUser(user.id)}
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-600 hover:bg-red-50"
                              >
                                🗑️ Șterge
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {userSystemOutput && (
                    <div className={`rounded-lg p-4 border-2 ${userSystemOutput.includes('✅') ? 'bg-green-50 border-green-200' : userSystemOutput.includes('❌') ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                      <p className="text-sm font-medium">{userSystemOutput}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`class Utilizator:
    """
    Clasa de bază pentru utilizatori
    Demonstrează INCAPSULARE cu parolă privată
    """
    def __init__(self, nume, email, parola):
        self.nume = nume
        self.email = email
        self.__parola = parola  # PRIVAT - incapsulare!
        self.este_activ = True
    
    def login(self, parola_introdusa):
        """Metodă pentru login"""
        if self.__parola == parola_introdusa:
            return f"✅ {'{'}self.nume{'}'} s-a logat cu succes!"
        return "❌ Parolă incorectă!"
    
    def schimba_parola(self, parola_veche, parola_noua):
        """Metodă pentru schimbarea parolei"""
        if self.__parola == parola_veche:
            self.__parola = parola_noua
            return f"🔒 {'{'}self.nume{'}'} și-a schimbat parola!"
        return "❌ Parolă veche incorectă!"
    
    def afiseaza_profil(self):
        return f"👤 {'{'}self.nume{'}'} - {'{'}self.email{'}'}"

class Administrator(Utilizator):
    """
    Clasa Admin MOȘTENEȘTE din Utilizator
    Adaugă funcționalități specifice adminului
    """
    def __init__(self, nume, email, parola):
        super().__init__(nume, email, parola)  # Moștenire
        self.permisiuni = ['citire', 'scriere', 'stergere']
    
    def sterge_utilizator(self, utilizator):
        """Metodă NOUĂ - doar adminii pot șterge"""
        return f"🗑️ Admin {'{'}self.nume{'}'} a șters utilizatorul {'{'}utilizator.nume{'}'}"
    
    def afiseaza_profil(self):
        """Metodă SUPRASCRISĂ (override)"""
        return f"👑 Admin {'{'}self.nume{'}'} - {'{'}self.email{'}'}"

# POLIMORFISM în acțiune:
def procesează_login(lista_utilizatori, parola):
    """O funcție pentru toți utilizatorii"""
    for user in lista_utilizatori:
        print(user.login(parola))  # Comportament identic
        print(user.afiseaza_profil())  # Comportament diferit!

# Utilizare:
user1 = Utilizator("Ana", "ana@email.com", "parola123")
admin1 = Administrator("Ion Admin", "admin@site.com", "admin123")

print(user1.login("parola123"))    # ✅ Login user
print(admin1.login("admin123"))    # ✅ Login admin (moștenit)
print(admin1.sterge_utilizator(user1))  # 🗑️ Doar adminii pot!`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-indigo-50 rounded-lg p-4">
                  <h5 className="font-semibold text-indigo-800 mb-2">🏛️ Arhitectura OOP Completă</h5>
                  <ul className="text-indigo-700 space-y-1 text-sm">
                    <li>• <strong>Incapsulare</strong>: Parola este privată (__parola)</li>
                    <li>• <strong>Moștenire</strong>: Admin extends Utilizator</li>
                    <li>• <strong>Polimorfism</strong>: afiseaza_profil() diferit pentru User/Admin</li>
                    <li>• <strong>Separarea responsabilităților</strong>: Fiecare clasă are rolul său</li>
                    <li>• <strong>Extensibilitate</strong>: Poți adăuga Manager, Moderator etc.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced OOP Demo */}
        {activeDemo === 'advanced' && (
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              6. OOP Avansat - Operatori Speciali și Design Patterns
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🚗 Showroom Auto Inteligent</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* Sorting and Filtering */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h5 className="font-medium text-gray-700">🔧 Controluri</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sortează după:</label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="marca">Marcă</option>
                          <option value="model">Model</option>
                          <option value="an">An</option>
                          <option value="pret">Preț</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrează tip:</label>
                        <select
                          value={filterBy}
                          onChange={(e) => setFilterBy(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="all">Toate</option>
                          <option value="sedan">Sedan</option>
                          <option value="suv">SUV</option>
                          <option value="electric">Electric</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Cars Display */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700">🚘 Mașini Disponibile</h5>
                    {getSortedAndFilteredCars().map((car) => (
                      <div key={car.id} className={`rounded-lg p-4 border-2 ${car.tip === 'electric' ? 'bg-green-50 border-green-200' : car.tip === 'suv' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h6 className="font-bold text-gray-800 text-lg">
                              {car.tip === 'electric' && '⚡'} 
                              {car.tip === 'suv' && '🚙'} 
                              {car.tip === 'sedan' && '🚗'} 
                              {car.marca} {car.model}
                            </h6>
                            <p className="text-sm text-gray-600">An: {car.an}</p>
                            <p className="text-lg font-bold text-green-600">{car.pret.toLocaleString()} €</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${car.tip === 'electric' ? 'bg-green-200 text-green-800' : car.tip === 'suv' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                              {car.tip.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4 border-2 border-teal-200">
                    <h5 className="font-semibold text-teal-800 mb-2">🎯 Features Avansate</h5>
                    <ul className="text-teal-700 text-sm space-y-1">
                      <li>• <strong>__str__</strong>: Reprezentare text frumoasă</li>
                      <li>• <strong>__eq__</strong>: Comparare între mașini</li>
                      <li>• <strong>__lt__</strong>: Sortare automată după preț</li>
                      <li>• <strong>Property decorators</strong>: Getteri/Setteri elegante</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <pre className="text-green-400">
{`class Masina:
    """
    Clasă avansată cu operatori speciali și properties
    """
    def __init__(self, marca, model, an, pret):
        self.marca = marca
        self.model = model
        self.an = an
        self._pret = pret  # Protected attribute
    
    @property
    def pret(self):
        """Property pentru preț - getter elegant"""
        return self._pret
    
    @pret.setter 
    def pret(self, nou_pret):
        """Setter cu validare"""
        if nou_pret > 0:
            self._pret = nou_pret
        else:
            raise ValueError("Prețul trebuie să fie pozitiv!")
    
    def __str__(self):
        """Reprezentare string frumoasă"""
        return f"🚗 {'{'}self.marca{'}'} {'{'}self.model{'}'} ({'{'}self.an{'}'}) - {'{'}self.pret:,{'}'} €"
    
    def __repr__(self):
        """Reprezentare pentru debugging"""
        return f"Masina('{'{'}self.marca{'}'}', '{'{'}self.model{'}'}', {'{'}self.an{'}'}, {'{'}self.pret{'}'})"
    
    def __eq__(self, other):
        """Comparare de egalitate"""
        if isinstance(other, Masina):
            return (self.marca == other.marca and 
                   self.model == other.model and 
                   self.an == other.an)
        return False
    
    def __lt__(self, other):
        """Comparare pentru sortare (mai mic decât)"""
        if isinstance(other, Masina):
            return self.pret < other.pret
        return NotImplemented
    
    def __len__(self):
        """Lungimea numelui complet"""
        return len(f"{'{'}self.marca{'}'} {'{'}self.model{'}'}")

class MasinaElectrica(Masina):
    """Moștenire cu funcționalități specifice"""
    def __init__(self, marca, model, an, pret, autonomie_km):
        super().__init__(marca, model, an, pret)
        self.autonomie_km = autonomie_km
    
    def __str__(self):
        """Override pentru afișare specială"""
        return f"⚡ {'{'}self.marca{'}'} {'{'}self.model{'}'} Electric ({'{'}self.an{'}'}) - {'{'}self.pret:,{'}'} € (Autonomie: {'{'}self.autonomie_km{'}'}km)"

# Utilizare avansată:
masini = [
    Masina("Toyota", "Corolla", 2020, 25000),
    MasinaElectrica("Tesla", "Model 3", 2022, 45000, 500),
    Masina("BMW", "X5", 2021, 55000)
]

# Sortare automată (folosește __lt__):
masini_sorted = sorted(masini)

# Afișare frumoasă (folosește __str__):
for masina in masini_sorted:
    print(masina)

# Comparare (folosește __eq__):
masina1 = Masina("Toyota", "Corolla", 2020, 25000)
masina2 = Masina("Toyota", "Corolla", 2020, 26000)
print(masina1 == masina2)  # True (același model, an diferit)`}
                  </pre>
                </div>
                
                <div className="mt-4 bg-teal-50 rounded-lg p-4">
                  <h5 className="font-semibold text-teal-800 mb-2">🚀 Concepte Avansate OOP</h5>
                  <ul className="text-teal-700 space-y-1 text-sm">
                    <li>• <strong>Magic Methods</strong>: __str__, __eq__, __lt__ pentru comportament natural</li>
                    <li>• <strong>Properties</strong>: @property pentru getteri/setteri elegante</li>
                    <li>• <strong>Protected attributes</strong>: _pret (un underscore)</li>
                    <li>• <strong>Method overriding</strong>: Comportament specific în clase derivate</li>
                    <li>• <strong>Type checking</strong>: isinstance() pentru siguranță</li>
                    <li>• <strong>Kompoziție</strong>: Clasele conțin obiecte din alte clase</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Final Message */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">🏗️ OOP - Arhitectura Modernă a Codului</h2>
          <p className="text-xl mb-6 opacity-90">
            Prin OOP, codul devine o oglindă a realității: organizat, modular și scalabil.
            Clasele sunt planurile, obiectele sunt construcțiile, iar metodele sunt funcționalitățile.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 rounded-xl p-6">
              <Building2 className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Clase & Obiecte</h3>
              <p className="text-sm opacity-90">Șabloane și instanțe</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Incapsulare</h3>
              <p className="text-sm opacity-90">Protecție și control</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Moștenire</h3>
              <p className="text-sm opacity-90">Reutilizare și extindere</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <Zap className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Polimorfism</h3>
              <p className="text-sm opacity-90">O interfață, multe forme</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-lg font-medium mb-4">
              🎨 De la cod procedural la arhitectură orientată pe obiecte
            </p>
            <Button 
              onClick={() => navigate('/foundations')}
              className="bg-white text-violet-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
            >
              Înapoi la Fundamente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OOPArtifact;