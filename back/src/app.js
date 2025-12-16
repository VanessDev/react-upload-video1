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

// routes API
app.use("/api", router);

app.use(notFound);

// route test
app.get("/", (req, res) => {
  res.json({ message: "Viadeo is running" });
});

export default app;