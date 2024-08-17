import express from 'express';
import { dbconn } from './database/dbconnection.js'
import { bootstrap } from './src/modules/bootstrap.js';
const app = express()
const port = 3000
app.use(express.json());
bootstrap(app);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))