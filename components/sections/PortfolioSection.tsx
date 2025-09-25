'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Users, Calendar, Eye } from 'lucide-react';
import { useFeaturedPortfolio } from '@/hooks/usePortfolio';
import { LoadingState } from '@/components/loading/LoadingState';
import { ErrorState } from '@/components/error/ErrorState';
import { formatPortfolioForDisplay } from '@/lib/api/services';
import Image from 'next/image';

interface PortfolioSectionProps {
  className?: string;
  limit?: number;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ 
  className = '',
  limit = 6 
}) => {
  const { portfolio, loading, error, refetch } = useFeaturedPortfolio(limit);

  if (loading) {
    return <LoadingState type="grid" count={limit} className={className} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} className={className} />;
  }

  if (!portfolio.length) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <p className="text-gray-600">Aucune réalisation disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-8 w-8 text-amber-600 mr-3" />
            <Badge variant="outline" className="border-amber-600 text-amber-700">Portfolio</Badge>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Nos Plus Belles Réalisations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez quelques-uns de nos projets les plus prestigieux qui témoignent de notre savoir-faire exceptionnel
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolio.map((project) => {
            const displayProject = formatPortfolioForDisplay(project);
            
            return (
              <div 
                key={project.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <Image 
                    src={displayProject.image} 
                    alt={displayProject.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Overlay Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-600 text-white shadow-lg">
                      {displayProject.category}
                    </Badge>
                  </div>

                  {/* View Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Eye className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {displayProject.title}
                  </h3>
                  
                  {project.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{project.year || '2024'}</span>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors duration-200"
                    >
                      Voir détails
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à Réaliser Votre Projet ?
            </h3>
            <p className="text-gray-600 mb-6">
              Découvrez notre portfolio complet et laissez-vous inspirer par nos créations d&apos;exception
            </p>
            <Button 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="mr-2 h-5 w-5" />
              Voir Tous Nos Projets
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;