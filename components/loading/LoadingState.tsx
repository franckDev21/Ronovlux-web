import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from './Spinner';

interface LoadingStateProps {
  type?: 'card' | 'grid' | 'inline' | 'full';
  count?: number;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = 'inline', 
  count = 1, 
  className = '' 
}) => {
  if (type === 'full') {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="w-full h-64" />
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <Card className={className}>
        <Skeleton className="w-full h-64" />
        <CardContent className="p-6">
          <Skeleton className="h-6 w-3/4 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // inline
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <Spinner size="md" className="mr-2" />
      <span className="text-gray-600">Chargement...</span>
    </div>
  );
};

export default LoadingState;
