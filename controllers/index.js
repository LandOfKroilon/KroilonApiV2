let express = require('express'),
    router = express.Router();

//TODO load all other controllers
//router.use('/academy', require('./academy'));

router.get('', function(req, res) {
  res.send('Hello from root ctrl');
})


module.exports = router;