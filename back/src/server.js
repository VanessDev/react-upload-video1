import "dotenv/config";

import app from "./app.js";
import notFound from "./middlewares/notFound.js";

const PORT = process.env.PORT;

app.use(notFound);

if (!PORT) {
  console.log("PORT absent, veuillez compléter le fichier .env");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});