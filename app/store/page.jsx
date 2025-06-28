"use client"
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NoSSR from '../components/NoSSR'
import { fetchCategories } from '../lib/categories'
import apiClient from '../lib/api'

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl overflow-hidden min-h-[370px] animate-pulse">
        <div className="h-44 bg-gray-700/50"></div>
        <div className="p-7 space-y-4">
          <div className="h-6 bg-gray-700/50 rounded"></div>
          <div className="h-12 bg-gray-700/50 rounded-2xl"></div>
        </div>
      </div>
    ))}
  </div>
);

const StoreContent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'All Products' }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "medMagic - Store";
    
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch categories and products in parallel
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          apiClient.getProducts()
        ]);
        
        // Set categories with "All Products" option
        setCategories([
          { id: 'all', name: 'All Products', icon: '📦' },
          ...categoriesData
        ]);
        
        // Handle both paginated and simple array responses
        const products = productsData.products || productsData;
        setProducts(products);
      } catch (err) {
        setError('Failed to load data.');
        console.error('Error loading store data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filteredProducts = products.filter(product => 
    activeCategory === 'all' ? true : product.category === activeCategory
  );

  return (
    <>
      <Head>
        <meta name="description" content="All products you need at your doorstep" />
      </Head>
      
      <section id="products" className="bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] text-white min-h-screen py-16 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Medical Store
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive collection of premium medical supplies, powered by AI recommendations
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium flex items-center space-x-2 ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333] hover:text-white border border-gray-600'
                }`}
              >
                {category.icon && <span>{category.icon}</span>}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          
          {/* Loading State */}
          {loading && <LoadingSkeleton />}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-red-400 text-xl mb-4">{error}</div>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {filteredProducts.map(product => (
                  <div 
                    key={product._id || product.id || product.name}
                    className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl hover:shadow-emerald-700/30 transition-all duration-300 hover:-translate-y-3 group flex flex-col overflow-hidden min-h-[370px] animate-fade-in"
                  >
                    {/* Price badge */}
                    <span className="absolute top-4 right-4 z-10 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20">
                      ${product.price?.toFixed(2)}
                    </span>
                    <div className="relative h-44 w-full flex-shrink-0 overflow-hidden">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-3xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between p-7 gap-4">
                      <div>
                        <h4 className="font-semibold text-xl mb-1 text-white group-hover:text-emerald-400 transition-colors truncate tracking-tight">
                          {product.name}
                        </h4>
                      </div>
                      <Link href={product.link}>
                        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-5 py-3 rounded-2xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-2 text-base group/button">
                          <svg className="w-5 h-5 text-white group-hover/button:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.96a2 2 0 001.83-1.3L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" /></svg>
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="mb-6">
                    <svg className="w-16 h-16 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">No Products Found</h3>
                  <p className="text-xl text-gray-500">No products found in this category. Try selecting a different category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
};

const Page = () => {
  return (
    <NoSSR fallback={
      <section className="bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] text-white min-h-screen py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Medical Store
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive collection of premium medical supplies, powered by AI recommendations
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </section>
    }>
      <StoreContent />
    </NoSSR>
  )
}

export default Page