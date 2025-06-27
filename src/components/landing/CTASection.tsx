
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready to Transform Your Data</h2>
        <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Collaboration?</h2>
        <p className="text-xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
          Join teams who are saving countless hours and building stronger relationships through better data visualization alignment
        </p>
        
        <Link to="/auth">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-12 py-6 rounded-full shadow-2xl border-0">
            <Users className="w-6 h-6 mr-3" />
            Join Beta
          </Button>
        </Link>
      </div>
    </section>
  );
}
