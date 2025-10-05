'use client';

import React from 'react';
import { Crown } from 'lucide-react';

interface FooterProps {
  className?: string;
}

interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Services",
    links: [
      { label: "Granit & Marbre" },
      { label: "Quartz Premium" },
      { label: "Cuisines Modernes" },
      { label: "Salles de Bains" }
    ]
  },
  {
    title: "Contact",
    links: [
      { label: "+33 1 23 45 67 89" },
      { label: "contact@Renovluxgroup.com" },
      { label: "123 Avenue de la Pierre" },
      { label: "75000 Paris, France" }
    ]
  }
];

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-black text-white py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Crown className="h-8 w-8 text-amber-500" />
              <span className="text-xl font-bold">Renovlux Group</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Votre partenaire d&apos;exception pour la transformation de vos espaces avec les matériaux les plus nobles.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href ? (
                      <a 
                        href={link.href}
                        className="hover:text-amber-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : link.onClick ? (
                      <button 
                        onClick={link.onClick}
                        className="hover:text-amber-400 transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <span>{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {currentYear} Renovlux Group Sarl. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
              >
                Accueil
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('realisations')}
                className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
              >
                Réalisations
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
