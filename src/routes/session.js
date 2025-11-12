import express from "express";
import { prisma } from "../prismaClient.js";
const router = express.Router();

// POST /api/session/start
router.post("/start", async (req, res) => {
  const { gameId } = req.body;
  if (!gameId) return res.status(400).json({ error: "Missing gameId" });

  const session = await prisma.session.create({
    data: { gameId },
  });

  res.json({ sessionId: session.id, startAt: session.startAt });
});

export default router;
