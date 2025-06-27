
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, Zap, Plus } from "lucide-react";
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
      question: "How do I get started with Alignify?",
      answer: "Simply download the app from Google Play or the App Store, follow the setup guide, and start using Alignify instantly."
    },
    {
      question: "Can I customize Alignify's responses to fit my needs?",
      answer: "Yes! Alignify supports extensive customization options to tailor responses and workflows to your specific requirements."
    },
    {
      question: "What types of tasks can Alignify assist with?",
      answer: "Alignify can help with data visualization, dashboard creation, analytics, reporting, and collaborative data storytelling."
    },
    {
      question: "Is Alignify available in multiple languages?",
      answer: "Currently Alignify supports English with plans to expand to additional languages in future updates."
    },
    {
      question: "What kind of support is available if I encounter issues?",
      answer: "We provide comprehensive support through documentation, community forums, and direct customer service channels."
    },
    {
      question: "Can AI cancel my subscription?",
      answer: "You have full control over your subscription and can cancel anytime through your account settings."
    },
    {
      question: "Can Alignify generate images?",
      answer: "Yes, Alignify can help generate visual elements and charts for your data visualization needs."
    }
  ];

  const logoPartners = [
    "DELL", "zendesk", "Rakuten", "Pacific Funds", "NCR", "Lattice", "TED"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl">Alignify</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/templates" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link to="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
            <Link to="/auth" className="text-gray-300 hover:text-white transition-colors">Login</Link>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-white text-purple-900 hover:bg-gray-100 border border-white/20">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Join Beta
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Bring your data<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              product ideas to life
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Create professional dashboard wireframes using advanced visualizations and customizable templates. Perfect for both freelancers working with clients and organizations aligning multiple teams.
          </p>
          
          <div className="mb-16">
            {user ? (
              <Link to="/editor">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full">
                  <Users className="w-5 h-5 mr-2" />
                  Join Beta
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full">
                  <Users className="w-5 h-5 mr-2" />
                  Join Beta
                </Button>
              </Link>
            )}
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">Dashboard</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500">Digital Codex</span>
                    <span className="text-xs text-gray-500">Analytics</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
                    <BarChart3 className="w-6 h-6 text-purple-400 mb-2" />
                    <div className="text-sm text-gray-400">Views</div>
                  </div>
                  <div className="bg-pink-600/20 p-3 rounded-lg border border-pink-500/30">
                    <Users className="w-6 h-6 text-pink-400 mb-2" />
                    <div className="text-sm text-gray-400">Users</div>
                  </div>
                  <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-500/30">
                    <Zap className="w-6 h-6 text-blue-400 mb-2" />
                    <div className="text-sm text-gray-400">Events</div>
                  </div>
                  <div className="bg-green-600/20 p-3 rounded-lg border border-green-500/30 flex items-center justify-center">
                    <div className="text-2xl font-bold text-green-400">4,832</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-6 border border-purple-500/30">
                  <div className="h-32 flex items-end justify-between">
                    <div className="w-full h-full bg-gradient-to-t from-purple-600 to-purple-400 rounded opacity-70"></div>
                  </div>
                  <div className="text-right mt-2 text-sm text-gray-400">May 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400 mb-8">Trusted by teams at over 1,000 of the world's leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {logoPartners.map((logo, index) => (
              <div key={index} className="text-gray-500 font-semibold text-lg">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Alignify Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose</h2>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Alignify?</h2>
          <p className="text-xl text-gray-400 mb-16">Save time and resources by getting alignment right the first time</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Interactive Wireframes</h3>
              <p className="text-gray-400 leading-relaxed">
                Create dynamic dashboard mockups that bring your data stories to life, replacing traditional whiteboards with analytics-focused tools
              </p>
            </div>
            
            <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-400 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Real-time Collaboration</h3>
              <p className="text-gray-400 leading-relaxed">
                Enable analysts to focus on deep analysis while business teams easily communicate their desired outcomes
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Rapid Iteration</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Eliminate endless feedback loops and reduce misunderstandings with clear visual communication
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 border-t border-white/10">
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400">// DigitalCodex.js</div>
                  <div className="text-blue-400 mt-2">function <span className="text-yellow-400">getResData</span>(<span className="text-purple-400">start</span>) &#123;</div>
                  <div className="text-gray-400 ml-4">let start = start + step;</div>
                  <div className="text-gray-400 ml-4">value: end;</div>
                  <div className="text-gray-400 ml-4">temp: result;</div>
                  <div className="text-gray-400 ml-4">return result;</div>
                  <div className="text-blue-400">&#125;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Data</h2>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Collaboration?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Join teams who are saving countless hours and building stronger relationships through better data visualization alignment
          </p>
          
          <Link to="/auth">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full">
              <Users className="w-5 h-5 mr-2" />
              Join Beta
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Have Questions?</h2>
            <p className="text-xl text-gray-400">
              Our FAQ section covers everything you need to know about Alignify, from setup and customization to troubleshooting and support. Find quick, helpful answers to make integrating Alignify into your website seamless and hassle-free.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                <CollapsibleTrigger className="w-full p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 text-left hover:bg-gray-900/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <Plus className={`w-5 h-5 transform transition-transform ${openFaq === index ? 'rotate-45' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <div className="pt-4">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>Work inquiries: work@qoutflow.com</p>
                <p>PR and speaking: press@flow.com</p>
                <p>New business: newbusiness@qoutflow.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl">Alignify</span>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500">
            <p>&copy; 2023 Qoutflow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors z-20"
      >
        <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
      </button>
    </div>
  );
};

export default Index;
