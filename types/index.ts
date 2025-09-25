// Types pour les entités de l'application
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description?: string;
  images: string[];
  tags: string[];
  client?: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  specifications: Record<string, string>;
  price?: number;
  availability: 'available' | 'unavailable' | 'limited';
  material?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  service?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Types pour les filtres et la pagination
export interface FilterOptions {
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

// Types pour les états de l'application
export interface AppState {
  services: Service[];
  portfolio: PortfolioItem[];
  products: Product[];
  isLoading: {
    services: boolean;
    portfolio: boolean;
    products: boolean;
  };
  errors: {
    services: string | null;
    portfolio: string | null;
    products: string | null;
  };
}
