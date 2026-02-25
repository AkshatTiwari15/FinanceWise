import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';
import { Lock } from 'lucide-react';
import Button from '../common/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-emerald-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Lock className="h-10 w-10 text-emerald-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-navy-900 mb-4">
            Access Required
          </h2>
          
          <p className="text-gray-600 mb-8">
            Please sign in to access our financial tools and calculators. 
            Join thousands of young adults mastering their finances with FinanceWise.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
            >
              Sign In to Continue
            </Button>
            
            <p className="text-sm text-gray-500">
              Don't have an account? Sign up is free and takes less than a minute.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-navy-900 mb-3">What you'll get access to:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Advanced loan optimization calculator</li>
              <li>• Investment comparison tools</li>
              <li>• Personalized financial insights</li>
              <li>• Progress tracking and reports</li>
            </ul>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  );
};

export default ProtectedRoute;