import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, DollarSign } from 'lucide-react';
import Button from '../common/Button';

interface CompoundInterestCalculatorProps {
  onClose: () => void;
}

const CompoundInterestCalculator: React.FC<CompoundInterestCalculatorProps> = ({ onClose }) => {
  const [principal, setPrincipal] = useState<string>('1000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('100');
  const [annualRate, setAnnualRate] = useState<string>('7');
  const [years, setYears] = useState<string>('30');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('12');
  const [results, setResults] = useState<any>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = parseFloat(compoundFrequency) || 12;

    if (P < 0 || r < 0 || t <= 0) return;

    // Calculate future value with compound interest
    const futureValuePrincipal = P * Math.pow(1 + r/n, n*t);
    
    // Calculate future value of monthly contributions
    const monthlyRate = r / 12;
    const futureValueContributions = PMT * (((Math.pow(1 + monthlyRate, 12*t)) - 1) / monthlyRate);
    
    const totalFutureValue = futureValuePrincipal + futureValueContributions;
    const totalContributions = P + (PMT * 12 * t);
    const totalInterest = totalFutureValue - totalContributions;

    // Generate year-by-year breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= Math.min(t, 40); year++) {
      const yearFVPrincipal = P * Math.pow(1 + r/n, n*year);
      const yearFVContributions = PMT * (((Math.pow(1 + monthlyRate, 12*year)) - 1) / monthlyRate);
      const yearTotal = yearFVPrincipal + yearFVContributions;
      const yearContributions = P + (PMT * 12 * year);
      const yearInterest = yearTotal - yearContributions;

      yearlyBreakdown.push({
        year,
        total: yearTotal,
        contributions: yearContributions,
        interest: yearInterest
      });
    }

    setResults({
      futureValue: totalFutureValue,
      totalContributions,
      totalInterest,
      yearlyBreakdown,
      returnOnInvestment: ((totalInterest / totalContributions) * 100)
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onClose}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div className="flex items-center">
          <div className="bg-emerald-500 p-3 rounded-lg mr-4">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Investment Comparison Tool</h1>
            <p className="text-gray-600">Compare SIPs, gold, and FDs to see which grows your wealth faster. Get clear projections and understand which option fits your goals best.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-6">Investment Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Type
              </label>
              <select
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="12">SIP (Mutual Funds)</option>
                <option value="1">Gold Investment</option>
                <option value="4">Fixed Deposit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Investment
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Contribution
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Period (Years)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">💡 Investment Tips</h4>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• SIPs: Higher returns but market-linked risk</li>
                  <li>• Gold: Hedge against inflation, moderate returns</li>
                  <li>• FDs: Safe but lower returns, good for short-term</li>
                  <li>• Diversify across multiple investment types</li>
                </ul>
              </div>
            </div>

            <Button
              onClick={calculateCompoundInterest}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3"
            >
              Compare Investments
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Final Amount</h3>
                  <div className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(results.futureValue)}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Total Invested</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.totalContributions)}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Interest Earned</h3>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(results.totalInterest)}
                  </div>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Investment Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Return on Investment</span>
                    <span className="font-semibold text-emerald-600">
                      {formatPercentage(results.returnOnInvestment)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Contributions</span>
                      <span>Interest Earned</span>
                    </div>
                    <div className="flex rounded-lg overflow-hidden h-8">
                      <div 
                        className="bg-blue-500"
                        style={{ 
                          width: `${(results.totalContributions / results.futureValue) * 100}%` 
                        }}
                      ></div>
                      <div 
                        className="bg-emerald-500"
                        style={{ 
                          width: `${(results.totalInterest / results.futureValue) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yearly Breakdown Table */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Year-by-Year Growth</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Year</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Total Value</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Contributions</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.yearlyBreakdown.slice(0, 20).map((row: any) => (
                        <tr key={row.year} className="border-b border-gray-100">
                          <td className="py-2">{row.year}</td>
                          <td className="text-right py-2 font-medium">
                            {formatCurrency(row.total)}
                          </td>
                          <td className="text-right py-2 text-blue-600">
                            {formatCurrency(row.contributions)}
                          </td>
                          <td className="text-right py-2 text-emerald-600">
                            {formatCurrency(row.interest)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {results.yearlyBreakdown.length > 20 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Showing first 20 years. Total calculation period: {years} years.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Enter your investment details to see how compound interest can grow your wealth over time</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;