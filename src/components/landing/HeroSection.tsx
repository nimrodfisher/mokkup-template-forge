
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, BarChart3, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function HeroSection() {
  const { user } = useAuth();

  return (
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
  );
}
