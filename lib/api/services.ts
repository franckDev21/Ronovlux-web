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

  async getAll(limit?: number): Promise<Service[]> {
    try {
      const params: Record<string, string> = {};
      if (limit) params.limit = limit.toString();
      
      const response = await apiClient.get<{
        data: Array<{
          id: string | number;
          name: string;
          slug: string;
          description: string;
          price: number;
          duration: number;
          is_active: boolean;
          image: string;
          features: string[];
          created_at: string;
          updated_at: string;
        }>;
        links: any;
        meta: any;
      }>(this.endpoint, params);
      
      console.log('Réponse brute de l\'API (services):', response);
      
      // Vérifier si la réponse a la structure attendue
      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error('Format de réponse inattendu de l\'API');
        return [];
      }
      
      const rawItems = response.data;
      
      // Mapper les données brutes vers le format attendu
      const services = rawItems.map((item) => ({
        id: item.id.toString(),
        title: item.name || 'Service sans nom',
        slug: item.slug || '',
        description: item.description || '',
        image: item.image || '/placeholder-image.jpg',
        features: Array.isArray(item.features) ? item.features : [],
        isActive: item.is_active !== undefined ? item.is_active : true,
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.updated_at || item.created_at || new Date().toISOString(),
      }));
      
      console.log('Services mappés:', services);
      return services;
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Service> {
    const response = await apiClient.get<Service>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async getBySlug(slug: string): Promise<Service> {
    const response = await apiClient.get<Service>(`${this.endpoint}/slug/${slug}`);
    return response.data;
  }

  async getActive(limit?: number): Promise<Service[]> {
    try {
      const params: Record<string, string> = { is_active: 'true' };
      if (limit) params.limit = limit.toString();
      
      const response = await apiClient.get<{
        data: Array<{
          id: string | number;
          name: string;
          slug: string;
          description: string;
          price: number;
          duration: number;
          is_active: boolean;
          image: string;
          features: string[];
          created_at: string;
          updated_at: string;
        }>;
        links: any;
        meta: any;
      }>(this.endpoint, params);
      
      console.log('Réponse brute de l\'API (services actifs):', response);
      
      // Vérifier si la réponse a la structure attendue
      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error('Format de réponse inattenu de l\'API pour les services actifs');
        return [];
      }
      
      const rawItems = response.data;
      
      // Mapper les données brutes vers le format attendu
      const services = rawItems.map((item) => ({
        id: item.id.toString(),
        title: item.name || 'Service sans nom',
        slug: item.slug || '',
        description: item.description || '',
        image: item.image || '/placeholder-image.jpg',
        features: Array.isArray(item.features) ? item.features : [],
        isActive: item.is_active !== undefined ? item.is_active : true,
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.updated_at || item.created_at || new Date().toISOString(),
      }));
      
      console.log('Services actifs mappés:', services);
      return services;
    } catch (error) {
      console.error('Erreur lors de la récupération des services actifs:', error);
      return [];
    }
  }
}

// Service pour le portfolio
export class PortfolioApi {
  private endpoint = '/projects';

  async getAll(options?: FilterOptions & PaginationOptions): Promise<PortfolioItem[]> {
    try {
      const params: Record<string, string> = {};
      
      if (options) {
        if (options.limit) params.limit = options.limit.toString();
        if (options.page) params.page = options.page.toString();
        if (options.category) params.category = options.category;
        if (options.search) params.search = options.search;
      }
      
      const response = await apiClient.get<{
        data: Array<{
          id: number;
          uuid: string;
          title: string;
          description: string;
          image: string;
          secondary_images: string[];
          created_at: string;
          category_id: number;
          category: {
            id: number;
            name: string;
          };
        }>;
        meta: any;
      }>(this.endpoint, params);
      
      console.log('Réponse brute de l\'API (portfolio):', response);
      
      // Vérifier si la réponse a la structure attendue
      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error('Format de réponse inattendu de l\'API (portfolio)');
        return [];
      }
      
      const rawItems = response.data;
      
      // Mapper les données brutes vers le format attendu
      const portfolioItems = rawItems.map((item) => ({
        id: item.id.toString(),
        uuid: item.uuid || '',
        title: item.title || 'Projet sans titre',
        slug: item.title ? item.title.toLowerCase().replace(/\s+/g, '-') : '',
        description: item.description || '',
        image: item.image || '/placeholder-image.jpg',
        category: item.category?.name || 'Non catégorisé',
        categoryId: item.category_id?.toString() || '',
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.created_at || new Date().toISOString(),
        secondaryImages: Array.isArray(item.secondary_images) ? item.secondary_images : [],
      }));
      
      console.log('Projets mappés:', portfolioItems);
      return portfolioItems;
    } catch (error) {
      console.error('Erreur lors de la récupération du portfolio:', error);
      return [];
    }
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
    try {
      console.log(`Récupération des projets en vedette (limite: ${limit})`);
      
      // D'abord, récupérer tous les projets
      const response = await apiClient.get<{
        data: Array<{
          id: number;
          uuid: string;
          title: string;
          description: string;
          image: string;
          secondary_images: string[];
          created_at: string;
          category_id: number;
          category: {
            id: number;
            name: string;
          };
        }>;
        meta: any;
      }>(this.endpoint, { 
        limit: limit.toString(),
        // Pas de filtre featured car l'API ne le supporte pas
      });
      
      console.log('Réponse brute de l\'API (tous les projets):', response);
      
      // Vérifier si la réponse a la structure attendue
      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error('Format de réponse inattenu de l\'API (tous les projets)');
        return [];
      }
      
      // Prendre les premiers éléments selon la limite
      const rawItems = response.data.slice(0, limit);
      
      // Mapper les données brutes vers le format attendu
      const featuredItems = rawItems.map((item) => ({
        id: item.id.toString(),
        uuid: item.uuid || '',
        title: item.title || 'Projet sans titre',
        slug: item.title ? item.title.toLowerCase().replace(/\s+/g, '-') : '',
        description: item.description || '',
        image: item.image || '/placeholder-image.jpg',
        category: item.category?.name || 'Non catégorisé',
        categoryId: item.category_id?.toString() || '',
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.created_at || new Date().toISOString(),
        secondaryImages: Array.isArray(item.secondary_images) ? item.secondary_images : [],
      }));
      
      console.log('Projets en vedette mappés:', featuredItems);
      return featuredItems;
    } catch (error) {
      console.error('Erreur lors de la récupération des projets en vedette:', error);
      return [];
    }
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
export const formatServiceForDisplay = (service: Service) => {
  // Protection contre les données null/undefined
  if (!service) {
    return {
      title: 'Service non disponible',
      description: 'Description non disponible',
      image: '/placeholder-image.jpg',
      features: []
    };
  }
  
  return {
    title: service.title || 'Service sans titre',
    description: service.description || 'Description non disponible',
    image: service.image || '/placeholder-image.jpg',
    features: Array.isArray(service.features) ? service.features : []
  };
};

// Fonction utilitaire pour formater les données du portfolio (pour la compatibilité avec le code existant)
export const formatPortfolioForDisplay = (item: any) => {
  console.log('Formatage du projet:', item);
  
  if (!item) {
    console.warn('Aucune donnée de projet fournie à formatPortfolioForDisplay');
    return {
      id: '',
      title: 'Projet non disponible',
      category: 'Non catégorisé',
      image: '/placeholder-image.jpg',
      description: '',
      slug: '',
      secondaryImages: []
    };
  }

  const formattedItem = {
    id: item.id?.toString() || '',
    title: item.title || 'Sans titre',
    category: item.category?.name || item.category || 'Non catégorisé',
    image: item.image || '/placeholder-image.jpg',
    description: item.description || '',
    slug: item.slug || (item.title ? item.title.toLowerCase().replace(/\s+/g, '-') : ''),
    secondaryImages: Array.isArray(item.secondaryImages) ? item.secondaryImages : 
                    (Array.isArray(item.secondary_images) ? item.secondary_images : [])
  };
  
  console.log('Projet formaté:', formattedItem);
  return formattedItem;
};
