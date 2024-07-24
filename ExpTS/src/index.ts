import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import logger from './middleware/logger';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { listTechnologies } from './views/helpers/helpers';
import cookieParser from 'cookie-parser';
import sass from 'node-sass-middleware';

import path from 'path';
import sassMiddleware from 'node-sass-middleware';
import session from 'express-session';
import { v4 } from "uuid"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(sass({
  src: `${__dirname}/../public/scss`,
  dest: `${__dirname}/../public/css`,
  outputStyle: "compressed",
  prefix: "/css",
  }));
  app.use("/css", express.static(`${__dirname}/../public/css`));

app.use('/img', [
  express.static(`${__dirname}/public/img`)
]);

app.use(logger);

declare module "express-session" {
  interface SessionData {
    uid: string
  }
}

app.use(morgan('combined'))
app.use(cookieParser())
app.use(session({
  genid: () => v4(),
  secret: "SmD4#se12aweKasdmasdf",
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 360000 }
}))
app.use(express.urlencoded({ extended: false}))
app.use('/game', express.static(path.join(__dirname, 'game')));
app.use(router)
app.locals.valor = "10"

app.engine("handlebars", engine({
    helpers: { listTechnologies }
}));
app.set("view engine", "handlebars");
app.set("views", `./src/views`);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
