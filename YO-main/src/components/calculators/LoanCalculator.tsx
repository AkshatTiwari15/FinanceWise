import React, { useState } from 'react';
import { ArrowLeft, CreditCard, DollarSign } from 'lucide-react';
import Button from '../common/Button';

interface LoanCalculatorProps {
  onClose: () => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onClose }) => {
  const [loanAmount, setLoanAmount] = useState<string>('200000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [extraPayment, setExtraPayment] = useState<string>('0');
  const [results, setResults] = useState<any>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0;
    const annualRate = (parseFloat(interestRate) || 0) / 100;
    const years = parseFloat(loanTerm) || 0;
    const extra = parseFloat(extraPayment) || 0;

    if (principal <= 0 || annualRate < 0 || years <= 0) return;

    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;

    // Calculate standard monthly payment
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Calculate totals without extra payments
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - principal;

    // Calculate with extra payments
    let balance = principal;
    let totalInterestWithExtra = 0;
    let monthsWithExtra = 0;
    const paymentSchedule = [];

    for (let month = 1; month <= numPayments && balance > 0; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestPayment + extra, balance);
      
      balance -= principalPayment;
      totalInterestWithExtra += interestPayment;
      monthsWithExtra = month;

      if (month <= 12 || month % 12 === 0 || balance <= 0) {
        paymentSchedule.push({
          month,
          payment: monthlyPayment + extra,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance)
        });
      }
    }

    const yearsWithExtra = monthsWithExtra / 12;
    const timeSaved = years - yearsWithExtra;
    const interestSaved = totalInterest - totalInterestWithExtra;

    setResults({
      monthlyPayment,
      totalPayments,
      totalInterest,
      totalInterestWithExtra,
      timeSaved,
      interestSaved,
      paymentSchedule,
      monthsWithExtra,
      yearsWithExtra
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatYears = (years: number) => {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);
    
    if (wholeYears === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (months === 0) {
      return `${wholeYears} year${wholeYears !== 1 ? 's' : ''}`;
    } else {
      return `${wholeYears} year${wholeYears !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
    }
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
          <div className="bg-purple-500 p-3 rounded-lg mr-4">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Loan Optimization Calculator</h1>
            <p className="text-gray-600">Curious how much faster you can be debt-free? See how extra EMI reduces your repayment duration and total interest instantly.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-6">Loan Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (Years)
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="25">25 years</option>
                <option value="30">30 years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extra Monthly Payment (Optional)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(e.target.value)}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <Button
              onClick={calculateLoan}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3"
            >
              Calculate Payments
            </Button>
          </div>

          {/* Loan Info */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Optimization Tips</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Increase your EMI slightly to become debt-free faster</li>
              <li>• Even ₹1,000 extra per month can save lakhs in interest</li>
              <li>• Apply extra payments directly to principal amount</li>
              <li>• Adjust your monthly payment to find your most efficient plan</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">Standard Loan</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment</span>
                      <span className="font-semibold">{formatCurrency(results.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest</span>
                      <span className="font-semibold text-red-600">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Payments</span>
                      <span className="font-semibold">{formatCurrency(results.totalPayments)}</span>
                    </div>
                  </div>
                </div>

                {parseFloat(extraPayment) > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">With Extra Payments</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Payment</span>
                        <span className="font-semibold">{formatCurrency(results.monthlyPayment + parseFloat(extraPayment))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold text-green-600">{formatCurrency(results.totalInterestWithExtra)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payoff Time</span>
                        <span className="font-semibold">{formatYears(results.yearsWithExtra)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Savings Summary */}
              {parseFloat(extraPayment) > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-emerald-900 mb-4">💰 Your Savings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {formatCurrency(results.interestSaved)}
                      </div>
                      <div className="text-emerald-700">Interest Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {formatYears(results.timeSaved)}
                      </div>
                      <div className="text-emerald-700">Time Saved</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Schedule */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Payment Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Payment #</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Payment Amount</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Principal</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Interest</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.paymentSchedule.map((payment: any) => (
                        <tr key={payment.month} className="border-b border-gray-100">
                          <td className="py-2">{payment.month}</td>
                          <td className="text-right py-2 font-medium">
                            {formatCurrency(payment.payment)}
                          </td>
                          <td className="text-right py-2 text-emerald-600">
                            {formatCurrency(payment.principal)}
                          </td>
                          <td className="text-right py-2 text-red-600">
                            {formatCurrency(payment.interest)}
                          </td>
                          <td className="text-right py-2">
                            {formatCurrency(payment.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Showing key payment milestones. Complete schedule available upon calculation.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Enter your loan details to calculate monthly payments and see your amortization schedule</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;