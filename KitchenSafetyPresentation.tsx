import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Cpu,
  Smartphone,
  Users,
  CheckCircle,
  Flame,
  Wind,
  Thermometer,
  Zap,
  Database,
  Wifi,
  Bell
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
}

export function KitchenSafetyPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    // Slide 1: Project Overview
    {
      id: 1,
      title: "Smart Kitchen Safety System",
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-[var(--lime-400)] to-[var(--lime-600)] rounded-full flex items-center justify-center">
              <Shield className="w-12 h-12 text-white" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-[var(--lime-600)] to-[var(--lime-800)] bg-clip-text text-transparent">
                Smart Kitchen Safety
              </h1>
              <h2 className="text-3xl text-gray-600">IoT Monitoring System</h2>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[var(--lime-100)] rounded-lg flex items-center justify-center mx-auto">
                  <Flame className="w-8 h-8 text-[var(--lime-600)]" />
                </div>
                <p className="text-lg font-medium">Real-time Detection</p>
                <p className="text-sm text-gray-500">Gas, Fire & Temperature</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[var(--lime-100)] rounded-lg flex items-center justify-center mx-auto">
                  <Smartphone className="w-8 h-8 text-[var(--lime-600)]" />
                </div>
                <p className="text-lg font-medium">Mobile Monitoring</p>
                <p className="text-sm text-gray-500">Real-time Alerts & Control</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[var(--lime-100)] rounded-lg flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-[var(--lime-600)]" />
                </div>
                <p className="text-lg font-medium">Auto Response</p>
                <p className="text-sm text-gray-500">Emergency Shutdown</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 2: Hardware Setup
    {
      id: 2,
      title: "Hardware Architecture",
      content: (
        <div className="h-full p-8">
          <div className="grid grid-cols-2 gap-12 h-full">
            {/* Left: ESP32 Board */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[var(--lime-700)]">ESP32 Control Board</h2>
              
              <Card className="p-6 border-2 border-[var(--lime-200)] bg-[var(--lime-50)]">
                <div className="text-center space-y-4">
                  <Cpu className="w-16 h-16 text-[var(--lime-600)] mx-auto" />
                  <h3 className="text-2xl font-semibold">ESP32 DevKit</h3>
                  <p className="text-gray-600">Main microcontroller with WiFi capability</p>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center border border-[var(--lime-300)]">
                  <Wind className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold">MQ2 Gas Sensor</h4>
                  <p className="text-sm text-gray-500">Pin 34 (Analog)</p>
                </Card>
                
                <Card className="p-4 text-center border border-[var(--lime-300)]">
                  <Thermometer className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <h4 className="font-semibold">DHT11</h4>
                  <p className="text-sm text-gray-500">Pin 15 (Digital)</p>
                </Card>
                
                <Card className="p-4 text-center border border-[var(--lime-300)]">
                  <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Flame Sensor</h4>
                  <p className="text-sm text-gray-500">Pin 35 (Analog)</p>
                </Card>
                
                <Card className="p-4 text-center border border-[var(--lime-300)]">
                  <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Servo Motor</h4>
                  <p className="text-sm text-gray-500">Pin 14 (PWM)</p>
                </Card>
              </div>
            </div>

            {/* Right: System Flow */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[var(--lime-700)]">System Flow</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white border-2 border-[var(--lime-300)] rounded-lg">
                  <div className="w-8 h-8 bg-[var(--lime-500)] rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <p className="font-semibold">Sensor Data Collection</p>
                    <p className="text-sm text-gray-500">Gas: &gt;2000 | Flame: &gt;2000 | Temp: &gt;40°C</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white border-2 border-[var(--lime-300)] rounded-lg">
                  <div className="w-8 h-8 bg-[var(--lime-500)] rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <p className="font-semibold">Danger Detection Logic</p>
                    <p className="text-sm text-gray-500">Real-time threshold monitoring</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white border-2 border-[var(--lime-300)] rounded-lg">
                  <div className="w-8 h-8 bg-[var(--lime-500)] rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <p className="font-semibold">Emergency Response</p>
                    <p className="text-sm text-gray-500">LED Alert + Buzzer + Servo Control</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white border-2 border-[var(--lime-300)] rounded-lg">
                  <div className="w-8 h-8 bg-[var(--lime-500)] rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <p className="font-semibold">LCD Display & Logging</p>
                    <p className="text-sm text-gray-500">Real-time status + Serial monitoring</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <h4 className="font-bold text-red-700 mb-2">🚨 Emergency Thresholds</h4>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• Gas Level: &gt; 2000 units</li>
                  <li>• Flame Detection: &gt; 2000 units</li>
                  <li>• Temperature: &gt; 40°C</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 3: Software Architecture
    {
      id: 3,
      title: "Software & Cloud Architecture",
      content: (
        <div className="h-full p-8">
          <h2 className="text-4xl font-bold text-[var(--lime-700)] text-center mb-12">Full Stack Architecture</h2>
          
          <div className="grid grid-cols-3 gap-8 h-full">
            {/* Frontend */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-[var(--lime-300)] bg-gradient-to-b from-[var(--lime-50)] to-white">
                <div className="text-center space-y-4">
                  <Smartphone className="w-12 h-12 text-[var(--lime-600)] mx-auto" />
                  <h3 className="text-2xl font-semibold">Mobile App</h3>
                  <Badge className="bg-[var(--lime-100)] text-[var(--lime-800)]">React + TypeScript</Badge>
                </div>
              </Card>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white border border-[var(--lime-200)] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[var(--lime-600)]" />
                  <span className="text-sm">User Authentication</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-[var(--lime-200)] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[var(--lime-600)]" />
                  <span className="text-sm">Real-time Dashboard</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-[var(--lime-200)] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[var(--lime-600)]" />
                  <span className="text-sm">Sensor Management</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-[var(--lime-200)] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[var(--lime-600)]" />
                  <span className="text-sm">Alert Configuration</span>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-[var(--lime-300)] bg-gradient-to-b from-[var(--lime-50)] to-white">
                <div className="text-center space-y-4">
                  <Database className="w-12 h-12 text-[var(--lime-600)] mx-auto" />
                  <h3 className="text-2xl font-semibold">Backend API</h3>
                  <Badge className="bg-[var(--lime-100)] text-[var(--lime-800)]">Supabase</Badge>
                </div>
              </Card>

              <div className="space-y-4">
                <h4 className="font-semibold text-[var(--lime-700)]">Database Tables:</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-white border border-[var(--lime-200)] rounded-lg">
                    <h5 className="font-medium">users</h5>
                    <p className="text-xs text-gray-500">id, email, username, created_at</p>
                  </div>
                  <div className="p-3 bg-white border border-[var(--lime-200)] rounded-lg">
                    <h5 className="font-medium">user_sensors</h5>
                    <p className="text-xs text-gray-500">id, user_id, sensor_type, created_at</p>
                  </div>
                  <div className="p-3 bg-white border border-[var(--lime-200)] rounded-lg">
                    <h5 className="font-medium">sensor_logs</h5>
                    <p className="text-xs text-gray-500">id, user_id, value, status, created_at</p>
                  </div>
                  <div className="p-3 bg-white border border-[var(--lime-200)] rounded-lg">
                    <h5 className="font-medium">user_alerts</h5>
                    <p className="text-xs text-gray-500">id, user_id, sensor_type, alert_type</p>
                  </div>
                </div>
              </div>
            </div>

            {/* IoT Communication */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-[var(--lime-300)] bg-gradient-to-b from-[var(--lime-50)] to-white">
                <div className="text-center space-y-4">
                  <Wifi className="w-12 h-12 text-[var(--lime-600)] mx-auto" />
                  <h3 className="text-2xl font-semibold">IoT Bridge</h3>
                  <Badge className="bg-[var(--lime-100)] text-[var(--lime-800)]">MQTT Protocol</Badge>
                </div>
              </Card>

              <div className="space-y-3">
                <h4 className="font-semibold text-[var(--lime-700)]">Data Flow:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-white border border-[var(--lime-200)] rounded">
                    <div className="w-2 h-2 bg-[var(--lime-500)] rounded-full"></div>
                    <span className="text-sm">ESP32 → MQTT Broker</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white border border-[var(--lime-200)] rounded">
                    <div className="w-2 h-2 bg-[var(--lime-500)] rounded-full"></div>
                    <span className="text-sm">Real-time Subscriptions</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white border border-[var(--lime-200)] rounded">
                    <div className="w-2 h-2 bg-[var(--lime-500)] rounded-full"></div>
                    <span className="text-sm">Live Dashboard Updates</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white border border-[var(--lime-200)] rounded">
                    <div className="w-2 h-2 bg-[var(--lime-500)] rounded-full"></div>
                    <span className="text-sm">Push Notifications</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-700 mb-2">🔄 Real-time Features</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Live sensor readings</li>
                  <li>• Instant emergency alerts</li>
                  <li>• Status synchronization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: User Experience Flow
    {
      id: 4,
      title: "User Journey & Features",
      content: (
        <div className="h-full p-8">
          <h2 className="text-4xl font-bold text-[var(--lime-700)] text-center mb-8">Complete User Experience</h2>
          
          <div className="grid grid-cols-2 gap-12">
            {/* Left: User Flow */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[var(--lime-600)]">User Journey</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white border-l-4 border-[var(--lime-400)] rounded-r-lg shadow-sm">
                  <div className="w-8 h-8 bg-[var(--lime-500)] rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold">Sign Up & Authentication</h4>
                    <p className="text-sm text-gray-600">User registration with Supabase Auth</p>
                    <p className="text-xs text-gray-500">Choose unique username</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border-l-4 border-[var(--lime-400)] rounded-r-lg shadow-sm">
                  <div className="w-8 h-8 bg-[var(--lime-500)] rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold">Sensor Setup</h4>
                    <p className="text-sm text-gray-600">Add Gas, Flame & Temperature sensors</p>
                    <p className="text-xs text-gray-500">Prevent duplicate sensor registration</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border-l-4 border-[var(--lime-400)] rounded-r-lg shadow-sm">
                  <div className="w-8 h-8 bg-[var(--lime-500)] rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold">Live Monitoring</h4>
                    <p className="text-sm text-gray-600">Real-time dashboard with sensor status</p>
                    <p className="text-xs text-gray-500">Online/Offline status tracking</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border-l-4 border-[var(--lime-400)] rounded-r-lg shadow-sm">
                  <div className="w-8 h-8 bg-[var(--lime-500)] rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold">Alert Configuration</h4>
                    <p className="text-sm text-gray-600">Customize notification preferences</p>
                    <p className="text-xs text-gray-500">Push notifications, Email, Sound alerts</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border-l-4 border-red-400 rounded-r-lg shadow-sm bg-red-50">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">!</div>
                  <div>
                    <h4 className="font-semibold text-red-700">Emergency Response</h4>
                    <p className="text-sm text-red-600">Immediate alerts & automatic safety actions</p>
                    <p className="text-xs text-red-500">LED, Buzzer, Servo activation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Features */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[var(--lime-600)]">Key Features</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <Card className="p-4 border border-[var(--lime-300)] hover:bg-[var(--lime-50)] transition-colors">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-[var(--lime-600)]" />
                    <div>
                      <h4 className="font-semibold">Multi-User Support</h4>
                      <p className="text-sm text-gray-600">Each user manages their own sensors</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-[var(--lime-300)] hover:bg-[var(--lime-50)] transition-colors">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-6 h-6 text-[var(--lime-600)]" />
                    <div>
                      <h4 className="font-semibold">Real-time Communication</h4>
                      <p className="text-sm text-gray-600">MQTT protocol for instant updates</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-[var(--lime-300)] hover:bg-[var(--lime-50)] transition-colors">
                  <div className="flex items-center gap-3">
                    <Bell className="w-6 h-6 text-[var(--lime-600)]" />
                    <div>
                      <h4 className="font-semibold">Smart Notifications</h4>
                      <p className="text-sm text-gray-600">Customizable alert preferences</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-[var(--lime-300)] hover:bg-[var(--lime-50)] transition-colors">
                  <div className="flex items-center gap-3">
                    <Database className="w-6 h-6 text-[var(--lime-600)]" />
                    <div>
                      <h4 className="font-semibold">Data History</h4>
                      <p className="text-sm text-gray-600">Historical sensor logs & analytics</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-[var(--lime-300)] hover:bg-[var(--lime-50)] transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-[var(--lime-600)]" />
                    <div>
                      <h4 className="font-semibold">Automatic Safety</h4>
                      <p className="text-sm text-gray-600">Emergency shutdown & alerts</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8 p-4 bg-[var(--lime-50)] border-2 border-[var(--lime-300)] rounded-lg">
                <h4 className="font-bold text-[var(--lime-800)] mb-3">🎯 Project Goals</h4>
                <ul className="text-sm text-[var(--lime-700)] space-y-2">
                  <li>• Prevent kitchen accidents through early detection</li>
                  <li>• Provide immediate emergency response</li>
                  <li>• Enable remote monitoring via mobile app</li>
                  <li>• Create scalable IoT safety solution</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Demo & Results
    {
      id: 5,
      title: "Demo & Future Enhancements",
      content: (
        <div className="h-full p-8">
          <h2 className="text-4xl font-bold text-[var(--lime-700)] text-center mb-12">Project Results & Demo</h2>
          
          <div className="grid grid-cols-2 gap-12">
            {/* Left: Current Status */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--lime-600)] mb-6">✅ Current Implementation</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold">ESP32 Hardware Setup</p>
                      <p className="text-sm text-gray-600">MQ2, DHT11, Flame sensor integration</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Real-time Sensor Reading</p>
                      <p className="text-sm text-gray-600">Gas, temperature, flame detection</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Emergency Response System</p>
                      <p className="text-sm text-gray-600">LED, buzzer, servo motor activation</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold">LCD Status Display</p>
                      <p className="text-sm text-gray-600">Real-time values & alert messages</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Serial Monitoring</p>
                      <p className="text-sm text-gray-600">Debug output & data logging</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[var(--lime-50)] border-2 border-[var(--lime-300)] rounded-lg">
                <h4 className="font-bold text-[var(--lime-800)] mb-4">📊 System Performance</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Response Time</span>
                      <span>2 seconds</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sensor Accuracy</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>System Reliability</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Future Enhancements */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--lime-600)] mb-6">🚀 Next Phase Development</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Mobile App Integration</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• React Native / Progressive Web App</li>
                      <li>• User authentication & profiles</li>
                      <li>• Real-time dashboard</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-2">Cloud Integration</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• Supabase backend setup</li>
                      <li>• MQTT broker configuration</li>
                      <li>• Data analytics & reporting</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-700 mb-2">Advanced Features</h4>
                    <ul className="text-sm text-orange-600 space-y-1">
                      <li>• Push notifications</li>
                      <li>• Historical data visualization</li>
                      <li>• Multi-device support</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">AI Enhancement</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Predictive analytics</li>
                      <li>• Pattern recognition</li>
                      <li>• Smart threshold adjustment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-[var(--lime-100)] to-[var(--lime-200)] border-2 border-[var(--lime-400)] rounded-lg">
                <h4 className="font-bold text-[var(--lime-800)] mb-4">🎯 Impact & Vision</h4>
                <div className="space-y-3 text-[var(--lime-700)]">
                  <p className="text-sm">
                    <strong>Safety First:</strong> Preventing kitchen accidents through early detection and automatic response systems.
                  </p>
                  <p className="text-sm">
                    <strong>Scalable Solution:</strong> Building a foundation for smart home safety that can expand to other areas.
                  </p>
                  <p className="text-sm">
                    <strong>Community Impact:</strong> Reducing kitchen-related accidents and improving home safety standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--lime-50)] to-white">
      {/* Header */}
      <div className="bg-white border-b border-[var(--lime-200)] px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[var(--lime-600)]" />
            <h1 className="text-2xl font-bold text-gray-800">IoT Kitchen Safety System</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-[var(--lime-300)] text-[var(--lime-700)]">
              Slide {currentSlide + 1} of {slides.length}
            </Badge>
            
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide 
                      ? 'bg-[var(--lime-500)]' 
                      : 'bg-[var(--lime-200)] hover:bg-[var(--lime-300)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="relative h-[calc(100vh-120px)] overflow-hidden">
        <div className="h-full p-8">
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm border border-[var(--lime-200)] rounded-full px-6 py-3 shadow-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="border-[var(--lime-300)] hover:bg-[var(--lime-50)]"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
            {slides[currentSlide].title}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="border-[var(--lime-300)] hover:bg-[var(--lime-50)]"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}