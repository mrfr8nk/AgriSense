import { useState, useEffect, useRef } from "react";
import { useApp } from "@/contexts/AppContext";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Cloud, CloudRain, Droplets, Wind, Leaf, MessageSquare, Send, Upload,
  Calculator, Users, Bell, Globe, LogOut, Plus, TrendingUp, AlertTriangle,
  Sprout, Target, DollarSign, Calendar, ThumbsUp, MessageCircle, Image as ImageIcon, X,
  Sun, Moon
} from "lucide-react";
import type { Project, CommunityPost, Notification, ChatMessage, AnalysisReport } from "@shared/schema";

export default function Dashboard() {
  const { farmer, setFarmer, language, setLanguage, t } = useApp();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "chat" | "analysis" | "planner" | "community">("overview");
  const [theme, setTheme] = useState<"light" | "dark" | "eco">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme as "light" | "dark" | "eco");
    applyTheme(savedTheme as "light" | "dark" | "eco");
  }, []);

  const applyTheme = (t: "light" | "dark" | "eco") => {
    const html = document.documentElement;
    html.classList.remove("dark", "eco");
    if (t === "dark") {
      html.classList.add("dark");
    } else if (t === "eco") {
      html.classList.add("eco");
    }
    localStorage.setItem("theme", t);
  };

  const toggleTheme = () => {
    const themes: ("light" | "dark" | "eco")[] = ["light", "dark", "eco"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="w-5 h-5" />;
      case "eco":
        return <Leaf className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  // Logout handler
  const handleLogout = () => {
    setFarmer(null);
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t.hello}, {farmer?.name || "Farmer"}!
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.welcomeBack}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
                className="p-2.5 rounded-full bg-white/10 dark:bg-white/5 eco:bg-emerald-400/10 border border-white/20 dark:border-white/10 eco:border-emerald-400/30 backdrop-blur-md hover:bg-white/20 dark:hover:bg-white/10 eco:hover:bg-emerald-400/20 transition-all duration-300 hover:scale-110"
                title={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "eco" : "light"} mode`}
              >
                {getThemeIcon()}
              </button>
              <button
                onClick={() => setLanguage(language === "en" ? "sn" : "en")}
                data-testid="button-language-toggle"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">
                  {language === "en" ? "Shona" : "English"}
                </span>
              </button>
              <Button
                onClick={handleLogout}
                data-testid="button-logout"
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t.logout}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: "overview", label: t.dashboard, icon: Sprout },
            { id: "chat", label: t.aiAssistant, icon: MessageSquare },
            { id: "analysis", label: language === "en" ? "Image Analysis" : "Kuongorora Mifananidzo", icon: ImageIcon },
            { id: "planner", label: t.farmPlanner, icon: Calculator },
            { id: "community", label: t.communityForum, icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              data-testid={`button-tab-${tab.id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {farmer && (
          <>
            {activeTab === "overview" && <OverviewTab farmerId={farmer.id} />}
            {activeTab === "chat" && <ChatTab farmerId={farmer.id} />}
            {activeTab === "analysis" && <ImageAnalysisTab farmerId={farmer.id} />}
            {activeTab === "planner" && <PlannerTab farmerId={farmer.id} />}
            {activeTab === "community" && <CommunityTab farmerId={farmer.id} farmerName={farmer.name} />}
          </>
        )}
      </main>
    </div>
  );
}

// Overview Tab
function OverviewTab({ farmerId }: { farmerId: string }) {
  const { t } = useApp();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Weather Card */}
      <div className="lg:col-span-2">
        <WeatherCard />
      </div>

      {/* Notifications */}
      <div>
        <NotificationsCard farmerId={farmerId} />
      </div>

      {/* Projects */}
      <div className="lg:col-span-3">
        <ProjectsCard farmerId={farmerId} />
      </div>
    </div>
  );
}

// Weather Card
function WeatherCard() {
  const { t, language } = useApp();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [locationDenied, setLocationDenied] = useState(false);

  useEffect(() => {
    // Get user location - NO FALLBACK TO FAKE DATA
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationDenied(false);
        },
        () => {
          // Don't set fake coordinates - mark as denied
          setLocationDenied(true);
        }
      );
    } else {
      setLocationDenied(true);
    }
  }, []);

  // Fetch location name from coordinates
  useEffect(() => {
    if (latitude && longitude) {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(res => res.json())
        .then(data => {
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || "Your Location";
          const country = data.address?.country || "";
          setLocationName(`${city}, ${country}`.trim());
        })
        .catch(() => setLocationName(language === "en" ? "Current Location" : "Nzvimbo Yako"));
    }
  }, [latitude, longitude, language]);

  const { data: weather, isLoading } = useQuery<any>({
    queryKey: ["/api/weather", latitude, longitude],
    queryFn: async () => {
      const response = await fetch(`/api/weather/${latitude}/${longitude}`);
      if (!response.ok) throw new Error("Failed to fetch weather");
      return response.json();
    },
    enabled: !!latitude && !!longitude,
  });

  // Show message if location is denied or unavailable
  if (locationDenied) {
    return (
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            {t.climateInsights}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-900 dark:text-white font-semibold">
              {language === "en" ? "Location Access Required" : "Kufunga Kweshemu Kunoshaiwa"}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {language === "en" 
                ? "Please enable location access in your browser settings to see weather data for your farm." 
                : "Ndapakurudzira kugadzirisa location access mu browser settings kuti uone weather data yeshemu yako."}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              {language === "en"
                ? "Real-time weather data requires your accurate GPS location."
                : "Real-time weather data inoda yako yechokwadi GPS location."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || !weather?.current) {
    return (
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            {t.climateInsights}
          </CardTitle>
          {locationName && (
            <CardDescription className="text-base mt-2">
              📍 {locationName}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">{language === "en" ? "Loading weather..." : "Iri kurodha..."}</p>
        </CardContent>
      </Card>
    );
  }

  const current = weather.current || {};
  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Cloud className="w-8 h-8" />;
    if (code <= 3) return <Cloud className="w-8 h-8" />;
    if (code <= 67) return <CloudRain className="w-8 h-8" />;
    return <Cloud className="w-8 h-8" />;
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getWeatherIcon(current.weather_code)}
          {t.climateInsights}
        </CardTitle>
        <div className="mt-2 space-y-1">
          <CardDescription className="text-base font-semibold text-gray-900 dark:text-white">
            📍 {locationName}
          </CardDescription>
          <CardDescription>{language === "en" ? "Current Conditions" : "Zvino Zvakaita"}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
              <Target className="w-4 h-4" />
              <span className="text-sm">{t.temperature}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(current.temperature_2m)}°C
            </p>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
              <Droplets className="w-4 h-4" />
              <span className="text-sm">{t.humidity}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(current.relative_humidity_2m)}%
            </p>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
              <CloudRain className="w-4 h-4" />
              <span className="text-sm">{t.precipitation}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {current.precipitation} mm
            </p>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
              <Wind className="w-4 h-4" />
              <span className="text-sm">{t.windSpeed}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(current.wind_speed_10m)} km/h
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Notifications Card
function NotificationsCard({ farmerId }: { farmerId: string }) {
  const { t } = useApp();
  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: [`/api/farmers/${farmerId}/notifications`],
    enabled: !!farmerId,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          {t.notifications}
          {unreadCount > 0 && (
            <span className="ml-auto px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t.noNotifications}</p>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg ${
                  notification.read
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Projects Card
function ProjectsCard({ farmerId }: { farmerId: string }) {
  const { t, language } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    type: "crop",
    landSize: "",
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: [`/api/farmers/${farmerId}/projects`],
    enabled: !!farmerId,
  });

  const { toast } = useToast();

  const addProjectMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/farmers/${farmerId}/projects`] });
      setShowAddForm(false);
      setNewProject({ name: "", type: "crop", landSize: "" });
      toast({
        title: language === "en" ? "Project Created!" : "Proyekiti Yaumbwa!",
        description: language === "en" ? "Your project was added successfully" : "Proyekiti yako yaimbwa zvakanyanya",
      });
    },
  });

  const handleAddProject = () => {
    if (!newProject.name || !farmerId) return;
    addProjectMutation.mutate({
      name: newProject.name,
      type: newProject.type,
      landSize: newProject.landSize ? parseFloat(newProject.landSize) : null,
      farmerId: farmerId,
    });
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sprout className="w-5 h-5" />
            {t.currentProjects}
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            data-testid="button-add-project"
            size="sm"
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            {t.addProject}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg space-y-3">
            <Input
              placeholder={t.cropType}
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              data-testid="input-project-name"
            />
            <Input
              placeholder={t.landArea + " (hectares)"}
              type="number"
              value={newProject.landSize}
              onChange={(e) => setNewProject({ ...newProject, landSize: e.target.value })}
              data-testid="input-project-land-size"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddProject} disabled={addProjectMutation.isPending || !newProject.name} data-testid="button-save-project" className="flex-1">
                {addProjectMutation.isPending ? (language === "en" ? "Saving..." : "Iri kusave...") : (language === "en" ? "Save" : "Chengetedza")}
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" disabled={addProjectMutation.isPending}>
                {language === "en" ? "Cancel" : "Kanzura"}
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 col-span-full">{t.noProjects}</p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800"
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{project.name}</h4>
                {project.landSize && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {project.landSize} {language === "en" ? "hectares" : "mahekita"}
                  </p>
                )}
                <span className="inline-block mt-2 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs rounded-full">
                  {project.status}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Chat Tab
function ChatTab({ farmerId }: { farmerId: string }) {
  const { t, language } = useApp();
  const [messages, setMessages] = useState<any[]>([]);
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const uploadToCatbox = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success || !data.data.url) {
        throw new Error("Invalid response from server");
      }
      return data.data.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: language === "en" ? "Please select an image file" : "Sarudza mufananidzo",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Error",
        description: language === "en" ? "Image too large (max 10MB)" : "Mufananidzo mukuru zvikuru",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadToCatbox(file);
      setImageUrl(url);
      toast({
        title: language === "en" ? "Upload Complete" : "Yaisa",
        description: language === "en" ? "Image uploaded successfully" : "Mufananidzo waisa",
      });
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast({
        title: "Error",
        description: language === "en" ? `Failed to upload: ${error.message || 'Unknown error'}` : "Hazvina kubuda",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSend = async () => {
    if (!question.trim() || isProcessing) return;

    const userMsg = question;
    setMessages((prev) => [...prev, { type: "user", content: userMsg, timestamp: new Date() }]);
    setQuestion("");
    setIsProcessing(true);

    try {
      const prompt = encodeURIComponent("You are a helpful farming assistant. Provide practical advice about crops, livestock, weather, and farming.");
      const q = encodeURIComponent(userMsg);
      const response = await fetch(
        `https://api.bk9.dev/ai/BK9?BK9=${prompt}&q=${q}&model=gemini_2_5_flash`
      );

      if (!response.ok) throw new Error("API error");
      const data = await response.json();

      if (data.status && data.BK9) {
        setMessages((prev) => [...prev, { type: "assistant", content: data.BK9, timestamp: new Date() }]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error: any) {
      setMessages((prev) => [...prev, { 
        type: "error", 
        content: language === "en" ? "Failed to get response" : "Hazvina kubuda", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="bg-gradient-to-br from-white/80 to-emerald-50/80 dark:from-gray-800/80 dark:to-emerald-950/20 backdrop-blur-xl border-2 border-emerald-200/50 dark:border-emerald-800/30 shadow-2xl">
        <CardHeader className="border-b border-emerald-200/50 dark:border-emerald-800/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{t.aiAssistant}</CardTitle>
                <CardDescription className="text-sm">
                  {language === "en"
                    ? "Get expert farming advice powered by AI"
                    : "Wana rubatsiro rwevarimi kubva kuAI"}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-emerald-50/30 dark:to-emerald-950/10">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === "en" ? "Start a conversation with your AI farming assistant" : "Tanga kukurukura neAI yekurima"}
                  </p>
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-300`}>
                <div className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-lg ${
                  msg.type === "user"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-br-sm"
                    : msg.type === "error"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-bl-sm"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-emerald-200/50 dark:border-emerald-800/30 rounded-bl-sm"
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">{msg.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="max-w-[75%] px-5 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-gray-800 border border-emerald-200/50 dark:border-emerald-800/30 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{language === "en" ? "AI is thinking..." : "AI iri kuva nedudziramombe..."}</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-emerald-200/50 dark:border-emerald-800/30 bg-white/50 dark:bg-gray-900/50">
            {imageUrl && (
              <div className="mb-3 relative inline-block">
                <img src={imageUrl} alt="Attached" className="h-20 w-20 object-cover rounded-lg border-2 border-emerald-500" />
                <button
                  onClick={() => setImageUrl("")}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                  className="hidden"
                />
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all">
                  {isUploading ? (
                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ImageIcon className="w-5 h-5" />
                  )}
                </div>
              </label>
              <Input
                placeholder={t.askQuestion}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                data-testid="input-chat-question"
                disabled={isProcessing}
                className="flex-1 bg-white/80 dark:bg-gray-800/80 border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <Button
                onClick={handleSend}
                data-testid="button-send-chat"
                disabled={isProcessing || !question.trim()}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6"
              >
                {isProcessing ? <span className="animate-spin">⟳</span> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Image Analysis Tab - Using stable Catbox upload via /api/upload endpoint
function ImageAnalysisTab({ farmerId }: { farmerId: string }) {
  const { language } = useApp();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadToCatbox = async (file: File) => {
    try {
      setUploading(true);
      setUploadError("");

      if (file.size > 200 * 1024 * 1024) {
        throw new Error(language === "en" ? "File too large. Max size is 200MB" : "Faili nokurebuka. Max size 200MB");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Upload failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.data.url) {
        throw new Error("Invalid response from server");
      }

      return data.data.url;
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadError(error.message);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError(language === "en" ? "Please select an image file" : "Sarudza mufananidzo");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = (e.target as FileReader | null)?.result;
        if (result) {
          setSelectedImage(result as string);
        }
      };
      reader.readAsDataURL(file);

      const url = await uploadToCatbox(file);
      setImageUrl(url);

      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          content: language === "en" 
            ? `✓ Image uploaded successfully!\nURL: ${url}` 
            : `✓ Mufananidzo waisa zvakanyanya!\nURL: ${url}`,
          imageUrl: url,
          timestamp: new Date(),
        },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: language === "en"
            ? `✗ Failed to upload image: ${error.message}`
            : `✗ Hazvina kubuda kuisa: ${error.message}`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const processWithVision = async (question: string, imgUrl: string) => {
    try {
      setProcessing(true);
      const apiUrl = `https://api.bk9.dev/ai/vision?q=${encodeURIComponent(question)}&image_url=${encodeURIComponent(imgUrl)}&model=meta-llama/llama-4-scout-17b-16e-instruct`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status && data.BK9) {
        return data.BK9;
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error: any) {
      console.error("Vision API error:", error);
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || processing) return;

    if (!imageUrl) {
      setUploadError(language === "en" ? "Please upload an image first" : "Isa mufananidzo ntanga");
      return;
    }

    const userMessage = {
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await processWithVision(input, imageUrl);

      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: language === "en"
            ? `✗ Failed to process: ${error.message}`
            : `✗ Hazvina kubuda kupanga: ${error.message}`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImageUrl("");
    setUploadError("");
    setMessages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          {language === "en" ? "Crop Analysis with Vision AI" : "Kuongorora Zvirimwa ne Vision AI"}
        </CardTitle>
        <CardDescription>
          {language === "en"
            ? "Upload images and ask questions about your crops"
            : "Isa mifananidzo uye buza mibvunzo nezvirimwa"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {uploadError && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
            <X className="w-4 h-4" />
            {uploadError}
          </div>
        )}

        {selectedImage && (
          <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <img src={selectedImage} alt="Preview" className="h-12 w-12 object-cover rounded" />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                {language === "en" ? "Image Ready" : "Mufananidzo Nzira"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{imageUrl}</p>
            </div>
            <button
              onClick={clearImage}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex-1 gap-2"
          >
            {uploading ? (
              <>
                <MessageSquare className="w-4 h-4 animate-spin" />
                {language === "en" ? "Uploading..." : "Iri kuisa..."}
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                {language === "en" ? "Upload Image" : "Isa Mufananidzo"}
              </>
            )}
          </Button>
        </div>

        {messages.length > 0 && (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg ${
                  msg.type === "user"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-gray-900 dark:text-white"
                    : msg.type === "error"
                    ? "bg-red-100 dark:bg-red-900/20 text-red-900 dark:text-red-200"
                    : "bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                }`}
              >
                {msg.imageUrl && <img src={msg.imageUrl} alt="Analysis" className="rounded mb-2 max-w-xs" />}
                <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={
              imageUrl
                ? language === "en"
                  ? "Ask about the image..."
                  : "Buza zvemuvanhu wemufananidzo..."
                : language === "en"
                ? "Upload image first..."
                : "Isa mufananidzo ntanga..."
            }
            disabled={!imageUrl || processing}
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || !imageUrl || processing}
            size="icon"
          >
            {processing ? <MessageSquare className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}

// Farm Planner Tab
function PlannerTab({ farmerId }: { farmerId: string }) {
  const { t, language } = useApp();
  const [planner, setPlanner] = useState({
    crop: "",
    landSize: "",
    expectedYield: "",
    seedCost: "",
    fertilizerCost: "",
    laborCost: "",
    marketPrice: "",
  });
  const [result, setResult] = useState<any>(null);

  const calculateProfit = () => {
    const costs = {
      seeds: parseFloat(planner.seedCost) || 0,
      fertilizer: parseFloat(planner.fertilizerCost) || 0,
      labor: parseFloat(planner.laborCost) || 0,
    };
    const totalCosts = costs.seeds + costs.fertilizer + costs.labor;
    const revenue = (parseFloat(planner.expectedYield) || 0) * (parseFloat(planner.marketPrice) || 0);
    const profit = revenue - totalCosts;

    setResult({
      crop: planner.crop,
      costs,
      totalCosts,
      revenue,
      profit,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            {t.farmPlanner}
          </CardTitle>
          <CardDescription>{t.calculateProfit}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder={t.cropType}
            value={planner.crop}
            onChange={(e) => setPlanner({ ...planner, crop: e.target.value })}
            data-testid="input-planner-crop"
          />
          <Input
            placeholder={t.landArea + " (hectares)"}
            type="number"
            value={planner.landSize}
            onChange={(e) => setPlanner({ ...planner, landSize: e.target.value })}
            data-testid="input-planner-land"
          />
          <Input
            placeholder={t.expectedHarvest + " (kg)"}
            type="number"
            value={planner.expectedYield}
            onChange={(e) => setPlanner({ ...planner, expectedYield: e.target.value })}
            data-testid="input-planner-yield"
          />
          <Input
            placeholder={language === "en" ? "Seed Cost ($)" : "Mutengo weMbeu ($)"}
            type="number"
            value={planner.seedCost}
            onChange={(e) => setPlanner({ ...planner, seedCost: e.target.value })}
            data-testid="input-planner-seed-cost"
          />
          <Input
            placeholder={language === "en" ? "Fertilizer Cost ($)" : "Mutengo weFetiraiza ($)"}
            type="number"
            value={planner.fertilizerCost}
            onChange={(e) => setPlanner({ ...planner, fertilizerCost: e.target.value })}
            data-testid="input-planner-fertilizer-cost"
          />
          <Input
            placeholder={language === "en" ? "Labor Cost ($)" : "Mutengo weVashandi ($)"}
            type="number"
            value={planner.laborCost}
            onChange={(e) => setPlanner({ ...planner, laborCost: e.target.value })}
            data-testid="input-planner-labor-cost"
          />
          <Input
            placeholder={language === "en" ? "Market Price per kg ($)" : "Mutengo paMusika ($)"}
            type="number"
            value={planner.marketPrice}
            onChange={(e) => setPlanner({ ...planner, marketPrice: e.target.value })}
            data-testid="input-planner-price"
          />
          <Button onClick={calculateProfit} data-testid="button-calculate" className="w-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t.calculate}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 backdrop-blur-xl border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle>{language === "en" ? "Forecast Results" : "Mhedzisiro"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.costs}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${result.totalCosts.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.revenue}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${result.revenue.toFixed(2)}</p>
            </div>
            <div className={`p-4 rounded-lg ${result.profit >= 0 ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.profit}</p>
              <p className={`text-2xl font-bold ${result.profit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                ${result.profit.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Community Tab
function CommunityTab({ farmerId, farmerName }: { farmerId: string; farmerName: string }) {
  const { t, language } = useApp();
  const [newPost, setNewPost] = useState({ content: "", category: "crops" });
  const { toast } = useToast();

  const { data: posts = [] } = useQuery<CommunityPost[]>({
    queryKey: ["/api/community/posts"],
  });

  const postMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/community/posts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community/posts"] });
      setNewPost({ content: "", category: "crops" });
      toast({
        title: language === "en" ? "Posted!" : "Posta Yabudiswa!",
        description: language === "en" ? "Your post was shared" : "Posta yako yabudiswa",
      });
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: (postId: string) => apiRequest("POST", `/api/community/posts/${postId}/upvote`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community/posts"] });
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {posts.length === 0 ? (
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">{language === "en" ? "No posts yet. Be the first to share!" : "Hakuna maposta. Uye ntanga!"}</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                        {post.farmerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <CardTitle className="text-base">{post.farmerName}</CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(post.timestamp).toLocaleDateString()} • {post.category}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-900 dark:text-white leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    onClick={() => upvoteMutation.mutate(post.id)}
                    variant="outline"
                    size="sm"
                    className="gap-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                    data-testid={`button-upvote-${post.id}`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{post.upvotes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{t.comments}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 h-fit">
        <CardHeader>
          <CardTitle>{language === "en" ? "Share Update" : "Govera Vanhu"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={t.shareExperience}
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            data-testid="textarea-post-content"
            rows={4}
          />
          <select
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            data-testid="select-post-category"
          >
            <option value="crops">{t.crops}</option>
            <option value="livestock">{t.livestock}</option>
            <option value="weather">{t.weather}</option>
            <option value="market">{t.market}</option>
            <option value="stories">{t.stories}</option>
          </select>
          <Button
            onClick={() => {
              if (!newPost.content || !farmerId || !farmerName) {
                console.log("Missing data:", { content: newPost.content, farmerId, farmerName });
                return;
              }
              postMutation.mutate({
                content: newPost.content,
                category: newPost.category,
                farmerId: farmerId,
                farmerName: farmerName,
                timestamp: new Date().toISOString(),
              });
            }}
            disabled={postMutation.isPending || !newPost.content || !farmerId || !farmerName}
            data-testid="button-submit-post"
            className="w-full"
          >
            {postMutation.isPending ? (language === "en" ? "Posting..." : "Iri kubudisa...") : (
              <>
                <Users className="w-4 h-4 mr-2" />
                {t.post}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}