var express = require('express');
var router = express.Router();

/* GET til listing. */
var indexTitle = "Today I Learned...";
//var til = [
  //{slug:"Express is cool", body:"it can dynamically create pages based on get and post to routes", creationDate:"Today"},
  //{slug:"More about javascript", body:"key value pairs can be used to pass a collection of data of any type", creationDate:"Forever ago"}
//];

//get portion of create
router.get('/', function(req, res, next){
  req.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data){
      if(err){
        console.log(err);
      }
      console.log("Processed by get portjion");
      res.render('til/index', { title:indexTitle,til: data});

    }
  );

});

//post portion of create
router.post('/', function(req, res, next){
   req.db.driver.execQuery(
     "INSERT INTO til (slug,body) VALUES ('" + req.body.slug + "','" + req.body.body + "');",
     function(err, data){
       if(err){
         console.log(err);
       }
     }
   );
   req.db.driver.execQuery(
     "SELECT * FROM til;",
     function(err, data){
       if(err){
         console.log(err);
       }
       res.render('til/index', {title: indexTitle, til: data});

     }
   );
});


router.get('/create', function(req, res, next){
  req.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data){
      if(err){
        console.log(err);
      }
      res.render('til/create', {title: "Create New Fact", til: data});

    }
  );
});

//get data to populate update form
router.get('/:id/update', function(req, res, next){
  req.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data){
      if(err){
        console.log(err);
      }
      console.log("Data = " + data);
      res.render('til/update', {
        title: "Update " + data[req.params.id].slug,
        id: req.params.id,
        til: data

      });

    }
  );
  /*Var til_entry = req.db.define('til',{
    id: {type: 'serial', key: true},
    slug: {type: 'varchar(30)'},
    body: {type: 'text'},
    created_at {type: 'date'}
  });*/

});

//post data from update
router.post('/:id', function(req,res,next){

  //til[req.params.id] = req.body;
  //console.log("Body ''" + req.body.body + "'");
  //console.log("Slug '" + req.body.slug + "'");
  var query = "UPDATE til SET slug='" + req.body.slug + "' , body='" + req.body.body + "' WHERE id='" + req.params.id + "';";
  console.log("Request: " + query);
  req.db.driver.execQuery(query,
  function(err, data){
    if(err){
      console.log(err);
    }


  });
  req.db.driver.execQuery("SELECT * FROM til;",
    function(err,data){
      if(err){
        console.log(err);
      }
      res.render('til/index', {title: indexTitle, til: data});

    }
  );
});

//delete an entry
router.get("/:id/delete", function(req,res,next){
  var id = req.params.id;
  //til = til.slice(0,id).concat(til.slice(id+1,til.length));
  req.db.driver.execQuery("DELETE FROM til WHERE id='" + id + "';",
    function(err,data){
      if(err){
        console.log(err);
      }
    }
  );
  req.db.driver.execQuery("SELECT * FROM til;",
    function(err,data){
      if(err){
        console.log(err);
      }
      res.render('til/index', {title: indexTitle, til: data});

    });
});

//display an entry
router.get("/:id", function(req, res, next){
  req.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data){
      if(err){
        console.log(err);
      }
      res.render('til/til', {title: "",id: req.params.id, til:data});

    }
  );
});
module.exports = router;
