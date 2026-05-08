// importamos la biblioteca de winston
import winston, { format } from "winston";
import path from "node:path";
import fs from "node:fs";

// importando biblioteca de transporte
import DailyRotateFile from "winston-daily-rotate-file";

// Desestructurando funciones de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// Creando directorio raíz
const __rootdir = path.resolve(process.cwd());

// Creando ruta de logs
const logsDir = path.join(__rootdir, "logs");

// Crear carpeta logs si no existe
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Definiendo colores personalizados
const colors = {
  error: "red",
  warn: "yellow",
  info: "magenta",
  debug: "blue",
};

// Agregando colores a winston
winston.addColors(colors);

// Formato para consola
const myConsoleFormat = combine(
  colorize({ all: true }),
  label({ label: "📢" }),
  timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),

  printf(
    (info) => `${info.label} ${info.level}: ${info.timestamp}: ${info.message}`,
  ),
);

// Formato para archivos
const myFileFormat = combine(format.uncolorize(), timestamp(), format.json());

// Opciones de transportes
const options = {
  errorFile: {
    level: "error",
    filename: path.join(logsDir, "error.log"),
    maxsize: 5242880,
    maxFiles: 5,
    format: myFileFormat,
  },

  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat,
  },

  readableFile: {
    filename: path.join(logsDir, "app-readable.log"),
    level: "info",

    format: combine(
      format.uncolorize(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      prettyPrint(),
    ),

    maxsize: 5242880,
    maxFiles: 5,
  },

  dailyRotateFile: {
    filename: path.join(logsDir, "app-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: myFileFormat,
  },
};

// Creando logger
const logger = winston.createLogger({
  level: "debug",

  transports: [
    // Archivo principal rotativo
    new DailyRotateFile(options.dailyRotateFile),

    // Archivo legible
    new winston.transports.File(options.readableFile),

    // Archivo exclusivo de errores
    new winston.transports.File(options.errorFile),

    // Consola
    new winston.transports.Console(options.console),
  ],

  // Manejo de excepciones
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "exceptions.log"),
    }),
  ],

  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "rejections.log"),
    }),
  ],

  exitOnError: false,
});

// Exportando logger
export default logger;
