import React from 'react';
import { DollarSign, Mail, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">FinanceWise</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering young adults with the financial knowledge and tools they need to build a secure and prosperous future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['articles', 'tools', 'guide', 'about', 'contact'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-gray-300 hover:text-emerald-400 transition-colors capitalize"
                  >
                    {page === 'guide' ? 'Beginner\'s Guide' : page}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Budget Templates</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Investment Guide</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Debt Payoff Planner</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Financial Calculator</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 FinanceWise. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-emerald-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;