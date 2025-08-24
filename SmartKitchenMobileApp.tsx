import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { 
  ChefHat,
  Globe,
  User,
  Lock,
  Eye,
  EyeOff,
  Thermometer,
  Droplets,
  Wind,
  Flame,
  Shield,
  Phone,
  AlertTriangle,
  CheckCircle,
  Wifi,
  Smartphone,
  Cloud,
  ArrowRight,
  Home,
  Settings,
  Bell,
  Menu,
  LogOut,
  Clock,
  DoorOpen,
  DoorClosed,
  Lightbulb,
  Fan,
  Zap,
  Activity,
  X,
  BellRing,
  Volume2,
  Vibrate,
  PhoneCall
} from 'lucide-react';

type Screen = 'splash' | 'auth' | 'dashboard' | 'devices' | 'alerts' | 'settings' | 'notifications' | 'emergencyContacts';
type Language = 'en' | 'ar';

interface SensorData {
  temperature: number;
  humidity: number;
  gas: number;
  flame: number;
}

interface DeviceStatus {
  door: boolean;
  ventilation: boolean;
  lights: boolean;
  mainPower: boolean;
}

interface NotificationSettings {
  pushNotifications: boolean;
  soundAlerts: boolean;
  vibration: boolean;
  criticalAlerts: boolean;
}

interface Notification {
  id: string;
  type: 'danger' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  read: boolean;
}

const translations = {
  en: {
    title: 'Smart Kitchen Safety',
    subtitle: 'Monitoring System',
    welcome: 'Welcome to your smart kitchen',
    login: 'Login',
    signup: 'Sign Up',
    username: 'Username',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    dashboard: 'Dashboard',
    kitchenDevices: 'Kitchen Devices',
    alerts: 'Alerts & Emergency',
    settings: 'Settings',
    temperature: 'Temperature',
    humidity: 'Humidity',
    gasLevel: 'Gas Level',
    flameDetection: 'Flame Detection',
    systemStatus: 'System Status',
    doorStatus: 'Emergency Door',
    safe: 'SAFE',
    danger: 'DANGER',
    normal: 'Normal',
    warning: 'Warning',
    critical: 'Critical',
    open: 'Open',
    closed: 'Closed',
    on: 'On',
    off: 'Off',
    emergencyContacts: 'Emergency Contacts',
    police: 'Police',
    fire: 'Fire Department',
    ambulance: 'Ambulance',
    gasCompany: 'Gas Company',
    call: 'Call',
    currentTime: 'Current Time',
    ventilation: 'Ventilation Fan',
    lights: 'Kitchen Lights',
    mainPower: 'Main Power',
    deviceControl: 'Device Control',
    safetyTips: 'Safety Tips',
    tip1: 'Keep kitchen well-ventilated when cooking',
    tip2: 'Check gas connections regularly',
    tip3: 'Install fire extinguisher nearby',
    tip4: 'Never leave cooking unattended',
    languageSettings: 'Language Settings',
    notificationSettings: 'Notification Settings',
    emergencySettings: 'Emergency Settings',
    aboutApp: 'About App',
    appVersion: 'Version 1.0.0',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    soundAlerts: 'Sound Alerts',
    vibration: 'Vibration',
    criticalAlerts: 'Critical Alerts Only',
    testNotification: 'Test Notification',
    markAllRead: 'Mark All Read',
    noNotifications: 'No notifications yet',
    civilDefense: 'Civil Defense',
    touristPolice: 'Tourist Police',
    electricityEmergency: 'Electricity Emergency',
    waterEmergency: 'Water Emergency',
    dangerDetected: 'DANGER DETECTED!',
    checkKitchen: 'Please check your kitchen immediately',
    tempHigh: 'High temperature detected',
    gasLeak: 'Gas leak detected',
    flameAlert: 'Flame detected'
  },
  ar: {
    title: 'نظام مراقبة المطبخ الذكي',
    subtitle: 'نظام الأمان',
    welcome: 'مرحباً بك في مطبخك الذكي',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    dontHaveAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    dashboard: 'لوحة التحكم',
    kitchenDevices: 'أجهزة المطبخ',
    alerts: 'التنبيهات والطوارئ',
    settings: 'الإعدادات',
    temperature: 'درجة الحرارة',
    humidity: 'الرطوبة',
    gasLevel: 'مستوى الغاز',
    flameDetection: 'كشف اللهب',
    systemStatus: 'حالة النظام',
    doorStatus: 'باب الطوارئ',
    safe: 'آمن',
    danger: 'خطر',
    normal: 'طبيعي',
    warning: 'تحذير',
    critical: 'حرج',
    open: 'مفتوح',
    closed: 'مغلق',
    on: 'تشغيل',
    off: 'إيقاف',
    emergencyContacts: 'أرقام الطوارئ',
    police: 'الشرطة',
    fire: 'الإطفاء',
    ambulance: 'الإسعاف',
    gasCompany: 'شركة الغاز',
    call: 'اتصال',
    currentTime: 'الوقت الحالي',
    ventilation: 'مروحة التهوية',
    lights: 'إضاءة المطبخ',
    mainPower: 'الطاقة الرئيسية',
    deviceControl: 'التحكم في الأجهزة',
    safetyTips: 'نصائح الأمان',
    tip1: 'حافظ على تهوية المطبخ جيداً أثناء الطبخ',
    tip2: 'تحقق من توصيلات الغاز بانتظام',
    tip3: 'قم بتركيب طفاية حريق قريباً',
    tip4: 'لا تترك الطبخ دون مراقبة أبداً',
    languageSettings: 'إعدادات اللغة',
    notificationSettings: 'إعدادات التنبيهات',
    emergencySettings: 'إعدادات الطوارئ',
    aboutApp: 'حول التطبيق',
    appVersion: 'الإصدار 1.0.0',
    notifications: 'التنبيهات',
    pushNotifications: 'إشعارات الدفع',
    soundAlerts: 'تنبيهات صوتية',
    vibration: 'اهتزاز',
    criticalAlerts: 'التنبيهات الحرجة فقط',
    testNotification: 'اختبار التنبيه',
    markAllRead: 'تحديد الكل كمقروء',
    noNotifications: 'لا توجد تنبيهات حتى الآن',
    civilDefense: 'الدفاع المدني',
    touristPolice: 'شرطة السياحة',
    electricityEmergency: 'طوارئ الكهرباء',
    waterEmergency: 'طوارئ المياه',
    dangerDetected: 'تم اكتشاف خطر!',
    checkKitchen: 'يرجى فحص مطبخك فوراً',
    tempHigh: 'تم اكتشاف درجة حرارة عالية',
    gasLeak: 'تم اكتشاف تسرب غاز',
    flameAlert: 'تم اكتشاف لهب'
  }
};

export function SmartKitchenMobileApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [language, setLanguage] = useState<Language>('en');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 24,
    humidity: 45,
    gas: 150,
    flame: 0
  });

  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    door: false, // false = closed, true = open
    ventilation: true,
    lights: true,
    mainPower: true
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    soundAlerts: true,
    vibration: true,
    criticalAlerts: false
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [lastDangerAlert, setLastDangerAlert] = useState<Date | null>(null);

  const t = translations[language];
  const isRTL = language === 'ar';

  // Egyptian Emergency Contacts
  const egyptianEmergencyContacts = [
    { name: t.police, number: '122', icon: Shield, color: 'bg-blue-500' },
    { name: t.fire, number: '180', icon: Flame, color: 'bg-red-500' },
    { name: t.ambulance, number: '123', icon: Phone, color: 'bg-[var(--primary-kitchen)]' },
    { name: t.gasCompany, number: '129', icon: Wind, color: 'bg-yellow-500' },
    { name: t.civilDefense, number: '180', icon: Shield, color: 'bg-orange-500' },
    { name: t.touristPolice, number: '126', icon: Shield, color: 'bg-purple-500' },
    { name: t.electricityEmergency, number: '121', icon: Zap, color: 'bg-yellow-600' },
    { name: t.waterEmergency, number: '125', icon: Droplets, color: 'bg-blue-600' }
  ];

  // Add notification function
  const addNotification = (type: 'danger' | 'warning' | 'info', message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Send browser notification if supported and enabled
    if (notificationSettings.pushNotifications && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(t.dangerDetected, {
          body: message,
          icon: '/favicon.ico'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(t.dangerDetected, {
              body: message,
              icon: '/favicon.ico'
            });
          }
        });
      }
    }
  };

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: Math.max(15, Math.min(50, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(20, Math.min(80, prev.humidity + (Math.random() - 0.5) * 3)),
        gas: Math.max(0, Math.min(1000, prev.gas + (Math.random() - 0.5) * 20)),
        flame: Math.random() > 0.95 ? Math.random() * 100 : 0
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSensorStatus = (value: number, type: string) => {
    if (type === 'temperature') {
      if (value > 35) return { status: 'critical', color: 'text-red-600' };
      if (value > 30) return { status: 'warning', color: 'text-yellow-600' };
      return { status: 'normal', color: 'text-[var(--primary-kitchen)]' };
    }
    if (type === 'gas') {
      if (value > 500) return { status: 'critical', color: 'text-red-600' };
      if (value > 300) return { status: 'warning', color: 'text-yellow-600' };
      return { status: 'normal', color: 'text-[var(--primary-kitchen)]' };
    }
    if (type === 'flame') {
      if (value > 50) return { status: 'critical', color: 'text-red-600' };
      if (value > 10) return { status: 'warning', color: 'text-yellow-600' };
      return { status: 'normal', color: 'text-[var(--primary-kitchen)]' };
    }
    return { status: 'normal', color: 'text-[var(--primary-kitchen)]' };
  };

  const getSystemStatus = () => {
    const tempStatus = getSensorStatus(sensorData.temperature, 'temperature');
    const gasStatus = getSensorStatus(sensorData.gas, 'gas');
    const flameStatus = getSensorStatus(sensorData.flame, 'flame');
    
    if (tempStatus.status === 'critical' || gasStatus.status === 'critical' || flameStatus.status === 'critical') {
      return { status: t.danger, color: 'bg-red-500', textColor: 'text-white' };
    }
    return { status: t.safe, color: 'bg-[var(--primary-kitchen)]', textColor: 'text-white' };
  };

  // Monitor for danger and send notifications
  useEffect(() => {
    const systemStatus = getSystemStatus();
    const now = new Date();
    
    if (systemStatus.status === t.danger) {
      // Only send notification if it's been more than 30 seconds since last alert
      if (!lastDangerAlert || (now.getTime() - lastDangerAlert.getTime()) > 30000) {
        let dangerMessage = t.checkKitchen;
        
        if (sensorData.temperature > 35) {
          dangerMessage = t.tempHigh;
        } else if (sensorData.gas > 500) {
          dangerMessage = t.gasLeak;
        } else if (sensorData.flame > 50) {
          dangerMessage = t.flameAlert;
        }
        
        addNotification('danger', dangerMessage);
        setLastDangerAlert(now);
      }
    }
  }, [sensorData, t, lastDangerAlert, notificationSettings.pushNotifications]);

  // Auto navigate from splash screen
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('auth');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleAuth = () => {
    if (username && password) {
      setIsAuthenticated(true);
      setCurrentScreen('dashboard');
    }
  };

  const toggleDevice = (device: keyof DeviceStatus) => {
    setDeviceStatus(prev => ({
      ...prev,
      [device]: !prev[device]
    }));
  };

  const toggleNotificationSetting = (setting: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const testNotification = () => {
    addNotification('info', 'This is a test notification from your Smart Kitchen Safety system.');
  };

  const emergencyContacts = [
    { name: t.police, number: '122', icon: Shield, color: 'bg-blue-500' },
    { name: t.fire, number: '180', icon: Flame, color: 'bg-red-500' },
    { name: t.ambulance, number: '123', icon: Phone, color: 'bg-[var(--primary-kitchen)]' },
    { name: t.gasCompany, number: '129', icon: Wind, color: 'bg-yellow-500' }
  ];

  const makeCall = (number: string) => {
    if (typeof window !== 'undefined') {
      window.open(`tel:${number}`, '_self');
    }
  };

  const SplashScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-[var(--kitchen-yellow-pale)] to-[var(--kitchen-yellow-green)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--kitchen-green-light)] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-8 w-16 h-16 bg-[var(--primary-kitchen)] rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-8 w-20 h-20 bg-[var(--kitchen-brown-light)] rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>
      
      {/* Language Toggle */}
      <div className="absolute top-12 right-6">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
          <Globe className="w-4 h-4 text-[var(--primary-kitchen)]" />
          <span className="text-sm font-medium text-[var(--primary-kitchen)]">
            {language.toUpperCase()}
          </span>
          <Switch
            checked={language === 'ar'}
            onCheckedChange={(checked) => setLanguage(checked ? 'ar' : 'en')}
            className="scale-75"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-8 z-10 px-8">
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[var(--primary-kitchen)] to-[var(--kitchen-green-dark)] rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
            <ChefHat className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--kitchen-yellow-green)] rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-[var(--primary-kitchen)]" />
          </div>
        </div>

        <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
          <h1 className="text-4xl font-bold text-[var(--kitchen-green-dark)] leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-[var(--primary-kitchen)] opacity-80">
            {t.subtitle}
          </p>
          <p className="text-base text-[var(--kitchen-brown-medium)] max-w-sm mx-auto">
            {t.welcome}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-[var(--primary-kitchen)] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[var(--primary-kitchen)] rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-[var(--primary-kitchen)] rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const AuthScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-[var(--kitchen-yellow-pale)] to-white flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--primary-kitchen)] rounded-xl flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-[var(--kitchen-green-dark)]">{t.title}</h1>
        </div>
        
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 px-3 py-1 bg-[var(--kitchen-yellow-green)] rounded-full"
        >
          <Globe className="w-4 h-4 text-[var(--primary-kitchen)]" />
          <span className="text-sm text-[var(--primary-kitchen)]">{language.toUpperCase()}</span>
        </button>
      </div>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center px-8">
        <Card className="w-full max-w-sm p-6 space-y-6 border-[var(--kitchen-brown-light)]">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? t.login : t.signup}
            </h2>
            <p className="text-gray-600">{t.welcome}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t.username}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={t.username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={30}
                  autoComplete="username"
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pl-10 border-[var(--kitchen-brown-light)] focus:ring-2 focus:ring-[var(--primary-kitchen)] focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={30}
                  autoComplete="current-password"
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pl-10 pr-12 border-[var(--kitchen-brown-light)] focus:ring-2 focus:ring-[var(--primary-kitchen)] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-[var(--primary-kitchen)] transition-colors z-10 pointer-events-auto"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button className="text-sm text-[var(--primary-kitchen)] hover:underline">
                  {t.forgotPassword}
                </button>
              </div>
            )}
          </div>

          <Button 
            onClick={handleAuth}
            className="w-full bg-[var(--primary-kitchen)] hover:bg-[var(--kitchen-green-dark)] text-white"
            disabled={!username || !password}
          >
            {isLogin ? t.login : t.signup}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-600 hover:text-[var(--primary-kitchen)]"
            >
              {isLogin ? t.dontHaveAccount : t.haveAccount}{' '}
              <span className="text-[var(--primary-kitchen)] font-medium">
                {isLogin ? t.signup : t.login}
              </span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );

  const Dashboard = () => {
    const systemStatus = getSystemStatus();
    const unreadNotifications = notifications.filter(n => !n.read).length;
    
    return (
      <div className="min-h-screen bg-[var(--kitchen-yellow-pale)]" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="bg-white border-b border-[var(--kitchen-brown-light)] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--primary-kitchen)] rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-gray-800">{t.dashboard}</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className={`${systemStatus.color} ${systemStatus.textColor} px-3 py-1`}>
                {systemStatus.status}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentScreen('notifications')}
                className="relative"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Current Time and Door Status */}
        <div className="p-4">
          <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-[var(--primary-kitchen)]" />
                <div>
                  <p className="text-sm text-gray-600">{t.currentTime}</p>
                  <p className="text-lg font-semibold">
                    {currentTime.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {deviceStatus.door ? (
                  <DoorOpen className="w-6 h-6 text-red-500" />
                ) : (
                  <DoorClosed className="w-6 h-6 text-[var(--primary-kitchen)]" />
                )}
                <div className="text-right">
                  <p className="text-sm text-gray-600">{t.doorStatus}</p>
                  <p className={`text-lg font-semibold ${deviceStatus.door ? 'text-red-500' : 'text-[var(--primary-kitchen)]'}`}>
                    {deviceStatus.door ? t.open : t.closed}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6 pb-24">
          {/* Status Alert */}
          {systemStatus.status === t.danger && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Danger detected! Check sensor readings below.
              </AlertDescription>
            </Alert>
          )}

          {/* Sensor Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Temperature Card */}
            <Card className="p-4 space-y-3 bg-white border-[var(--kitchen-brown-light)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium">{t.temperature}</span>
                </div>
                <Badge variant="outline" className={getSensorStatus(sensorData.temperature, 'temperature').color}>
                  {t[getSensorStatus(sensorData.temperature, 'temperature').status as keyof typeof t]}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {sensorData.temperature.toFixed(1)}°C
                </div>
                <Progress 
                  value={(sensorData.temperature / 50) * 100} 
                  className="h-2"
                />
              </div>
            </Card>

            {/* Humidity Card */}
            <Card className="p-4 space-y-3 bg-white border-[var(--kitchen-brown-light)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">{t.humidity}</span>
                </div>
                <Badge variant="outline" className="text-blue-600">
                  {t.normal}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {sensorData.humidity.toFixed(0)}%
                </div>
                <Progress 
                  value={sensorData.humidity} 
                  className="h-2"
                />
              </div>
            </Card>

            {/* Gas Level Card */}
            <Card className="p-4 space-y-3 bg-white border-[var(--kitchen-brown-light)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium">{t.gasLevel}</span>
                </div>
                <Badge variant="outline" className={getSensorStatus(sensorData.gas, 'gas').color}>
                  {t[getSensorStatus(sensorData.gas, 'gas').status as keyof typeof t]}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {sensorData.gas.toFixed(0)} ppm
                </div>
                <Progress 
                  value={(sensorData.gas / 1000) * 100} 
                  className="h-2"
                />
              </div>
            </Card>

            {/* Flame Detection Card */}
            <Card className="p-4 space-y-3 bg-white border-[var(--kitchen-brown-light)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">{t.flameDetection}</span>
                </div>
                <Badge variant="outline" className={getSensorStatus(sensorData.flame, 'flame').color}>
                  {t[getSensorStatus(sensorData.flame, 'flame').status as keyof typeof t]}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {sensorData.flame.toFixed(0)}%
                </div>
                <Progress 
                  value={sensorData.flame} 
                  className="h-2"
                />
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentScreen('devices')}
              className="h-16 border-[var(--kitchen-brown-light)] hover:bg-[var(--kitchen-yellow-green)]"
            >
              <div className="text-center">
                <Activity className="w-6 h-6 mx-auto mb-1 text-[var(--primary-kitchen)]" />
                <span className="text-sm">{t.kitchenDevices}</span>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentScreen('alerts')}
              className="h-16 border-[var(--kitchen-brown-light)] hover:bg-[var(--kitchen-yellow-green)]"
            >
              <div className="text-center">
                <AlertTriangle className="w-6 h-6 mx-auto mb-1 text-[var(--primary-kitchen)]" />
                <span className="text-sm">{t.alerts}</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--kitchen-brown-light)] p-4">
          <div className="flex justify-around max-w-md mx-auto">
            <button className="flex flex-col items-center gap-1">
              <Home className="w-5 h-5 text-[var(--primary-kitchen)]" />
              <span className="text-xs text-[var(--primary-kitchen)]">{t.dashboard}</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('settings')}
              className="flex flex-col items-center gap-1"
            >
              <Settings className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">{t.settings}</span>
            </button>
            <button 
              onClick={() => {
                setIsAuthenticated(false);
                setCurrentScreen('auth');
              }}
              className="flex flex-col items-center gap-1"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DevicesScreen = () => (
    <div className="min-h-screen bg-[var(--kitchen-yellow-pale)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white border-b border-[var(--kitchen-brown-light)] p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentScreen('dashboard')}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Button>
          <h1 className="font-bold text-gray-800">{t.kitchenDevices}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Device Control Header */}
        <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
          <h2 className="text-lg font-semibold mb-4 text-center text-[var(--kitchen-green-dark)]">{t.deviceControl}</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Emergency Door Control */}
            <Card className="p-4 border-[var(--kitchen-brown-medium)]">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  {deviceStatus.door ? (
                    <DoorOpen className="w-12 h-12 text-red-500" />
                  ) : (
                    <DoorClosed className="w-12 h-12 text-[var(--primary-kitchen)]" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{t.doorStatus}</h3>
                  <p className={`text-sm ${deviceStatus.door ? 'text-red-500' : 'text-[var(--primary-kitchen)]'}`}>
                    {deviceStatus.door ? t.open : t.closed}
                  </p>
                </div>
                <Button
                  onClick={() => toggleDevice('door')}
                  className={`w-full ${deviceStatus.door ? 'bg-red-500 hover:bg-red-600' : 'bg-[var(--primary-kitchen)] hover:bg-[var(--kitchen-green-dark)]'} text-white`}
                  size="sm"
                >
                  {deviceStatus.door ? t.closed : t.open}
                </Button>
              </div>
            </Card>

            {/* Ventilation Fan */}
            <Card className="p-4 border-[var(--kitchen-brown-medium)]">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Fan className={`w-12 h-12 ${deviceStatus.ventilation ? 'text-[var(--primary-kitchen)] animate-spin' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="font-medium">{t.ventilation}</h3>
                  <p className={`text-sm ${deviceStatus.ventilation ? 'text-[var(--primary-kitchen)]' : 'text-gray-400'}`}>
                    {deviceStatus.ventilation ? t.on : t.off}
                  </p>
                </div>
                <Button
                  onClick={() => toggleDevice('ventilation')}
                  className={`w-full ${deviceStatus.ventilation ? 'bg-[var(--primary-kitchen)] hover:bg-[var(--kitchen-green-dark)]' : 'bg-gray-400 hover:bg-gray-500'} text-white`}
                  size="sm"
                >
                  {deviceStatus.ventilation ? t.off : t.on}
                </Button>
              </div>
            </Card>

            {/* Kitchen Lights */}
            <Card className="p-4 border-[var(--kitchen-brown-medium)]">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Lightbulb className={`w-12 h-12 ${deviceStatus.lights ? 'text-yellow-500' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="font-medium">{t.lights}</h3>
                  <p className={`text-sm ${deviceStatus.lights ? 'text-yellow-500' : 'text-gray-400'}`}>
                    {deviceStatus.lights ? t.on : t.off}
                  </p>
                </div>
                <Button
                  onClick={() => toggleDevice('lights')}
                  className={`w-full ${deviceStatus.lights ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 hover:bg-gray-500'} text-white`}
                  size="sm"
                >
                  {deviceStatus.lights ? t.off : t.on}
                </Button>
              </div>
            </Card>

            {/* Main Power */}
            <Card className="p-4 border-[var(--kitchen-brown-medium)]">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Zap className={`w-12 h-12 ${deviceStatus.mainPower ? 'text-[var(--primary-kitchen)]' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="font-medium">{t.mainPower}</h3>
                  <p className={`text-sm ${deviceStatus.mainPower ? 'text-[var(--primary-kitchen)]' : 'text-gray-400'}`}>
                    {deviceStatus.mainPower ? t.on : t.off}
                  </p>
                </div>
                <Button
                  onClick={() => toggleDevice('mainPower')}
                  className={`w-full ${deviceStatus.mainPower ? 'bg-[var(--primary-kitchen)] hover:bg-[var(--kitchen-green-dark)]' : 'bg-gray-400 hover:bg-gray-500'} text-white`}
                  size="sm"
                >
                  {deviceStatus.mainPower ? t.off : t.on}
                </Button>
              </div>
            </Card>
          </div>
        </Card>

        {/* System Status Overview */}
        <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--kitchen-green-dark)]">{t.systemStatus}</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[var(--kitchen-yellow-green)] rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-[var(--primary-kitchen)]" />
                <span className="font-medium">System Health</span>
              </div>
              <Badge className="bg-[var(--primary-kitchen)] text-white">
                {getSystemStatus().status}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--kitchen-yellow-green)] rounded-lg">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-[var(--primary-kitchen)]" />
                <span className="font-medium">Network Status</span>
              </div>
              <Badge className="bg-[var(--primary-kitchen)] text-white">
                Connected
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--kitchen-yellow-green)] rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[var(--primary-kitchen)]" />
                <span className="font-medium">Last Update</span>
              </div>
              <span className="text-sm text-gray-600">
                {currentTime.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US')}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const NotificationsScreen = () => (
    <div className="min-h-screen bg-[var(--kitchen-yellow-pale)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white border-b border-[var(--kitchen-brown-light)] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentScreen('dashboard')}
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Button>
            <h1 className="font-bold text-gray-800">{t.notifications}</h1>
          </div>
          
          {notifications.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllNotificationsRead}
            >
              {t.markAllRead}
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Notification Settings */}
        <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--kitchen-green-dark)]">{t.notificationSettings}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellRing className="w-5 h-5 text-[var(--primary-kitchen)]" />
                <span className="font-medium">{t.pushNotifications}</span>
              </div>
              <Switch
                checked={notificationSettings.pushNotifications}
                onCheckedChange={() => toggleNotificationSetting('pushNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-[var(--primary-kitchen)]" />
                <span className="font-medium">{t.soundAlerts}</span>
              </div>
              <Switch
                checked={notificationSettings.soundAlerts}
                onCheckedChange={() => toggleNotificationSetting('soundAlerts')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Vibrate className="w-5 h-5 text-[var(--primary-kitchen)]" />
                <span className="font-medium">{t.vibration}</span>
              </div>
              <Switch
                checked={notificationSettings.vibration}
                onCheckedChange={() => toggleNotificationSetting('vibration')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-[var(--primary-kitchen)]" />
                <span className="font-medium">{t.criticalAlerts}</span>
              </div>
              <Switch
                checked={notificationSettings.criticalAlerts}
                onCheckedChange={() => toggleNotificationSetting('criticalAlerts')}
              />
            </div>

            <Button 
              onClick={testNotification}
              className="w-full bg-[var(--primary-kitchen)] hover:bg-[var(--kitchen-green-dark)] text-white"
            >
              {t.testNotification}
            </Button>
          </div>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card key={notification.id} className={`p-4 bg-white border-[var(--kitchen-brown-light)] ${!notification.read ? 'border-l-4 border-l-[var(--primary-kitchen)]' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notification.type === 'danger' ? 'bg-red-100' :
                    notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {notification.type === 'danger' ? (
                      <AlertTriangle className={`w-4 h-4 ${notification.type === 'danger' ? 'text-red-500' : 'text-yellow-500'}`} />
                    ) : notification.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <Bell className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.timestamp.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                    </p>
                  </div>
                  
                  {!notification.read && (
                    <div className="w-2 h-2 bg-[var(--primary-kitchen)] rounded-full"></div>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 bg-white border-[var(--kitchen-brown-light)] text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">{t.noNotifications}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  const EmergencyContactsScreen = () => (
    <div className="min-h-screen bg-[var(--kitchen-yellow-pale)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white border-b border-[var(--kitchen-brown-light)] p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentScreen('settings')}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Button>
          <h1 className="font-bold text-gray-800">{t.emergencyContacts}</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Egyptian Emergency Services</h3>
        
        {egyptianEmergencyContacts.map((contact, index) => (
          <Card key={index} className="p-4 bg-white border-[var(--kitchen-brown-light)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${contact.color} rounded-lg flex items-center justify-center`}>
                  <contact.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{contact.name}</h4>
                  <p className="text-sm text-gray-600">{contact.number}</p>
                </div>
              </div>
              
              <Button
                onClick={() => makeCall(contact.number)}
                className={`${contact.color} hover:opacity-90 text-white`}
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                {t.call}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const AlertsScreen = () => (
    <div className="min-h-screen bg-[var(--kitchen-yellow-pale)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white border-b border-[var(--kitchen-brown-light)] p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentScreen('dashboard')}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Button>
          <h1 className="font-bold text-gray-800">{t.alerts}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Status */}
        <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
          <div className="flex items-center justify-center space-y-4 flex-col">
            <div className={`w-20 h-20 ${getSystemStatus().color} rounded-full flex items-center justify-center`}>
              {getSystemStatus().status === t.safe ? (
                <CheckCircle className="w-10 h-10 text-white" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-white" />
              )}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">{t.systemStatus}</h2>
              <p className={`text-lg font-medium ${getSystemStatus().status === t.safe ? 'text-[var(--primary-kitchen)]' : 'text-red-600'}`}>
                {getSystemStatus().status}
              </p>
            </div>
          </div>
        </Card>

        {/* Emergency Contacts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">{t.emergencyContacts}</h3>
          
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="p-4 bg-white border-[var(--kitchen-brown-light)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${contact.color} rounded-lg flex items-center justify-center`}>
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.number}</p>
                  </div>
                </div>
                
                <Button
                  onClick={() => makeCall(contact.number)}
                  className={`${contact.color} hover:opacity-90 text-white`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t.call}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Safety Tips */}
        <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.safetyTips}</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-[var(--primary-kitchen)] mt-0.5 flex-shrink-0" />
              <p>{t.tip1}</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-[var(--primary-kitchen)] mt-0.5 flex-shrink-0" />
              <p>{t.tip2}</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-[var(--primary-kitchen)] mt-0.5 flex-shrink-0" />
              <p>{t.tip3}</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-[var(--primary-kitchen)] mt-0.5 flex-shrink-0" />
              <p>{t.tip4}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div className="min-h-screen bg-[var(--kitchen-yellow-pale)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white border-b border-[var(--kitchen-brown-light)] p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentScreen('dashboard')}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Button>
          <h1 className="font-bold text-gray-800">{t.settings}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Language Settings */}
        <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-[var(--primary-kitchen)]" />
              <div>
                <h3 className="font-medium">{t.languageSettings}</h3>
                <p className="text-sm text-gray-600">Choose your preferred language</p>
              </div>
            </div>
            <Switch
              checked={language === 'ar'}
              onCheckedChange={(checked) => setLanguage(checked ? 'ar' : 'en')}
            />
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
          <button 
            onClick={() => setCurrentScreen('notifications')}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-[var(--primary-kitchen)]" />
              <div className="text-left">
                <h3 className="font-medium">{t.notificationSettings}</h3>
                <p className="text-sm text-gray-600">Manage alert preferences</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </button>
        </Card>

        {/* Emergency Settings */}
        <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
          <button 
            onClick={() => setCurrentScreen('emergencyContacts')}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[var(--primary-kitchen)]" />
              <div className="text-left">
                <h3 className="font-medium">{t.emergencySettings}</h3>
                <p className="text-sm text-gray-600">Configure emergency contacts</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </button>
        </Card>

        {/* About App */}
        <Card className="p-4 bg-white border-[var(--kitchen-brown-light)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="w-6 h-6 text-[var(--primary-kitchen)]" />
              <div>
                <h3 className="font-medium">{t.aboutApp}</h3>
                <p className="text-sm text-gray-600">{t.appVersion}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'dashboard':
        return <Dashboard />;
      case 'devices':
        return <DevicesScreen />;
      case 'alerts':
        return <AlertsScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'emergencyContacts':
        return <EmergencyContactsScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      {renderCurrentScreen()}
    </div>
  );
}