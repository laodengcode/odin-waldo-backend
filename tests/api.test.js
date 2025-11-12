import request from "supertest";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "../src/prismaClient.js";
import gameRouter from "../src/routes/game.js";
import sessionRouter from "../src/routes/session.js";
import validateRouter from "../src/routes/validate.js";
import scoreRouter from "../src/routes/score.js";
import leaderboardRouter from "../src/routes/leaderboard.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/games", gameRouter);
app.use("/api/session", sessionRouter);
app.use("/api/validate", validateRouter);
app.use("/api/score", scoreRouter);
app.use("/api/leaderboard", leaderboardRouter);

let gameId;
let characterId;
let sessionId;

describe("Where's Waldo API", () => {
  beforeAll(async () => {
    // ensure at least one game exists (seed manually or with prisma)
    const games = await prisma.gameImage.findMany({ include: { characters: true } });
    if (games.length === 0) {
      const game = await prisma.gameImage.create({
        data: {
          title: "Find Waldo - Beach",
          imageUrl: "https://example.com/sample.jpg",
          naturalW: 4000,
          naturalH: 3000,
          characters: {
            create: [{ name: "Waldo", x_pct: 0.12, y_pct: 0.55, w_pct: 0.03, h_pct: 0.06 }]
          }
        }
      });
      gameId = game.id;
      characterId = game.characters[0]?.id;
    } else {
      gameId = games[0].id;
      characterId = games[0].characters[0].id;
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("GET /api/games should list all games", async () => {
    const res = await request(app).get("/api/games");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/games/:id should return single game", async () => {
    const res = await request(app).get(`/api/games/${gameId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBeDefined();
    expect(res.body.characters.length).toBeGreaterThan(0);
  });

  test("POST /api/session/start should create a new session", async () => {
    const res = await request(app)
      .post("/api/session/start")
      .send({ gameId });
    expect(res.statusCode).toBe(200);
    sessionId = res.body.sessionId;
    expect(sessionId).toBeDefined();
  });

  test("POST /api/validate should check character position", async () => {
    const res = await request(app)
      .post("/api/validate")
      .send({
        gameId,
        characterId,
        clickX_pct: 0.12,
        clickY_pct: 0.55,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("correct");
  });

  test("POST /api/score should save score", async () => {
    const res = await request(app)
      .post("/api/score")
      .send({ sessionId, playerName: "Tester" });
    expect(res.statusCode).toBe(200);
    expect(res.body.playerName).toBe("Tester");
  });

  test("GET /api/leaderboard/:gameId should show scores", async () => {
    const res = await request(app).get(`/api/leaderboard/${gameId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
