import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Flame, 
  Droplets, 
  Power,
  CheckCircle,
  Phone
} from 'lucide-react';

interface SafetyState {
  smokeDetector: 'normal' | 'warning' | 'alarm';
  gasDetector: 'normal' | 'warning' | 'alarm';
  waterLeakDetector: 'normal' | 'detected';
  fireExtinguisher: 'ready' | 'used' | 'maintenance';
  emergencyShutoff: boolean;
  lastSafetyCheck: string;
}

export function SafetyPanel() {
  const [safetyState, setSafetyState] = useState<SafetyState>({
    smokeDetector: 'normal',
    gasDetector: 'normal',
    waterLeakDetector: 'normal',
    fireExtinguisher: 'ready',
    emergencyShutoff: false,
    lastSafetyCheck: '2 hours ago'
  });

  const [emergencyContacts] = useState([
    { name: 'Fire Department', number: '911' },
    { name: 'Gas Company', number: '1-800-GAS-LEAK' },
    { name: 'Maintenance', number: '555-0123' }
  ]);

  const emergencyShutoff = () => {
    setSafetyState(prev => ({ ...prev, emergencyShutoff: true }));
    // In a real system, this would shut off gas, electricity, and water
    alert('Emergency shutoff activated! All gas, electricity, and water have been shut off.');
  };

  const resetShutoff = () => {
    setSafetyState(prev => ({ ...prev, emergencyShutoff: false }));
  };

  const runSafetyCheck = () => {
    setSafetyState(prev => ({ 
      ...prev, 
      lastSafetyCheck: 'Just now',
      smokeDetector: 'normal',
      gasDetector: 'normal',
      waterLeakDetector: 'normal'
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'detected':
        return 'bg-yellow-100 text-yellow-800';
      case 'alarm':
      case 'used':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (type: string, status: string) => {
    if (status === 'normal' || status === 'ready') {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    
    switch (type) {
      case 'smoke':
        return <Flame className="w-4 h-4 text-red-600" />;
      case 'gas':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'water':
        return <Droplets className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const hasActiveAlerts = safetyState.smokeDetector !== 'normal' || 
                          safetyState.gasDetector !== 'normal' || 
                          safetyState.waterLeakDetector !== 'normal' ||
                          safetyState.emergencyShutoff;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Safety Monitor</h2>
      </div>

      {/* Emergency Alert */}
      {hasActiveAlerts && (
        <Alert className="mb-4 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {safetyState.emergencyShutoff 
              ? 'Emergency shutoff is active. Kitchen utilities are disabled.'
              : 'Safety alert detected. Check status indicators below.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Safety Status Indicators */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon('smoke', safetyState.smokeDetector)}
            <span>Smoke Detector</span>
          </div>
          <Badge className={getStatusColor(safetyState.smokeDetector)}>
            {safetyState.smokeDetector.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon('gas', safetyState.gasDetector)}
            <span>Gas Detector</span>
          </div>
          <Badge className={getStatusColor(safetyState.gasDetector)}>
            {safetyState.gasDetector.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon('water', safetyState.waterLeakDetector)}
            <span>Water Leak Detector</span>
          </div>
          <Badge className={getStatusColor(safetyState.waterLeakDetector)}>
            {safetyState.waterLeakDetector.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Fire Extinguisher</span>
          </div>
          <Badge className={getStatusColor(safetyState.fireExtinguisher)}>
            {safetyState.fireExtinguisher.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Emergency Controls */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium">Emergency Controls</h3>
        
        {!safetyState.emergencyShutoff ? (
          <Button 
            variant="destructive" 
            onClick={emergencyShutoff}
            className="w-full"
          >
            <Power className="w-4 h-4 mr-2" />
            Emergency Shutoff
          </Button>
        ) : (
          <Button 
            variant="outline"
            onClick={resetShutoff}
            className="w-full"
          >
            Reset Emergency Shutoff
          </Button>
        )}

        <Button 
          variant="outline"
          onClick={runSafetyCheck}
          className="w-full"
        >
          Run Safety Check
        </Button>
      </div>

      {/* Emergency Contacts */}
      <div className="space-y-3">
        <h3 className="font-medium">Emergency Contacts</h3>
        {emergencyContacts.map(contact => (
          <div key={contact.name} className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">{contact.name}</span>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              {contact.number}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        Last safety check: {safetyState.lastSafetyCheck}
      </div>
    </Card>
  );
}