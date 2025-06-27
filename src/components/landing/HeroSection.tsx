
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, BarChart3, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative z-10 py-32 px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          Bring your data<br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            product ideas to life
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
          Create professional dashboard wireframes using advanced visualizations and customizable templates. Perfect for both freelancers working with clients and organizations aligning multiple teams.
        </p>
        
        <div className="mb-20">
          {user ? (
            <Link to="/editor">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-12 py-6 rounded-full shadow-2xl border-0">
                <Users className="w-6 h-6 mr-3" />
                Start Creating
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-12 py-6 rounded-full shadow-2xl border-0">
                <Users className="w-6 h-6 mr-3" />
                Join Beta
              </Button>
            </Link>
          )}
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 border border-white/5">
              {/* Window Controls */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="flex gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400 font-medium">DigitalToken.js</span>
                </div>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>Dashboard</span>
                  <span>Analytics</span>
                </div>
              </div>
              
              {/* Code Block */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 mb-8 border border-purple-500/20">
                <div className="font-mono text-sm">
                  <div className="text-gray-500 mb-3">// addNumbersToToken</div>
                  <div className="text-blue-400">function <span className="text-yellow-400">addNumbersToToken</span>(<span className="text-purple-400">num1, num2</span>) &#123;</div>
                  <div className="text-pink-400 ml-4">let <span className="text-white">sum = num1 + num2;</span></div>
                  <div className="text-pink-400 ml-4">let <span className="text-white">token = &#123;</span></div>
                  <div className="text-gray-400 ml-8">value: <span className="text-green-400">sum</span>,</div>
                  <div className="text-gray-400 ml-8">type: <span className="text-green-400">'number'</span></div>
                  <div className="text-white ml-4">&#125;;</div>
                  <div className="text-pink-400 ml-4">return token;</div>
                  <div className="text-blue-400">&#125;</div>
                </div>
              </div>

              {/* Dashboard Stats */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-600/30 to-purple-400/20 p-4 rounded-xl border border-purple-400/30">
                  <BarChart3 className="w-8 h-8 text-purple-400 mb-3" />
                  <div className="text-sm text-gray-400">Total Visits</div>
                  <div className="text-2xl font-bold text-white">26M</div>
                </div>
                <div className="bg-gradient-to-br from-pink-600/30 to-pink-400/20 p-4 rounded-xl border border-pink-400/30">
                  <Users className="w-8 h-8 text-pink-400 mb-3" />
                  <div className="text-sm text-gray-400">Active Users</div>
                  <div className="text-2xl font-bold text-white">4,612</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600/30 to-blue-400/20 p-4 rounded-xl border border-blue-400/30">
                  <Zap className="w-8 h-8 text-blue-400 mb-3" />
                  <div className="text-sm text-gray-400">Events</div>
                  <div className="text-2xl font-bold text-white">2,504</div>
                </div>
                <div className="bg-gradient-to-br from-green-600/30 to-green-400/20 p-4 rounded-xl border border-green-400/30 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-green-400">20.3M</div>
                  <div className="text-xs text-gray-400">This Month</div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-8 border border-purple-500/30">
                <div className="h-40 flex items-end justify-between gap-2">
                  {[65, 45, 80, 55, 90, 75, 85, 70, 95, 85, 75, 60].map((height, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-purple-600 to-pink-400 rounded-t opacity-80 flex-1"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-gray-400">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
