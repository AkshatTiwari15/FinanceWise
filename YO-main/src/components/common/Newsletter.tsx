import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import Button from './Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
        <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-emerald-800 mb-2">
          ✅ You're in! Check your inbox for your free eBook.
        </h3>
        <p className="text-emerald-700">
          Download our free guide — "How to Grow Wealth Faster Without Taking Risks."
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap"
        >
          {isLoading ? 'Subscribing...' : 'Get Free Guide'}
        </Button>
      </div>
      <p className="text-sm text-gray-300 mt-2">
        Get weekly tips + free guide: "How to Grow Wealth Faster Without Taking Risks." Unsubscribe anytime.
      </p>
    </form>
  );
};

export default Newsletter;