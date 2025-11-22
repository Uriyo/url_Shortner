const express=require('express');
const axios = require('axios');
const requestIp = require('request-ip');
const cors=require('cors');

const urlRoute=require('./routes/routes');
const URL=require('./model/Url');
const {connectMongoDB}=require('./config/db');
const logger=require('./utils/logger');
const {getRedirectionURL}=require('./controllers/redirectController');

require('dotenv').config()

const app= express();
const PORT=process.env.PORT;



connectMongoDB()

app.use(cors());
app.use(express.json());

app.use(requestIp.mw());

app.use("/api",urlRoute);

app.get('/healthz',(req,res)=>{
    res.status(200).json({"ok":true, "version":"1.0.0"});
})

app.use("/:shortId",getRedirectionURL);

app.listen(PORT,()=> 
  logger.info(`Server running on ${PORT}`)
);