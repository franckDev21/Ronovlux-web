'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Users } from 'lucide-react';
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
    <section className={className}>
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Crown className="h-8 w-8 text-amber-600 mr-3" />
          <Badge variant="outline" className="border-amber-600 text-amber-700">Portfolio</Badge>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Nos Plus Belles Réalisations
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez quelques-uns de nos projets les plus prestigieux
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((project) => {
          const displayProject = formatPortfolioForDisplay(project);
          
          return (
            <div key={project.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <Image 
                src={displayProject.image} 
                alt={displayProject.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Badge className="bg-amber-600 text-white mb-2">{displayProject.category}</Badge>
                <h3 className="text-lg font-semibold">{displayProject.title}</h3>
                {project.year && (
                  <p className="text-sm text-gray-300 mt-1">{project.year}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full">
          <Users className="mr-2 h-5 w-5" />
          Voir Tous Nos Projets
        </Button>
      </div>
    </section>
  );
};

export default PortfolioSection;
