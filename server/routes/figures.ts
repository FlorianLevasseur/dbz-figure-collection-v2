import { Router } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const router = Router();
const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });

// GET /api/figures
router.get("/", async (_req, res) => {
  const figures = await prisma.figure.findMany({ orderBy: { createdAt: "desc" } });
  res.json(figures);
});

// GET /api/figures/:id
router.get("/:id", async (req, res) => {
  const figure = await prisma.figure.findUnique({ where: { id: Number(req.params["id"]) } });
  if (!figure) return res.status(404).json({ message: "Figure not found" });
  res.json(figure);
});

// POST /api/figures
router.post("/", async (req, res) => {
  const figure = await prisma.figure.create({ data: req.body });
  res.status(201).json(figure);
});

// PUT /api/figures/:id
router.put("/:id", async (req, res) => {
  const figure = await prisma.figure.update({
    where: { id: Number(req.params["id"]) },
    data: req.body,
  });
  res.json(figure);
});

// DELETE /api/figures/:id
router.delete("/:id", async (req, res) => {
  await prisma.figure.delete({ where: { id: Number(req.params["id"]) } });
  res.status(204).send();
});

export default router;
