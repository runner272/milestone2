var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
var til = [];
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Today I Learned', til: til});

});

router.get('/login', function(req,res,next){
  res.render('login', {title: 'Login', til:til});
});

router.post('/login', function(req, res, next){
  var sha1sum  = crypto.createHash('sha1');

  req.db.driver.execQuery(
    'SELECT * FROM users WHERE email=?;',
    [req.body.email],
    function(err, data){
      if(err){
        console.log(err);
      }

      sha1sum.update(req.body.password);
      var hashed_input = sha1sum.digest('hex');


      if(data.length != 0 && hashed_input === data[0].password){

        res.cookie('username', data[0].first_name);

        res.redirect('/til/');
      }
      else{
        res.redirect('/login');
      }
    }
  );
});


router.get('/logout', function(req,res){
  res.clearCookie('username');
  res.redirect("/");
});
module.exports = router;
