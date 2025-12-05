'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  ArrowRight, 
  Sparkles,
  ChevronDown,
  Calendar
} from 'lucide-react';

interface HeroSectionProps {
  className?: string;
  backgroundImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  className = '',
  backgroundImage = "/assets/bg1.jpeg"
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = "+237671055052"; // Numéro sans espaces pour l'URL
    const message = encodeURIComponent(
      "Bonjour Renovlux Groupe ! 👋\n\n" +
      "J'aimerais en savoir plus sur vos services et produits (granit, marbre, quartz, cuisines, salles de bains).\n" +
      "Je viens de visiter votre site internet et je suis intéressé(e) par vos prestations.\n\n" +
      "Pourriez-vous me fournir plus d'informations ?\n" +
      "Merci !"
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="accueil" className={`relative pb-24 pt-32 flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${backgroundImage}')`
        }}
      />
      
      {/* Content */}
      <div className={`relative z-10 text-center text-white max-w-4xl mx-auto px-4 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Badge */}
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-amber-400 mr-3" />
          <Badge variant="secondary" className="bg-amber-600/20 text-amber-200 border-amber-400/30 text-sm px-4 py-2">
            Excellence & Raffinement
          </Badge>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
          Renovlux Groupe
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light leading-relaxed">
          Votre partenaire d&apos;exception pour la transformation de vos espaces<br />
          <span className="text-amber-300">Granit • Marbre • Quartz • Cuisines • Salles de Bains</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={() => scrollToSection('contact')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Demander un Devis Gratuit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={openWhatsApp}
            className="border-2 border-white text-amber-700 hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-medium backdrop-blur-sm"
          >
            <Phone className="mr-2 h-5 w-5" />
            Nous Contacter sur WhatsApp
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 animate-bounce">
          <button onClick={() => scrollToSection('services')}>
            <ChevronDown className="h-8 w-8 text-amber-400 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
