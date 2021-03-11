const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/', async (req, res) => {
        
        try {
          var urls = await Url.find({},{},{
            limit:5,
            sort:{
              date:-1
            },

          });
          if (urls) {
            return res.json(urls);
          } else {
            return res.status(404).json('No url found');
          }
        } catch (err) {
          console.error(err);
          res.status(500).json('Server error');
        }
      });

module.exports = router;