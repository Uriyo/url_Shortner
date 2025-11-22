

const { log } = require('winston');
const URL =require('../model/Url');
const logger = require('../utils/logger');
const { generateShortId } = require('../utils/shortidGenerator');
const {isValidURL} = require('../utils/urlValidator');

async function generateURL(req,res){
    try{
        const body=req.body;
        if(!body.url) return res.status(400).json({error:"url is required"})
        
        if(isValidURL(body.url)===false){
            return res.status(400).json({error:"Invalid URL format"});
        }
        if(body.customCode){
            if(!/^[a-zA-Z0-9]{6,8}$/.test(body.customCode)){
                return res.status(400).json({error:"Custom code must be 6-8 characters long and can only contain [a-zA-Z0-9]"});
            }
            const existing= await URL.findOne({shortId: body.customCode});
            if(existing){
                return res.status(409).json({error:"Custom code already in use"});
            }
            const newUrl= await URL.create({
                shortId: body.customCode,
                redirectURL: body.url
            });
            logger.info(`Custom short URL created: ${body.customCode} for ${body.url}`);
            return res.status(201).json({
                id: newUrl.shortId,
                shortURL:`${process.env.BASE_URL}/${newUrl.shortId}`,
                createdAt: newUrl.createdAt
            });
        }

        let shortId;
        let newURl;

        for (let i = 0; i < 3; i++) {

            try{
                shortId= generateShortId();
                newURl= await URL.create({ 
                    shortId:shortId,
                    redirectURL: body.url
                });
                break;
            }catch(err){
                if(err.code===11000){
                    logger.warn(`Collision detected for shortId: ${shortId}. Retrying...`);
                    continue; 
                }else{
                    throw err;
                }
            }
        }

        if(!newURl){
            logger.error("Failed to generate unique shortId after multiple attempts");
            return res.status(409).json({error:"Could not generate unique short URL. Please try again."})
        }


        res.status(201).json({
            id:shortId,
            shortURL:`${process.env.BASE_URL}/${shortId}`,
            createdAt: newURl.createdAt
        });
    }catch(err){
        logger.error("Error generating short URL", err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}

async function getAnalytics(req,res){
    try{
        const shortId=req.params.shortId;
        if(!shortId) return res.status(400).json({error:"shortID is required"})
        const result =await URL.findOne({shortId});
        return res.json({
            totalClicks: result.totalClicks,
            created_At: result.createdAt,
            last_acessed: result.lastAccessed,
            shortId: result.shortId,
            redirectURL: result.redirectURL
        });
    }catch(err){
        logger.error("Error fetching analytics", err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
    
    
}
//get all urls
async function getURL(req,res){
    try{
        let {page=1, limit=10}=req.query;

        page=parseInt(page);
        limit=parseInt(limit);

        const skip=(page-1)*limit;

        const urls = await URL.find()
            .skip(skip)
            .limit(limit)
            .sort({createdAt:-1});
        
        const total = await URL.countDocuments();

        return res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: urls,
        });
    
    }catch(err){
        logger.error("Error fetching URLs", err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}

async function deleteUrl(req,res){
    try{
        const {shortId}=req.params;

        if(!shortId) return res.status(400).json({error:"shortId is required"});

        const result= await URL.findOneAndDelete({shortId});

        if(!result) return res.status(404).json({error:"URL not found"});

        return res.json({message:"URL deleted successfully"});
    }catch(err){
        logger.error("Error deleting URL", err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}

module.exports={
    generateURL,
    getAnalytics,
    getURL,
    deleteUrl
}