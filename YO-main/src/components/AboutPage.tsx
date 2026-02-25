import React from 'react';
import { Users, Target, Award, Heart, Linkedin, Twitter, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: "Anshum Dubey",
      role: "Founder & Financial Educator",
      bio: "Young finance educator passionate about making financial literacy accessible, actionable, and fun for every young adult.",
      image: "/src/assets/IMG_20251108_175635.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "anshum@financewise.com"
      }
    },
    {
      name: "Akshat Tiwari",
      role: "Founder & Financial Educator",
      bio: "Young investment analyst dedicated to helping peers understand smart money decisions and wealth building strategies.",
      image: "/src/assets/WhatsApp Image 2025-11-08 at 6.03.07 PM.jpeg",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "akshat@financewise.com"
      }
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Accessibility",
      description: "Financial education should be available to everyone, regardless of background or income level."
    },
    {
      icon: Target,
      title: "Practical Focus",
      description: "We provide actionable advice and tools that you can implement immediately in your financial life."
    },
    {
      icon: Award,
      title: "Evidence-Based",
      description: "Our recommendations are grounded in research and proven financial principles."
    },
    {
      icon: Heart,
      title: "Empowerment",
      description: "We believe in empowering individuals to take control of their financial future with confidence."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Students Helped" },
    { number: "$2M+", label: "Debt Eliminated" },
    { number: "200+", label: "Educational Articles" },
    { number: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
          About FinanceWise
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're on a mission to empower young adults with the financial knowledge and tools they need 
          to build a secure and prosperous future. Financial literacy shouldn't be a luxury—it should 
          be accessible to everyone.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                FinanceWise was born from a simple observation: too many young adults graduate 
                without basic financial knowledge, leaving them vulnerable to debt, poor financial 
                decisions, and delayed financial independence.
              </p>
              <p>
                Our founder, Sarah Johnson, spent years as a financial advisor watching clients 
                struggle with financial concepts that could have been learned much earlier. She 
                realized that with the right education and tools, anyone could master their finances.
              </p>
              <p>
                Today, FinanceWise serves thousands of young adults worldwide, providing clear, 
                actionable financial education that transforms lives. We're not just teaching about 
                money—we're building confident, financially literate individuals who can achieve 
                their dreams.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Team collaboration"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-emerald-100 p-4 rounded-lg">
                  <value.icon className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-80 object-contain bg-gray-50"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 mb-4">
                  {member.bio}
                </p>
                <div className="flex space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-navy-900 text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
          To make financial literacy accessible, actionable, and fun for every young adult. 
          We believe smart money decisions shouldn't be complicated or intimidating.
        </p>
        <div className="text-emerald-400 font-semibold">
          "Empowering young adults to master money, one decision at a time."
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-navy-900 mb-6">Ready to Start Your Journey?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of young adults who are taking control of their financial future with FinanceWise.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Start Learning Today
          </button>
          <button className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Browse Our Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;