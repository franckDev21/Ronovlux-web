'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Wrench, ArrowRight } from 'lucide-react';
import { useActiveServices } from '@/hooks/useServices';
import { LoadingState } from '@/components/loading/LoadingState';
import { ErrorState } from '@/components/error/ErrorState';
import { formatServiceForDisplay } from '@/lib/api/services';

interface ServicesSectionProps {
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ className = '' }) => {
  const [activeService, setActiveService] = useState(0);
  const { services, loading, error, refetch } = useActiveServices();

  if (loading) {
    return <LoadingState type="grid" count={4} className={className} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} className={className} />;
  }

  if (!services.length) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <p className="text-gray-600">Aucun service disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <section className={className}>
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Wrench className="h-8 w-8 text-amber-600 mr-3" />
          <Badge variant="outline" className="border-amber-600 text-amber-700">Nos Services</Badge>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Des Services d&apos;Exception
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez notre gamme complète de services premium pour transformer vos espaces
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {services.map((service, index) => {
          const displayService = formatServiceForDisplay(service);
          
          return (
            <Card 
              key={service.id}
              className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                activeService === index ? 'ring-2 ring-amber-500 shadow-2xl' : ''
              }`}
              onClick={() => setActiveService(index)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={displayService.image} 
                  alt={displayService.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{displayService.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{displayService.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {displayService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <Star className="h-4 w-4 text-amber-500 mr-2 fill-current" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full">
          Voir Tous Nos Services
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default ServicesSection;
