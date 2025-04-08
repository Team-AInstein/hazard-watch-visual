
import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { motion } from 'framer-motion';

type StatusType = 'success' | 'error' | 'warning' | 'info';

interface StatusMessageProps {
  type: StatusType;
  title: string;
  message: string;
  onClose?: () => void;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  title,
  message,
  onClose,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
        return <Info className="w-5 h-5 text-primary" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'border-l-4 border-success glow glow-success';
      case 'error':
        return 'border-l-4 border-destructive glow';
      case 'warning':
        return 'border-l-4 border-warning glow glow-warning';
      case 'info':
        return 'border-l-4 border-primary glow glow-primary';
      default:
        return 'border-l-4 border-primary glow glow-primary';
    }
  };

  return (
    <motion.div
      className={`glass p-4 rounded-lg ${getTypeClasses()}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex space-x-3">
          <div className="mt-0.5">{getIcon()}</div>
          <div>
            <h4 className="font-medium text-foreground">{title}</h4>
            <p className="text-sm text-foreground/80">{message}</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default StatusMessage;
