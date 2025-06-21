const shortid = require("shortid");
const URL = require("../models/url")

async function handleGenerateNewShortId(req,res){
    const body = req.body;
    if(!body){
        res.status(400).json({"msg":"url is required"});
    }
    const shortID = shortid();
    const result = await URL.create({
        shortId : shortID,
        redirectUrl : body.url,
        vistiHistory:[]
    })
    return res.render("url",{
        id: shortID,
        originalUrl: body.url,
    })
    // return res.json({"id":shortID});
}

async function handleRedirectUrl(req,res){
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId: shortID,
    },
    {
        $push:{
            visitHistory:{
                timestamp: Date.now()
            }
        }
    }
)
    res.redirect(entry.redirectUrl)
}

async function handleGetAnalytics(req, res){
    const shortID = req.params.shortId;
    const result = await URL.findOne({
        shortId : shortID
    })
    return res.json({"totalClicks": result.visitHistory.length,
        "analytics":result.visitHistory
    });
    
}

module.exports = {
    handleGenerateNewShortId,
    handleRedirectUrl,
    handleGetAnalytics
}