'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { useContact } from '@/hooks/useContact';
import { useActiveServices } from '@/hooks/useServices';
import { ContactFormData } from '@/types';

interface ContactFormProps {
  className?: string;
  isDarkMode?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className = '', isDarkMode = false }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { sendMessage, loading } = useContact();
  const { services } = useActiveServices();

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSubmitError(null);
  };

  const openWhatsApp = (formData: ContactFormData) => {
    const phoneNumber = "+237671055052";
    const serviceInfo = formData.service && services.find(s => s.id === formData.service);
    
    const message = encodeURIComponent(
      "Bonjour Renovlux Groupe ! 👋\n\n" +
      `Je suis ${formData.firstName} ${formData.lastName}.\n` +
      (formData.email ? `Email: ${formData.email}\n` : '') +
      (formData.phone ? `Téléphone: ${formData.phone}\n` : '') +
      (serviceInfo ? `Service concerné: ${serviceInfo.title}\n` : '') +
      "\n" +
      `${formData.message}\n\n` +
      "Je souhaite obtenir plus d'informations ou un devis.\n" +
      "Merci de me recontacter au plus vite !\n\n" +
      "Cordialement,\n"
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      // Afficher un message de confirmation avant la redirection WhatsApp
      const confirmSend = window.confirm('Vous allez être redirigé vers WhatsApp pour envoyer votre demande. Voulez-vous continuer ?');
      
      if (confirmSend) {
        // Rediriger directement vers WhatsApp avec les informations du formulaire
        openWhatsApp(formData);
        
        // Réinitialiser le formulaire après la redirection
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          service: '',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la préparation du message WhatsApp:', error);
      setSubmitError('Une erreur est survenue lors de la préparation de votre message. Veuillez réessayer.');
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`bg-green-50 border-green-200 ${className}`}>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Message Envoyé !</h3>
          <p className="text-green-600 mb-4">
            Merci pour votre message. Nous vous contacterons dans les plus brefs délais.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Envoyer un Autre Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${isDarkMode ? 'bg-white/5 border-gray-700' : 'bg-white border-gray-200'} backdrop-blur-sm ${className}`}>
      <CardContent className={`p-8 ${!isDarkMode ? 'text-gray-900' : 'text-white'}`}>
        <h3 className="text-2xl font-bold mb-6">Demande de Devis</h3>
        
        {submitError && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border border-red-200'}`}>
            <AlertCircle className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
            <p className={isDarkMode ? 'text-red-300' : 'text-red-700'}>{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input 
              placeholder="Prénom *" 
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`${isDarkMode ? 'bg-white/10 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} placeholder:text-gray-400`} 
            />
            <Input 
              placeholder="Nom *" 
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`${isDarkMode ? 'bg-white/10 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} placeholder:text-gray-400`} 
            />
          </div>
          
          <Input 
            placeholder="Email *" 
            type="email" 
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`${isDarkMode ? 'bg-white/10 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} placeholder:text-gray-400`} 
          />
          
          <Input 
            placeholder="Téléphone" 
            type="tel" 
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`${isDarkMode ? 'bg-white/10 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} placeholder:text-gray-400`} 
          />

          {services.length > 0 && (
            <Select onValueChange={(value) => handleInputChange('service', value)}>
              <SelectTrigger className={`${isDarkMode ? 'bg-white/10 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}>
                <SelectValue placeholder="Service concerné (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Textarea 
            placeholder="Décrivez votre projet... *" 
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`${isDarkMode ? 'bg-white/10 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} placeholder:text-gray-400 h-32`} 
          />
          
          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Phone className="mr-2 h-5 w-5" />
                Envoyer ma Demande sur WhatsApp
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
