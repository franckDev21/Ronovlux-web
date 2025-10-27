'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Service, PortfolioItem, Product, AppState } from '@/types';
import { servicesApi, portfolioApi, productsApi } from '@/lib/api/services';
import { handleApiError } from '@/lib/api/client';

// Types pour les actions du reducer
type AppAction =
  | { type: 'SET_SERVICES_LOADING'; payload: boolean }
  | { type: 'SET_SERVICES_SUCCESS'; payload: Service[] }
  | { type: 'SET_SERVICES_ERROR'; payload: string | null }
  | { type: 'SET_PORTFOLIO_LOADING'; payload: boolean }
  | { type: 'SET_PORTFOLIO_SUCCESS'; payload: PortfolioItem[] }
  | { type: 'SET_PORTFOLIO_ERROR'; payload: string | null }
  | { type: 'SET_PRODUCTS_LOADING'; payload: boolean }
  | { type: 'SET_PRODUCTS_SUCCESS'; payload: Product[] }
  | { type: 'SET_PRODUCTS_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'REFRESH_DATA' };

// État initial
const initialState: AppState = {
  services: [],
  portfolio: [],
  products: [],
  isLoading: {
    services: false,
    portfolio: false,
    products: false,
  },
  errors: {
    services: null,
    portfolio: null,
    products: null,
  },
};

// Reducer pour gérer l'état
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_SERVICES_LOADING':
      return {
        ...state,
        isLoading: { ...state.isLoading, services: action.payload },
        errors: { ...state.errors, services: null },
      };
    case 'SET_SERVICES_SUCCESS':
      return {
        ...state,
        services: action.payload,
        isLoading: { ...state.isLoading, services: false },
        errors: { ...state.errors, services: null },
      };
    case 'SET_SERVICES_ERROR':
      return {
        ...state,
        isLoading: { ...state.isLoading, services: false },
        errors: { ...state.errors, services: action.payload },
      };
    case 'SET_PORTFOLIO_LOADING':
      return {
        ...state,
        isLoading: { ...state.isLoading, portfolio: action.payload },
        errors: { ...state.errors, portfolio: null },
      };
    case 'SET_PORTFOLIO_SUCCESS':
      return {
        ...state,
        portfolio: action.payload,
        isLoading: { ...state.isLoading, portfolio: false },
        errors: { ...state.errors, portfolio: null },
      };
    case 'SET_PORTFOLIO_ERROR':
      return {
        ...state,
        isLoading: { ...state.isLoading, portfolio: false },
        errors: { ...state.errors, portfolio: action.payload },
      };
    case 'SET_PRODUCTS_LOADING':
      return {
        ...state,
        isLoading: { ...state.isLoading, products: action.payload },
        errors: { ...state.errors, products: null },
      };
    case 'SET_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload,
        isLoading: { ...state.isLoading, products: false },
        errors: { ...state.errors, products: null },
      };
    case 'SET_PRODUCTS_ERROR':
      return {
        ...state,
        isLoading: { ...state.isLoading, products: false },
        errors: { ...state.errors, products: action.payload },
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {
          services: null,
          portfolio: null,
          products: null,
        },
      };
    case 'REFRESH_DATA':
      return initialState;
    default:
      return state;
  }
};

// Interface pour le contexte
interface AppContextType {
  state: AppState;
  // Actions pour les services
  loadServices: () => Promise<void>;
  loadActiveServices: () => Promise<void>;
  // Actions pour le portfolio
  loadPortfolio: () => Promise<void>;
  loadFeaturedPortfolio: (limit?: number) => Promise<void>;
  // Actions pour les produits
  loadProducts: () => Promise<void>;
  loadAvailableProducts: () => Promise<void>;
  // Actions utilitaires
  clearErrors: () => void;
  refreshAllData: () => void;
}

// Création du contexte
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider du contexte
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions pour les services
  const loadServices = async () => {
    dispatch({ type: 'SET_SERVICES_LOADING', payload: true });
    try {
      const services = await servicesApi.getAll();
      dispatch({ type: 'SET_SERVICES_SUCCESS', payload: services });
    } catch (error) {
      dispatch({ type: 'SET_SERVICES_ERROR', payload: handleApiError(error) });
    }
  };

  const loadActiveServices = async () => {
    dispatch({ type: 'SET_SERVICES_LOADING', payload: true });
    try {
      const services = await servicesApi.getActive();
      dispatch({ type: 'SET_SERVICES_SUCCESS', payload: services });
    } catch (error) {
      dispatch({ type: 'SET_SERVICES_ERROR', payload: handleApiError(error) });
    }
  };

  // Actions pour le portfolio
  const loadPortfolio = async () => {
    dispatch({ type: 'SET_PORTFOLIO_LOADING', payload: true });
    try {
      const portfolio = await portfolioApi.getAll();
      dispatch({ type: 'SET_PORTFOLIO_SUCCESS', payload: portfolio });
    } catch (error) {
      dispatch({ type: 'SET_PORTFOLIO_ERROR', payload: handleApiError(error) });
    }
  };

  const loadFeaturedPortfolio = async (limit: number = 6) => {
    dispatch({ type: 'SET_PORTFOLIO_LOADING', payload: true });
    try {
      const portfolio = await portfolioApi.getFeatured(limit);
      dispatch({ type: 'SET_PORTFOLIO_SUCCESS', payload: portfolio });
    } catch (error) {
      dispatch({ type: 'SET_PORTFOLIO_ERROR', payload: handleApiError(error) });
    }
  };

  // Actions pour les produits
  const loadProducts = async () => {
    dispatch({ type: 'SET_PRODUCTS_LOADING', payload: true });
    try {
      const response = await productsApi.getAll();
      dispatch({ type: 'SET_PRODUCTS_SUCCESS', payload: response.items });
    } catch (error) {
      dispatch({ type: 'SET_PRODUCTS_ERROR', payload: handleApiError(error) });
    }
  };

  const loadAvailableProducts = async () => {
    dispatch({ type: 'SET_PRODUCTS_LOADING', payload: true });
    try {
      const products = await productsApi.getAvailable();
      dispatch({ type: 'SET_PRODUCTS_SUCCESS', payload: products });
    } catch (error) {
      dispatch({ type: 'SET_PRODUCTS_ERROR', payload: handleApiError(error) });
    }
  };

  // Actions utilitaires
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const refreshAllData = () => {
    dispatch({ type: 'REFRESH_DATA' });
    // Recharger toutes les données
    loadActiveServices();
    loadFeaturedPortfolio();
    loadAvailableProducts();
  };

  const value: AppContextType = {
    state,
    loadServices,
    loadActiveServices,
    loadPortfolio,
    loadFeaturedPortfolio,
    loadProducts,
    loadAvailableProducts,
    clearErrors,
    refreshAllData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook pour utiliser le contexte
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
