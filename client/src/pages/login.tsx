import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { Leaf, Mail, Globe, Loader } from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginWithGoogle, onAuthChange } from "@/lib/firebase";
import type { Farmer } from "@shared/schema";
import farmerImage from "@assets/generated_images/african_farmer_with_technology.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { setFarmer, language, setLanguage, t } = useApp();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check if user is already logged in via Google
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        try {
          // Try to find or create farmer
          let farmer: Farmer;
          try {
            const response = await fetch(`/api/auth/farmer/${encodeURIComponent(user.email || "")}`);
            if (response.ok) {
              farmer = await response.json() as Farmer;
            } else {
              farmer = await apiRequest("POST", "/api/auth/register", {
                email: user.email,
                name: user.displayName || "Farmer",
                language,
                farmingType: "mixed",
              }) as Farmer;
            }
          } catch {
            farmer = await apiRequest("POST", "/api/auth/register", {
              email: user.email,
              name: user.displayName || "Farmer",
              language,
              farmingType: "mixed",
            }) as Farmer;
          }

          setFarmer(farmer);
          setLocation("/dashboard");
        } catch (error) {
          console.error("Auth error:", error);
          setIsAuthLoading(false);
        }
      } else {
        setIsAuthLoading(false);
      }
    });

    return unsubscribe;
  }, [setFarmer, setLocation, language]);

  const handleGoogleLogin = async () => {
    try {
      loginWithGoogle();
    } catch (error: any) {
      toast({
        title: "Error",
        description: language === "en" ? "Google login failed" : "Google login hazvina kubuda",
        variant: "destructive",
      });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Error",
        description: language === "en" ? "Please enter your name and email" : "Please enter your details",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      let farmer: Farmer;
      try {
        const response = await fetch(`/api/auth/farmer/${encodeURIComponent(email)}`);
        if (response.ok) {
          farmer = await response.json() as Farmer;
        } else {
          farmer = await apiRequest("POST", "/api/auth/register", {
            email,
            name,
            language,
            farmingType: "mixed",
          }) as Farmer;
        }
      } catch {
        farmer = await apiRequest("POST", "/api/auth/register", {
          email,
          name,
          language,
          farmingType: "mixed",
        }) as Farmer;
      }

      setFarmer(farmer);
      toast({
        title: language === "en" ? "Welcome!" : "Mauya!",
        description: language === "en" ? "Login successful" : "Mapinda",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || (language === "en" ? "Login failed" : "Login hazvina kubuda"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/20">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{language === "en" ? "Loading..." : "Iri kupinda..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/20 p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <img src={farmerImage} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 hover:shadow-3xl transition-all duration-300">
          {/* Language Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setLanguage(language === "en" ? "sn" : "en")}
              data-testid="button-language-toggle"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "Shona" : "English"}</span>
            </button>
          </div>

          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mb-4 animate-bounce">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t.welcome}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t.loginSubtitle}
            </p>
          </div>

          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            data-testid="button-google-login"
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 py-6 mb-4 font-bold"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {language === "en" ? "Continue with Google" : "Paduka neGoogle"}
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                {language === "en" ? "or" : "kana"}
              </span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder={language === "en" ? "Your Name" : "Zita Renyu"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="input-name"
                className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 backdrop-blur-sm"
                disabled={isLoading}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder={language === "en" ? "Email Address" : "Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-email"
                className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 backdrop-blur-sm"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              data-testid="button-email-login"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  {language === "en" ? "Logging in..." : "Iri kupinda..."}
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  {t.loginButton}
                </>
              )}
            </Button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>{language === "en" ? "Your data is securely stored" : "Data yako yakachengetedzeka"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
