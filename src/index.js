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
app.use(cors());
app.use(express.json());

app.use("/api/games", gameRouter);
app.use("/api/session", sessionRouter);
app.use("/api/validate", validateRouter);
app.use("/api/score", scoreRouter);
app.use("/api/leaderboard", leaderboardRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
