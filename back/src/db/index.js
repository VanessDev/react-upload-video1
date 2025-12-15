import mysql from "mysql2/promise"
import { env } from "../config/env.js";


export const pool = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
    connectionLimit: 10 //limte a 10 le nb de connexion simultanées.
})

//fonction pour tester si la connexion marche
export async function testConnection() {
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("co a mysql ok a," ,rows[0].now);
}