var express = require('express');
var router = express.Router();

/* GET til listing. */

var til = [
  {slug:"Express is cool", body:"it can dynamically create pages based on get and post to routes", creationDate:"Today"},
  {slug:"More about javascript", body:"key value pairs can be used to pass a collection of data of any type", creationDate:"Forever ago"}
];

//get portion of create
router.get('/', function(req, res, next){
  res.render('til/index', { title:'Today I Learned',til:til});

});

//post portion of create
router.post('/', function(req, res, next){
    console.log(res.body);
    til.push(req.body); //push the body of the request onto the til array
    res.render('til/index', {title: 'Today I Learned', til:til});
});


router.get('/create', function(req, res, next){
  res.render('til/create', {title:'Create New Fact'});
});

//get data to populate update form
router.get('/:id/update', function(req, res, next){
  console.log("Get update");
  res.render('til/update', {
    title: "Update " + til[req.params.id].title,
    id: req.params.id,
    til: til[req.params.id]
  });
});

//post data from update
router.post('/:id', function(req,res,next){
  til[req.params.id] = req.body;
  res.render('til/index', {title: "Update", til: til});
});

//delete an entry
router.get("/:id/delete", function(req,res,next){
  var id = req.params.id;
  til = til.slice(0,id).concat(til.slice(id+1,til.length));
  res.render("til/index", {title: "Today I Learned", til: til});
});

//display an entry
router.get("/:id", function(req, res, next){
    res.render('til/til', {title: "View", til: til[req.params.id]})
} );
module.exports = router;
