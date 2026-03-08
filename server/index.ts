import "dotenv/config";
import express from "express";
import cors from "cors";
import figuresRouter from "./routes/figures";
import charactersRouter from "./routes/characters";
import seriesRouter from "./routes/series";
import authRouter from "./routes/auth";
import collectionRouter from "./routes/collection";

const app = express();
const PORT = process.env["PORT"] || 3000;

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/figures", figuresRouter);
app.use("/api/collection", collectionRouter);
app.use("/api/characters", charactersRouter);
app.use("/api/series", seriesRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
