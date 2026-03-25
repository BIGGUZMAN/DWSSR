import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'node:url';

// 🔥 Rutas
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authorRouter from './routes/author.js';

// 🔥 Recrear __filename y __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🔹 Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 🔹 Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 🔥 Archivos estáticos (IMPORTANTE)
app.use(express.static(path.join(__dirname, '../public')));

// 🔹 Rutas
app.use(['/', '/index'], indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);

// 🔹 Manejo de errores 404
app.use(function (req, res, next) {
  next(createError(404));
});

// 🔹 Manejo de errores generales
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;