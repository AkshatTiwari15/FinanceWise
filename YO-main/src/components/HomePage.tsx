import React from 'react';
import { ArrowRight, TrendingUp, Shield, Calculator, BookOpen, Users, Star } from 'lucide-react';
import Newsletter from './common/Newsletter';
import Button from './common/Button';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredArticles = [
    {
      id: 1,
      title: "The 50/30/20 Budget Rule: A Simple Guide for Beginners",
      excerpt: "Learn how to allocate your income effectively with this proven budgeting method.",
      author: "Sarah Johnson",
      date: "2025-01-15",
      category: "Budgeting",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "Building Your Emergency Fund: Start Small, Think Big",
      excerpt: "Discover practical strategies to build an emergency fund even on a tight budget.",
      author: "Mike Chen",
      date: "2025-01-12",
      category: "Saving",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Index Funds vs. Individual Stocks: What's Right for You?",
      excerpt: "Compare investment options and learn which approach fits your financial goals.",
      author: "Emily Davis",
      date: "2025-01-10",
      category: "Investing",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const tools = [
    {
      icon: Calculator,
      title: "Budget Calculator",
      description: "Create a personalized budget based on your income and expenses"
    },
    {
      icon: TrendingUp,
      title: "Compound Interest Calculator",
      description: "See how your investments can grow over time with compound interest"
    },
    {
      icon: Shield,
      title: "Loan Repayment Estimator",
      description: "Calculate monthly payments and total interest for any loan"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Empowering young adults to 
                <span className="text-emerald-400"> master money</span>, one decision at a time
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Make smarter financial decisions with our comprehensive guides and intelligent tools. 
                Learn budgeting, saving, investing, and debt management designed specifically for your generation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => onNavigate('guide')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold"
                >
                  Start Your Financial Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => onNavigate('tools')}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 text-lg font-semibold"
                >
                  Try Smart Calculators
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Financial planning"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-navy-900 mb-2">50,000+</div>
            <div className="text-gray-600">Active Learners</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-navy-900 mb-2">200+</div>
            <div className="text-gray-600">Educational Articles</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Star className="h-12 w-12 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-navy-900 mb-2">4.9/5</div>
            <div className="text-gray-600">User Rating</div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Latest Financial Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest articles on budgeting, saving, investing, and debt management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    By {article.author} • {article.date}
                  </div>
                  <ArrowRight className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => onNavigate('articles')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
          >
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Smart Financial Tools — Plan Your Money Smarter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our advanced calculators that help you make informed financial decisions.
              Find out how extra payments can help you close your loan faster, or compare SIPs and gold investments to see which grows your wealth best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <tool.icon className="h-12 w-12 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => onNavigate('tools')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
            >
              Try the Smart Calculators Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Weekly Financial Tips
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our newsletter for weekly financial tips and get your free eBook: "How to Grow Wealth Faster Without Taking Risks."
          </p>
          <Newsletter />
        </div>
      </section>
    </div>
  );
};

export default HomePage;