import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'Une erreur s\'est produite', 
  onRetry,
  className = '' 
}) => {
  return (
    <Card className={`border-red-200 bg-red-50 ${className}`}>
      <CardContent className="p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Erreur</h3>
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <Button 
            onClick={onRetry} 
            variant="outline" 
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorState;
