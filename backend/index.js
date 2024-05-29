import express from "express";
import mongoose from "mongoose";

import users_routes from './routes/users.js';
import 'dotenv/config'
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

mongoose.connect(`${process.env.DB_CONNEXION}`)
.then(() => {
    app.listen(8000)
    console.log("app is listening on port 8000");
})
.catch(err => console.log(err));

app.use(express.json()) // for parsing application/json
app.use('/api/users', users_routes);

