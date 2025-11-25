export const translations = {
  en: {
    // Auth
    welcome: "Welcome to AgriSense AI Pro",
    loginSubtitle: "Your intelligent farming companion",
    loginButton: "Login with Email",
    or: "or",
    continueAsGuest: "Continue as Guest",
    
    // Greetings
    hello: "Hello",
    welcomeBack: "Welcome back",
    
    // Dashboard
    dashboard: "Dashboard",
    myProfile: "My Profile",
    currentProjects: "Current Projects",
    farmPlanner: "Farm Planner",
    aiAssistant: "AI Assistant",
    communityForum: "Community Forum",
    notifications: "Notifications",
    climateInsights: "Climate Insights",
    settings: "Settings",
    logout: "Logout",
    
    // Weather
    temperature: "Temperature",
    humidity: "Humidity",
    precipitation: "Precipitation",
    windSpeed: "Wind Speed",
    forecast: "7-Day Forecast",
    
    // Projects
    noProjects: "No projects yet. Create your first farming project!",
    addProject: "Add Project",
    cropType: "Crop/Livestock",
    landArea: "Land Area",
    expectedHarvest: "Expected Harvest",
    status: "Status",
    
    // AI Chat
    askQuestion: "Ask about your farm...",
    send: "Send",
    typing: "AI is thinking...",
    
    // Image Analysis
    uploadImage: "Upload Image for Analysis",
    analyzing: "Analyzing image...",
    selectImage: "Select Image",
    
    // Community
    shareExperience: "Share your farming experience...",
    post: "Post",
    comments: "Comments",
    category: "Category",
    crops: "Crops",
    livestock: "Livestock",
    weather: "Weather",
    market: "Market",
    stories: "Success Stories",
    
    // Notifications
    markAllRead: "Mark all as read",
    noNotifications: "No notifications",
    
    // Farm Planner
    calculateProfit: "Calculate Expected Profit",
    revenue: "Expected Revenue",
    costs: "Total Costs",
    profit: "Net Profit",
    calculate: "Calculate",
  },
  sn: {
    // Auth (Shona)
    welcome: "Mauya kuAgriSense AI Pro",
    loginSubtitle: "Shamwari yako yekurima",
    loginButton: "Pinda neEmail",
    or: "kana",
    continueAsGuest: "Enderera mberi seMushanyiridzi",
    
    // Greetings
    hello: "Mhoro",
    welcomeBack: "Mauya zvakare",
    
    // Dashboard
    dashboard: "Dashboard",
    myProfile: "Profile Yangu",
    currentProjects: "Mapurojekiti Aripo",
    farmPlanner: "Kuronga Purazi",
    aiAssistant: "AI Mubatsiri",
    communityForum: "Forum yeMuhacha",
    notifications: "Ziviso",
    climateInsights: "Mamiriro Ekunze",
    settings: "Zvigadziriso",
    logout: "Buda",
    
    // Weather
    temperature: "Tembiricha",
    humidity: "Humidity",
    precipitation: "Mvura",
    windSpeed: "Mhepo",
    forecast: "Fungidziro yeMazuva Manomwe",
    
    // Projects
    noProjects: "Hapana mapurojekiti. Tanga wekutanga!",
    addProject: "Wedzera Purojekiti",
    cropType: "Chirimwa/Mhuka",
    landArea: "Saizi yePurazi",
    expectedHarvest: "Goho Rinongotarisirwa",
    status: "Mamiriro",
    
    // AI Chat
    askQuestion: "Bvunza nezve purazi rako...",
    send: "Tuma",
    typing: "AI iri kufunga...",
    
    // Image Analysis
    uploadImage: "Isa Mufananidzo Kuti Uongorore",
    analyzing: "Iri kuongorora...",
    selectImage: "Sarudza Mufananidzo",
    
    // Community
    shareExperience: "Govera zvauri kuita...",
    post: "Tumira",
    comments: "Mafungiro",
    category: "Rudzi",
    crops: "Zvirimwa",
    livestock: "Zvipfuwo",
    weather: "Mamiriro Ekunze",
    market: "Musika",
    stories: "Nyaya Dzekubudirira",
    
    // Notifications
    markAllRead: "Verenga zvese",
    noNotifications: "Hapana ziviso",
    
    // Farm Planner
    calculateProfit: "Verenga Purofiti",
    revenue: "Mari Inopinda",
    costs: "Mutengo",
    profit: "Purofiti",
    calculate: "Verenga",
  },
};

export type Language = keyof typeof translations;
