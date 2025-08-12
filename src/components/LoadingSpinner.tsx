import React from 'react';
import { Loader } from 'lucide-react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Carregando...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium', 
    large: 'spinner-large'
  };

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <Loader className={`loading-spinner ${sizeClasses[size]}`} />
          <p className="loading-message">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-inline">
      <Loader className={`loading-spinner ${sizeClasses[size]}`} />
      {message && <span className="loading-message">{message}</span>}
    </div>
  );
};

export default LoadingSpinner;
