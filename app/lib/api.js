// API utility for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Products API
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/products${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getProduct(id) {
    return this.request(`/api/products/${id}`);
  }

  async createProduct(productData) {
    return this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }

  async getProductsByCategory(categoryId) {
    return this.request(`/api/products/category/${categoryId}`);
  }

  async getFeaturedProducts() {
    return this.request('/api/products/featured');
  }

  // Categories API
  async getCategories(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/categories${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getCategory(id) {
    return this.request(`/api/categories/${id}`);
  }

  async createCategory(categoryData) {
    return this.request('/api/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(id, categoryData) {
    return this.request(`/api/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(id) {
    return this.request(`/api/categories/${id}`, {
      method: 'DELETE',
    });
  }

  async seedCategories() {
    return this.request('/api/categories/seed', {
      method: 'POST',
    });
  }

  async toggleCategory(id) {
    return this.request(`/api/categories/${id}/toggle`, {
      method: 'PUT',
    });
  }

  // Admin API
  async getAdminStats(adminEmail) {
    return this.request('/api/admin/stats', {
      headers: {
        'x-admin-email': adminEmail,
      },
    });
  }

  async getAdminUsers(adminEmail) {
    return this.request('/api/admin/users', {
      headers: {
        'x-admin-email': adminEmail,
      },
    });
  }

  async getAdminProducts(adminEmail, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/admin/products${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint, {
      headers: {
        'x-admin-email': adminEmail,
      },
    });
  }

  async toggleProductStatus(id, adminEmail) {
    return this.request(`/api/admin/products/${id}/toggle`, {
      method: 'PUT',
      headers: {
        'x-admin-email': adminEmail,
      },
    });
  }

  async toggleProductFeatured(id, adminEmail) {
    return this.request(`/api/admin/products/${id}/feature`, {
      method: 'PUT',
      headers: {
        'x-admin-email': adminEmail,
      },
    });
  }

  async bulkDeleteProducts(productIds, adminEmail) {
    return this.request('/api/admin/products/bulk', {
      method: 'DELETE',
      headers: {
        'x-admin-email': adminEmail,
      },
      body: JSON.stringify({ productIds }),
    });
  }

  async getAnalytics(adminEmail, timeframe = '30d') {
    return this.request(`/api/admin/analytics?timeframe=${timeframe}`, {
      headers: {
        'x-admin-email': adminEmail,
      },
    });
  }

  // Chat API
  async sendChatMessage(message, userId = 'anonymous') {
    return this.request('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, userId }),
    });
  }

  async getChatHealth() {
    return this.request('/api/chat/health');
  }

  async submitChatFeedback(messageId, rating, feedback, userId = 'anonymous') {
    return this.request('/api/chat/feedback', {
      method: 'POST',
      body: JSON.stringify({ messageId, rating, feedback, userId }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Export both the class and instance
export { ApiClient };
export default apiClient;

// Helper functions for backward compatibility
export const fetchCategories = async () => {
  try {
    const categories = await apiClient.getCategories({ active: 'true' });
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchProducts = async (params = {}) => {
  try {
    const response = await apiClient.getProducts(params);
    // Handle both paginated and simple array responses
    return response.products || response;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
