import { useState, useEffect, useCallback } from 'react';
import { Service } from '@/types';
import { servicesApi } from '@/lib/api/services';
import { handleApiError } from '@/lib/api/client';

interface UseServicesReturn {
  services: Service[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseServiceReturn {
  service: Service | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Hook pour récupérer tous les services
export const useServices = (): UseServicesReturn => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      console.log('Chargement des services...');
      setLoading(true);
      setError(null);
      const data = await servicesApi.getAll();
      console.log('Services chargés:', data);
      setServices(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des services:', err);
      const errorMessage = handleApiError(err);
      console.error('Message d\'erreur:', errorMessage);
      setError(errorMessage);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
  };
};

// Hook pour récupérer les services actifs
export const useActiveServices = (limit: number = 6): UseServicesReturn => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveServices = useCallback(async () => {
    try {
      console.log('Chargement des services actifs...');
      setLoading(true);
      setError(null);
      const data = await servicesApi.getActive(limit);
      console.log('Services actifs chargés:', data);
      setServices(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des services actifs:', err);
      const errorMessage = handleApiError(err);
      console.error('Message d\'erreur:', errorMessage);
      setError(errorMessage);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchActiveServices();
  }, [fetchActiveServices]);

  return {
    services,
    loading,
    error,
    refetch: fetchActiveServices,
  };
};

// Hook pour récupérer un service par ID
export const useService = (id: string): UseServiceReturn => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchService = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await servicesApi.getById(id);
      setService(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  return {
    service,
    loading,
    error,
    refetch: fetchService,
  };
};

// Hook pour récupérer un service par slug
export const useServiceBySlug = (slug: string): UseServiceReturn => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServiceBySlug = async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await servicesApi.getBySlug(slug);
      setService(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceBySlug();
  }, [slug]);

  return {
    service,
    loading,
    error,
    refetch: fetchServiceBySlug,
  };
};
