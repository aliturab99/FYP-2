"use client"
import { Fondamento } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const fonda = Fondamento({
  subsets: ["latin"],
  weight: "400"
});

const Banner = () => {
  return (
    <section className="relative w-full h-[100dvh] bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-800 overflow-hidden flex items-center justify-center">
      {/* Floating badge */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
        <span className="inline-block bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg text-xs md:text-sm font-bold tracking-widest uppercase border-2 border-white/20 animate-fade-in">
          Next-Gen Medical AI
        </span>
      </div>
      {/* Main content */}
      <div className="relative z-10 w-full mx-auto rounded-[2.5rem] flex flex-col items-center gap-12 animate-fade-in">
        <div className="flex flex-col items-center gap-2">
          <TypeAnimation
            sequence={[
              'Your Health, Our Mission.',
              1200,
              'Empowering Care with AI.',
              1200,
              'Modern Medical Solutions.',
              1200
            ]}
            wrapper="span"
            speed={60}
            className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl tracking-tight text-center leading-tight"
            repeat={Infinity}
          />
        </div>
        <p className="text-lg md:text-2xl text-gray-200 text-center font-light max-w-2xl">
          Welcome to <span className={`${fonda.className} text-emerald-400 font-semibold text-2xl md:text-3xl`}>medMagic</span> —
          <span className="block mt-1 text-base md:text-lg text-blue-200 font-normal">Your trusted partner for AI-powered healthcare and certified medical supplies.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <Link href="/store" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white px-10 py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-emerald-700/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-2 scale-100 hover:scale-105">
              Shop Now
            </button>
          </Link>
          <Link href="/advice" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white/10 border-2 border-emerald-400 text-emerald-300 px-10 py-5 rounded-full text-xl font-bold shadow hover:bg-emerald-600/10 hover:text-white transition-all duration-300 scale-100 hover:scale-105">
              Try AI Chat
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full shadow-sm border border-white/20">
    {icon}
    <span className="font-medium text-gray-100 whitespace-nowrap text-sm md:text-base">{text}</span>
  </div>
)

const ShieldCheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const TruckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
)

const SupportIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

export default Banner