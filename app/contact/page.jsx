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
      <div className="bg-emerald-600/10 border border-emerald-600/30 rounded-lg p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-emerald-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-emerald-400 mb-2">Message Sent!</h3>
        <p className="text-gray-300">Thanks for contacting us. We'll get back to you soon.</p>
      </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-emerald-400 mb-2">Contact Us</h2>
        <p className="text-gray-400">Have questions? Send us a message.</p>
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          placeholder="your@email.com"
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
          className="mt-1 text-sm text-red-400"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          placeholder="Your message here..."
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
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : 'Send Message'}
      </button>
    </form>
  );
}

export default ContactForm;