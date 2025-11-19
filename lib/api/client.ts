import { ApiResponse, ApiError } from '@/types';

// Configuration de base pour l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://steve-api-app.renovlux-group.com/api';
const API_TIMEOUT = 10000; // 10 secondes

// Classe pour gérer les erreurs API
class ApiClientError extends Error implements ApiError {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
  }
}

// Configuration par défaut pour fetch
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Fonction utilitaire pour gérer les timeouts
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new ApiClientError('Request timeout', 408, 'TIMEOUT')), timeoutMs)
    ),
  ]);
};

// Classe principale du client API
export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_BASE_URL, headers: Record<string, string> = defaultHeaders) {
    this.baseURL = baseURL;
    this.defaultHeaders = headers;
  }

  // Méthode générique pour les requêtes
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await withTimeout(fetch(url, config), API_TIMEOUT);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiClientError(
          errorData.message || `HTTP Error: ${response.status}`,
          response.status,
          errorData.code
        );
      }

      const data = await response.json();
      // Normaliser la réponse: si l'API ne renvoie pas un objet avec { data },
      // envelopper la charge utile pour respecter ApiResponse<T>
      if (data && typeof data === 'object' && 'data' in data) {
        return data as ApiResponse<T>;
      }
      return { data, success: true } as ApiResponse<T>;
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }
      
      // Erreur réseau ou autre
      throw new ApiClientError(
        error instanceof Error ? error.message : 'Network error',
        0,
        'NETWORK_ERROR'
      );
    }
  }

  // Méthodes HTTP
  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params as Record<string, string>)}` : endpoint;
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Méthode pour les uploads de fichiers
  async upload<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type']; // Laisser le navigateur définir le Content-Type pour FormData

    return this.request<T>(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });
  }
}

// Instance par défaut du client API
export const apiClient = new ApiClient();

// Fonction utilitaire pour gérer les erreurs dans les composants
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiClientError) {
    switch (error.status) {
      case 400:
        return 'Données invalides. Veuillez vérifier vos informations.';
      case 401:
        return 'Authentification requise.';
      case 403:
        return 'Accès non autorisé.';
      case 404:
        return 'Ressource non trouvée.';
      case 408:
        return 'Délai d\'attente dépassé. Veuillez réessayer.';
      case 500:
        return 'Erreur serveur. Veuillez réessayer plus tard.';
      default:
        return error.message || 'Une erreur inattendue s\'est produite.';
    }
  }
  
  return 'Une erreur inattendue s\'est produite.';
};
