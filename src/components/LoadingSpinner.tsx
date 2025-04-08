
import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-16 h-16';
      case 'md':
        return 'w-24 h-24';
      case 'lg':
        return 'w-32 h-32';
      default:
        return 'w-24 h-24';
    }
  };

  return (
    <div className={`relative ${getSizeClasses()} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              className={`absolute rounded-full border-4 border-transparent border-t-primary`}
              style={{
                width: `${100 - index * 15}%`,
                height: `${100 - index * 15}%`,
                top: `${index * 7.5}%`,
                left: `${index * 7.5}%`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.1,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-2/5 h-2/5 bg-primary rounded-full opacity-70"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
