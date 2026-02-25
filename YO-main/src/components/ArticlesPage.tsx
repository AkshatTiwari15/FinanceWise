import React, { useState } from 'react';
import { Search, Calendar, User, Clock, Filter } from 'lucide-react';

const ArticlesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: 'all', label: 'All Articles', count: 48 },
    { id: 'budgeting', label: 'Budgeting', count: 12 },
    { id: 'saving', label: 'Saving', count: 15 },
    { id: 'investing', label: 'Investing', count: 18 },
    { id: 'debt', label: 'Credit & Debt', count: 8 },
  ];

  const articles = [
    {
      id: 1,
      title: "The Complete Guide to Building a Budget That Actually Works",
      excerpt: "Discover the step-by-step process to create a realistic budget that you can stick to, even when life gets complicated.",
      author: "Sarah Johnson",
      date: "2025-01-15",
      category: "budgeting",
      readTime: "8 min read",
      tags: ["Budget", "Planning", "Beginner"],
      image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "Emergency Fund 101: How Much Do You Really Need?",
      excerpt: "Learn the optimal emergency fund size for your situation and practical strategies to build it faster.",
      author: "Mike Chen",
      date: "2025-01-12",
      category: "saving",
      readTime: "6 min read",
      tags: ["Emergency Fund", "Saving", "Safety Net"],
      image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Index Funds vs ETFs: Which Is Better for Beginners?",
      excerpt: "Compare these popular investment options and learn which one aligns better with your financial goals.",
      author: "Emily Davis",
      date: "2025-01-10",
      category: "investing",
      readTime: "10 min read",
      tags: ["Index Funds", "ETFs", "Investing"],
      image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      title: "Credit Score Myths Debunked: What Really Affects Your Score",
      excerpt: "Separate fact from fiction about credit scores and learn the factors that truly impact your creditworthiness.",
      author: "David Wilson",
      date: "2025-01-08",
      category: "debt",
      readTime: "7 min read",
      tags: ["Credit Score", "Credit Report", "Debt Management"],
      image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      title: "The Power of Compound Interest: Real Examples",
      excerpt: "See how compound interest can transform small investments into substantial wealth over time.",
      author: "Lisa Park",
      date: "2025-01-05",
      category: "investing",
      readTime: "5 min read",
      tags: ["Compound Interest", "Long-term Investing", "Wealth Building"],
      image: "https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 6,
      title: "Side Hustle Success: 10 Ways to Boost Your Income",
      excerpt: "Explore proven side hustle ideas that can help you earn extra money and accelerate your financial goals.",
      author: "James Rodriguez",
      date: "2025-01-03",
      category: "saving",
      readTime: "9 min read",
      tags: ["Side Hustle", "Extra Income", "Financial Goals"],
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const articlesPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">
          Financial Education Articles
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our comprehensive library of financial education articles, guides, and insights.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white min-w-48"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                  article.category === 'budgeting' ? 'bg-blue-100 text-blue-800' :
                  article.category === 'saving' ? 'bg-green-100 text-green-800' :
                  article.category === 'investing' ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {categories.find(c => c.id === article.category)?.label}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime}
                </div>
              </div>

              <h2 className="text-xl font-semibold text-navy-900 mb-2 line-clamp-2">
                {article.title}
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {article.date}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                currentPage === page
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;