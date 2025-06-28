'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { useUser } from "@clerk/nextjs";


const SimpleHamburgerNavbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, isSignedIn } = useUser();

  // Admin email check
  const ADMIN_EMAILS = [
    "syedyawaraliturab@gmail.com", // Replace with your actual admin email
    // Add more admin emails as needed
  ];
  
  const isAdmin = isSignedIn && user?.emailAddresses?.[0]?.emailAddress && 
    (ADMIN_EMAILS.includes(user.emailAddresses[0].emailAddress) || 
     user.emailAddresses[0].emailAddress.endsWith("@medmagic.com"));

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsSmallScreen(window.innerWidth < 768);
      }
    };

    if (typeof window !== 'undefined') {
      setIsSmallScreen(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-[#18181b] text-gray-100 py-3 border-b border-gray-800 shadow-md sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-2">
        <Link href="/" className="flex items-center group mr-4 mb-2 md:mb-0">
          <Image
            src="/Logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2 rounded-full border border-gray-700 group-hover:scale-105 group-hover:shadow-lg transition-transform duration-200"
            priority
          />
          <span className="text-xl font-bold text-emerald-400 tracking-tight group-hover:text-emerald-300 transition-colors">Med Magic</span>
        </Link>
        <nav className={`w-full md:w-auto md:flex md:items-center md:space-x-6 text-base font-medium ${isSmallScreen && showMenu ? 'block' : 'hidden md:block'}`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 w-full md:w-auto">
            <li><Link href="/" className="block px-2 py-2 md:py-1 rounded hover:text-emerald-400 hover:bg-gray-800 transition-colors">Home</Link></li>
            <li><Link href="/store" className="block px-2 py-2 md:py-1 rounded hover:text-emerald-400 hover:bg-gray-800 transition-colors">Store</Link></li>
            <li><Link href="/about" className="block px-2 py-2 md:py-1 rounded hover:text-emerald-400 hover:bg-gray-800 transition-colors">About</Link></li>
            <li><Link href="/contact" className="block px-2 py-2 md:py-1 rounded hover:text-emerald-400 hover:bg-gray-800 transition-colors">Contact</Link></li>
            <li><Link href="/FAQ" className="block px-2 py-2 md:py-1 rounded hover:text-emerald-400 hover:bg-gray-800 transition-colors">FAQ</Link></li>
            <li><Link href="/appointments" className="block px-2 py-2 md:py-1 rounded hover:text-emerald-400 hover:bg-gray-800 transition-colors">Appointments</Link></li>
            <li><Link href="/Your-BMI" className="block px-2 py-2 md:py-1 rounded hover:text-emerald-400 hover:bg-gray-800 transition-colors">Calculate BMI</Link></li>
            <li><Link href="/quiz" className="block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold shadow-sm md:ml-2 mt-2 md:mt-0 text-center">Take Quiz</Link></li>
          </ul>
        </nav>
        <div className="flex items-center gap-2 ml-auto">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton showName={false} afterSignOutUrl="/" />
            {/* Admin Dashboard Button (visible only to admin) */}
            {isAdmin && (
              <Link href="/admin" className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold shadow-sm md:ml-2 mt-2 md:mt-0 text-center">
                Admin Dashboard
              </Link>
            )}
          </SignedIn>
        </div>
        <button
          className="md:hidden text-2xl focus:outline-none hover:text-emerald-400 transition-colors p-2 rounded-md hover:bg-gray-800 ml-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {showMenu ? (
            <span>&#10005;</span>
          ) : (
            <span>&#9776;</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default SimpleHamburgerNavbar;