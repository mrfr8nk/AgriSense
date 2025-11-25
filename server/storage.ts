import {
  type Farmer,
  type InsertFarmer,
  type Project,
  type InsertProject,
  type AnalysisReport,
  type InsertAnalysisReport,
  type CommunityPost,
  type InsertCommunityPost,
  type Comment,
  type InsertComment,
  type Notification,
  type InsertNotification,
  type WeatherCache,
  type InsertWeatherCache,
  type ChatMessage,
  type InsertChatMessage,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Farmers
  getFarmer(id: string): Promise<Farmer | undefined>;
  getFarmerByEmail(email: string): Promise<Farmer | undefined>;
  createFarmer(farmer: InsertFarmer): Promise<Farmer>;
  updateFarmer(id: string, farmer: Partial<InsertFarmer>): Promise<Farmer | undefined>;

  // Projects
  getProjectsByFarmerId(farmerId: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Analysis Reports
  getAnalysisReportsByFarmerId(farmerId: string): Promise<AnalysisReport[]>;
  createAnalysisReport(report: InsertAnalysisReport): Promise<AnalysisReport>;

  // Community Posts
  getCommunityPosts(category?: string): Promise<CommunityPost[]>;
  getPost(id: string): Promise<CommunityPost | undefined>;
  createPost(post: InsertCommunityPost): Promise<CommunityPost>;
  upvotePost(id: string): Promise<CommunityPost | undefined>;

  // Comments
  getCommentsByPostId(postId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;

  // Notifications
  getNotificationsByFarmerId(farmerId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<Notification | undefined>;

  // Weather Cache
  getWeatherCache(location: string): Promise<WeatherCache | undefined>;
  setWeatherCache(cache: InsertWeatherCache): Promise<WeatherCache>;

  // Chat Messages
  getChatMessagesByFarmerId(farmerId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private farmers: Map<string, Farmer>;
  private projects: Map<string, Project>;
  private analysisReports: Map<string, AnalysisReport>;
  private communityPosts: Map<string, CommunityPost>;
  private comments: Map<string, Comment>;
  private notifications: Map<string, Notification>;
  private weatherCache: Map<string, WeatherCache>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.farmers = new Map();
    this.projects = new Map();
    this.analysisReports = new Map();
    this.communityPosts = new Map();
    this.comments = new Map();
    this.notifications = new Map();
    this.weatherCache = new Map();
    this.chatMessages = new Map();
  }

  // Farmers
  async getFarmer(id: string): Promise<Farmer | undefined> {
    return this.farmers.get(id);
  }

  async getFarmerByEmail(email: string): Promise<Farmer | undefined> {
    return Array.from(this.farmers.values()).find((f) => f.email === email);
  }

  async createFarmer(insertFarmer: InsertFarmer): Promise<Farmer> {
    const id = randomUUID();
    const farmer: Farmer = {
      ...insertFarmer,
      id,
      age: insertFarmer.age ?? null,
      region: insertFarmer.region ?? null,
      createdAt: new Date(),
    };
    this.farmers.set(id, farmer);
    return farmer;
  }

  async updateFarmer(id: string, updates: Partial<InsertFarmer>): Promise<Farmer | undefined> {
    const farmer = this.farmers.get(id);
    if (!farmer) return undefined;
    const updated = { ...farmer, ...updates };
    this.farmers.set(id, updated);
    return updated;
  }

  // Projects
  async getProjectsByFarmerId(farmerId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter((p) => p.farmerId === farmerId);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      status: insertProject.status ?? "active",
      landSize: insertProject.landSize ?? null,
      expectedYield: insertProject.expectedYield ?? null,
      costs: insertProject.costs ?? null,
      marketPrice: insertProject.marketPrice ?? null,
      plantingDate: insertProject.plantingDate ?? null,
      harvestDate: insertProject.harvestDate ?? null,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const updated = { ...project, ...updates };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Analysis Reports
  async getAnalysisReportsByFarmerId(farmerId: string): Promise<AnalysisReport[]> {
    return Array.from(this.analysisReports.values()).filter((r) => r.farmerId === farmerId);
  }

  async createAnalysisReport(insertReport: InsertAnalysisReport): Promise<AnalysisReport> {
    const id = randomUUID();
    const report: AnalysisReport = { ...insertReport, id, timestamp: new Date() };
    this.analysisReports.set(id, report);
    return report;
  }

  // Community Posts
  async getCommunityPosts(category?: string): Promise<CommunityPost[]> {
    const posts = Array.from(this.communityPosts.values());
    if (category) {
      return posts.filter((p) => p.category === category);
    }
    return posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getPost(id: string): Promise<CommunityPost | undefined> {
    return this.communityPosts.get(id);
  }

  async createPost(insertPost: InsertCommunityPost): Promise<CommunityPost> {
    const id = randomUUID();
    const post: CommunityPost = {
      ...insertPost,
      id,
      imageUrl: insertPost.imageUrl ?? null,
      location: insertPost.location ?? null,
      upvotes: 0,
      timestamp: new Date(),
    };
    this.communityPosts.set(id, post);
    return post;
  }

  async upvotePost(id: string): Promise<CommunityPost | undefined> {
    const post = this.communityPosts.get(id);
    if (!post) return undefined;
    const updated = { ...post, upvotes: post.upvotes + 1 };
    this.communityPosts.set(id, updated);
    return updated;
  }

  // Comments
  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter((c) => c.postId === postId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = { ...insertComment, id, timestamp: new Date() };
    this.comments.set(id, comment);
    return comment;
  }

  // Notifications
  async getNotificationsByFarmerId(farmerId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter((n) => n.farmerId === farmerId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = { ...insertNotification, id, read: false, timestamp: new Date() };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationAsRead(id: string): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;
    const updated = { ...notification, read: true };
    this.notifications.set(id, updated);
    return updated;
  }

  // Weather Cache
  async getWeatherCache(location: string): Promise<WeatherCache | undefined> {
    return this.weatherCache.get(location);
  }

  async setWeatherCache(insertCache: InsertWeatherCache): Promise<WeatherCache> {
    const cache: WeatherCache = { ...insertCache, lastUpdated: new Date() };
    this.weatherCache.set(cache.id, cache);
    return cache;
  }

  // Chat Messages
  async getChatMessagesByFarmerId(farmerId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((m) => m.farmerId === farmerId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = { ...insertMessage, id, timestamp: new Date() };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
