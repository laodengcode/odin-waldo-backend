import express from "express";
import { prisma } from "../prismaClient.js";
const router = express.Router();

// GET /api/leaderboard/:gameId
router.get("/:gameId", async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const scores = await prisma.score.findMany({
    where: { gameId: req.params.gameId },
    orderBy: { timeMs: "asc" },
    take: limit,
  });
  res.json(scores);
});

export default router;
