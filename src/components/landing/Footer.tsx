
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-16 px-6 bg-gray-900/20 backdrop-blur-xl">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <p className="hover:text-white transition-colors">Work inquiries: work@alignify.com</p>
              <p className="hover:text-white transition-colors">PR and speaking: press@alignify.com</p>
              <p className="hover:text-white transition-colors">New business: newbusiness@alignify.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-3xl">Alignify</span>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2024 Alignify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
