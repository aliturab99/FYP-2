"use client"
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import NoSSR from "../../../components/NoSSR";
import { fetchCategories } from "../../../lib/categories";
import apiClient from "../../../lib/api";

const AddProductAdmin = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    link: "",
    category: ""
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Admin email check
  const ADMIN_EMAILS = ["syedyawaraliturab@gmail.com"];
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const isAdmin = isSignedIn && userEmail && 
    (ADMIN_EMAILS.includes(userEmail) || userEmail.endsWith("@medmagic.com"));

  useEffect(() => {
    if (isSignedIn && isAdmin) {
      const loadCategories = async () => {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setForm(prev => ({ ...prev, category: categoriesData[0].id }));
        }
      };
      loadCategories();
    }
  }, [isSignedIn, isAdmin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await apiClient.createProduct(form);
      if (result.success) {
        setSuccess(true);
        setForm({ 
          name: "", 
          price: "", 
          image: "", 
          link: "", 
          category: categories.length > 0 ? categories[0].id : "" 
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
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
        <title>Add Product - Admin Dashboard</title>
        <meta name="description" content="Add a new product to the medMagic store" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] py-8 px-6">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Add New Product
              </h1>
              <p className="text-gray-400 mt-2">Add a new product to your medical store</p>
            </div>
            <Link 
              href="/admin/products"
              className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Products</span>
            </Link>
          </div>

          {/* Add Product Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
            {success && (
              <div className="bg-emerald-600/10 border border-emerald-600/30 rounded-lg p-4 text-center mb-6 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-emerald-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-emerald-300 font-semibold">Product added successfully!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                    placeholder="e.g. Digital Thermometer"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                    placeholder="e.g. 25.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  placeholder="e.g. /thermometer.jpg"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Use a relative path (e.g., /image.jpg) or full URL
                </p>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Stripe Payment Link</label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  placeholder="e.g. https://buy.stripe.com/..."
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  required
                >
                  {categories.length === 0 ? (
                    <option value="">Loading categories...</option>
                  ) : (
                    categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))
                  )}
                </select>
                {categories.length === 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    If no categories appear, please set up categories first in the Categories section.
                  </p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading || categories.length === 0}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Product...
                    </span>
                  ) : 'Add Product'}
                </button>
                <Link
                  href="/admin/products"
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center"
                >
                  Cancel
                </Link>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/admin/categories"
                  className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="text-white font-medium">Manage Categories</p>
                    <p className="text-gray-400 text-sm">Add or edit product categories</p>
                  </div>
                </Link>
                <Link
                  href="/admin/products"
                  className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <p className="text-white font-medium">View All Products</p>
                    <p className="text-gray-400 text-sm">Manage existing products</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NoSSR>
  );
};

export default AddProductAdmin;
