import { apiClient } from './client';

// Base URL de l'API (configurée via l'environnement)
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
import { Service, PortfolioItem, Product, ContactFormData, ApiResponse, FilterOptions, PaginationOptions } from '@/types';
// Format brut renvoyé par l'API /projects
type RawProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  category: string;
};

// Service pour les services
export class ServicesApi {
  private endpoint = '/services';

  async getAll(): Promise<Service[]> {
    const response = await apiClient.get<Service[]>(this.endpoint);
    return response.data;
  }

  async getById(id: string): Promise<Service> {
    const response = await apiClient.get<Service>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async getBySlug(slug: string): Promise<Service> {
    const response = await apiClient.get<Service>(`${this.endpoint}/slug/${slug}`);
    return response.data;
  }

  async getActive(): Promise<Service[]> {
    const response = await apiClient.get<Service[]>(`${this.endpoint}/active`);
    return response.data;
  }
}

// Service pour le portfolio
export class PortfolioApi {
  private endpoint = '/projects';

  async getAll(options?: FilterOptions & PaginationOptions): Promise<PortfolioItem[]> {
    const params: Record<string, string> = {};
    if (options?.category) params.category = options.category;
    if (options?.search) params.search = options.search;
    if (options?.sortBy) params.sortBy = options.sortBy;
    if (options?.sortOrder) params.sortOrder = options.sortOrder;
    if (options?.page) params.page = options.page.toString();
    if (options?.limit) params.limit = options.limit.toString();

    const response = await apiClient.get<RawProject[]>(this.endpoint, params);
    const raw = response.data;
    // Mapper RawProject -> PortfolioItem attendu par le front
    const mapped: PortfolioItem[] = (raw || []).map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      image: p.image,
      description: p.description,
      images: [p.image].filter(Boolean),
      tags: [],
      client: undefined,
      year: parseInt((p.created_at || '').slice(-4)) || new Date().getFullYear(),
      createdAt: p.created_at,
      updatedAt: p.created_at,
    }));
    return mapped;
  }

  async getById(id: string): Promise<PortfolioItem> {
    const response = await apiClient.get<PortfolioItem>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async getByCategory(category: string): Promise<PortfolioItem[]> {
    const response = await apiClient.get<PortfolioItem[]>(`${this.endpoint}/category/${category}`);
    return response.data;
  }

  async getFeatured(limit: number = 6): Promise<PortfolioItem[]> {
    const response = await apiClient.get<PortfolioItem[]>(`${this.endpoint}`, { limit: limit.toString() });
    return response.data;
  }
}

// Service pour les produits
export class ProductsApi {
  private endpoint = '/products';

  async getAll(options?: FilterOptions & PaginationOptions): Promise<{
    items: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const params: Record<string, string> = {};
    
    if (options?.category) params.category = options.category;
    if (options?.search) params.search = options.search;
    if (options?.sortBy) params.sortBy = options.sortBy;
    if (options?.sortOrder) params.sortOrder = options.sortOrder;
    if (options?.page) params.page = options.page.toString();
    if (options?.limit) params.limit = options.limit.toString();

    const response = await apiClient.get<{
      items: Product[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(this.endpoint, params);
    
    return response.data;
  }

  async getById(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async getByCategory(category: string): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(`${this.endpoint}/category/${category}`);
    return response.data;
  }

  async getAvailable(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products/available');
    return response.data;
  }

  async search(query: string): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(`${this.endpoint}/search`, { q: query });
    return response.data;
  }
}

// Service pour les contacts
export class ContactApi {
  private endpoint = '/contact';

  async sendMessage(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post<{ success: boolean; message: string }>(
      `${this.endpoint}/message`,
      formData
    );
    return response.data;
  }

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post<{ success: boolean; message: string }>(
      `${this.endpoint}/newsletter`,
      { email }
    );
    return response.data;
  }
}

// Instances des services API
export const servicesApi = new ServicesApi();
export const portfolioApi = new PortfolioApi();
export const productsApi = new ProductsApi();
export const contactApi = new ContactApi();

// Fonction utilitaire pour formater les données des services (pour la compatibilité avec le code existant)
export const formatServiceForDisplay = (service: Service) => ({
  title: service.title,
  description: service.description,
  image: service.image,
  features: service.features
});

// Fonction utilitaire pour formater les données du portfolio (pour la compatibilité avec le code existant)
export const formatPortfolioForDisplay = (item: PortfolioItem) => ({
  title: item.title,
  category: item.category,
  image: item.image
});
