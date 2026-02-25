import React, { useState } from 'react';
import { Calculator, TrendingUp, CreditCard } from 'lucide-react';
import ProtectedRoute from './auth/ProtectedRoute';
import BudgetCalculator from './calculators/BudgetCalculator';
import LoanCalculator from './calculators/LoanCalculator';
import CompoundInterestCalculator from './calculators/CompoundInterestCalculator';

const ToolsPage: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  const calculators = [
    {
      id: 'loan',
      title: 'Loan Optimization Calculator',
      description: 'Curious how much faster you can be debt-free? Increase your EMI slightly and see how it reduces your repayment duration and total interest instantly.',
      icon: CreditCard,
      color: 'bg-purple-500',
      features: ['Extra EMI impact', 'Interest savings', 'Reduced duration', 'Visual timeline'],
      tip: 'Adjust your monthly payment to find your most efficient repayment plan.'
    },
    {
      id: 'investment',
      title: 'Investment Comparison Tool',
      description: 'Compare SIPs, gold, and FDs to see which grows your wealth faster. Get a clear projection of returns and understand which option fits your goals best.',
      icon: TrendingUp,
      color: 'bg-emerald-500',
      features: ['SIP vs Gold vs FD', 'Growth comparison', 'Return projections', 'Visual charts'],
      tip: 'Diversify your investments based on risk tolerance and time horizon.'
    },
    {
      id: 'profitability',
      title: 'Profitability Insight Calculator',
      description: 'Make your money work smarter. Our system analyzes your loan and investment data to tell you if early repayment is better than investing.',
      icon: Calculator,
      color: 'bg-blue-500',
      features: ['Prepay vs Invest', 'Break-even analysis', 'Net gain projection', 'Smart recommendations'],
      tip: 'Get personalized advice on whether to prepay loans or invest for maximum returns.'
    }
  ];

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'loan':
        return <LoanCalculator onClose={() => setActiveCalculator(null)} />;
      case 'investment':
        return <CompoundInterestCalculator onClose={() => setActiveCalculator(null)} />;
      case 'profitability':
        return <BudgetCalculator onClose={() => setActiveCalculator(null)} />;
      default:
        return null;
    }
  };

  if (activeCalculator) {
    return (
      <ProtectedRoute>
        {renderCalculator()}
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy-900 mb-4">
            Smart Financial Tools & Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make informed financial decisions with our advanced calculators. 
            Compare investments, optimize loans, and discover the smartest way to grow your wealth.
          </p>
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {calculators.map((calc) => (
            <div
              key={calc.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`${calc.color} p-6 text-white`}>
                <calc.icon className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{calc.title}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  {calc.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-medium text-navy-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {calc.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {calc.tip && (
                  <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>Tip:</strong> {calc.tip}
                    </p>
                  </div>
                )}
                
                <button
                  onClick={() => setActiveCalculator(calc.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Try Calculator
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-4 text-center">
            Need More Help?
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Our calculators are just the beginning. Explore our comprehensive guides and articles 
            to deepen your financial knowledge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-navy-900 mb-2">Loan Optimization</h3>
              <p className="text-sm text-gray-600">Learn how extra payments can save thousands in interest</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-navy-900 mb-2">Investment Comparison</h3>
              <p className="text-sm text-gray-600">Compare SIPs, gold, and FDs to maximize returns</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-navy-900 mb-2">Smart Money Decisions</h3>
              <p className="text-sm text-gray-600">Get AI-powered insights on prepaying vs investing</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ToolsPage;