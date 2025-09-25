import { useState } from 'react';
import { ContactFormData } from '@/types';
import { contactApi } from '@/lib/api/services';
import { handleApiError } from '@/lib/api/client';

interface UseContactReturn {
  sendMessage: (formData: ContactFormData) => Promise<{ success: boolean; message: string }>;
  subscribeNewsletter: (email: string) => Promise<{ success: boolean; message: string }>;
  loading: boolean;
  error: string | null;
}

// Hook pour gérer les fonctionnalités de contact
export const useContact = (): UseContactReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true);
      setError(null);
      const response = await contactApi.sendMessage(formData);
      return response;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const subscribeNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true);
      setError(null);
      const response = await contactApi.subscribeNewsletter(email);
      return response;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    subscribeNewsletter,
    loading,
    error,
  };
};
