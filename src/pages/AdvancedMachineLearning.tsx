import React from 'react';
import { useTheme } from '@/components/theme-provider';
import EditablePageHeader from '@/components/EditablePageHeader';
import EditableCodeBlock from '@/components/EditableCodeBlock';
import TableOfContents from '@/components/TableOfContents';
import CourseNavigation from '@/components/CourseNavigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import advancedMLHero from '@/assets/advanced-ml-hero.jpg';

const AdvancedMachineLearning = () => {
  const { theme } = useTheme();

  const tocItems = [
    { id: 'introduction', title: 'Advanced ML Journey', sessions: 'Overview' },
    { id: 'keras-foundation', title: 'Keras Foundation', sessions: 'Session 42' },
    { id: 'keras-advanced', title: 'Advanced Keras', sessions: 'Session 43' },
    { id: 'keras-projects', title: 'Complete Projects', sessions: 'Sessions 44-46' },
    { id: 'keras-ultra', title: 'Ultra-Advanced Techniques', sessions: 'Session 47' },
    { id: 'deployment', title: 'Production Deployment', sessions: 'Sessions 48-50' },
    { id: 'mastery', title: 'The Path to Mastery', sessions: 'Conclusion' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section with Background Image */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
          <img 
            src={advancedMLHero} 
            alt="Advanced Machine Learning with Keras and Deployment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-4">Advanced ML & Deploy</h1>
              <p className="text-xl text-white/90">Keras Mastery & Production Deployment</p>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            
            {/* Introduction */}
            <section id="introduction" className="mb-16">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  The Advanced ML Journey: From Keras to Production
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Welcome to the advanced frontier of machine learning. Here, we transcend basic implementations 
                    and dive into the sophisticated architectures that power real-world AI systems. From Google's 
                    recommendation engines to autonomous vehicles, these are the techniques that drive innovation.
                  </p>
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800">
                    <h3 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-200">
                      What You'll Master:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Deep Learning Mastery:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Keras from foundation to ultra-advanced</li>
                          <li>• Custom neural architectures</li>
                          <li>• Transfer learning strategies</li>
                          <li>• Production-ready model design</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Production Systems:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Model deployment strategies</li>
                          <li>• Monitoring & MLOps</li>
                          <li>• Scaling & optimization</li>
                          <li>• Enterprise AI architecture</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Keras Foundation */}
            <section id="keras-foundation" className="mb-16">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Session 42 – Keras Foundation: Your Gateway to Deep Learning
                </h2>
                <p className="text-lg mb-8 text-muted-foreground">
                  Keras democratizes deep learning, making sophisticated neural networks accessible to developers worldwide. 
                  From Google's recommendation systems to Tesla's autopilot, Keras powers the AI that shapes our world.
                </p>

                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                      The Keras Philosophy: Deep Learning for Humans
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Core Concepts:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• Sequential vs Functional API</li>
                          <li>• Layer composition and design</li>
                          <li>• Optimizer selection strategies</li>
                          <li>• Training and validation workflows</li>
                          <li>• Model evaluation techniques</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Real-World Application:</h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          Build a customer churn prediction system that helps businesses retain valuable customers 
                          by identifying at-risk accounts before they leave.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Business Impact:</strong> 23% reduction in churn, $2M+ annual savings</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Architecture Fundamentals</h4>
                      <div className="text-xs text-muted-foreground space-y-2">
                        <p>• <strong>Layer Design:</strong> Dense, dropout, and normalization strategies</p>
                        <p>• <strong>Activation Functions:</strong> ReLU, sigmoid, and custom activations</p>
                        <p>• <strong>Loss Functions:</strong> Categorical crossentropy and custom losses</p>
                        <p>• <strong>Callbacks:</strong> Early stopping, learning rate scheduling</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Advanced Keras */}
            <section id="keras-advanced" className="mb-16">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Session 43 – Advanced Keras: Custom Networks & Fine-tuning
                </h2>
                <p className="text-lg mb-8 text-muted-foreground">
                  Move beyond sequential models into the realm of custom architectures, functional APIs, 
                  and sophisticated training strategies that power production AI systems.
                </p>

                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
                      Custom Architecture Design & Advanced Training
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Advanced Techniques:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• Custom layers and activation functions</li>
                          <li>• Advanced optimizers (AdamW, RMSprop)</li>
                          <li>• Learning rate scheduling strategies</li>
                          <li>• Regularization techniques (Dropout, L2)</li>
                          <li>• Functional API for complex architectures</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Real-World Application:</h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          Build a fraud detection system for financial institutions that processes 
                          thousands of transactions per second with high accuracy and minimal false positives.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Performance:</strong> 99.2% accuracy, &lt;5ms inference time</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Key Concepts: Custom Model Architecture</h4>
                      <div className="text-xs text-muted-foreground space-y-2">
                        <p>• <strong>Custom Layers:</strong> Implement domain-specific operations</p>
                        <p>• <strong>Learning Rate Scheduling:</strong> Adaptive learning for optimal convergence</p>
                        <p>• <strong>Advanced Callbacks:</strong> Professional training monitoring and control</p>
                        <p>• <strong>Regularization:</strong> Prevent overfitting in complex models</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Complete Projects */}
            <section id="keras-projects" className="mb-16">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Sessions 44-46: Complete Projects - From Theory to Production
                </h2>
                <p className="text-lg mb-8 text-muted-foreground">
                  Master the complete ML pipeline through hands-on projects that mirror real-world industry challenges.
                </p>

                <div className="space-y-8">
                  {/* Session 44 */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
                      Session 44 – Complete Project: Medical Image Classification with CNN
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">CNN Mastery:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• Convolutional and pooling layer design</li>
                          <li>• Feature map visualization techniques</li>
                          <li>• Data augmentation strategies</li>
                          <li>• Batch normalization implementation</li>
                          <li>• Architecture optimization</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Industry Project:</h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          Develop a medical image classifier for skin cancer detection that assists 
                          dermatologists in early diagnosis.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Impact:</strong> 94% accuracy, potentially saving lives through early detection</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Architecture Highlights</h4>
                      <div className="text-xs text-muted-foreground grid md:grid-cols-2 gap-4">
                        <div>
                          <p>• <strong>Multi-scale feature extraction</strong></p>
                          <p>• <strong>Progressive dropout strategy</strong></p>
                          <p>• <strong>Attention mechanisms</strong></p>
                        </div>
                        <div>
                          <p>• <strong>Advanced data augmentation</strong></p>
                          <p>• <strong>Class imbalance handling</strong></p>
                          <p>• <strong>Production-ready inference</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Session 45 */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                      Session 45 – Transfer Learning: Power of Pre-trained Models
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Transfer Learning Mastery:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• ResNet, VGG, EfficientNet models</li>
                          <li>• Feature extraction vs fine-tuning</li>
                          <li>• Layer freezing strategies</li>
                          <li>• Custom head architectures</li>
                          <li>• Domain adaptation techniques</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Enterprise Solution:</h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          Build a quality control system for manufacturing that achieves 99.9% accuracy 
                          using only 100 training images per defect type.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Efficiency:</strong> 50x faster training, 90% less data required</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Transfer Learning Strategy</h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>• <strong>Phase 1:</strong> Feature extraction with frozen base model</p>
                        <p>• <strong>Phase 2:</strong> Fine-tuning with reduced learning rate</p>
                        <p>• <strong>Phase 3:</strong> Domain-specific optimization</p>
                      </div>
                    </div>
                  </div>

                  {/* Session 46 */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-indigo-200">
                      Session 46 – Advanced Project: Autonomous Vehicle Perception
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Professional Training:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• Advanced data augmentation pipelines</li>
                          <li>• Custom callback development</li>
                          <li>• TensorBoard integration</li>
                          <li>• Experiment tracking systems</li>
                          <li>• Distributed training strategies</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Production System:</h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          Create an autonomous vehicle perception system that identifies road signs, 
                          pedestrians, and vehicles in real-time with safety-critical accuracy.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Performance:</strong> 99.7% accuracy, &lt;20ms inference time</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Safety-Critical AI Development</h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>• <strong>Safety Callbacks:</strong> Real-time performance monitoring</p>
                        <p>• <strong>Robust Augmentation:</strong> Weather, lighting, and scenario variations</p>
                        <p>• <strong>Redundancy Systems:</strong> Multiple model validation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Ultra-Advanced Techniques */}
            <section id="keras-ultra" className="mb-16">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Session 47 – Ultra-Advanced Keras: Fine-Tuning & Model Deployment
                </h2>
                <p className="text-lg mb-8 text-muted-foreground">
                  Master the complete lifecycle from training to production deployment with model optimization and serving.
                </p>

                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-red-800 dark:text-red-200">
                      Enterprise Model Management & Deployment
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Production Deployment:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• Model serialization and versioning</li>
                          <li>• TensorFlow Serving integration</li>
                          <li>• Model quantization and optimization</li>
                          <li>• A/B testing frameworks</li>
                          <li>• Performance monitoring systems</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Enterprise Deployment:</h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          Deploy a recommendation engine serving millions of users with sub-100ms 
                          latency, handling 50,000+ requests per second.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Scale:</strong> 10M+ users, 99.99% uptime, auto-scaling</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Production Pipeline Components</h4>
                      <div className="text-xs text-muted-foreground grid md:grid-cols-2 gap-4">
                        <div>
                          <p>• <strong>Model versioning:</strong> Automated deployment pipeline</p>
                          <p>• <strong>A/B testing:</strong> Safe model rollouts</p>
                        </div>
                        <div>
                          <p>• <strong>Performance monitoring:</strong> Real-time metrics</p>
                          <p>• <strong>Auto-scaling:</strong> Dynamic resource allocation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Production Deployment */}
            <section id="deployment" className="mb-16">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Sessions 48-50: Production Deployment & Global Scaling
                </h2>
                <p className="text-lg mb-8 text-muted-foreground">
                  Transform your models into production-ready applications that serve millions of users worldwide.
                </p>

                <div className="space-y-8">
                  {/* Sessions 48-49 */}
                  <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-200">
                      Sessions 48-49 – Deploy AI: Streamlit, Flask, Hugging Face
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Streamlit Apps:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• Interactive dashboards</li>
                          <li>• Real-time predictions</li>
                          <li>• Beautiful visualizations</li>
                          <li>• File upload interfaces</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Flask APIs:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• RESTful API design</li>
                          <li>• Authentication & security</li>
                          <li>• Rate limiting</li>
                          <li>• API documentation</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Hugging Face:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• Model hosting</li>
                          <li>• Gradio interfaces</li>
                          <li>• Community sharing</li>
                          <li>• Version control</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Multi-Platform Strategy</h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>• <strong>Streamlit:</strong> Rapid prototyping and demos</p>
                        <p>• <strong>Flask/FastAPI:</strong> Production APIs and microservices</p>
                        <p>• <strong>Hugging Face Spaces:</strong> Community sharing and collaboration</p>
                      </div>
                    </div>
                  </div>

                  {/* Session 50 */}
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-cyan-800 dark:text-cyan-200">
                      Session 50 – Enterprise Scaling: Docker, Kubernetes, Global Infrastructure
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Enterprise Scaling:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          <li>• Docker containerization</li>
                          <li>• Kubernetes orchestration</li>
                          <li>• Load balancing strategies</li>
                          <li>• Auto-scaling policies</li>
                          <li>• Multi-region deployment</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Global Infrastructure:</h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          Deploy a real-time language translation service serving 10 million+ users 
                          globally with 99.99% uptime and sub-50ms latency.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Architecture:</strong> Microservices, edge computing, CDN integration</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Enterprise Deployment Stack</h4>
                      <div className="text-xs text-muted-foreground grid md:grid-cols-2 gap-4">
                        <div>
                          <p>• <strong>Containerization:</strong> Docker + security best practices</p>
                          <p>• <strong>Orchestration:</strong> Kubernetes with auto-scaling</p>
                        </div>
                        <div>
                          <p>• <strong>Monitoring:</strong> Comprehensive logging and alerting</p>
                          <p>• <strong>CI/CD:</strong> Automated testing and deployment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mastery Path */}
            <section id="mastery" className="mb-16">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg border border-border p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  🎯 Capstone Challenge: Build Your AI Empire
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Combine everything you've learned to create a full-scale AI application that could power a startup or transform an industry.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Project Options:</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li>🏥 <strong>HealthAI Platform:</strong> Multi-modal medical diagnosis system</li>
                      <li>🚗 <strong>AutonomousDrive:</strong> Self-driving car perception stack</li>
                      <li>🎬 <strong>ContentAI Studio:</strong> AI-powered video/image generation platform</li>
                      <li>🛒 <strong>RetailAI Engine:</strong> Personalized shopping experience platform</li>
                      <li>🏭 <strong>IndustryAI Monitor:</strong> Smart manufacturing quality control</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Requirements:</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li>✅ Multiple Keras models working together</li>
                      <li>✅ Transfer learning with custom fine-tuning</li>
                      <li>✅ Production-ready deployment pipeline</li>
                      <li>✅ Beautiful web interface (Streamlit/Flask)</li>
                      <li>✅ Cloud deployment with scaling</li>
                      <li>✅ Real-time monitoring and metrics</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-background rounded-lg border border-border">
                  <h4 className="text-lg font-semibold mb-3 text-primary">🚀 Graduation Criteria</h4>
                  <p className="text-muted-foreground">
                    Deploy your AI application live on the internet, demonstrate it processing real data, 
                    and present it to the community. You'll receive a certificate of completion and join 
                    our exclusive Advanced AI Practitioners network.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar Navigation */}
          <div className="w-80 hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />
            </div>
          </div>
        </div>

        {/* Course Navigation */}
        <div className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4 py-8">
            <CourseNavigation 
              previousCourse={{ 
                path: "/machine-learning", 
                title: "Machine Learning" 
              }}
              nextCourse={{ 
                path: "/blueprints", 
                title: "Blueprints" 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMachineLearning;