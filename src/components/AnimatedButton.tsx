
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'primary' | 'secondary' | 'warning' | 'success';
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'primary',
  isLoading = false,
  loadingText = 'Processing...',
  disabled = false,
}) => {
  const [ripple, setRipple] = useState({ x: 0, y: 0, active: false });
  
  const getColorClasses = () => {
    switch (type) {
      case 'primary':
        return 'bg-primary/80 hover:bg-primary text-white';
      case 'secondary':
        return 'bg-secondary/80 hover:bg-secondary text-white';
      case 'warning':
        return 'bg-warning/80 hover:bg-warning text-warning-foreground';
      case 'success':
        return 'bg-success/80 hover:bg-success text-white';
      default:
        return 'bg-primary/80 hover:bg-primary text-white';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !isLoading && onClick) {
      // Create ripple effect
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setRipple({ x, y, active: true });
      setTimeout(() => setRipple(prev => ({ ...prev, active: false })), 600);
      
      onClick();
    }
  };

  return (
    <motion.button
      className={`relative overflow-hidden backdrop-blur-sm px-6 py-3 rounded-lg font-medium ${getColorClasses()} shadow-lg ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={handleClick}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      disabled={disabled || isLoading}
    >
      {/* Ripple effect */}
      {ripple.active && (
        <span
          className="absolute rounded-full bg-white/30 animate-ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      
      {/* Button content */}
      <div className="flex items-center justify-center space-x-2">
        {isLoading && (
          <div className="flex space-x-1">
            <motion.div 
              className="w-2 h-2 rounded-full bg-current" 
              animate={{ y: [0, -5, 0] }} 
              transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full bg-current" 
              animate={{ y: [0, -5, 0] }} 
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full bg-current" 
              animate={{ y: [0, -5, 0] }} 
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
            />
          </div>
        )}
        <span>{isLoading ? loadingText : children}</span>
      </div>
    </motion.button>
  );
};

export default AnimatedButton;
