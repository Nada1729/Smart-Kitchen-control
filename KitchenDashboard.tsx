import React, { useState } from 'react';
import { Card } from './ui/card';
import { TemperatureControl } from './TemperatureControl';
import { TimerPanel } from './TimerPanel';
import { ApplianceControl } from './ApplianceControl';
import { RecipeQuickAccess } from './RecipeQuickAccess';
import { SafetyPanel } from './SafetyPanel';
import { EnvironmentControl } from './EnvironmentControl';
import { Badge } from './ui/badge';
import { Clock, Thermometer, ChefHat } from 'lucide-react';

export function KitchenDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Smart Kitchen Control</h1>
          <p className="text-muted-foreground">Manage your kitchen appliances and cooking</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            {currentTime.toLocaleTimeString()}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Kitchen Status: Active
          </Badge>
        </div>
      </div>

      {/* Main Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Temperature & Appliances */}
        <div className="space-y-6">
          <TemperatureControl />
          <ApplianceControl />
        </div>

        {/* Center Column - Timers & Recipe */}
        <div className="space-y-6">
          <TimerPanel />
          <RecipeQuickAccess />
        </div>

        {/* Right Column - Environment & Safety */}
        <div className="space-y-6">
          <EnvironmentControl />
          <SafetyPanel />
        </div>
      </div>
    </div>
  );
}