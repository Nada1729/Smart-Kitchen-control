import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  Zap, 
  Coffee, 
  Refrigerator, 
  Microwave, 
  UtensilsCrossed,
  Waves
} from 'lucide-react';

interface Appliance {
  id: string;
  name: string;
  isOn: boolean;
  hasIntensity?: boolean;
  intensity?: number;
  status?: string;
  icon: React.ReactNode;
}

export function ApplianceControl() {
  const [appliances, setAppliances] = useState<Appliance[]>([
    {
      id: 'microwave',
      name: 'Microwave',
      isOn: false,
      hasIntensity: true,
      intensity: 80,
      status: 'Ready',
      icon: <Microwave className="w-5 h-5" />
    },
    {
      id: 'coffee',
      name: 'Coffee Maker',
      isOn: true,
      status: 'Brewing',
      icon: <Coffee className="w-5 h-5" />
    },
    {
      id: 'refrigerator',
      name: 'Smart Fridge',
      isOn: true,
      status: '38°F - Normal',
      icon: <Refrigerator className="w-5 h-5" />
    },
    {
      id: 'dishwasher',
      name: 'Dishwasher',
      isOn: false,
      status: 'Clean - Ready',
      icon: <UtensilsCrossed className="w-5 h-5" />
    },
    {
      id: 'garbage-disposal',
      name: 'Garbage Disposal',
      isOn: false,
      hasIntensity: true,
      intensity: 100,
      icon: <Waves className="w-5 h-5" />
    }
  ]);

  const toggleAppliance = (id: string) => {
    setAppliances(prev => prev.map(appliance =>
      appliance.id === id 
        ? { 
            ...appliance, 
            isOn: !appliance.isOn,
            status: !appliance.isOn 
              ? (appliance.id === 'coffee' ? 'Brewing' : 'Running')
              : (appliance.id === 'coffee' ? 'Ready' : 'Off')
          }
        : appliance
    ));
  };

  const updateIntensity = (id: string, intensity: number) => {
    setAppliances(prev => prev.map(appliance =>
      appliance.id === id ? { ...appliance, intensity } : appliance
    ));
  };

  const quickActions = [
    { name: 'Morning Routine', action: () => {
      // Turn on coffee maker and set microwave to ready
      setAppliances(prev => prev.map(app => 
        app.id === 'coffee' ? { ...app, isOn: true, status: 'Brewing' } : app
      ));
    }},
    { name: 'Cleanup Mode', action: () => {
      // Turn on dishwasher and garbage disposal
      setAppliances(prev => prev.map(app => 
        ['dishwasher', 'garbage-disposal'].includes(app.id) 
          ? { ...app, isOn: true, status: 'Running' } 
          : app
      ));
    }},
    { name: 'All Off', action: () => {
      setAppliances(prev => prev.map(app => 
        app.id !== 'refrigerator' 
          ? { ...app, isOn: false, status: app.id === 'coffee' ? 'Ready' : 'Off' }
          : app
      ));
    }}
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Appliance Control</h2>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
        <div className="flex gap-2 flex-wrap">
          {quickActions.map(action => (
            <Button 
              key={action.name}
              variant="outline" 
              size="sm"
              onClick={action.action}
            >
              {action.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Individual Appliances */}
      <div className="space-y-4">
        {appliances.map(appliance => (
          <div key={appliance.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {appliance.icon}
                <div>
                  <span className="font-medium">{appliance.name}</span>
                  <div className="text-sm text-muted-foreground">
                    {appliance.status}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant={appliance.isOn ? "default" : "secondary"}>
                  {appliance.isOn ? "ON" : "OFF"}
                </Badge>
                <Switch
                  checked={appliance.isOn}
                  onCheckedChange={() => toggleAppliance(appliance.id)}
                />
              </div>
            </div>

            {appliance.hasIntensity && appliance.isOn && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Intensity</span>
                  <span>{appliance.intensity}%</span>
                </div>
                <Slider
                  value={[appliance.intensity || 0]}
                  onValueChange={([value]) => updateIntensity(appliance.id, value)}
                  max={100}
                  min={10}
                  step={10}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}