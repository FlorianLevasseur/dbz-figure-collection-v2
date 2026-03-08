import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"] || "dbz-secret-change-in-prod";

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Non authentifié" });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Token invalide" });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (req.user?.role !== "ADMIN")
      return res.status(403).json({ message: "Accès réservé aux administrateurs" });
    next();
  });
}

export { JWT_SECRET };
