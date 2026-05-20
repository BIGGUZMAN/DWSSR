import path from "node:path";
import { fileURLToPath } from "node:url";
//importando el motor de plantillas
import { create as createHbsEngine } from "express-handlebars";

//importando la configuracion de vite
import { registerViteHelper } from "./vite.js";

//CREANDO CONSTANTES DE RUTAS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//exportar la funcion de configuracion
export function configureHandlebars(app) {
  // configurando handlebars
  // creo una instancia de view-Engine
  const exphbs = createHbsEngine({
    extname: ".hbs",
    defaultLayout: "main",
  });
  //registrando Helper de Vite
  registerViteHelper(exphbs.handlebars);

  //integrando handlebars al server
  //1 registro el motor
  app.engine("hbs", exphbs.engine);
  //2 Establezco extencion
  app.set("view engine", "hbs");
  //3 Establezco directorio de vistas
  app.set("views", path.join(__dirname, "..", "views"));
}
