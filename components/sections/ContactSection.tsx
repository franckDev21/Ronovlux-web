'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  MapPin, 
  Mail,
  Facebook,
  Instagram,
  Music,
  MessageCircle
} from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

interface ContactSectionProps {
  className?: string;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface SocialMedia {
  name: string;
  icon: React.ReactNode;
  url: string;
}

const contactInfo: ContactInfo = {
  address: "Douala Cameroun | Logpong, Rue École Primaire Papyrus",
  phone: "+237 671 055 052",
  email: "contact@Renovluxgroup.com"
};

const socialMedia: SocialMedia[] = [
  { name: "Facebook", icon: <Facebook className="h-4 w-4" />, url: "#" },
  { name: "Instagram", icon: <Instagram className="h-4 w-4" />, url: "#" },
  { name: "TikTok", icon: <Music className="h-4 w-4" />, url: "#" },
  { name: "WhatsApp", icon: <MessageCircle className="h-4 w-4" />, url: "#" }
];

export const ContactSection: React.FC<ContactSectionProps> = ({ className = '' }) => {
  const scrollToMaps = () => {
    // Ici vous pouvez intégrer Google Maps ou ouvrir un lien externe
    window.open('https://maps.google.com', '_blank');
  };

  return (
    <section id="contact" className={`py-20 bg-gradient-to-br from-gray-900 to-slate-800 text-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Phone className="h-8 w-8 text-amber-400 mr-3" />
            <Badge variant="secondary" className="bg-amber-600/20 text-amber-200 border-amber-400/30">
              Contact
            </Badge>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Démarrons Votre Projet
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Contactez-nous dès aujourd&apos;hui pour un devis gratuit et personnalisé
          </p> 
        </div> */}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Nos Coordonnées</h3>
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-amber-400 mr-4" />
                  <div>
                    <p className="text-white font-medium">Adresse</p>
                    <p className="text-gray-300">{contactInfo.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-amber-400 mr-4" />
                  <div>
                    <p className="text-white font-medium">Téléphone</p>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-300 hover:text-amber-400 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-amber-400 mr-4" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-300 hover:text-amber-400 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div 
              className="bg-gray-800 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={scrollToMaps}
            >
              <MapPin className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <p className="text-gray-300">Carte Interactive</p>
              <p className="text-sm text-gray-400 mt-2">
                Cliquez ici pour voir notre emplacement sur Google Maps
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                {socialMedia.map((social, index) => (
                  <Button 
                    key={index}
                    size="sm" 
                    variant="outline" 
                    className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white"
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    {social.icon}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
