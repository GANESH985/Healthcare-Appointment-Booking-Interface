import React, { ReactNode } from 'react';
import { Heart, Calendar, Phone } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthCare Plus</h1>
                <p className="text-xs text-gray-500">Book appointments easily</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">24/7 Emergency</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold">HealthCare Plus</span>
              </div>
              <p className="text-gray-300 text-sm">
                Your trusted healthcare partner, providing quality medical services 
                with experienced doctors and state-of-the-art facilities.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📍 123 Medical Center Drive, Healthcare City, Hyd 12345</p>
                <p>📞 +91 1234567890</p>
                <p>📧 info@healthcareplus.com</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency</h3>
              <p className="text-sm text-gray-300 mb-2">
                For medical emergencies, call:
              </p>
              <p className="text-xl font-bold text-red-400">911</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 HealthCare Plus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;