import createError from "http-errors";
import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./lib/winston.js";
import { fileURLToPath } from "node:url";

// 🔥 Rutas
import indexRouter from "#routes/index.js";
import usersRouter from "#routes/users.js";
import authorRouter from "#routes/author.js";
//importando el registrador de helpers

//importando el configurados de handlebars
import { configureHandlebars } from "./lib/handlebars.js";

// 🔥 Recrear __filename y __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

logger.info("inicia configuracion de express");
const app = express();
configureHandlebars(app);

// 🔹 Middlewares

//Redirigiendo el flujo de logs de morgan
// a winston
// morgan -->[logs] -->winston --> transportes
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//archivos estaticos de vite
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}
// 🔥 Archivos estáticos back
app.use(express.static(path.join(__dirname, "../public")));

// 🔹 Rutas
app.use(["/", "/index"], indexRouter);
app.use("/users", usersRouter);
app.use("/author", authorRouter);

// 🔹 Manejo de errores 404
app.use(function (req, res, next) {
  logger.warn(`se consulto la ruta no encontrada ${req.originalUrl}`);
  next(createError(404));
});

// 🔹 Manejo de errores generales
//eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  logger.error(`Eror: ${err.status || 500} --> ${err.message}`);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
