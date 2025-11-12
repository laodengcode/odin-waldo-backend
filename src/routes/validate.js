import express from "express";
import { prisma } from "../prismaClient.js";
const router = express.Router();

// POST /api/validate
router.post("/", async (req, res) => {
  const { gameId, characterId, clickX_pct, clickY_pct } = req.body;
  if (!gameId || !characterId)
    return res.status(400).json({ error: "Missing params" });

  const char = await prisma.character.findUnique({ where: { id: characterId } });
  if (!char || char.gameImageId !== gameId)
    return res.status(400).json({ correct: false });

  const within =
    clickX_pct >= char.x_pct - 0.01 &&
    clickX_pct <= char.x_pct + char.w_pct + 0.01 &&
    clickY_pct >= char.y_pct - 0.01 &&
    clickY_pct <= char.y_pct + char.h_pct + 0.01;

  res.json({
    correct: within,
    characterId,
    marker: within ? { x_pct: char.x_pct, y_pct: char.y_pct } : null,
  });
});

export default router;
