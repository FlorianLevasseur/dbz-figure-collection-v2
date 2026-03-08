import { Router, Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { requireAuth, requireAdmin, AuthRequest } from "../middleware/auth";

const router = Router();
const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });

// GET /api/figures — catalogue (avec flag owned si connecté)
router.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const figures = await prisma.figure.findMany({
    orderBy: { name: "asc" },
    include: {
      owners: { where: { userId: req.user!.id }, select: { id: true } },
    },
  });
  const result = figures.map(f => ({ ...f, owned: f.owners.length > 0, owners: undefined }));
  res.json(result);
});

// GET /api/figures/:id
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  const figure = await prisma.figure.findUnique({ where: { id: Number(req.params["id"]) } });
  if (!figure) return res.status(404).json({ message: "Figure introuvable" });
  res.json(figure);
});

// POST /api/figures — admin seulement
router.post("/", requireAdmin, async (req: Request, res: Response) => {
  const figure = await prisma.figure.create({ data: req.body });
  res.status(201).json(figure);
});

// PUT /api/figures/:id — admin seulement
router.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  const figure = await prisma.figure.update({
    where: { id: Number(req.params["id"]) },
    data: req.body,
  });
  res.json(figure);
});

// DELETE /api/figures/:id — admin seulement
router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  await prisma.figure.delete({ where: { id: Number(req.params["id"]) } });
  res.status(204).send();
});

export default router;
