const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const BitlyClient = require('bitly').BitlyClient;
const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const {longUrl}  = req.body;
  const bitly = new BitlyClient(process.env.BITLY_ACCESS_TOKEN);

  // Check long url
  
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        var shortUrl;
        await bitly.shorten(req.body.longUrl)
                .then(result=>shortUrl=result.link)
                .catch(err=>console.log(err))
        
        url = new Url({
          longUrl,
          shortUrl,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Not a Valid URL');
  }
});

module.exports = router;