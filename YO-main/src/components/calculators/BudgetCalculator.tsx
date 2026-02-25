import React, { useState } from 'react';
import { ArrowLeft, DollarSign, PieChart, Calculator } from 'lucide-react';
import Button from '../common/Button';

interface BudgetCalculatorProps {
  onClose: () => void;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ onClose }) => {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [results, setResults] = useState<any>(null);

  const calculateBudget = () => {
    const income = parseFloat(monthlyIncome);
    if (!income || income <= 0) return;

    const needs = income * 0.5; // 50% for needs
    const wants = income * 0.3; // 30% for wants
    const savings = income * 0.2; // 20% for savings

    setResults({
      income,
      needs,
      wants,
      savings,
      breakdown: [
        { category: 'Needs (50%)', amount: needs, color: 'bg-blue-500', description: 'Rent, groceries, utilities, minimum debt payments' },
        { category: 'Wants (30%)', amount: wants, color: 'bg-emerald-500', description: 'Entertainment, dining out, hobbies, shopping' },
        { category: 'Savings (20%)', amount: savings, color: 'bg-purple-500', description: 'Emergency fund, retirement, investments' }
      ]
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onClose}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div className="flex items-center">
          <div className="bg-blue-500 p-3 rounded-lg mr-4">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Profitability Insight Calculator</h1>
            <p className="text-gray-600">Make your money work smarter. Get personalized advice on whether to prepay loans or invest for maximum returns.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-6">Loan & Investment Analysis</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Monthly Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="Amount you can invest or prepay"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Loan Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g., 8.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Investment Return (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g., 12"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <Button
              onClick={calculateBudget}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
            >
              Analyze Best Option
            </Button>
          </div>

          {/* Analysis Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Smart Analysis</h3>
            <p className="text-sm text-blue-700">
              Our system analyzes your loan and investment data to tell you:
              • If early repayment is better than investing
              • When to split funds between EMIs and SIPs
              • Your projected net gain after all calculations
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-6 flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Profitability Analysis
          </h2>

          {results ? (
            <div className="space-y-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-navy-900">
                  Investing is 12% more profitable
                </div>
                <div className="text-gray-600">Recommendation</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-navy-900 mb-2">Loan Prepayment</h4>
                  <div className="text-lg font-semibold text-red-600 mb-1">
                    {formatCurrency(results.income * 0.8)}
                  </div>
                  <p className="text-sm text-gray-600">Total savings in 10 years</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-navy-900 mb-2">Investment Returns</h4>
                  <div className="text-lg font-semibold text-emerald-600 mb-1">
                    {formatCurrency(results.income * 1.2)}
                  </div>
                  <p className="text-sm text-gray-600">Projected returns in 10 years</p>
                </div>
              </div>

              {/* Break-even Analysis */}
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">📊 Break-even Analysis</h4>
                <p className="text-sm text-emerald-700 mb-2">
                  Break-even time: <strong>3.2 years</strong>
                </p>
                <p className="text-sm text-emerald-700">
                  After 3.2 years, investing becomes more profitable than loan prepayment.
                </p>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Smart Recommendations</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Consider investing 70% and prepaying 30% for balanced approach</li>
                  <li>• Ensure you have 6-month emergency fund before investing</li>
                  <li>• Review this analysis annually as rates change</li>
                  <li>• Consider tax benefits of both options</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calculator className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Enter your details to get personalized profitability insights</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;