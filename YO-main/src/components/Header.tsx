import React, { useState } from 'react';
import { Menu, X, DollarSign } from 'lucide-react';
import { useAuth } from './auth/AuthContext';
import AuthModal from './auth/AuthModal';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const baseNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'articles', label: 'Articles' },
    { id: 'tools', label: 'Tools' },
    { id: 'guide', label: "Beginner's Guide" },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  // Add extra links only when logged in
  const navItems = isAuthenticated
    ? [...baseNavItems, { id: 'dashboard', label: 'Dashboard' }, { id: 'profile', label: 'Profile' }]
    : baseNavItems;

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              <div className="bg-emerald-600 p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-navy-900">
                FinanceWise
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side — Auth */}
            <div className="hidden md:flex items-center ml-4">
              {!isAuthenticated ? (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Sign In
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">
                    Hello, {user?.name}
                  </span>

                  <button
                    onClick={logout}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">

                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 text-left text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Auth */}
                <div className="pt-4 border-t border-gray-200">
                  {!isAuthenticated ? (
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-medium"
                    >
                      Sign In
                    </button>
                  ) : (
                    <>
                      <p className="px-3 pb-2 text-gray-700 font-medium">
                        Hello, {user?.name}
                      </p>

                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}

        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;
