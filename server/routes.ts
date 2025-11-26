import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertFarmerSchema,
  insertProjectSchema,
  insertAnalysisReportSchema,
  insertCommunityPostSchema,
  insertCommentSchema,
  insertNotificationSchema,
  insertChatMessageSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication & Profile
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertFarmerSchema.parse(req.body);
      const farmer = await storage.createFarmer(data);
      res.json(farmer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/auth/farmer/:email", async (req, res) => {
    const farmer = await storage.getFarmerByEmail(req.params.email);
    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found" });
    }
    res.json(farmer);
  });

  app.put("/api/farmers/:id", async (req, res) => {
    try {
      const farmer = await storage.updateFarmer(req.params.id, req.body);
      if (!farmer) {
        return res.status(404).json({ error: "Farmer not found" });
      }
      res.json(farmer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Projects
  app.get("/api/farmers/:farmerId/projects", async (req, res) => {
    const projects = await storage.getProjectsByFarmerId(req.params.farmerId);
    res.json(projects);
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse({
        farmerId: req.body.farmerId,
        type: req.body.type || "crop",
        name: req.body.name,
        landSize: req.body.landSize ? parseFloat(req.body.landSize) : null,
        expectedYield: req.body.expectedYield ? parseInt(req.body.expectedYield) : null,
        marketPrice: req.body.marketPrice ? parseFloat(req.body.marketPrice) : null,
        status: req.body.status || "active",
      });
      const project = await storage.createProject(data);
      res.json(project);
    } catch (error: any) {
      console.error('Project creation error:', error);
      res.status(400).json({ error: error.message || "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const success = await storage.deleteProject(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ success: true });
  });

  // AI Chatbot (BK9 API Proxy)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { question, farmerId } = req.body;

      // Save user message
      const userMessage = await storage.createChatMessage({
        farmerId,
        role: "user",
        content: question,
      });

      // Call BK9 API in background
      (async () => {
        try {
          const prompt = encodeURIComponent("You are a helpful farming assistant for African farmers. Provide practical advice about crops, livestock, weather, and sustainable farming practices. Keep responses concise and actionable.");
          const q = encodeURIComponent(question);
          const response = await fetch(
            `https://api.bk9.dev/ai/BK9?BK9=${prompt}&q=${q}&model=gemini_2_5_flash`,
            { 
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              }
            }
          );
          
          if (!response.ok) {
            throw new Error(`API responded with ${response.status}`);
          }
          
          const data = await response.json();

          if (data.status && data.BK9) {
            // Save AI response
            await storage.createChatMessage({
              farmerId,
              role: "assistant",
              content: data.BK9,
            });
          } else {
            // Save error message
            await storage.createChatMessage({
              farmerId,
              role: "assistant",
              content: "Sorry, I couldn't process that request. Please try again.",
            });
          }
        } catch (error) {
          console.error('AI API error:', error);
          await storage.createChatMessage({
            farmerId,
            role: "assistant",
            content: "Sorry, I'm having trouble connecting. Please try again.",
          });
        }
      })();

      // Return immediately with user message
      res.json({ success: true, userMessage });
    } catch (error: any) {
      console.error('Chat endpoint error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/farmers/:farmerId/chat", async (req, res) => {
    const messages = await storage.getChatMessagesByFarmerId(req.params.farmerId);
    res.json(messages);
  });

  // AI Image Analysis (BK9 Vision API)
  app.post("/api/ai/analyze-image", async (req, res) => {
    try {
      const { imageUrl, farmerId } = req.body;

      // Call BK9 Vision API
      const response = await fetch(
        `https://api.bk9.dev/ai/vision?q=disease_causes_solutions_suggestions_keyfactors&image_url=${encodeURIComponent(
          imageUrl
        )}&model=meta-llama/llama-4-scout-17b-16e-instruct`,
        { method: "POST" }
      );
      const data = await response.json();

      if (data.status && data.BK9) {
        // Save analysis report
        const report = await storage.createAnalysisReport({
          farmerId,
          imageUrl,
          diagnosis: data.BK9,
        });
        res.json(report);
      } else {
        res.status(500).json({ error: "Image analysis service unavailable" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/farmers/:farmerId/analysis", async (req, res) => {
    const reports = await storage.getAnalysisReportsByFarmerId(req.params.farmerId);
    res.json(reports);
  });

  // Weather API (Open-Meteo)
  app.get("/api/weather/:latitude/:longitude", async (req, res) => {
    try {
      const { latitude, longitude } = req.params;
      if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude required" });
      }

      const cacheKey = `${latitude},${longitude}`;
      const cached = await storage.getWeatherCache(cacheKey);

      // Return cached data if less than 1 hour old
      if (cached && (Date.now() - cached.lastUpdated.getTime()) < 3600000) {
        return res.json(cached.data);
      }

      // Fetch fresh weather data from Open-Meteo
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto`
      );
      const data = await response.json();

      // Cache the result
      await storage.setWeatherCache({
        id: cacheKey,
        location: cacheKey,
        data: data as any,
      });

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Community Forum
  app.get("/api/community/posts", async (req, res) => {
    const category = req.query.category as string | undefined;
    const posts = await storage.getCommunityPosts(category);
    res.json(posts);
  });

  app.post("/api/community/posts", async (req, res) => {
    try {
      const data = insertCommunityPostSchema.parse({
        farmerId: req.body.farmerId,
        farmerName: req.body.farmerName,
        content: req.body.content,
        category: req.body.category || "crops",
        imageUrl: req.body.imageUrl || null,
        location: req.body.location || null,
      });
      const post = await storage.createPost(data);
      res.json(post);
    } catch (error: any) {
      console.error('Post creation error:', error);
      res.status(400).json({ error: error.message || "Failed to create post" });
    }
  });

  app.post("/api/community/posts/:id/upvote", async (req, res) => {
    const post = await storage.upvotePost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  });

  app.get("/api/community/posts/:postId/comments", async (req, res) => {
    const comments = await storage.getCommentsByPostId(req.params.postId);
    res.json(comments);
  });

  app.post("/api/community/comments", async (req, res) => {
    try {
      const data = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(data);
      res.json(comment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Notifications
  app.get("/api/farmers/:farmerId/notifications", async (req, res) => {
    const notifications = await storage.getNotificationsByFarmerId(req.params.farmerId);
    res.json(notifications);
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const data = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(data);
      res.json(notification);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/notifications/:id/read", async (req, res) => {
    const notification = await storage.markNotificationAsRead(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(notification);
  });

  // Image Upload to Catbox
  app.post("/api/upload", async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || !contentType.includes("multipart/form-data")) {
        return res.status(400).json({
          success: false,
          error: "Content-Type must be multipart/form-data",
        });
      }

      const boundary = contentType.split("boundary=")[1];
      if (!boundary) {
        return res.status(400).json({
          success: false,
          error: "Invalid multipart/form-data",
        });
      }

      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      const binaryString = buffer.toString("binary");
      const parts = binaryString.split(`--${boundary}`);

      let fileBuffer: Buffer | null = null;
      let fileName = "upload";
      let mimeType = "application/octet-stream";

      for (const part of parts) {
        if (part.includes("Content-Disposition: form-data")) {
          const nameMatch = part.match(/name="([^"]+)"/);
          const filenameMatch = part.match(/filename="([^"]+)"/);
          const contentTypeMatch = part.match(/Content-Type: ([^\r\n]+)/);

          if (filenameMatch) {
            fileName = filenameMatch[1];
          }

          if (contentTypeMatch) {
            mimeType = contentTypeMatch[1];
          }

          if (nameMatch && nameMatch[1] === "file" && filenameMatch) {
            const fileDataStart = part.indexOf("\r\n\r\n") + 4;
            const fileDataEnd = part.lastIndexOf("\r\n");

            if (fileDataStart > 3 && fileDataEnd > fileDataStart) {
              const fileData = part.substring(fileDataStart, fileDataEnd);
              fileBuffer = Buffer.from(fileData, "binary");
            }
          }
        }
      }

      if (!fileBuffer) {
        return res.status(400).json({
          success: false,
          error: "No file found in request",
        });
      }

      const CATBOX_USERHASH = "61101e1ef85d3a146d5841cee";
      const formData = new FormData();
      formData.append("reqtype", "fileupload");
      formData.append("userhash", CATBOX_USERHASH);
      formData.append("fileToUpload", new Blob([fileBuffer], { type: mimeType }), fileName);

      const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: formData,
      });

      const catboxUrl = await response.text();

      if (!catboxUrl.startsWith("http")) {
        throw new Error("Invalid response from Catbox: " + catboxUrl);
      }

      return res.status(200).json({
        success: true,
        data: {
          url: catboxUrl.trim(),
          fileName: fileName,
          size: fileBuffer.length,
          mimeType: mimeType,
        },
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      return res.status(500).json({
        success: false,
        error: "Upload failed",
        message: error.message,
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
