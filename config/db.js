const mongoose =require('mongoose')
require('dotenv').config()

const logger =require('../utils/logger');

const mongo_uri= process.env.MONGO_URI

async function connectMongoDB(){
    try{
        await mongoose.connect(mongo_uri);
        logger.info("MongoDB connected successfully");
    }catch(err){
        logger.error("Error connecting to MongoDB", err);
        process.exit(1);
    }
}

module.exports={
    connectMongoDB,
}