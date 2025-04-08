
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from '@/components/AnimatedButton';
import StatusMessage from '@/components/StatusMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AlertTriangle, FileImage, Upload, X } from 'lucide-react';

const DashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }>({
    show: false,
    type: 'info',
    title: '',
    message: '',
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.match('image.*')) {
        setStatus({
          show: true,
          type: 'error',
          title: 'Invalid File',
          message: 'Please select an image file (JPEG, PNG, etc.)'
        });
        return;
      }
      
      setSelectedFile(file);
      setResult(null);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDetection = () => {
    if (!selectedFile) {
      setStatus({
        show: true,
        type: 'warning',
        title: 'No Image Selected',
        message: 'Please select an image to analyze.'
      });
      return;
    }
    
    setIsLoading(true);
    setStatus({
      show: true,
      type: 'info',
      title: 'Processing',
      message: 'Analyzing image for potential hazards...'
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResult(preview);
      setStatus({
        show: true,
        type: 'success',
        title: 'Analysis Complete',
        message: 'Hazard detection completed successfully. Fire hazard detected with 78% confidence.'
      });
    }, 3000);
  };

  const closeStatus = () => {
    setStatus((prev) => ({ ...prev, show: false }));
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Detection Dashboard</h1>
          <p className="text-foreground/70">Upload and analyze images for potential hazards.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Panel */}
          <motion.div 
            className="glass rounded-xl overflow-hidden p-6 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-4">Upload Image</h2>
            
            <div className="mb-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  preview ? 'border-primary/50' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                
                {!preview ? (
                  <div className="py-4">
                    <Upload className="mx-auto h-12 w-12 text-foreground/50 mb-2" />
                    <p className="text-foreground/70">Click to upload or drag and drop</p>
                    <p className="text-xs text-foreground/50 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded"
                    />
                    <button 
                      className="absolute top-2 right-2 p-1 rounded-full bg-card/80 text-foreground/70 hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {selectedFile && (
                <p className="mt-2 text-sm text-foreground/70">
                  <FileImage className="inline-block w-4 h-4 mr-1" />
                  {selectedFile.name}
                </p>
              )}
            </div>
            
            <AnimatedButton 
              onClick={handleDetection} 
              disabled={!selectedFile || isLoading}
              isLoading={isLoading}
              loadingText="Analyzing..."
              className="w-full justify-center"
            >
              Run Detection
            </AnimatedButton>
            
            <AnimatePresence>
              {status.show && (
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StatusMessage
                    type={status.type}
                    title={status.title}
                    message={status.message}
                    onClose={closeStatus}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Results Panel */}
          <motion.div 
            className="glass rounded-xl p-6 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">Detection Results</h2>
            
            <div className="bg-card/30 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <LoadingSpinner />
                  <p className="mt-4 text-foreground/70">Processing image...</p>
                </div>
              ) : result ? (
                <div className="relative max-w-full">
                  <img 
                    src={result} 
                    alt="Detection Result" 
                    className="max-h-[400px] mx-auto rounded-lg"
                  />
                  
                  {/* Sample hazard detection overlay */}
                  <div className="absolute inset-0">
                    <div 
                      className="absolute border-2 border-warning rounded-md"
                      style={{ top: '30%', left: '40%', width: '20%', height: '25%' }}
                    >
                      <div className="absolute -top-7 left-0 bg-warning text-warning-foreground text-xs px-2 py-1 rounded">
                        <AlertTriangle className="w-3 h-3 inline-block mr-1" />
                        Fire (78%)
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <FileImage className="mx-auto h-16 w-16 text-foreground/30 mb-2" />
                  <p className="text-foreground/50">Upload an image and run detection to see results</p>
                </div>
              )}
            </div>
            
            {result && (
              <div className="mt-6 p-4 bg-card/30 rounded-lg">
                <h3 className="font-medium mb-2">Detection Summary</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
                    <span className="text-sm">Fire hazard detected (78% confidence)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary/70 mr-2"></div>
                    <span className="text-sm">Smoke detection (45% confidence)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
                    <span className="text-sm">No other hazards detected</span>
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
