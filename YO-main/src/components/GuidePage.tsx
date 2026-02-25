import React, { useState } from 'react';
import { CheckCircle, Circle, BookOpen, Target, TrendingUp, Shield, DollarSign, ArrowRight } from 'lucide-react';
import Button from './common/Button';

const GuidePage: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const steps = [
    {
      id: 1,
      title: "Set Up Your Financial Foundation",
      description: "Learn the basics of personal finance and set up your first budget",
      icon: DollarSign,
      color: "bg-blue-500",
      tasks: [
        "Track your income and expenses for one month",
        "Open a checking and savings account",
        "Create your first budget using the 50/30/20 rule",
        "Set up automatic transfers to savings"
      ],
      estimatedTime: "1-2 weeks",
      resources: ["Budget Calculator", "Banking Guide", "Expense Tracking Template"]
    },
    {
      id: 2,
      title: "Build Your Emergency Fund",
      description: "Create a safety net for unexpected expenses",
      icon: Shield,
      color: "bg-emerald-500",
      tasks: [
        "Calculate your monthly essential expenses",
        "Set a goal to save $1,000 as a starter emergency fund",
        "Open a separate high-yield savings account",
        "Automate contributions to your emergency fund",
        "Work toward 3-6 months of expenses"
      ],
      estimatedTime: "3-6 months",
      resources: ["Emergency Fund Calculator", "High-Yield Savings Guide", "Saving Strategies"]
    },
    {
      id: 3,
      title: "Tackle High-Interest Debt",
      description: "Pay off credit cards and other high-interest debts",
      icon: Target,
      color: "bg-red-500",
      tasks: [
        "List all your debts with balances and interest rates",
        "Choose between debt snowball or debt avalanche method",
        "Negotiate with creditors for better rates",
        "Consider debt consolidation options",
        "Make extra payments toward your chosen debt"
      ],
      estimatedTime: "6 months - 3 years",
      resources: ["Debt Payoff Calculator", "Credit Score Guide", "Debt Consolidation Options"]
    },
    {
      id: 4,
      title: "Start Investing for Your Future",
      description: "Begin building long-term wealth through investing",
      icon: TrendingUp,
      color: "bg-purple-500",
      tasks: [
        "Learn about different investment types (stocks, bonds, index funds)",
        "Open an investment account (IRA or taxable brokerage)",
        "Start with low-cost index funds",
        "Set up automatic monthly investments",
        "Review and rebalance quarterly"
      ],
      estimatedTime: "1 month to start",
      resources: ["Investment Guide", "Compound Interest Calculator", "Broker Comparison"]
    },
    {
      id: 5,
      title: "Plan for Retirement",
      description: "Take advantage of employer benefits and retirement accounts",
      icon: BookOpen,
      color: "bg-indigo-500",
      tasks: [
        "Enroll in your employer's 401(k) plan",
        "Contribute enough to get the full company match",
        "Open a Roth IRA for additional retirement savings",
        "Increase contributions by 1% annually",
        "Review beneficiaries on all accounts"
      ],
      estimatedTime: "Ongoing",
      resources: ["401(k) Guide", "IRA Comparison", "Retirement Calculator"]
    },
    {
      id: 6,
      title: "Balance Debt vs. Investment",
      description: "Learn when it's smarter to invest rather than prepay your loans",
      icon: TrendingUp,
      color: "bg-orange-500",
      tasks: [
        "Understand the concept of opportunity cost",
        "Compare loan interest rates with investment returns",
        "Use our profitability calculator to analyze your situation",
        "Learn when to split funds between EMIs and investments",
        "Build confidence in your financial decisions"
      ],
      estimatedTime: "2-3 weeks",
      resources: ["Profitability Calculator", "Investment vs Debt Guide", "Risk Assessment Tool"]
    },
    {
      id: 7,
      title: "Protect Your Financial Future",
      description: "Get the right insurance and legal protections",
      icon: Shield,
      color: "bg-orange-500",
      tasks: [
        "Review health insurance options",
        "Consider life insurance if you have dependents",
        "Look into disability insurance",
        "Create or update your will",
        "Review all insurance policies annually"
      ],
      estimatedTime: "2-4 weeks",
      resources: ["Insurance Guide", "Legal Documents Checklist", "Coverage Calculator"]
    }
  ];

  const toggleStep = (stepId: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const completionPercentage = (completedSteps.size / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">
          Your Financial Journey Starts Here
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Follow this step-by-step roadmap to build financial security and wealth. 
          Each step builds on the previous one, creating a solid foundation for your financial future.
        </p>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-900">Your Progress</h2>
            <span className="text-2xl font-bold text-emerald-600">
              {Math.round(completionPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-emerald-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedSteps.size} of {steps.length} steps completed
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`bg-white rounded-lg shadow-lg border-l-4 overflow-hidden transition-all duration-300 ${
              completedSteps.has(step.id) ? 'border-emerald-500' : 'border-gray-300'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon and Status */}
                <div className="flex flex-col items-center">
                  <div className={`${step.color} p-3 rounded-lg mb-2`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="flex items-center justify-center"
                  >
                    {completedSteps.has(step.id) ? (
                      <CheckCircle className="h-6 w-6 text-emerald-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400 hover:text-emerald-600 transition-colors" />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-1">
                        Step {step.id}: {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                      {step.id === 6 && (
                        <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-sm text-orange-800">
                            💡 Learn when it's smarter to invest rather than prepay your loans. 
                            Simulate both options with our calculators and build confidence in your decisions.
                          </p>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {step.estimatedTime}
                    </span>
                  </div>

                  {/* Tasks */}
                  <div className="mb-4">
                    <h4 className="font-medium text-navy-900 mb-2">Action Items:</h4>
                    <ul className="space-y-1">
                      {step.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  <div className="mb-4">
                    <h4 className="font-medium text-navy-900 mb-2">Helpful Resources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.resources.map((resource, resourceIndex) => (
                        <span
                          key={resourceIndex}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => toggleStep(step.id)}
                    className={`${
                      completedSteps.has(step.id)
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    {completedSteps.has(step.id) ? 'Mark as Incomplete' : 'Mark as Complete'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {completedSteps.size === steps.length && (
        <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">
            Congratulations! 🎉
          </h2>
          <p className="text-emerald-700 mb-6">
            You've completed all the essential steps to financial wellness. Keep up the great work 
            and continue reviewing and updating your financial plan regularly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Download Your Certificate
            </Button>
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
              Share Your Achievement
            </Button>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="mt-12 bg-navy-900 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Keep Learning</h2>
        <p className="text-gray-300 mb-6">
          Financial education is a lifelong journey. Stay updated with our latest articles, 
          tools, and resources to continue improving your financial knowledge.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Browse Articles
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
            Try Our Tools
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;