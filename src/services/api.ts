import axios from 'axios';
import type { Product, Category, ApiResponse, ProductFilters } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAllProducts: async (filters?: ProductFilters): Promise<ApiResponse<Product[]>> => {
    const response = await api.get('/products');
    let products = response.data.products;

    if (filters) {
      if (filters.category) {
        products = products.filter((p: Product) => p.category === filters.category);
      }
      if (filters.minPrice) {
        products = products.filter((p: Product) => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        products = products.filter((p: Product) => p.price <= filters.maxPrice!);
      }
      if (filters.minRating) {
        products = products.filter((p: Product) => p.rating >= filters.minRating!);
      }
      if (filters.sortBy) {
        products.sort((a: Product, b: Product) => {
          switch (filters.sortBy) {
            case 'price':
              return a.price - b.price;
            case 'rating':
              return b.rating - a.rating;
            case 'newest':
              return b.id - a.id;
            default:
              return 0;
          }
        });
      }
    }

    return {
      data: products,
      status: 200,
    };
  },

  getProductById: async (id: number): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/${id}`);
    return {
      data: response.data,
      status: 200,
    };
  },

  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    try {
      const response = await api.get('/products/categories');
      // console.log('Raw API Response:', response.data);
      // console.log('Response type:', typeof response.data);
      // console.log('Is Array?', Array.isArray(response.data));
      // console.log('First item type:', typeof response.data[0]);
      // console.log('First item:', response.data[0]);

      // Ensure we're working with an array
      if (!Array.isArray(response.data)) {
        console.error('API response is not an array:', response.data);
        return {
          data: [],
          status: 500,
          message: 'Invalid API response format'
        };
      }

      // Transform the data safely
      const categories = response.data.map((item) => {
        // Convert to string and handle potential null/undefined
        const categoryName = item.name;
        return {
          id: item.slug,
          name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
        };
      });

      return {
        data: categories,
        status: 200,
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        data: [],
        status: 500,
        message: 'Failed to fetch categories'
      };
    }
  },

  searchProducts: async (query: string): Promise<ApiResponse<Product[]>> => {
    const response = await api.get(`/products/search?q=${query}`);
    return {
      data: response.data.products,
      status: 200,
    };
  },

  getProductsByCategory: async (category: string): Promise<ApiResponse<Product[]>> => {
    const response = await api.get(`/products/category/${category}`);
    return {
      data: response.data.products,
      status: 200,
    };
  },
}; 