"use client"
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import NoSSR from "../../components/NoSSR";
import apiClient from "../../lib/api";

const CategoriesManagement = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Admin email check
  const ADMIN_EMAILS = ["syedyawaraliturab@gmail.com"];
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const isAdmin = isSignedIn && userEmail && 
    (ADMIN_EMAILS.includes(userEmail) || userEmail.endsWith("@medmagic.com"));

  const [newCategory, setNewCategory] = useState({
    id: '',
    name: '',
    description: '',
    icon: '📦',
    order: 0
  });

  const categoryIcons = [
    '💊', '🏥', '🔬', '🩹', '🧼', '👶', '🩺', '💉', '🧴', '📦', 
    '🔥', '❄️', '⚡', '🌡️', '💚', '🔴', '🟡', '🔵', '🟣', '🟠'
  ];

  useEffect(() => {
    if (isSignedIn && isAdmin) {
      fetchCategories();
    }
  }, [isSignedIn, isAdmin]);

  const fetchCategories = async () => {
    try {
      const data = await apiClient.getCategories({ includeCount: 'true' });
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const result = await apiClient.createCategory(newCategory);
      if (result.success) {
        fetchCategories();
        setNewCategory({ id: '', name: '', description: '', icon: '📦', order: 0 });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category: ' + error.message);
    }
  };

  const updateCategory = async (id, updatedData) => {
    try {
      const result = await apiClient.updateCategory(id, updatedData);
      if (result.success) {
        fetchCategories();
        setEditingCategory(null);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category: ' + error.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const result = await apiClient.deleteCategory(id);
      if (result.success) {
        fetchCategories();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category: ' + error.message);
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
        <title>Categories Management - Admin Dashboard</title>
        <meta name="description" content="Manage product categories" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] text-white py-8 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Categories Management
              </h1>
              <p className="text-gray-400 mt-2">Manage product categories for your store</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Category</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Loading categories...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                  <div key={category.id} className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{category.icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg text-white">{category.name}</h3>
                          <p className="text-gray-400 text-sm">ID: {category.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingCategory(category)}
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(category.id)}
                          className="bg-red-600 hover:bg-red-700 p-2 rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {category.description && (
                      <p className="text-gray-300 text-sm mb-3">{category.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Order: {category.order}</span>
                      <span className={`px-2 py-1 rounded ${category.isActive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
                
                {categories.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No Categories Found</h3>
                    <p className="text-gray-500">Create your first category to get started.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add Category Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
              <form onSubmit={addCategory} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Category ID</label>
                  <input
                    type="text"
                    value={newCategory.id}
                    onChange={(e) => setNewCategory({...newCategory, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                    placeholder="e.g. medical-devices"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Will be used in URLs and code</p>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                    placeholder="e.g. Medical Devices"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                    placeholder="Optional description"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Icon</label>
                  <div className="grid grid-cols-10 gap-2 mb-2">
                    {categoryIcons.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setNewCategory({...newCategory, icon})}
                        className={`p-2 rounded text-lg hover:bg-gray-700 transition-colors ${
                          newCategory.icon === icon ? 'bg-emerald-600' : 'bg-gray-800'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={newCategory.order}
                    onChange={(e) => setNewCategory({...newCategory, order: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                    placeholder="0"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors"
                  >
                    Add Category
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {editingCategory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Edit Category</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                updateCategory(editingCategory.id, {
                  name: formData.get('name'),
                  description: formData.get('description'),
                  icon: formData.get('icon'),
                  order: parseInt(formData.get('order')) || 0,
                  isActive: formData.get('isActive') === 'on'
                });
              }} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Category Name</label>
                  <input
                    name="name"
                    defaultValue={editingCategory.name}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingCategory.description}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Icon</label>
                  <input
                    name="icon"
                    defaultValue={editingCategory.icon}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-center text-2xl"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Display Order</label>
                  <input
                    name="order"
                    type="number"
                    defaultValue={editingCategory.order}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    name="isActive"
                    type="checkbox"
                    defaultChecked={editingCategory.isActive}
                    className="mr-2"
                  />
                  <label className="text-gray-300">Active</label>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md text-center">
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="text-gray-400 mb-6">Are you sure you want to delete this category? This action cannot be undone and may affect existing products.</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => deleteCategory(deleteConfirm)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NoSSR>
  );
};

export default CategoriesManagement;
