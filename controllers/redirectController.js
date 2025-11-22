const URL = require('../model/Url');
const logger = require('../utils/logger');

async function getRedirectionURL(req,res){
    try{
        const {shortId}=req.params;

        if(!shortId) return res.status(400).json({error:"shortId is required"});

        const urlEntry= await URL.findOne({shortId});

        if(!urlEntry){
            return res.status(404).json({error:"URL not found"});
        }

        //update analytics
        urlEntry.totalClicks +=1;
        urlEntry.lastAccessed=new Date();
        await urlEntry.save();
        
        return res.status(302).redirect(urlEntry.redirectURL);
    }catch(err){
        logger.error("Error during redirection", err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}

module.exports={
    getRedirectionURL,
}