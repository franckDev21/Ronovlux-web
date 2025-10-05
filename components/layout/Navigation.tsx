'use client';

import React, { useState, useEffect } from 'react';
import { Crown, GraduationCap } from 'lucide-react';

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['accueil', 'services', 'realisations', 'contact'];

    const updateFromHash = () => {
      const hash = window.location.hash || '#accueil';
      setActiveHash(hash);
    };

    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('hashchange', updateFromHash);
      observer.disconnect();
    };
  }, []);

  // Navigation via ancres href="#..." (pas de scroll programmatique)

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
            <span className="text-xl font-bold text-gray-900">Renovlux Group</span>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#accueil"
              className={`text-gray-700 transition-colors hover:text-amber-600 bg-gradient-to-r from-amber-600 to-amber-600 bg-left-bottom bg-no-repeat ${activeHash === '#accueil' ? 'text-amber-700 bg-[length:100%_2px]' : 'bg-[length:0%_2px]'}`}
            >
              Accueil
            </a>
            <a 
              href="#services"
              className={`text-gray-700 transition-colors hover:text-amber-600 bg-gradient-to-r from-amber-600 to-amber-600 bg-left-bottom bg-no-repeat ${activeHash === '#services' ? 'text-amber-700 bg-[length:100%_2px]' : 'bg-[length:0%_2px]'}`}
            >
              Services
            </a>
            <a 
              href="#realisations"
              className={`text-gray-700 transition-colors hover:text-amber-600 bg-gradient-to-r from-amber-600 to-amber-600 bg-left-bottom bg-no-repeat ${activeHash === '#realisations' ? 'text-amber-700 bg-[length:100%_2px]' : 'bg-[length:0%_2px]'}`}
            >
              Réalisations
            </a>
            <a 
              href="#contact"
              className={`text-gray-700 transition-colors hover:text-amber-600 bg-gradient-to-r from-amber-600 to-amber-600 bg-left-bottom bg-no-repeat ${activeHash === '#contact' ? 'text-amber-700 bg-[length:100%_2px]' : 'bg-[length:0%_2px]'}`}
            >
              Contact
            </a>
            <div className="flex items-center space-x-2">
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2 text-white bg-amber-600 hover:bg-amber-700 rounded-md shadow-sm transition-colors"
              >
                Devis Gratuit
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-2 text-white bg-gray-900 hover:bg-gray-800 rounded-md shadow-sm transition-colors gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                Postuler pour une formation
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <a 
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-2 text-white bg-amber-600 hover:bg-amber-700 rounded-md shadow-sm transition-colors"
            >
              Devis
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
