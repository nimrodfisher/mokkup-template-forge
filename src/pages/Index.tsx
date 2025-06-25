
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const Index = () => {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How is Alignify different from traditional wireframing tools?",
      answer: "Alignify focuses specifically on data visualization and dashboard wireframes with advanced chart components, real-time collaboration, and professional templates designed for business intelligence."
    },
    {
      question: "Can I collaborate with my team in real-time?",
      answer: "Yes! Alignify supports real-time collaboration where multiple team members can work on the same wireframe simultaneously, with live cursor tracking and instant updates."
    },
    {
      question: "How does Alignify help reduce iteration cycles?",
      answer: "With our interactive wireframes and instant feedback tools, you can quickly iterate on designs, get stakeholder approval faster, and eliminate miscommunication through visual prototypes."
    },
    {
      question: "Can I use Alignify as a freelancer working with clients?",
      answer: "Absolutely! Alignify is perfect for freelancers who need to create professional dashboard wireframes for clients, with easy sharing and collaboration features."
    },
    {
      question: "What kind of templates are available?",
      answer: "We offer a comprehensive library of professional dashboard templates, including analytics dashboards, KPI dashboards, financial reports, and business intelligence layouts."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-xl text-purple-400">Alignify</div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link to="/templates" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link to="/templates" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
            </nav>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                  <Link to="/editor">
                    <Button className="bg-purple-600 hover:bg-purple-700">Create Project</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                  <Link to="/auth">
                    <Button className="bg-purple-600 hover:bg-purple-700">Join the Beta</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Bring your data<br />
                <span className="text-purple-400">product ideas to life</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Create professional dashboard wireframes using advanced visualizations and customizable templates. Perfect for both freelancers working with clients and organizations aligning multiple teams.
              </p>
              
              {/* Feature highlights */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Professional Templates</h3>
                    <p className="text-gray-400">Start with beautiful, customizable templates designed for data storytelling</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Easy Replication</h3>
                    <p className="text-gray-400">Clone and customize projects to maintain consistency across your organization</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Seamless Sharing</h3>
                    <p className="text-gray-400">Collaborate with stakeholders and get faster approval on your data stories</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-gray-400">Video Placeholder: Platform Overview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Alignify Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Alignify?</h2>
            <p className="text-xl text-gray-400">Save time and resources by getting alignment right the first time</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Interactive Wireframes</h3>
              <p className="text-gray-400 leading-relaxed">
                Create dynamic dashboard mockups that bring your data stories to life, replacing traditional whiteboards with analytics-focused tools
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Real-time Collaboration</h3>
              <p className="text-gray-400 leading-relaxed">
                Enable analysts to focus on deep analysis while business teams easily communicate their desired outcomes
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Rapid Iteration</h3>
              <p className="text-gray-400 leading-relaxed">
                Eliminate endless feedback loops and reduce misunderstandings with clear visual communication
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">Everything you need to know about Alignify and how it can help your team</p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                <CollapsibleTrigger className="w-full p-6 bg-gray-800 rounded-lg border border-gray-700 text-left hover:bg-gray-750 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <svg 
                      className={`w-5 h-5 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Data Collaboration?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join teams who are saving countless hours and building stronger relationships through better data visualization alignment
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 gap-2">
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/editor">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                    Create New Project
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Join the Beta
                  </Button>
                </Link>
                <p className="text-purple-100 text-sm mt-2">
                  Be among the first to experience Alignify
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 Alignify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
