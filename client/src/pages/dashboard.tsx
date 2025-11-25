import { useState, useEffect } from "react";
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
                  {t.hello}, {farmer.name}!
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
        {activeTab === "overview" && <OverviewTab farmerId={farmer.id} />}
        {activeTab === "chat" && <ChatTab farmerId={farmer.id} />}
        {activeTab === "analysis" && <ImageAnalysisTab farmerId={farmer.id} />}
        {activeTab === "planner" && <PlannerTab farmerId={farmer.id} />}
        {activeTab === "community" && <CommunityTab farmerId={farmer.id} farmerName={farmer.name} />}
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

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          // Default to Harare, Zimbabwe if geolocation fails
          setLatitude(-17.8277);
          setLongitude(31.0534);
        }
      );
    } else {
      setLatitude(-17.8277);
      setLongitude(31.0534);
    }
  }, []);

  const { data: weather, isLoading } = useQuery({
    queryKey: ["/api/weather", latitude, longitude],
    enabled: !!latitude && !!longitude,
  });

  if (isLoading || !weather) {
    return (
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            {t.climateInsights}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Loading weather...</p>
        </CardContent>
      </Card>
    );
  }

  const current = weather.current;
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
        <CardDescription>Current Conditions</CardDescription>
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
  const { t } = useApp();
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

  const addProjectMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/farmers/${farmerId}/projects`] });
      setShowAddForm(false);
      setNewProject({ name: "", type: "crop", landSize: "" });
    },
  });

  const handleAddProject = () => {
    if (!newProject.name) return;
    addProjectMutation.mutate({
      ...newProject,
      farmerId,
      landSize: newProject.landSize ? parseFloat(newProject.landSize) : null,
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
              <Button onClick={handleAddProject} data-testid="button-save-project" className="flex-1">
                {language === "en" ? "Save" : "Chengetedza"}
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">
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
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const { data: messages = [], refetch } = useQuery<ChatMessage[]>({
    queryKey: [`/api/farmers/${farmerId}/chat`],
    enabled: !!farmerId,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const chatMutation = useMutation({
    mutationFn: (q: string) => apiRequest("POST", "/api/ai/chat", { question: q, farmerId }),
    onSuccess: () => {
      refetch();
      setQuestion("");
      setImageUrl("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: language === "en" ? "Failed to send message" : "Hazvina kubuda",
        variant: "destructive",
      });
    },
  });

  const uploadToCatbox = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', file);

    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return await response.text();
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

    setIsUploading(true);
    try {
      const url = await uploadToCatbox(file);
      setImageUrl(url);
      toast({
        title: language === "en" ? "Upload Complete" : "Yaisa",
        description: language === "en" ? "Image uploaded successfully" : "Mufananidzo waisa",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: language === "en" ? "Failed to upload image" : "Hazvina kubuda",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSend = () => {
    if (!question.trim()) return;
    const finalQuestion = imageUrl ? `${question}\n\nImage: ${imageUrl}` : question;
    chatMutation.mutate(finalQuestion);
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
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-300`}
              >
                <div
                  className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-lg ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-emerald-200/50 dark:border-emerald-800/30 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="max-w-[75%] px-5 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-gray-800 border border-emerald-200/50 dark:border-emerald-800/30 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
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
                disabled={chatMutation.isPending}
                className="flex-1 bg-white/80 dark:bg-gray-800/80 border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <Button
                onClick={handleSend}
                data-testid="button-send-chat"
                disabled={chatMutation.isPending || !question.trim()}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Image Analysis Tab
function ImageAnalysisTab({ farmerId }: { farmerId: string }) {
  const { t, language } = useApp();
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const { data: reports = [], refetch: refetchReports } = useQuery<AnalysisReport[]>({
    queryKey: [`/api/farmers/${farmerId}/analysis`],
    enabled: !!farmerId,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const uploadToCatbox = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', file);

    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return await response.text();
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

    setIsUploading(true);
    try {
      const url = await uploadToCatbox(file);
      setImageUrl(url);
      toast({
        title: language === "en" ? "Upload Complete" : "Yaisa",
        description: language === "en" ? "Image uploaded successfully" : "Mufananidzo waisa",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: language === "en" ? "Failed to upload image" : "Hazvina kubuda",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const analyzeMutation = useMutation({
    mutationFn: (url: string) => apiRequest("POST", "/api/ai/analyze-image", { imageUrl: url, farmerId }),
    onSuccess: () => {
      refetchReports();
      setImageUrl("");
      toast({
        title: language === "en" ? "Analysis Complete" : "Kuongorora Kwapera",
        description: language === "en" ? "Image analyzed successfully" : "Mufananidzo waongororwa",
      });
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            {t.uploadImage}
          </CardTitle>
          <CardDescription>
            {language === "en"
              ? "Upload a photo of your crops or livestock for AI analysis"
              : "Isa mufananidzo wezvirimwa kana zvipfuwo zvako kuti AI iongorore"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="image-file-input"
                className="cursor-pointer w-full px-4 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-emerald-500 transition-colors text-center"
              >
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isUploading
                    ? (language === "en" ? "Uploading..." : "Iri kuisa...")
                    : (language === "en" ? "Click to select image" : "Dzvanya usarudze mufananidzo")}
                </span>
              </label>
              <input
                id="image-file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
                className="hidden"
                data-testid="input-image-file"
              />
            </div>
            
            {imageUrl && (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <Button
              onClick={() => analyzeMutation.mutate(imageUrl)}
              disabled={analyzeMutation.isPending || !imageUrl || isUploading}
              data-testid="button-analyze-image"
              className="w-full"
            >
              {analyzeMutation.isPending ? t.analyzing : (language === "en" ? "Analyze Image" : "Ongorora")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle>{language === "en" ? "Analysis History" : "Zvakamboongorwa"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {reports.map((report) => (
              <div key={report.id} className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                  {report.diagnosis}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
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
        {posts.map((post) => (
          <Card key={post.id} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{post.farmerName}</CardTitle>
                  <CardDescription>
                    {new Date(post.timestamp).toLocaleDateString()} • {post.category}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900 dark:text-white mb-4">{post.content}</p>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => upvoteMutation.mutate(post.id)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  data-testid={`button-upvote-${post.id}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  {post.upvotes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {t.comments}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
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
              if (!newPost.content) return;
              postMutation.mutate({
                ...newPost,
                farmerId,
                farmerName,
              });
            }}
            disabled={postMutation.isPending || !newPost.content}
            data-testid="button-submit-post"
            className="w-full"
          >
            <Users className="w-4 h-4 mr-2" />
            {t.post}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
