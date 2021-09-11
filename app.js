const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const {
  PORT,
  MONGO_URL,
  mongooseConfig,
  limiter,
} = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const serverErrorMiddleware = require('./errors/error-middleware');

const app = express();

mongoose.connect(MONGO_URL, mongooseConfig);

app.use(requestLogger);
app.use(cors({
  origin: 'https://explorer.avtorskydeployed.online',
  credentials: true,
}));
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(serverErrorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
