
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-xl text-blue-600">WireBuilder</div>
          <div className="flex items-center gap-4">
            <Link to="/templates" className="text-gray-600 hover:text-gray-900">Templates</Link>
            <Link to="/editor">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Create Beautiful Wireframes in Minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A simple and powerful wireframing tool to help you design and share your ideas quickly, without any design skills required.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/editor">
                <Button size="lg" className="gap-2">
                  Start Wireframing <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="lg">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="2" />
                    <path d="M4 9h16M8 5v14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pre-built Components</h3>
                <p className="text-gray-600">
                  Drag and drop from our library of pre-built wireframe components to quickly design your interfaces.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15l-3-3m0 0l3-3m-3 3h10M6 19l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Save & Reuse</h3>
                <p className="text-gray-600">
                  Save your wireframes as templates and reuse them for future projects or share them with your team.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Editing</h3>
                <p className="text-gray-600">
                  Resize, move and customize your wireframe elements with intuitive controls and simple interactions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 WireBuilder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
