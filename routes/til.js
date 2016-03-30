var express = require('express');


var router = express.Router();

/* GET til listing. */
var indexTitle = "Today I Learned...";
//var til = [
//{slug:"Express is cool", body:"it can dynamically create pages based on get and post to routes", creationDate:"Today"},
//{slug:"More about javascript", body:"key value pairs can be used to pass a collection of data of any type", creationDate:"Forever ago"}
//];

function render(request, response, route, vars) {

  var name = request.cookies.username || 'anoymous';
  request.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data) {
      if (err) {
        console.log(err);
      }
      vars['name'] = name;
      vars['til'] = data;
      response.render(route, vars);
    }
  );
}
//get portion of create
router.get('/', function(req, res, next) {



  render(req, res, 'til/index', {
    title: indexTitle
  });


});

//post portion of create
router.post('/', function(req, res, next) {
  req.db.driver.execQuery(
    "INSERT INTO til (slug,body,created_at) VALUES (?,?,now());", [req.body.slug, req.body.body],
    function(err, data) {
      if (err) {
        console.log(err);
      }
      res.redirect(303,'/til/');

    }
  );

  /*req.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data) {
      if (err) {
        console.log(err);
      }
      res.render('til/index', {
        title: indexTitle,
        til: data
      });

    }
  );*/
});


router.get('/create', function(req, res, next) {
  render(req, res, 'til/create', {
    title: 'Create New Fact'
  });
  /*req.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data) {
      if (err) {
        console.log(err);
      }

      res.render('til/create', {
        title: "Create New Fact",
        til: data
      });

    }
  );*/
});

//get data to populate update form
router.get('/:id/update', function(req, res, next) {
  req.db.driver.execQuery('SELECT * FROM til WHERE id=?;',
  [parseInt(req.params.id)],
  function(err, data){
    if(err){
      console.log(err);

    }
    render(req, res, 'til/update', {
      title: 'Update',
      id: req.params.id,
      til_entry: data[0]
    });
  });


});

//post data from update
router.post('/:id', function(req, res, next) {

  var query = "UPDATE til SET slug=? , body=? WHERE id=?;";
  req.db.driver.execQuery(query, [req.body.slug, req.body.body, parseInt(req.params.id)],

    function(err, data) {
      if (err) {
        console.log(err);
      }

       res.redirect(303,'/til/' + parseInt(req.params.id));
    });

});

//delete an entry
router.get("/:id/delete", function(req, res, next) {
  var id = req.params.id;
  //til = til.slice(0,id).concat(til.slice(id+1,til.length));
  req.db.driver.execQuery("DELETE FROM til WHERE id='?';", [parseInt(id)],
    function(err, data) {
      if (err) {
        console.log(err);
      }
      res.redirect(303,'/til/');

    }

  );

});

//display an entry
router.get("/:id", function(req, res, next) {
  req.db.driver.execQuery(
    "SELECT * FROM til WHERE id=?;",
    [parseInt(req.params.id)],
    function(err, data) {
      if (err) {
        console.log(err);
      }

      render(req,res,'til/til',{
        title: "",
        id: req.params.id,
        til_entry: data[0]
      });
      /*res.render('til/til', {
        title: "",
        til: data,
        id: req.params.id

      });*/

    }
  );
});
module.exports = router;
