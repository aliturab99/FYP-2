"use client"
import { useUser, SignInButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Head from "next/head";
import { fetchCategories } from "../../lib/categories";
import apiClient from "../../lib/api";

const AddProduct = () => {
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

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
      if (categoriesData.length > 0) {
        setForm(prev => ({ ...prev, category: categoriesData[0].id }));
      }
    };
    loadCategories();
  }, []);

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
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add Product - medMagic</title>
        <meta name="description" content="Add a new product to the medMagic store" />
      </Head>
      <section className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-10">
          <h2 className="text-3xl font-bold text-center text-emerald-400 mb-8">Add New Product</h2>
          {!isLoaded ? (
            <div className="text-center text-gray-300">Loading...</div>
          ) : !isSignedIn ? (
            <div className="text-center py-12">
              <p className="mb-4 text-lg text-gray-300">You must be signed in to add products.</p>
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:from-emerald-700 hover:to-blue-700 transition-all">Sign In</button>
              </SignInButton>
            </div>
          ) : (
            <>
              {success && (
                <div className="bg-emerald-600/10 border border-emerald-600/30 rounded-lg p-4 text-center mb-6 animate-fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-emerald-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-emerald-300 font-semibold">Product added successfully!</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Stripe Link</label>
                  <input
                    type="text"
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
                      If no categories appear, please contact an admin to set up categories.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                  ) : 'Add Product'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AddProduct;
