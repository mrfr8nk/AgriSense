import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Leaf, Mail, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Farmer } from "@shared/schema";
import farmerImage from "@assets/generated_images/african_farmer_with_technology.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setFarmer, language, setLanguage, t } = useApp();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Error",
        description: "Please enter your name and email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Try to find existing farmer
      let farmer: Farmer;
      try {
        const response = await fetch(`/api/auth/farmer/${encodeURIComponent(email)}`);
        if (response.ok) {
          farmer = await response.json() as Farmer;
        } else {
          // Create new farmer
          farmer = await apiRequest("POST", "/api/auth/register", {
            email,
            name,
            language,
            farmingType: "mixed",
          }) as Farmer;
        }
      } catch {
        // Create new farmer
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
        description: error.message || "Login failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/20 p-4">
      {/* Background Image */}
      <div className="fixed inset-0 opacity-10">
        <img
          src={farmerImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t.welcome}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t.loginSubtitle}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
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
              data-testid="button-login"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-6"
              disabled={isLoading}
            >
              <Mail className="w-5 h-5 mr-2" />
              {isLoading ? (language === "en" ? "Logging in..." : "Iri kupinda...") : t.loginButton}
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
