import { useState, useEffect } from 'react';
import { Product, FilterOptions, PaginationOptions } from '@/types';
import { productsApi } from '@/lib/api/services';
import { handleApiError } from '@/lib/api/client';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  refetch: () => Promise<void>;
}

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Hook pour récupérer les produits avec filtres et pagination
export const useProducts = (
  options?: FilterOptions & PaginationOptions
): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsApi.getAll(options);
      setProducts(response.items);
      setPagination(response.pagination);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [options?.category, options?.search, options?.sortBy, options?.sortOrder, options?.page, options?.limit]);

  return {
    products,
    loading,
    error,
    pagination,
    refetch: fetchProducts,
  };
};

// Hook pour récupérer un produit par ID
export const useProduct = (id: string): UseProductReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getById(id);
      setProduct(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};

// Hook pour récupérer les produits disponibles
export const useAvailableProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailableProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getAvailable();
      setProducts(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableProducts();
  }, []);

  return {
    products,
    loading,
    error,
    pagination: null,
    refetch: fetchAvailableProducts,
  };
};

// Hook pour récupérer les produits par catégorie
export const useProductsByCategory = (category: string): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductsByCategory = async () => {
    if (!category) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getByCategory(category);
      setProducts(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, [category]);

  return {
    products,
    loading,
    error,
    pagination: null,
    refetch: fetchProductsByCategory,
  };
};

// Hook pour rechercher des produits
export const useProductSearch = (query: string): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = async () => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.search(query);
      setProducts(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProducts();
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    products,
    loading,
    error,
    pagination: null,
    refetch: searchProducts,
  };
};
