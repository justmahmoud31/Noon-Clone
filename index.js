import express from 'express';
import { dbconn } from './database/dbconnection.js';
import { bootstrap } from './src/modules/bootstrap.js';
import { AppError } from './src/utils/AppError.js';
import { globalError } from './src/middlewares/globalError.js';
import cors from 'cors';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import { catchError } from './src/middlewares/catchError.js';
const app = express();
const port = process.env.PORT || 3000;
const stripe = new Stripe(process.env.STRIPE_KEY);
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
bootstrap(app);
app.post('/api/webhook', bodyParser.raw({ type: 'application/json' }),catchError ((req, res)=> { 
  const sig = req.headers['stripe-signature'];
  let event=stripe.webhooks.constructEvent(req.body,sig,'whsec_qVcIi8FOWr43NeyDi1Ce0EHEpo2TFzeh');
  let checkout;
  if(event.type == "checkout.session.completed"){
   checkout = event.data.object; 
  }

  res.json({ received: true,checkout });
}));
app.get('/', (req, res) => {
  res.json({ "Hiiii": "Hi" });
});
app.get('*', (req, res, next) => {
  next(new AppError(`Route Not Found : ${req.originalUrl}`, 404));
});
app.use(globalError);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
