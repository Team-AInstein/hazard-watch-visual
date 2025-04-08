
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '@/components/AnimatedButton';
import StatusMessage from '@/components/StatusMessage';
import { BarChart3, Calendar, Filter } from 'lucide-react';
import h337 from 'heatmap.js';

const HeatmapPage = () => {
  const [dateRange, setDateRange] = useState('week');
  const [showStatus, setShowStatus] = useState(false);
  const heatmapRef = useRef<HTMLDivElement>(null);
  const heatmapInstance = useRef<any>(null);
  
  // Sample data for heatmap visualization
  const generateHeatmapData = (range: string) => {
    let points = [];
    const width = heatmapRef.current?.clientWidth || 600;
    const height = heatmapRef.current?.clientHeight || 400;
    
    // Number of points based on date range
    const pointCount = range === 'day' ? 10 : range === 'week' ? 30 : 80;
    
    // Generate random points with concentration in certain areas
    for (let i = 0; i < pointCount; i++) {
      let x, y, value;
      
      // Create clusters of points for visual interest
      if (i < pointCount * 0.6) {
        // Major cluster
        x = width * (0.3 + 0.4 * Math.random());
        y = height * (0.2 + 0.3 * Math.random());
        value = 40 + Math.random() * 60; // Higher values
      } else {
        // Random distribution
        x = width * Math.random();
        y = height * Math.random();
        value = 10 + Math.random() * 30; // Lower values
      }
      
      points.push({ x, y, value });
    }
    
    return {
      max: 100,
      min: 0,
      data: points
    };
  };
  
  const initHeatmap = () => {
    if (heatmapRef.current && !heatmapInstance.current) {
      heatmapInstance.current = h337.create({
        container: heatmapRef.current,
        radius: 25,
        maxOpacity: 0.8,
        minOpacity: 0.3,
        blur: 0.9,
        gradient: {
          0.0: "rgb(0,0,255)",
          0.25: "rgb(0,255,255)",
          0.5: "rgb(0,255,0)",
          0.75: "rgb(255,255,0)",
          1.0: "rgb(255,0,0)"
        }
      });
    }
  };
  
  const updateHeatmap = (range: string) => {
    if (heatmapInstance.current) {
      heatmapInstance.current.setData(generateHeatmapData(range));
    }
  };
  
  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    updateHeatmap(range);
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };
  
  useEffect(() => {
    initHeatmap();
    updateHeatmap(dateRange);
    
    const handleResize = () => {
      if (heatmapInstance.current) {
        updateHeatmap(dateRange);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Hazard Heatmap</h1>
          <p className="text-foreground/70">Visualize detected hazards over time and location.</p>
        </div>
        
        <div className="glass rounded-xl overflow-hidden p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center mb-4 md:mb-0">
              <BarChart3 className="mr-2 h-5 w-5" />
              Hazard Detection Heatmap
            </h2>
            
            <div className="flex flex-wrap gap-2">
              <AnimatedButton
                onClick={() => handleDateRangeChange('day')}
                type={dateRange === 'day' ? 'primary' : 'secondary'}
                className="text-sm py-2"
              >
                <Calendar className="mr-1 h-4 w-4" />
                24 Hours
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleDateRangeChange('week')}
                type={dateRange === 'week' ? 'primary' : 'secondary'}
                className="text-sm py-2"
              >
                <Calendar className="mr-1 h-4 w-4" />
                7 Days
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleDateRangeChange('month')}
                type={dateRange === 'month' ? 'primary' : 'secondary'}
                className="text-sm py-2"
              >
                <Calendar className="mr-1 h-4 w-4" />
                30 Days
              </AnimatedButton>
              <AnimatedButton
                onClick={() => {}}
                type="secondary"
                className="text-sm py-2"
              >
                <Filter className="mr-1 h-4 w-4" />
                Filter
              </AnimatedButton>
            </div>
          </div>
          
          {showStatus && (
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <StatusMessage
                type="info"
                title="Heatmap Updated"
                message={`Showing hazard data for the last ${dateRange === 'day' ? '24 hours' : dateRange === 'week' ? '7 days' : '30 days'}.`}
                onClose={() => setShowStatus(false)}
              />
            </motion.div>
          )}
          
          <div className="bg-card/30 rounded-lg overflow-hidden">
            <div
              ref={heatmapRef}
              className="w-full h-[500px] relative"
            ></div>
          </div>
          
          <div className="mt-4 flex items-center justify-between bg-card/30 p-3 rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium">Intensity Scale</p>
            </div>
            <div className="w-1/2">
              <div className="h-4 rounded bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500"></div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-foreground/70">Low</span>
                <span className="text-xs text-foreground/70">Medium</span>
                <span className="text-xs text-foreground/70">High</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-5">
            <h3 className="text-lg font-medium mb-2">Highest Risk Areas</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>North-East Corner</span>
                <span className="font-medium text-warning">87%</span>
              </li>
              <li className="flex justify-between">
                <span>Central Processing</span>
                <span className="font-medium text-warning">73%</span>
              </li>
              <li className="flex justify-between">
                <span>Storage Area B</span>
                <span className="font-medium text-primary">61%</span>
              </li>
            </ul>
          </div>
          
          <div className="glass rounded-xl p-5">
            <h3 className="text-lg font-medium mb-2">Detection Frequency</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Fire Hazards</span>
                  <span className="text-sm">64%</span>
                </div>
                <div className="w-full bg-card/50 rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Smoke Detection</span>
                  <span className="text-sm">42%</span>
                </div>
                <div className="w-full bg-card/50 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Other Hazards</span>
                  <span className="text-sm">17%</span>
                </div>
                <div className="w-full bg-card/50 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-xl p-5">
            <h3 className="text-lg font-medium mb-2">Safety Analysis</h3>
            <p className="text-sm text-foreground/70 mb-3">
              Based on detection patterns over the selected time period.
            </p>
            <div className="p-3 bg-card/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Overall Risk Level</span>
                <span className="px-2 py-1 rounded bg-warning/20 text-warning font-medium text-sm">
                  Medium-High
                </span>
              </div>
              <p className="text-sm mt-2 text-foreground/70">
                Recommended to increase monitoring in high-risk areas and 
                review safety protocols.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapPage;
