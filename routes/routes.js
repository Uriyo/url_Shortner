const express=require('express');
const { generateURL, getAnalytics, getURL, deleteUrl } = require("../controllers/urlController");

const router=express.Router();

router.post('/links',generateURL);

router.get('/links',getURL);

router.delete('/links/:shortId',deleteUrl);

router.get('/links/:shortId',getAnalytics);


module.exports= router;