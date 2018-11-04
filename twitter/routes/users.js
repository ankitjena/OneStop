var express = require('express');
var router = express.Router();
require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router
  .use('/', (req,res, next) => {
    if(!req.user){
      res.redirect('/')
    }
    next()
  })
  .get('/', (req, res) => {
    axios.get(req.user.media)
    .then(function (response) {
      const data = response.data.data;
      let user = req.user;
      user.images = data.map(img => img.images);
      res.render('instagram', user)
    })
  })

module.exports = router;
