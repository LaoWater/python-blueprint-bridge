import React, { useState, useEffect } from 'react';
import { useContent } from '../components/ContentProvider';
import { useNavigate } from 'react-router-dom';
import EditablePageHeader from '../components/EditablePageHeader';
import EditableContent from '../components/EditableContent';
import EditableCodeBlock from '../components/EditableCodeBlock';
import TableOfContents from '../components/TableOfContents';
import CourseNavigation from '../components/CourseNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, BarChart3, TrendingUp, ChevronRight, Play, Target, Lightbulb, Palette } from 'lucide-react';
import dataVisualizingHero from '@/assets/data-calculus-landscape.jpg';



const DataVisualizing = () => {
  const { getContent, loading } = useContent();
  const navigate = useNavigate();
  
  const [tocItems] = useState([
    { id: 'revelation', title: 'The Need Arises', sessions: 'Introduction' },
    { id: 'opening-eyes', title: 'Opening Our Eyes', sessions: 'The Story' },
    { id: 'matplotlib-mastery', title: 'Matplotlib Mastery', sessions: 'Sessions 18-19' },
    { id: 'next-journey', title: 'The Path Forward', sessions: 'Future' },
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${dataVisualizingHero})`,
            filter: 'brightness(0.3) contrast(1.2)',
          }}
        />
        
        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent dark:from-black/70 dark:via-black/50 dark:to-black/20" />
        
        {/* Additional overlay for theme adaptation */}
        <div className="absolute inset-0 bg-background/10 dark:bg-background/5" />
        
        {/* Content with forced white text */}
        <div className="relative z-10 [&_*]:!text-white [&_*]:!text-opacity-100">
          <EditablePageHeader 
            page="data-visualizing"
            defaultTitle="Data: Visualizing" 
            defaultSubtitle="Opening Our Eyes - From Numbers to Visual Intelligence"
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Main content - Keep wide and clean */}
        <div className="flex-grow min-w-0 max-w-none">

          
          {/* The Revelation - Why Visualization? */}
          <section id="revelation" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">The Moment of Revelation</h2>
                <p className="text-muted-foreground">"Now what?" - The question every data scientist faces</p>
              </div>
            </div>

            {/* The Question */}
            <Card className="border-orange-200 dark:border-orange-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <Target className="w-5 h-5" />
                  "How do I turn this Data into Value?"
                </CardTitle>
                <CardDescription className="text-lg">
                  Once the Student has began Grasping how to Model Data - and then how to Process it fast, precise and scalable - of course the question rises...
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    You've mastered data structures, conquered algorithms, and harnessed the power of NumPy and Pandas. 
                    Your models are elegant, your processing is lightning-fast, and your data flows through pipelines 
                    like water through precisely engineered channels.
                  </p>
                  
                  <p className="text-muted-foreground">
                    But then comes the inevitable question: <strong className="text-orange-600 dark:text-orange-400">
                    "Now What? How do I turn this Data into Value?"</strong>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">💰 Productivity</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Optimize workflows</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-800 dark:text-green-200">💸 Money</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">Drive revenue</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200">⚡ Performance</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Boost efficiency</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200">📈 Scalability</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">Scale systems</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </section>

          {/* Opening Our Eyes */}
          <section id="opening-eyes" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">"Open Our Eyes. And with our Eyes Open, we shall see Further and Clearer"</h2>
                <p className="text-muted-foreground">The answer lies in fantastic imagination and precise tools</p>
              </div>
            </div>

            <Card className="border-teal-200 dark:border-teal-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                  <Lightbulb className="w-5 h-5" />
                  The Visual Revolution
                </CardTitle>
                <CardDescription className="text-lg">
                  From need arises invention. The need was clear - now comes the solution.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    That is.. we need <strong className="text-teal-600 dark:text-teal-400">fantastic imagination</strong> and 
                    <strong className="text-teal-600 dark:text-teal-400"> precise tools</strong> in order to 
                    Visually represent the Models and the World we created in our Data Structures.
                  </p>
                  
                  <blockquote className="border-l-4 border-teal-500 pl-4 italic text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/20 p-4 rounded-r-lg">
                    "The greatest value of a picture is when it forces us to notice what we never expected to see."
                    <footer className="text-sm mt-2 not-italic">— John Tukey, Pioneer of Data Visualization</footer>
                  </blockquote>

                  <p className="text-muted-foreground">
                    As always, we will begin by telling the story not of the tool being invented and then the need 
                    followed (as is most current teaching curricula) - but rather of the <strong>Need which arisen</strong> - and then 
                    the <strong>Invention of Tools</strong> followed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Matplotlib Mastery Section */}
          <section id="matplotlib-mastery" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Sesiunea 18–19: Vizualizarea Datelor cu Matplotlib</h2>
                <p className="text-muted-foreground">De la Bază la Nivel Profesionist</p>
              </div>
            </div>

            <Card className="border-blue-200 dark:border-blue-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Palette className="w-5 h-5" />
                  🕒 Durată: 6 ore (2 sesiuni combinate)
                </CardTitle>
                <CardDescription className="text-lg">
                  🎯 Obiectiv: Să înveți să transformi datele în povești vizuale clare și profesioniste, folosind Matplotlib
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    Vei începe cu fundamentele și vei ajunge la tehnici avansate care îți oferă control deplin asupra 
                    designului graficelor, animațiilor și integrării cu Pandas.
                  </p>
                  
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-4">1. De ce vizualizarea datelor contează?</h4>
                  <p className="text-muted-foreground">
                    Cifrele brute sunt greu de interpretat. Un grafic bine construit poate evidenția trenduri, sezonalitate sau 
                    probleme ascunse imediat. Vizualizarea este un limbaj universal al datelor – și tu îl vei învăța să-l folosești.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">2. Fundamentele Matplotlib</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                        <li><strong>Tipuri de grafice:</strong> linii, bare, histograme, scatter plots</li>
                        <li><strong>Subploturi:</strong> mai multe vizualizări pentru comparații</li>
                        <li><strong>Personalizare:</strong> culori, stiluri, marcatori, legende</li>
                        <li><strong>Export:</strong> salvarea în PNG, PDF pentru prezentări</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">3. Tehnici Avansate</h4>
                      <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
                        <li><strong>Control complet:</strong> axe, limite, intervale de ticks</li>
                        <li><strong>Linii de referință:</strong> marcaje pentru praguri importante</li>
                        <li><strong>Adnotări:</strong> săgeți și texte pentru puncte cheie</li>
                        <li><strong>Animații:</strong> vizualizarea evoluției în timp</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4">4. Aplicații practice în viața reală</h4>
                    <p className="text-green-700 dark:text-green-300 mb-4">
                      Matplotlib nu este doar pentru exerciții teoretice – este un instrument care îți poate transforma 
                      datele de zi cu zi în insight-uri clare:
                    </p>
                    <ul className="text-green-700 dark:text-green-300 space-y-2">
                      <li>• <strong>Monitorizarea vânzărilor</strong> și cheltuielilor</li>
                      <li>• <strong>Urmărirea progresului personal</strong> (fitness, somn, productivitate)</li>
                      <li>• <strong>Vizualizarea temperaturilor</strong>, obiceiurilor sau rutinelor</li>
                      <li>• <strong>Rapoarte profesionale</strong> și proiecte de cercetare</li>
                    </ul>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-4">5. Idei de sarcini cu impact real</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-amber-700 dark:text-amber-300"><strong>💡 Task 1:</strong> Creează un grafic cu cheltuielile tale zilnice pe o lună, apoi compară cu veniturile.</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">Vei obține o imagine clară a modului în care îți gestionezi finanțele.</p>
                      </div>
                      <div>
                        <p className="text-amber-700 dark:text-amber-300"><strong>💡 Task 2:</strong> Monitorizează-ți starea de sănătate timp de 2 săptămâni.</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">Ore de somn, pași, hidratare, dispoziție zilnică - creează vizualizări care să evidențieze tipare și să ducă la îmbunătățiri reale.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => window.open('/artifacts/matplotlib-mastery', '_blank')}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">📊</span>
                      <span>Open Matplotlib Mastery Artifact</span>
                      <Play className="w-5 h-5" />
                    </div>
                  </Button>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Călătoria completă de la fundamentele Matplotlib la vizualizări profesioniste!
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>


          {/* The Path Forward */}
          <section id="next-journey" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">The Journey Continues</h2>
                <p className="text-muted-foreground">From visualization mastery to machine learning</p>
              </div>
            </div>

            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <TrendingUp className="w-5 h-5" />
                  Building the Bridge to AI
                </CardTitle>
                <CardDescription className="text-lg">
                  Every visualization you master strengthens your foundation for the next chapter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    With your newfound ability to transform data into compelling visual stories, you've built an essential 
                    bridge between raw computation and human insight. The patterns you learn to visualize here will become 
                    the patterns you'll teach machines to recognize in our next adventure.
                  </p>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                          Coming Next: Machine Learning Foundations
                        </h5>
                        <p className="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
                          The visualization skills you've developed will become invaluable as we explore how machines 
                          learn from data. Every chart you can create helps you understand what the algorithms are 
                          "seeing" in the data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Navigation - Compact and positioned better */}
        <div className="hidden lg:block w-72">
          <div className="space-y-4">
            <CourseNavigation 
              previousCourse={{
                path: "/data-calculus",
                title: "Data Calculus"
              }}
              nextCourse={{
                path: "/machine-learning", 
                title: "Machine Learning"
              }}
            />
            
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default DataVisualizing;