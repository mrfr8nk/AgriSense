import { useState, useEffect, useRef } from "react";
import { 
  Menu, X, Sun, Moon, Leaf, ChevronLeft, ChevronRight, 
  TrendingUp, Shield, Globe2, Zap, Heart, Rocket,
  Users, MessageSquare, Mail, Phone, MapPin, Facebook,
  Twitter, Instagram, Linkedin, ArrowRight
} from "lucide-react";

// Import generated images
import heroImage from "@assets/generated_images/eco-friendly_sustainable_farm_landscape.png";
import sliderImage1 from "@assets/generated_images/abstract_eco-green_nature_gradient.png";
import sliderImage2 from "@assets/generated_images/smart_sustainable_farming_technology.png";
import sliderImage3 from "@assets/generated_images/eco-friendly_sustainable_farm_landscape.png";

const sliderImages = [
  {
    url: sliderImage1,
    title: "Sustainable Future",
    description: "Building a greener tomorrow with modern technology",
  },
  {
    url: sliderImage2,
    title: "Innovation & Nature",
    description: "Where technology meets environmental consciousness",
  },
  {
    url: sliderImage3,
    title: "Eco-Conscious Living",
    description: "Sustainable practices for a better world",
  },
];

function ThemeToggle() {
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

  const getIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="w-5 h-5" />;
      case "eco":
        return <Leaf className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      className="p-2.5 rounded-full bg-white/10 dark:bg-white/5 eco:bg-emerald-400/10 border border-white/20 dark:border-white/10 eco:border-emerald-400/30 backdrop-blur-md hover:bg-white/20 dark:hover:bg-white/10 eco:hover:bg-emerald-400/20 transition-all duration-300 hover:scale-110"
      title={`Switch to ${
        theme === "light" ? "dark" : theme === "dark" ? "eco" : "light"
      } mode`}
    >
      {getIcon()}
    </button>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-white/10 dark:bg-white/5 eco:bg-emerald-400/10 border-b border-white/20 dark:border-white/10 eco:border-emerald-400/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 eco:from-emerald-300 eco:to-emerald-400 bg-clip-text text-transparent">
              EcoGreen
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 eco:text-emerald-900 hover:text-emerald-600 dark:hover:text-emerald-400 eco:hover:text-emerald-700 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* CTA and Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="/login"
              data-testid="button-cta-signup"
              className="hidden sm:inline-flex px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
            >
              Get Started
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
              className="md:hidden p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 eco:hover:bg-emerald-400/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/5 dark:bg-white/3 eco:bg-emerald-400/5 border-t border-white/10 dark:border-white/5 eco:border-emerald-400/20 backdrop-blur-lg">
            <div className="px-6 py-4 space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 eco:text-emerald-900 hover:text-emerald-600 dark:hover:text-emerald-400 eco:hover:text-emerald-700 py-2 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/login"
                data-testid="button-mobile-cta-signup"
                className="block w-full mt-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full font-medium text-sm transition-all text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-transparent dark:from-emerald-950/50 dark:via-black/40 eco:from-emerald-600/40 eco:via-emerald-500/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="bg-white/10 dark:bg-white/5 eco:bg-emerald-400/15 border border-white/20 dark:border-white/10 eco:border-emerald-400/40 backdrop-blur-xl rounded-3xl p-12 lg:p-16 shadow-2xl">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Sustainable
            <span className="block bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 bg-clip-text text-transparent">
              Future Starts Now
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the perfect blend of technology and nature. Build a
            better tomorrow with our eco-conscious platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              data-testid="button-hero-primary"
              className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-emerald-950 font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/50 hover:scale-105 text-center"
            >
              Get Started
            </a>
            <a
              href="#features"
              data-testid="button-hero-secondary"
              className="px-8 py-4 bg-white/10 dark:bg-white/5 eco:bg-white/15 hover:bg-white/20 dark:hover:bg-white/10 eco:hover:bg-white/25 border border-white/30 text-white font-bold rounded-full transition-all duration-300 backdrop-blur-md text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const autoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
  };

  useEffect(() => {
    autoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, []);

  const handlePrev = () => {
    clearInterval(autoPlayRef.current);
    setCurrentIndex((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
    autoPlay();
  };

  const handleNext = () => {
    clearInterval(autoPlayRef.current);
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    autoPlay();
  };

  return (
    <section className="w-full py-12 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 eco:from-emerald-50 eco:to-emerald-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
          {/* Slider Container */}
          <div className="relative w-full h-full">
            {sliderImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-800 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2">
                    {image.title}
                  </h3>
                  <p className="text-lg text-white/90">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            data-testid="button-slider-prev"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            data-testid="button-slider-next"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  clearInterval(autoPlayRef.current);
                  setCurrentIndex(index);
                  autoPlay();
                }}
                data-testid={`button-slider-dot-${index}`}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: "Sustainable Growth",
      description: "Build your business while protecting the environment",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Lightning-fast technology built for the modern world",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Enterprise-grade security for your peace of mind",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Globe2,
      title: "Global Impact",
      description: "Join a community making a difference worldwide",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Eco-Friendly",
      description: "Carbon-neutral operations and green initiatives",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Cutting-edge technology for future challenges",
      gradient: "from-red-500 to-pink-500",
    },
  ];

  return (
    <section id="features" className="w-full py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white eco:text-emerald-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 eco:text-emerald-700 max-w-2xl mx-auto">
            Everything you need to succeed in a sustainable future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                data-testid={`card-feature-${index}`}
                className="group bg-white/10 dark:bg-white/5 eco:bg-emerald-400/15 border border-white/20 dark:border-white/10 eco:border-emerald-400/40 rounded-2xl p-8 backdrop-blur-md hover:bg-white/20 dark:hover:bg-white/10 eco:hover:bg-emerald-400/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white eco:text-emerald-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 eco:text-emerald-700">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="w-full py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 eco:from-emerald-50 eco:to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src={sliderImage1}
              alt="About us"
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white eco:text-emerald-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 eco:text-emerald-700 mb-6 leading-relaxed">
              We believe that technology and nature can work together to create
              a better future. Our platform combines cutting-edge innovation
              with environmental consciousness to help you achieve your goals
              sustainably.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 eco:text-emerald-700 mb-8 leading-relaxed">
              Every decision we make is guided by our commitment to the planet
              and future generations. Join us in building a world where
              technology serves both people and nature.
            </p>
            <a
              href="/login"
              data-testid="button-about-cta"
              className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105"
            >
              Join Us Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Users,
      title: "Consulting",
      description: "Expert guidance for sustainable business transformation",
    },
    {
      icon: Rocket,
      title: "Development",
      description: "Custom solutions tailored to your needs",
    },
    {
      icon: MessageSquare,
      title: "Support",
      description: "24/7 dedicated support team ready to help",
    },
  ];

  return (
    <section id="services" className="w-full py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white eco:text-emerald-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 eco:text-emerald-700 max-w-2xl mx-auto">
            Comprehensive solutions for your sustainability goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                data-testid={`card-service-${index}`}
                className="group bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 eco:from-emerald-100 eco:to-teal-100 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800/50 eco:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white eco:text-emerald-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 eco:text-emerald-700">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer
      id="contact"
      className="w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black dark:from-black dark:to-black eco:from-emerald-900 eco:via-emerald-950 eco:to-emerald-950 text-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        {/* Newsletter Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-white/10 eco:border-emerald-400/20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-gray-400 text-lg">
              Subscribe to our newsletter for the latest updates, insights, and sustainable farming tips
            </p>
          </div>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3"
            data-testid="form-newsletter"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="input-newsletter-email"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md focus:outline-none focus:border-emerald-400/50 focus:bg-white/15 text-white placeholder-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              data-testid="button-newsletter-submit"
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-full font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Company */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-xl">EcoGreen</h4>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Building sustainable solutions for a better tomorrow. Empowering farmers with technology and environmental consciousness.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-400/50 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-400/50 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-400/50 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-400/50 flex items-center justify-center transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#home"
                  data-testid="link-footer-home"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  data-testid="link-footer-features"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  data-testid="link-footer-about"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  data-testid="link-footer-blog"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-testid="link-footer-docs"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-testid="link-footer-support"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <Mail className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                <a href="mailto:info@ecogreen.com" className="hover:text-emerald-400 transition-colors">
                  info@ecogreen.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Phone className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>Green Valley, Earth</span>
              </li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href="#"
                data-testid="link-footer-privacy"
                className="text-xs text-gray-400 hover:text-emerald-400 transition-colors block mb-2"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                data-testid="link-footer-terms"
                className="text-xs text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 eco:border-emerald-400/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; 2025 EcoGreen. All rights reserved. Built with
            <span className="text-emerald-400 mx-1">♻️</span>
            for a sustainable future.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Secured & Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  useEffect(() => {
    // Add scroll animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 eco:bg-emerald-50 transition-colors duration-300">
      <Header />
      <Hero />
      <ImageSlider />
      <Features />
      <About />
      <Services />
      <Footer />
    </div>
  );
}
