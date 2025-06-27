"use client"
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NoSSR from "../../components/NoSSR";
import { fetchCategories } from "../../lib/categories";

const ProductsManagement = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'All Categories' }]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Admin email check
  const ADMIN_EMAILS = ["syedyawaraliturab@gmail.com"];
  const isAdmin = isSignedIn && user?.emailAddresses?.[0]?.emailAddress && 
    (ADMIN_EMAILS.includes(user.emailAddresses[0].emailAddress) || 
     user.emailAddresses[0].emailAddress.endsWith("@medmagic.com"));

  useEffect(() => {
    if (isSignedIn && isAdmin) {
      loadData();
    }
  }, [isSignedIn, isAdmin]);

  const loadData = async () => {
    try {
      const [categoriesData, productsRes] = await Promise.all([
        fetchCategories(),
        fetch('/api/products')
      ]);
      
      setCategories([
        { id: 'all', name: 'All Categories' },
        ...categoriesData
      ]);
      
      const productsData = await productsRes.json();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProducts();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        fetchProducts();
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

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
        <title>Products Management - Admin Dashboard</title>
        <meta name="description" content="Manage all products in the store" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] text-white py-8 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Products Management
              </h1>
              <p className="text-gray-400 mt-2">Manage all products in your store</p>
            </div>
            <Link 
              href="/admin/products/add"
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add New Product</span>
            </Link>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Search Products</label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Filter by Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="category">Category</option>
                  <option value="created">Date Created</option>
                </select>
              </div>
              <div className="flex items-end">
                <div className="bg-emerald-600/20 px-4 py-2 rounded-lg">
                  <span className="text-emerald-400 font-semibold">{filteredProducts.length}</span>
                  <span className="text-gray-300 ml-1">products found</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Loading products...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-300 font-medium">Product</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-medium">Category</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-medium">Price</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-medium">Created</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product._id} className="border-b border-gray-700 hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image 
                                src={product.image} 
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{product.name}</h3>
                              <p className="text-gray-400 text-sm truncate w-48">{product.link}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-sm capitalize">
                            {product.category.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-gray-400">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(product._id)}
                              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredProducts.length === 0 && (
                  <div className="p-12 text-center">
                    <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No Products Found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal - same as in admin dashboard */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                updateProduct(editingProduct._id, {
                  name: formData.get('name'),
                  price: parseFloat(formData.get('price')),
                  image: formData.get('image'),
                  link: formData.get('link'),
                  category: formData.get('category')
                });
              }} className="space-y-4">
                <input
                  name="name"
                  defaultValue={editingProduct.name}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  placeholder="Product Name"
                  required
                />
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingProduct.price}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  placeholder="Price"
                  required
                />
                <input
                  name="image"
                  defaultValue={editingProduct.image}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  placeholder="Image URL"
                  required
                />
                <input
                  name="link"
                  defaultValue={editingProduct.link}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  placeholder="Purchase Link"
                  required
                />
                <select
                  name="category"
                  defaultValue={editingProduct.category}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                  required
                >
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal - same as in admin dashboard */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md text-center">
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="text-gray-400 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => deleteProduct(deleteConfirm)}
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

export default ProductsManagement;
