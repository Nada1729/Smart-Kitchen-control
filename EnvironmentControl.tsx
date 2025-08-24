import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { 
  Lightbulb, 
  Wind, 
  Volume2, 
  Thermometer,
  Sun,
  Moon
} from 'lucide-react';

interface EnvironmentState {
  lighting: {
    isOn: boolean;
    brightness: number;
    mode: 'bright' | 'ambient' | 'task';
  };
  ventilation: {
    isOn: boolean;
    speed: number;
  };
  ambientSound: {
    isOn: boolean;
    volume: number;
    type: 'nature' | 'classical' | 'none';
  };
  temperature: number;
}

export function EnvironmentControl() {
  const [environment, setEnvironment] = useState<EnvironmentState>({
    lighting: {
      isOn: true,
      brightness: 80,
      mode: 'bright'
    },
    ventilation: {
      isOn: false,
      speed: 3
    },
    ambientSound: {
      isOn: false,
      volume: 40,
      type: 'none'
    },
    temperature: 72
  });

  const updateLighting = (updates: Partial<typeof environment.lighting>) => {
    setEnvironment(prev => ({
      ...prev,
      lighting: { ...prev.lighting, ...updates }
    }));
  };

  const updateVentilation = (updates: Partial<typeof environment.ventilation>) => {
    setEnvironment(prev => ({
      ...prev,
      ventilation: { ...prev.ventilation, ...updates }
    }));
  };

  const updateAmbientSound = (updates: Partial<typeof environment.ambientSound>) => {
    setEnvironment(prev => ({
      ...prev,
      ambientSound: { ...prev.ambientSound, ...updates }
    }));
  };

  const lightingModes = [
    { key: 'bright', label: 'Bright Cooking', icon: <Sun className="w-4 h-4" /> },
    { key: 'ambient', label: 'Ambient Dining', icon: <Lightbulb className="w-4 h-4" /> },
    { key: 'task', label: 'Task Focused', icon: <Moon className="w-4 h-4" /> }
  ];

  const soundTypes = [
    { key: 'none', label: 'None' },
    { key: 'nature', label: 'Nature Sounds' },
    { key: 'classical', label: 'Classical Music' }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Environment</h2>
      </div>

      {/* Temperature Display */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <Thermometer className="w-5 h-5 text-muted-foreground" />
          <span className="text-2xl font-semibold">{environment.temperature}°F</span>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-1">Kitchen Temperature</p>
      </div>

      {/* Lighting Control */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            <span className="font-medium">Lighting</span>
          </div>
          <Switch
            checked={environment.lighting.isOn}
            onCheckedChange={(checked) => updateLighting({ isOn: checked })}
          />
        </div>

        {environment.lighting.isOn && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {lightingModes.map(mode => (
                <Button
                  key={mode.key}
                  variant={environment.lighting.mode === mode.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateLighting({ mode: mode.key as any })}
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  {mode.icon}
                  <span className="text-xs">{mode.label}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Brightness</span>
                <span>{environment.lighting.brightness}%</span>
              </div>
              <Slider
                value={[environment.lighting.brightness]}
                onValueChange={([value]) => updateLighting({ brightness: value })}
                max={100}
                min={10}
                step={10}
              />
            </div>
          </>
        )}
      </div>

      {/* Ventilation Control */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            <span className="font-medium">Exhaust Fan</span>
          </div>
          <Switch
            checked={environment.ventilation.isOn}
            onCheckedChange={(checked) => updateVentilation({ isOn: checked })}
          />
        </div>

        {environment.ventilation.isOn && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fan Speed</span>
              <span>Level {environment.ventilation.speed}</span>
            </div>
            <Slider
              value={[environment.ventilation.speed]}
              onValueChange={([value]) => updateVentilation({ speed: value })}
              max={5}
              min={1}
              step={1}
            />
          </div>
        )}
      </div>

      {/* Ambient Sound */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            <span className="font-medium">Ambient Sound</span>
          </div>
          <Switch
            checked={environment.ambientSound.isOn}
            onCheckedChange={(checked) => updateAmbientSound({ isOn: checked })}
          />
        </div>

        {environment.ambientSound.isOn && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {soundTypes.map(sound => (
                <Button
                  key={sound.key}
                  variant={environment.ambientSound.type === sound.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateAmbientSound({ type: sound.key as any })}
                >
                  {sound.label}
                </Button>
              ))}
            </div>

            {environment.ambientSound.type !== 'none' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Volume</span>
                  <span>{environment.ambientSound.volume}%</span>
                </div>
                <Slider
                  value={[environment.ambientSound.volume]}
                  onValueChange={([value]) => updateAmbientSound({ volume: value })}
                  max={100}
                  min={0}
                  step={10}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}