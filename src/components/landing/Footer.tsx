
export function Footer() {
  return (
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
  );
}
