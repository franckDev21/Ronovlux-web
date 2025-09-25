import { useState, useEffect } from 'react';
import { PortfolioItem, FilterOptions, PaginationOptions } from '@/types';
import { portfolioApi } from '@/lib/api/services';
import { handleApiError } from '@/lib/api/client';

interface UsePortfolioReturn {
  portfolio: PortfolioItem[];
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

interface UsePortfolioItemReturn {
  item: PortfolioItem | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Hook pour récupérer le portfolio avec filtres et pagination
export const usePortfolio = (
  options?: FilterOptions & PaginationOptions
): UsePortfolioReturn => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await portfolioApi.getAll(options);
      setPortfolio(response.items);
      setPagination(response.pagination);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [options?.category, options?.search, options?.sortBy, options?.sortOrder, options?.page, options?.limit]);

  return {
    portfolio,
    loading,
    error,
    pagination,
    refetch: fetchPortfolio,
  };
};

// Hook pour récupérer les projets mis en avant
export const useFeaturedPortfolio = (limit: number = 6): UsePortfolioReturn => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioApi.getFeatured(limit);
      setPortfolio(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedPortfolio();
  }, [limit]);

  return {
    portfolio,
    loading,
    error,
    pagination: null,
    refetch: fetchFeaturedPortfolio,
  };
};

// Hook pour récupérer un projet par ID
export const usePortfolioItem = (id: string): UsePortfolioItemReturn => {
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioItem = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioApi.getById(id);
      setItem(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioItem();
  }, [id]);

  return {
    item,
    loading,
    error,
    refetch: fetchPortfolioItem,
  };
};

// Hook pour récupérer les projets par catégorie
export const usePortfolioByCategory = (category: string): UsePortfolioReturn => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioByCategory = async () => {
    if (!category) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioApi.getByCategory(category);
      setPortfolio(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioByCategory();
  }, [category]);

  return {
    portfolio,
    loading,
    error,
    pagination: null,
    refetch: fetchPortfolioByCategory,
  };
};
