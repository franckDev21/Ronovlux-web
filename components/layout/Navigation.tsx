'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fermer le menu quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && 
          !menuRef.current.contains(event.target as Node) && 
          buttonRef.current && 
          !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Empêcher le défilement du corps quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

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

  // Navigation items
  const navItems = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#services', label: 'Services' },
    { href: '#realisations', label: 'Réalisations' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200/20'
      } ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[68px]">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image 
                src="/assets/logo.png" 
                alt="Renovlux Group Logo" 
                width={200}
                height={80}
                // className="h-24 w-auto sm:h-14 md:h-12"
                priority
              />
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href}
                  className={`text-gray-700 transition-colors hover:text-amber-600 bg-gradient-to-r from-amber-600 to-amber-600 bg-left-bottom bg-no-repeat ${
                    activeHash === item.href ? 'text-amber-700 bg-[length:100%_2px]' : 'bg-[length:0%_2px]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center space-x-2 ml-4">
                <a 
                  href="/devis"
                  className="inline-flex items-center justify-center px-6 py-2 text-white bg-amber-600 hover:bg-amber-700 rounded-md shadow-sm transition-colors whitespace-nowrap"
                >
                  Devis Gratuit
                </a>
                <a
                  href="#services"
                  className="hidden lg:inline-flex items-center justify-center px-6 py-2 text-white bg-gray-900 hover:bg-gray-800 rounded-md shadow-sm transition-colors gap-2 whitespace-nowrap"
                >
                  <GraduationCap className="h-4 w-4" />
                  Postuler pour une formation
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <a 
                href="/devis"
                className="inline-flex items-center justify-center px-4 py-2 text-sm text-white bg-amber-600 hover:bg-amber-700 rounded-md shadow-sm transition-colors whitespace-nowrap"
              >
                Devis
              </a>
              <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          'overflow-y-auto'
        )}
      >
        <div className="h-full flex flex-col py-6 px-4">
          <div className="flex items-center justify-between mb-8 px-4">
            <Image 
              src="/assets/logo.png" 
              alt="Renovlux Group Logo" 
              width={200}
              height={80}
              className="h-12 w-auto"
              priority
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 space-y-2 px-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 text-lg font-medium rounded-md transition-colors ${
                  activeHash === item.href 
                    ? 'bg-amber-50 text-amber-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-amber-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            <div className="pt-4 border-t border-gray-200 mt-4">
              <a
                href="#services"
                className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md shadow-sm transition-colors gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap className="h-5 w-5" />
                Postuler pour une formation
              </a>
            </div>
          </nav>
          
          <div className="px-4 py-4 border-t border-gray-200 mt-auto">
            <div className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Renovlux Group. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
