import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Clock, Play, Pause, Square, Plus, Trash2 } from 'lucide-react';

interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  remaining: number; // in seconds
  isRunning: boolean;
  isCompleted: boolean;
}

export function TimerPanel() {
  const [timers, setTimers] = useState<Timer[]>([
    {
      id: '1',
      name: 'Pasta Boiling',
      duration: 8 * 60, // 8 minutes
      remaining: 5 * 60 + 30, // 5:30 remaining
      isRunning: true,
      isCompleted: false
    },
    {
      id: '2',
      name: 'Bread Baking',
      duration: 25 * 60, // 25 minutes
      remaining: 25 * 60,
      isRunning: false,
      isCompleted: false
    }
  ]);

  const [newTimerMinutes, setNewTimerMinutes] = useState('');
  const [newTimerName, setNewTimerName] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => prev.map(timer => {
        if (timer.isRunning && timer.remaining > 0) {
          const newRemaining = timer.remaining - 1;
          return {
            ...timer,
            remaining: newRemaining,
            isCompleted: newRemaining === 0,
            isRunning: newRemaining > 0
          };
        }
        return timer;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = (id: string) => {
    setTimers(prev => prev.map(timer =>
      timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
    ));
  };

  const stopTimer = (id: string) => {
    setTimers(prev => prev.map(timer =>
      timer.id === id ? { ...timer, isRunning: false, remaining: timer.duration } : timer
    ));
  };

  const deleteTimer = (id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  const addTimer = () => {
    if (newTimerMinutes && newTimerName) {
      const duration = parseInt(newTimerMinutes) * 60;
      const newTimer: Timer = {
        id: Date.now().toString(),
        name: newTimerName,
        duration,
        remaining: duration,
        isRunning: false,
        isCompleted: false
      };
      setTimers(prev => [...prev, newTimer]);
      setNewTimerMinutes('');
      setNewTimerName('');
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Kitchen Timers</h2>
      </div>

      {/* Active Timers */}
      <div className="space-y-4 mb-6">
        {timers.map(timer => (
          <div key={timer.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{timer.name}</span>
              <Badge 
                variant={timer.isCompleted ? "destructive" : timer.isRunning ? "default" : "secondary"}
              >
                {timer.isCompleted ? "DONE!" : timer.isRunning ? "RUNNING" : "PAUSED"}
              </Badge>
            </div>

            <div className="text-2xl font-mono text-center py-2">
              {formatTime(timer.remaining)}
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleTimer(timer.id)}
                disabled={timer.isCompleted}
              >
                {timer.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => stopTimer(timer.id)}
              >
                <Square className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteTimer(timer.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Timer */}
      <div className="border-t pt-4 space-y-3">
        <h3 className="font-medium">Add New Timer</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Timer name"
            value={newTimerName}
            onChange={(e) => setNewTimerName(e.target.value)}
          />
          <Input
            placeholder="Minutes"
            type="number"
            min="1"
            value={newTimerMinutes}
            onChange={(e) => setNewTimerMinutes(e.target.value)}
            className="w-20"
          />
          <Button onClick={addTimer} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}