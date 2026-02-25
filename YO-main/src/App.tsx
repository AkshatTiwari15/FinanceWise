import React, { useState } from "react";
import { AuthProvider, useAuth } from "./components/auth/AuthContext";
import AuthModal from "./components/auth/AuthModal";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ArticlesPage from "./components/ArticlesPage";
import ToolsPage from "./components/ToolsPage";
import GuidePage from "./components/GuidePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";

const AppContent = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");
  const [showAuth, setShowAuth] = useState(false);

  if (!user) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome</h1>
            <p className="text-gray-600 mb-4">Login or Register to continue</p>
            <button
              onClick={() => setShowAuth(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Get Started
            </button>
          </div>
        </div>

        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "articles":
        return <ArticlesPage />;
      case "tools":
        return <ToolsPage />;
      case "guide":
        return <GuidePage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
