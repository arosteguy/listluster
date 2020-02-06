// Requiring our models and passport as we've configured it
var db = require("../models");

module.exports = function(app) {
      // GET route for all the checklist items
    app.get("/api/createItems", function(req, res) {
        db.CreateItem.findAll({}).then(function(dbCreateItem) {
          
          res.json(dbCreateItem);
        });
      });
    // POST route for saving a checklist item
    app.post("api/createItems", function(req, res){
        db.CreateItem.create({
            text: req.body.text,
            complete: req.body.complete
        }).then(function(dbCreateItem){
            res.json(dbCreateItem);   
        })
        .catch(function(err) {
            res.json(err);
        });
    }); 
    // PUT route for updating checklist items
    app.put("/api/createItems", function(req,res){
        db.CreateItem.update({
            text: req.body.text,
            complete: req.body.complete
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(dbCreateItem){
            res.json(dbCreateListItem);
        })
        .catch(function(err) {
            res.json(err);
        });
    });


};