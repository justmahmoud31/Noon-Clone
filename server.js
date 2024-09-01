import express from 'express';
import { dbconn } from './database/dbconnection.js';
import { bootstrap } from './src/modules/bootstrap.js';
import { AppError } from './src/utils/AppError.js';
import { globalError } from './src/middlewares/globalError.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use('/uploads', express.static('uploads'));
bootstrap(app);
app.get('/', (req, res, next) => {
  res.json({ "Hiiii": "Hi" })
})
app.get('*', (req, res, next) => {
  next(new AppError(`Route Not Found : ${req.originalUrl}`, 404));
});
app.use(globalError);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));