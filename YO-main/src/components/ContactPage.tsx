import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Button from './common/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@financewise.com",
      description: "Send us an email and we'll get back to you within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Monday to Friday, 9 AM to 5 PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Finance Street, Suite 100",
      description: "New York, NY 10001"
    }
  ];

  const faqs = [
    {
      question: "Is FinanceWise really free?",
      answer: "Yes! All our educational content, articles, and basic tools are completely free. We believe financial education should be accessible to everyone."
    },
    {
      question: "Do you provide personal financial advice?",
      answer: "We provide educational content and general guidance, but we don't offer personalized financial advice. For specific financial planning, we recommend consulting with a certified financial advisor."
    },
    {
      question: "How often do you publish new content?",
      answer: "We publish new articles and guides weekly, and we regularly update our tools and calculators based on user feedback and market changes."
    },
    {
      question: "Can I suggest topics for articles?",
      answer: "Absolutely! We love hearing from our community. Use the contact form or email us with your suggestions and questions."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about financial planning? Need help with our tools? Want to suggest new content? 
          We'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-emerald-900 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-emerald-700 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Question</option>
                    <option value="tools">Tools & Calculators</option>
                    <option value="content">Content Suggestion</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-navy-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <info.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-1">{info.title}</h4>
                    <p className="text-navy-900 font-medium mb-1">{info.content}</p>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3">
              💡 Quick Tip
            </h3>
            <p className="text-emerald-700 text-sm">
              Before reaching out, check our FAQ section below or browse our extensive article library. 
              You might find the answer you're looking for right away!
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-navy-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-navy-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Response Time Notice */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-lg px-6 py-3">
          <Mail className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-blue-800 text-sm">
            We typically respond to all inquiries within 24 hours during business days
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;