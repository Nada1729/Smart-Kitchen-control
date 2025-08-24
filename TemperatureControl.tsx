import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Thermometer, Flame, Plus, Minus } from 'lucide-react';

interface Appliance {
  id: string;
  name: string;
  isOn: boolean;
  currentTemp: number;
  targetTemp: number;
  maxTemp: number;
  icon: React.ReactNode;
}

export function TemperatureControl() {
  const [appliances, setAppliances] = useState<Appliance[]>([
    {
      id: 'oven',
      name: 'Oven',
      isOn: false,
      currentTemp: 75,
      targetTemp: 350,
      maxTemp: 500,
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      id: 'stove',
      name: 'Stove Burner 1',
      isOn: true,
      currentTemp: 212,
      targetTemp: 300,
      maxTemp: 450,
      icon: <Flame className="w-5 h-5" />
    }
  ]);

  const updateAppliance = (id: string, updates: Partial<Appliance>) => {
    setAppliances(prev => prev.map(app => 
      app.id === id ? { ...app, ...updates } : app
    ));
  };

  const adjustTemp = (id: string, delta: number) => {
    const appliance = appliances.find(app => app.id === id);
    if (appliance) {
      const newTemp = Math.max(0, Math.min(appliance.maxTemp, appliance.targetTemp + delta));
      updateAppliance(id, { targetTemp: newTemp });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Thermometer className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Temperature Control</h2>
      </div>

      <div className="space-y-6">
        {appliances.map(appliance => (
          <div key={appliance.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {appliance.icon}
                <span className="font-medium">{appliance.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={appliance.isOn ? "default" : "secondary"}>
                  {appliance.isOn ? "ON" : "OFF"}
                </Badge>
                <Switch 
                  checked={appliance.isOn}
                  onCheckedChange={(checked) => 
                    updateAppliance(appliance.id, { isOn: checked })
                  }
                />
              </div>
            </div>

            {appliance.isOn && (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span>Current: {appliance.currentTemp}°F</span>
                  <span>Target: {appliance.targetTemp}°F</span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTemp(appliance.id, -25)}
                    disabled={appliance.targetTemp <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex-1">
                    <Slider
                      value={[appliance.targetTemp]}
                      onValueChange={([value]) => 
                        updateAppliance(appliance.id, { targetTemp: value })
                      }
                      max={appliance.maxTemp}
                      min={0}
                      step={25}
                      className="w-full"
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTemp(appliance.id, 25)}
                    disabled={appliance.targetTemp >= appliance.maxTemp}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  Range: 0°F - {appliance.maxTemp}°F
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}