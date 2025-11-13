import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./prismaClient.js";
import gameRouter from "./routes/game.js";
import sessionRouter from "./routes/session.js";
import validateRouter from "./routes/validate.js";
import scoreRouter from "./routes/score.js";
import leaderboardRouter from "./routes/leaderboard.js";

dotenv.config();
const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "https://waldofrontend.netlify.app" // production frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow mobile apps or curl requests with no origin
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/games", gameRouter);
app.use("/api/session", sessionRouter);
app.use("/api/validate", validateRouter);
app.use("/api/score", scoreRouter);
app.use("/api/leaderboard", leaderboardRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
