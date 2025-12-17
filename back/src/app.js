import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.js";
import notFound from "./middlewares/notFound.js";

const app = express();

// middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route test
app.get("/", (req, res) => {
  res.json({ message: "Viadeo is running" });
});

// routes API
app.use("/api", router);


// 404 (TOUJOURS après les routes)
app.use(notFound);

// error handler (TOUJOURS après notFound)
app.use((err, req, res, next) => {
  if (!err) return next();

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "Fichier trop volumineux (Max 200 Mo)" });
  }
  if (err.message === "TYPE_NOT_ALLOWED") {
    return res.status(415).json({ error: "Type video refusé (mp4/webm/mov seulement)" });
  }

  console.error(err);
  return res.status(500).json({ error: "Erreur serveur", details: err.message });
});

export default app;
