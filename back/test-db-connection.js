import { testConnection } from "./src/db/index.js";

async function main() {
  try {
    console.log("Test de connexion à la base de données en cours...");
    await testConnection();
    console.log("Test de connexion terminé avec succès.");
  } catch (error) {
    console.error("Erreur lors du test de connexion à la base de données :", error);
  } finally {
    // Optionnel : si vous voulez fermer le pool après le test
    process.exit(0);
  }
}

main();