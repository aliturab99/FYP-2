"use client"
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import NoSSR from "../../components/NoSSR";

const Analytics = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all');

  // Admin email check
  const ADMIN_EMAILS = ["syedyawaraliturab@gmail.com"];
  const isAdmin = isSignedIn && user?.emailAddresses?.[0]?.emailAddress && 
    (ADMIN_EMAILS.includes(user.emailAddresses[0].emailAddress) || 
     user.emailAddresses[0].emailAddress.endsWith("@medmagic.com"));

  useEffect(() => {
    if (isSignedIn && isAdmin) {
      fetchAnalytics();
    }
  }, [isSignedIn, isAdmin]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You do not have permission to access this page.</p>
          <Link href="/" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg transition-colors">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <NoSSR>
      <Head>
        <title>Analytics - Admin Dashboard</title>
        <meta name="description" content="Store analytics and insights" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] text-white py-8 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Insights and statistics for your store</p>
            </div>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="all">All Time</option>
              <option value="30d">Last 30 Days</option>
              <option value="7d">Last 7 Days</option>
              <option value="1d">Today</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading analytics...</p>
            </div>
          ) : analytics ? (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Products</p>
                      <p className="text-3xl font-bold text-emerald-400">{analytics.overview.totalProducts}</p>
                    </div>
                    <div className="bg-emerald-600/20 p-3 rounded-full">
                      <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Categories</p>
                      <p className="text-3xl font-bold text-blue-400">{analytics.overview.totalCategories}</p>
                    </div>
                    <div className="bg-blue-600/20 p-3 rounded-full">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Average Price</p>
                      <p className="text-3xl font-bold text-purple-400">${analytics.overview.averagePrice.toFixed(2)}</p>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded-full">
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Highest Price</p>
                      <p className="text-3xl font-bold text-yellow-400">
                        ${analytics.overview.mostExpensive?.price?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded-full">
                      <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts and Detailed Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Category Distribution */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-semibold mb-6">Products by Category</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.categoryStats).map(([category, count]) => {
                      const percentage = (count / analytics.overview.totalProducts * 100).toFixed(1);
                      return (
                        <div key={category} className="flex justify-between items-center">
                          <span className="capitalize text-gray-300">{category.replace('-', ' ')}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-400 w-8">{count}</span>
                            <span className="text-sm text-emerald-400 w-12">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price Distribution */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-semibold mb-6">Price Distribution</h3>
                  <div className="space-y-4">
                    {[
                      { range: 'Under $25', key: 'under25', color: 'from-green-500 to-emerald-500' },
                      { range: '$25 - $50', key: '25to50', color: 'from-blue-500 to-cyan-500' },
                      { range: '$50 - $100', key: '50to100', color: 'from-purple-500 to-pink-500' },
                      { range: 'Over $100', key: 'over100', color: 'from-red-500 to-orange-500' }
                    ].map(({ range, key, color }) => {
                      const count = analytics.priceRanges[key];
                      const percentage = analytics.overview.totalProducts > 0 ? (count / analytics.overview.totalProducts * 100).toFixed(1) : 0;
                      return (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-300">{range}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div 
                                className={`bg-gradient-to-r ${color} h-2 rounded-full`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-400 w-8">{count}</span>
                            <span className="text-sm text-emerald-400 w-12">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Products */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold mb-6">Recently Added Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analytics.recentProducts.slice(0, 6).map(product => (
                    <div key={product._id} className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-1">{product.name}</h4>
                      <p className="text-emerald-400 font-medium">${product.price.toFixed(2)}</p>
                      <p className="text-gray-400 text-sm capitalize">{product.category.replace('-', ' ')}</p>
                      <p className="text-gray-500 text-xs mt-2">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Insights */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-semibold mb-4">Most Expensive Product</h3>
                  {analytics.overview.mostExpensive ? (
                    <div className="flex items-center space-x-4">
                      <div className="bg-yellow-600/20 p-3 rounded-full">
                        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{analytics.overview.mostExpensive.name}</h4>
                        <p className="text-yellow-400 font-bold">${analytics.overview.mostExpensive.price.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm capitalize">{analytics.overview.mostExpensive.category.replace('-', ' ')}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">No products found</p>
                  )}
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-semibold mb-4">Most Affordable Product</h3>
                  {analytics.overview.cheapest ? (
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-600/20 p-3 rounded-full">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{analytics.overview.cheapest.name}</h4>
                        <p className="text-green-400 font-bold">${analytics.overview.cheapest.price.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm capitalize">{analytics.overview.cheapest.category.replace('-', ' ')}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">No products found</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Failed to load analytics data.</p>
              <button 
                onClick={fetchAnalytics}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </NoSSR>
  );
};

export default Analytics;
