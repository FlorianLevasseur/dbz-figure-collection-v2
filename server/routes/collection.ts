import { Router, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();
const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });

// GET /api/collection — ma collection
router.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const items = await prisma.userFigure.findMany({
    where: { userId: req.user!.id },
    include: { figure: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(items);
});

// POST /api/collection/:figureId — ajouter à ma collection
router.post("/:figureId", requireAuth, async (req: AuthRequest, res: Response) => {
  const figureId = Number(req.params["figureId"]);
  const { condition, price, purchaseDate, notes } = req.body;

  const existing = await prisma.userFigure.findUnique({
    where: { userId_figureId: { userId: req.user!.id, figureId } },
  });
  if (existing)
    return res.status(409).json({ message: "Déjà dans votre collection" });

  const item = await prisma.userFigure.create({
    data: {
      userId: req.user!.id,
      figureId,
      condition: condition || "mint",
      price: price ? Number(price) : undefined,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : undefined,
      notes,
    },
    include: { figure: true },
  });
  res.status(201).json(item);
});

// DELETE /api/collection/:figureId — retirer de ma collection
router.delete("/:figureId", requireAuth, async (req: AuthRequest, res: Response) => {
  await prisma.userFigure.delete({
    where: { userId_figureId: { userId: req.user!.id, figureId: Number(req.params["figureId"]) } },
  });
  res.status(204).send();
});

export default router;
