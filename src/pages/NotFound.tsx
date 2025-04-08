
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <motion.div 
        className="container mx-auto px-4 py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="glass p-8 md:p-12 rounded-2xl max-w-2xl mx-auto relative overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <div className="absolute inset-0 -z-10 opacity-20 bg-gradient-hero animate-gradient-x blur-xl"></div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-hero animate-gradient-x">
                404
              </div>
              <AlertTriangle className="absolute -top-4 -right-4 h-12 w-12 text-warning animate-pulse-glow" />
            </div>
          </motion.div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-foreground/70 mb-8 max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Please check the URL or navigate back to the home page.
          </p>
          
          <AnimatedButton 
            onClick={() => navigate('/')} 
            className="mx-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
