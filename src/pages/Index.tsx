
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedBySection } from "@/components/landing/TrustedBySection";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";
import { CTASection } from "@/components/landing/CTASection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-purple-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-full filter blur-3xl"></div>
        
        {/* Additional gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-400/10 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-tl from-blue-400/20 to-indigo-400/10 rounded-full filter blur-2xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-gray-900/20">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-2xl">Alignify</span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">Home</Link>
            <Link to="/templates" className="text-gray-300 hover:text-white transition-colors font-medium">Features</Link>
            <Link to="#faq" className="text-gray-300 hover:text-white transition-colors font-medium">FAQ</Link>
            <Link to="/auth" className="text-gray-300 hover:text-white transition-colors font-medium">Login</Link>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm shadow-lg">
                  <Users className="w-4 h-4 mr-2" />
                  Join Beta
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <HeroSection />
      <TrustedBySection />
      <WhyChooseSection />
      <CTASection />
      <FAQSection />
      <Footer />

      {/* Enhanced Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-all duration-300 z-20 shadow-2xl border border-white/20"
      >
        <ArrowRight className="w-6 h-6 rotate-[-90deg] text-white" />
      </button>
    </div>
  );
};

export default Index;
