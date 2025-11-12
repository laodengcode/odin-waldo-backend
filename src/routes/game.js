import express from "express";
import { prisma } from "../prismaClient.js";
const router = express.Router();

// ✅ GET /api/games — list all available games
router.get("/", async (req, res) => {
  const games = await prisma.gameImage.findMany({
    include: { characters: true },
    orderBy: { createdAt: "desc" },
  });
  const data = games.map((g) => ({
    id: g.id,
    title: g.title,
    imageUrl: g.imageUrl,
    charactersCount: g.characters.length,
  }));
  res.json(data);
});

// ✅ GET /api/games/:id — fetch single game with characters
router.get("/:id", async (req, res) => {
  const game = await prisma.gameImage.findUnique({
    where: { id: req.params.id },
    include: { characters: true },
  });
  if (!game) return res.status(404).json({ error: "Game not found" });
  res.json(game);
});

export default router;
