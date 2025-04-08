
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from '@/components/AnimatedButton';
import StatusMessage from '@/components/StatusMessage';
import { AlertTriangle, Bell, BellRing, Clock, ExternalLink, Eye, Filter, Info } from 'lucide-react';

// Sample alert data
const sampleAlerts = [
  {
    id: 1,
    type: 'fire',
    confidence: 92,
    location: 'Zone A - Processing Unit',
    timestamp: '2025-04-08T10:45:32',
    status: 'critical',
    thumbnail: 'https://images.unsplash.com/photo-1519811786498-97e3ffd0ad89?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    type: 'smoke',
    confidence: 78,
    location: 'Zone C - Storage Area',
    timestamp: '2025-04-08T09:22:15',
    status: 'warning',
    thumbnail: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    type: 'fire',
    confidence: 85,
    location: 'Zone B - Equipment Room',
    timestamp: '2025-04-07T16:18:43',
    status: 'critical',
    thumbnail: 'https://images.unsplash.com/photo-1486591267513-8283070135ca?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 4,
    type: 'smoke',
    confidence: 65,
    location: 'Zone D - Office Area',
    timestamp: '2025-04-07T08:37:21',
    status: 'warning',
    thumbnail: 'https://images.unsplash.com/photo-1478641300939-0ec5188d3802?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 5,
    type: 'fire',
    confidence: 73,
    location: 'Zone A - Exterior',
    timestamp: '2025-04-06T14:12:58',
    status: 'critical',
    thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1000&auto=format&fit=crop'
  }
];

const AlertsPage = () => {
  const [filter, setFilter] = useState('all');
  const [testAlertSent, setTestAlertSent] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const sendTestAlert = () => {
    setTestAlertSent(true);
    setTimeout(() => setTestAlertSent(false), 5000);
  };
  
  const filteredAlerts = filter === 'all' 
    ? sampleAlerts 
    : sampleAlerts.filter(alert => alert.type === filter);

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Hazard Alerts</h1>
          <p className="text-foreground/70">View and manage hazard detection alerts.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="glass rounded-xl overflow-hidden p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-bold flex items-center mb-4 md:mb-0">
                  <BellRing className="mr-2 h-5 w-5 text-warning" />
                  Recent Alerts
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  <AnimatedButton
                    onClick={() => setFilter('all')}
                    type={filter === 'all' ? 'primary' : 'secondary'}
                    className="text-sm py-2"
                  >
                    All Alerts
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => setFilter('fire')}
                    type={filter === 'fire' ? 'warning' : 'secondary'}
                    className="text-sm py-2"
                  >
                    Fire Alerts
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => setFilter('smoke')}
                    type={filter === 'smoke' ? 'primary' : 'secondary'}
                    className="text-sm py-2"
                  >
                    Smoke Alerts
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => {}}
                    type="secondary"
                    className="text-sm py-2"
                  >
                    <Filter className="h-4 w-4" />
                  </AnimatedButton>
                </div>
              </div>
              
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-12 bg-card/30 rounded-lg">
                  <Bell className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
                  <p className="text-foreground/50">No alerts found with the current filter</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <motion.div 
                      key={alert.id}
                      className={`p-4 rounded-lg glass ${
                        selectedAlert === alert.id ? 'border border-primary' : ''
                      } ${
                        alert.status === 'critical' 
                          ? 'glow glow-warning' 
                          : alert.status === 'warning' 
                            ? 'glow glow-primary' 
                            : ''
                      }`}
                      layoutId={`alert-${alert.id}`}
                      onClick={() => setSelectedAlert(alert.id === selectedAlert ? null : alert.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-20 h-20 mb-4 md:mb-0 md:mr-4 flex-shrink-0">
                          <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <img 
                              src={alert.thumbnail} 
                              alt={`Alert ${alert.id}`} 
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-1 right-1">
                              <Eye className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-start justify-between mb-2">
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                                alert.type === 'fire' 
                                  ? 'bg-warning/20 text-warning' 
                                  : 'bg-primary/20 text-primary'
                              }`}>
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                              </span>
                              <span className="ml-2 text-sm text-foreground/70">
                                {alert.confidence}% confidence
                              </span>
                            </div>
                            <span className="text-xs text-foreground/60 flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {formatDate(alert.timestamp)}
                            </span>
                          </div>
                          <p className="font-medium">{alert.location}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              alert.status === 'critical' 
                                ? 'bg-destructive/20 text-destructive animate-pulse-glow' 
                                : 'bg-warning/20 text-warning'
                            }`}>
                              {alert.status.toUpperCase()}
                            </span>
                            <button className="text-primary/80 hover:text-primary text-xs flex items-center">
                              View Details
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {selectedAlert === alert.id && (
                          <motion.div 
                            className="mt-4 pt-4 border-t border-border"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <h4 className="font-medium mb-2">Alert Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="bg-card/30 p-3 rounded-lg">
                                <p className="font-medium mb-1">Detection Information</p>
                                <ul className="space-y-1 text-foreground/70">
                                  <li>Type: {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}</li>
                                  <li>Confidence: {alert.confidence}%</li>
                                  <li>Classification: {alert.status.toUpperCase()}</li>
                                </ul>
                              </div>
                              <div className="bg-card/30 p-3 rounded-lg">
                                <p className="font-medium mb-1">Location & Time</p>
                                <ul className="space-y-1 text-foreground/70">
                                  <li>Location: {alert.location}</li>
                                  <li>Detected: {formatDate(alert.timestamp)}</li>
                                  <li>Camera ID: CAM-{100 + alert.id}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-3">
                              <AnimatedButton
                                type="primary"
                                className="text-xs py-1.5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log("Acknowledge alert", alert.id);
                                }}
                              >
                                Acknowledge
                              </AnimatedButton>
                              <AnimatedButton
                                type="warning"
                                className="text-xs py-1.5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log("Escalate alert", alert.id);
                                }}
                              >
                                Escalate
                              </AnimatedButton>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Alert Summary</h3>
              <div className="space-y-4">
                <div className="bg-card/30 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Alerts</span>
                    <span className="font-medium">{sampleAlerts.length}</span>
                  </div>
                </div>
                <div className="bg-card/30 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Critical Alerts</span>
                    <span className="font-medium text-destructive">{sampleAlerts.filter(a => a.status === 'critical').length}</span>
                  </div>
                </div>
                <div className="bg-card/30 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Warning Alerts</span>
                    <span className="font-medium text-warning">{sampleAlerts.filter(a => a.status === 'warning').length}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Test Notifications</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Send a test alert to verify that your notification system is working properly.
              </p>
              <AnimatedButton
                type="warning"
                className="w-full justify-center"
                onClick={sendTestAlert}
              >
                <Bell className="mr-2 h-4 w-4" />
                Send Test Alert
              </AnimatedButton>
              
              <AnimatePresence>
                {testAlertSent && (
                  <motion.div 
                    className="mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <StatusMessage
                      type="success"
                      title="Test Alert Sent"
                      message="A test alert has been successfully sent to all connected notification endpoints."
                      onClose={() => setTestAlertSent(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="glass rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Info className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-bold">Alert Info</h3>
              </div>
              <div className="p-3 bg-card/30 rounded-lg text-sm">
                <p className="mb-2">
                  Alerts are generated automatically when hazards are detected with high confidence.
                </p>
                <p className="text-foreground/70">
                  Configure notification settings and thresholds in the system settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
