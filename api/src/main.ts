import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import appConfig from "./config/app";
import { ExceptionsHandler } from "./middlewares/exceptions.handler";
import { UnknownRoutesHandler } from "./middlewares/unknownRoutes.handler";

dotenv.config();

/**
 * On créé une nouvelle "application" express
 */
const app = express();

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json());

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 * /!\ Attention en production, on souhaiterai limiter cela aux noms de domaines autorisées à faire des requêtes sur notre API.
 * @see https://w3schools.tech/fr/tutorial/html/html_cors
 */
app.use(cors());

/**
 * Homepage (uniquement necessaire pour cette demo)
 */
app.get("/", (request, response) => {
  response.send("🏠 Bienvenue sur votre Application backend API :)");
});

app.use("/pokedex", function (req, res, next) {});

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all("*", UnknownRoutesHandler);

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler);

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(appConfig().port, () =>
  console.log(
    `🚀 Server has started and listening on port ${appConfig().port}.`
  )
);
