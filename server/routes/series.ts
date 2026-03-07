import { Router } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const router = Router();
const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });

router.get("/", async (_req, res) => {
  const series = await prisma.series.findMany({ orderBy: { name: "asc" } });
  res.json(series);
});

export default router;
