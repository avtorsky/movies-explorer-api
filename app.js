require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { mongooseConfig, limiter } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes/index');
const serverErrorMiddleware = require('./errors/error-middleware');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb', mongooseConfig);

app.use(cors({
  origin: 'https://explorer.avtorskydeployed.online',
  credentials: true,
}));
app.use(requestLogger);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(indexRouter);
app.use(errorLogger);
app.use(errors());
app.use(serverErrorMiddleware);

app.listen(PORT);
