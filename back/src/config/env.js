/**********************************************************************
Lis les informations d'environnement depuis "/.env" grace a dotenv et fournis une configuration centralisée pour la DB selon l'environnement(dev, prod...)
Comme ca les données sensible ne sont pas codé en dur
**********************************************************************/
import dotenv from "dotenv";

dotenv.config();

//lister et verifier les infos necessaires pour démarrer l'app
const require =["DB_HOST", "DB_USER", "DB_NAME","DB_PASS", "DB_PORT", "JWT_SECRET"];
for(const key of require) {
    if(!process.env[key]){
        throw new Error (key + " manquant dans le fichier .env");
    }
}

// exportation 
export const env = {
    port: Number(process.env.PORT ?? 3777),
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
}