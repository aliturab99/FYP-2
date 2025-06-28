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
    <section className='relative w-full h-[100dvh] bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-800 overflow-hidden'>
      {/* Dark-themed background elements */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-20 left-20 w-40 h-40 rounded-full bg-emerald-900 filter blur-3xl'></div>
        <div className='absolute bottom-10 right-32 w-60 h-60 rounded-full bg-blue-900 filter blur-3xl'></div>
        <div className='absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-gray-700 filter blur-2xl'></div>
      </div>
      
      {/* Medical icons decoration */}
      <div className='absolute bottom-10 left-10 opacity-10'>
        <MedicalSymbols />
      </div>
      
      {/* Main content */}
      <div className='relative z-10 text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4'>
        <div className='mb-6'>
          <TypeAnimation
            sequence={[
              'Your Health is Priority',
              1000,
              'Your Health is Crucial',
              1000,
              'Your Health is Vital',
              1000
            ]}
            wrapper="span"
            speed={50}
            className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-lg'
            repeat={Infinity}
          />
        </div>
        
        <p className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-8'>
          Welcome to <span className={`${fonda.className} text-emerald-400`}>medMagic</span> - 
          <span className='block mt-1'>Your trusted medical supplies partner</span>
        </p>
        
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <Link href="/store">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              SHOP NOW
            </button>
          </Link>
        </div>
        
        <div className='mt-12 flex flex-wrap justify-center gap-6 text-gray-400 text-xs sm:text-sm'>
          <div className='flex items-center gap-2'>
            <ShieldCheckIcon className='w-4 h-4 text-emerald-400' />
            <span>Certified Medical Supplies</span>
          </div>
          <div className='flex items-center gap-2'>
            <TruckIcon className='w-4 h-4 text-emerald-400' />
            <span>Fast & Reliable Delivery</span>
          </div>
          <div className='flex items-center gap-2'>
            <SupportIcon className='w-4 h-4 text-emerald-400' />
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const MedicalSymbols = () => {
  return (
    <div className='flex flex-wrap gap-8'>
      {[...Array(8)].map((_, i) => (
        <svg key={i} className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ))}
    </div>
  )
}

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