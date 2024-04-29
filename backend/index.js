import express from "express";
import mongoose from "mongoose";
import users_routes from './routes/users.js';

const app = express();
mongoose.connect("mongodb://localhost:27017/AirportShuttleManagementDb")
.then(() => app.listen(8000))
.catch(err => console.log(err));

app.use(express.json()) // for parsing application/json
app.use('/api/users', users_routes);