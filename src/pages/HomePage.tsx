
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import { AlertTriangle, BarChart3, Upload } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const features = [
    {
      title: 'Real-Time Detection',
      icon: <AlertTriangle className="w-12 h-12 text-warning" />,
      description: 'Identify hazards instantly with our advanced AI detection algorithms.'
    },
    {
      title: 'Visual Heatmaps',
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      description: 'Visualize hazard patterns with intuitive heatmaps and historical data.'
    },
    {
      title: 'Easy Integration',
      icon: <Upload className="w-12 h-12 text-success" />,
      description: 'Simple upload interface with API support for seamless integration.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-4 py-16 md:py-24"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="flex flex-col md:flex-row items-center">
          <motion.div className="flex-1 text-center md:text-left" variants={fadeInUp}>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-hero animate-gradient-x"
              variants={fadeInUp}
            >
              Hazard Detection in Real-Time
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl"
              variants={fadeInUp}
            >
              Identify and monitor potential hazards with advanced AI technology. 
              Protect your environment with real-time detection and alerts.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <AnimatedButton 
                onClick={() => navigate('/dashboard')} 
                className="text-lg"
              >
                Start Detection
              </AnimatedButton>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 mt-12 md:mt-0 max-w-xl mx-auto"
            variants={fadeInUp}
          >
            <div className="relative">
              <motion.div 
                className="glass p-8 rounded-2xl"
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              >
                <div className="aspect-video rounded-lg overflow-hidden bg-gradient-detection">
                  <div className="h-full w-full flex items-center justify-center">
                    <motion.p 
                      className="text-lg text-primary/70"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Hazard Detection Preview
                    </motion.p>
                  </div>
                </div>
              </motion.div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-hero opacity-20 blur-xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          variants={fadeInUp}
        >
          Key Features
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass p-6 rounded-xl"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full glass">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-foreground/70 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
