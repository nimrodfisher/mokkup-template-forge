
import { BarChart3, Users, Zap } from "lucide-react";

export function WhyChooseSection() {
  return (
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
  );
}
