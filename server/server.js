const express = require('express');
const colors = require('colors');
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const router = require('./routes/authRoutes');
const routes = require('./routes/routes');
const PORT = 2002;


app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
app.use(morgan('dev'));
connectDB()



app.use("/api", router);
app.use("/api", routes);





app.listen(PORT,()=> console.log("server running on port".bold,PORT));
