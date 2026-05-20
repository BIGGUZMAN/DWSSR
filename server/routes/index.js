import express from "express";
import logger from "../lib/winston.js";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", {
    title: "Proyecto Asombroso 💫💫",
    author: "Guzman Moran Aaron Antonio",
  });
});

// Ruta para pruebas de logs
router.get("/test-logs", (req, res) => {
  logger.error("Esto es una prueba del log tipo Error");
  logger.warn("Esto es una prueba del log tipo Warn");
  logger.info("Esto es una prueba del log tipo Info");
  logger.debug("Esto es una prueba del log tipo Debug");

  res.json({
    message: "Logs generados correctamente",
  });
});

//ruta para prueba de exception y rejections
if (process.env.NODE_ENV !== "production") {
  //habilitando ruta para probar exceptionHandlers
  //Acceso: GET /test-exception
  router.get("/test-exception", (req, res) => {
    res.json({
      message: "Exception lanzada. Revisa logs/exception.log",
    });
    //lanzado exception
    setTimeout(() => {
      throw new Error("Exception de prueba no capturada");
    }, 300);
  });

  //ruta para un rejection
  router.get("/test-rejection", (req, res) => {
    res.json({
      message: "Promeza rechazada. Revisa logs/rejections.log",
    });
    //generando rejection
    Promise.reject(new Error("Promesa rechazada sin catch"));
  });
}

export default router;
