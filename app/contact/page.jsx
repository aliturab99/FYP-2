"use client"
import React, { useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Head from 'next/head';
function ContactForm() {
  useEffect(() => {
      document.title = 'medMagic - Contact'
    }, [])
  const [state, handleSubmit] = useForm("mzzenwwo");
  
  if (state.succeeded) {
    return (
      <>
      <Head>
        <meta name="description" content="In need of assistance? Contact us now" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-emerald-900 flex items-center justify-center p-6">
        <div className="bg-emerald-600/10 border border-emerald-600/30 rounded-2xl p-8 text-center max-w-md w-full backdrop-blur-sm">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-emerald-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-emerald-400 mb-4">Message Sent Successfully!</h3>
          <p className="text-gray-300 text-lg">Thanks for contacting Med Magic. Our AI-powered support team will get back to you within 24 hours.</p>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-emerald-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about our AI medical assistant or need support? We're here to help.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#2a2a2a]/80 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="your@email.com"
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                className="mt-1 text-sm text-red-400"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-3">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            >
              <option value="">Select a topic</option>
              <option value="ai-assistance">AI Medical Assistant</option>
              <option value="product-inquiry">Product Inquiry</option>
              <option value="technical-support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
              placeholder="Tell us how we can help you..."
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
              className="mt-1 text-sm text-red-400"
            />
          </div>

          <button 
            type="submit" 
            disabled={state.submitting}
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {state.submitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
              </span>
            ) : 'Send Message'}
          </button>
        </form>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-[#2a2a2a]/50 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Email Support</h3>
            <p className="text-gray-400 text-sm">support@medmagic.com</p>
          </div>
          <div className="text-center p-6 bg-[#2a2a2a]/50 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">AI Chat Support</h3>
            <p className="text-gray-400 text-sm">24/7 Available</p>
          </div>
          <div className="text-center p-6 bg-[#2a2a2a]/50 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Response Time</h3>
            <p className="text-gray-400 text-sm">Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;