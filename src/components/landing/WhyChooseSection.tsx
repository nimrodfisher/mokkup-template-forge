
import { BarChart3, Users, Zap } from "lucide-react";

export function WhyChooseSection() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">Why Choose</h2>
        <h2 className="text-5xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Alignify?</h2>
        <p className="text-xl text-gray-300 mb-20 max-w-3xl mx-auto">Save time and resources by getting alignment right the first time</p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-semibold mb-6">Interactive Wireframes</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Create dynamic dashboard mockups that bring your data stories to life, replacing traditional whiteboards with analytics-focused tools
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-400 rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-semibold mb-6">Real-time Collaboration</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Enable analysts to focus on deep analysis while business teams easily communicate their desired outcomes
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="p-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-semibold mb-6">Rapid Iteration</h3>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Eliminate endless feedback loops and reduce misunderstandings with clear visual communication
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 p-8 border-t border-white/10">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 font-mono text-sm border border-purple-500/20">
                <div className="text-green-400 mb-2">// DigitalCodex.js</div>
                <div className="text-blue-400">function <span className="text-yellow-400">getResData</span>(<span className="text-purple-400">start</span>) &#123;</div>
                <div className="text-gray-300 ml-4">let start = start + step;</div>
                <div className="text-gray-300 ml-4">value: end;</div>
                <div className="text-gray-300 ml-4">temp: result;</div>
                <div className="text-gray-300 ml-4">return result;</div>
                <div className="text-blue-400">&#125;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
