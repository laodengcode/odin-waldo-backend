import express from "express";
import { prisma } from "../prismaClient.js";
const router = express.Router();

// POST /api/score
router.post("/", async (req, res) => {
  const { sessionId, playerName } = req.body;
  if (!sessionId || !playerName)
    return res.status(400).json({ error: "Missing params" });

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session || session.used)
    return res.status(400).json({ error: "Invalid session" });

  const end = new Date();
  const timeMs = end - session.startAt;

  await prisma.session.update({
    where: { id: sessionId },
    data: { used: true },
  });

  const score = await prisma.score.create({
    data: {
      playerName,
      timeMs,
      gameId: session.gameId,
    },
  });

  res.json(score);
});

export default router;
