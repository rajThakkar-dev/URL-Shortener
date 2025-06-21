const express = require("express");
const {handleGenerateNewShortId, handleRedirectUrl, handleGetAnalytics} = require("../controllers/url")

const router = express.Router();

router.post("/",handleGenerateNewShortId)

router.get("/:shortId", handleRedirectUrl)

router.get("/analytics/:shortId",handleGetAnalytics)

module.exports = router;