'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
        : 'bg-white/95 backdrop-blur-md border-b border-gray-200/20'
    } ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Crown className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold text-gray-900">Ronovlux Group</span>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('accueil')}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('realisations')}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Réalisations
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6"
            >
              Devis Gratuit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
            >
              Devis
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
