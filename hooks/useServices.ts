import { useState, useEffect } from 'react';
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
      setLoading(true);
      setError(null);
      const data = await servicesApi.getAll();
      setServices(data);
    } catch (err) {
      setError(handleApiError(err));
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
export const useActiveServices = (): UseServicesReturn => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await servicesApi.getAll(2);
      setServices(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveServices();
  }, []);

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
