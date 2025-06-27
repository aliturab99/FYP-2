import { useState, useEffect } from 'react';

// Utility functions to handle hydration safely

export const isClient = () => typeof window !== 'undefined';

export const safeLocalStorage = {
  getItem: (key) => {
    if (!isClient()) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    if (!isClient()) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail
    }
  },
  removeItem: (key) => {
    if (!isClient()) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail
    }
  }
};

export const useHydrationSafe = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted;
};
