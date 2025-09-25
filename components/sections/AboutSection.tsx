'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Award, Check } from 'lucide-react';

interface AboutSectionProps {
  className?: string;
  backgroundImage?: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface AboutData {
  title: string;
  description: string;
  stats: StatItem[];
  commitment: {
    title: string;
    description: string;
  };
}

const aboutData: AboutData = {
  title: "L'Excellence au Service de Votre Habitat",
  description: "Depuis notre création, <strong>Ronovlux Group Sarl</strong> s&apos;est imposée comme la référence en matière de rénovation haut de gamme. Nous combinons savoir-faire traditionnel et technologies modernes pour créer des espaces d&apos;exception qui reflètent votre style de vie.",
  stats: [
    { value: "500+", label: "Projets Réalisés" },
    { value: "15+", label: "Années d&apos;Expérience" }
  ],
  commitment: {
    title: "Notre Engagement Qualité",
    description: "Matériaux premium, artisans certifiés et garantie étendue sur tous nos travaux."
  }
};

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  className = '',
  backgroundImage = "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg"
}) => {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            {/* Badge */}
            <div className="flex items-center mb-6">
              <Award className="h-8 w-8 text-amber-600 mr-3" />
              <Badge variant="outline" className="border-amber-600 text-amber-700">À Propos</Badge>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {aboutData.title}
            </h2>

            {/* Description */}
            <p 
              className="text-lg text-gray-600 mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData.description }}
            />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {aboutData.stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Commitment */}
            <div className="flex items-start space-x-4">
              <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {aboutData.commitment.title}
                </h4>
                <p className="text-gray-600">
                  {aboutData.commitment.description}
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-2xl transform rotate-3"></div>
            <img 
              src={backgroundImage} 
              alt="Réalisation Ronovlux" 
              className="rounded-2xl shadow-2xl relative z-10 w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
