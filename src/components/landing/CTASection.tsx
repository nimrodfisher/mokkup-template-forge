
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export function CTASection() {
  return (
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
  );
}
