// Requiring our models and passport as we've configured it
var db = require("../models");

module.exports = function(app) {
    app.get("/api/users/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: db.List,
                    include: db.Item
                }
            ]
        }).then(function(dbUser) {
            res.json(dbUser)
        }).catch(function(err) {
            res.json(err);
        })
    })

    app.get("/api/lists", function(req, res) {
        db.List.findAll({}).then(function(dbLists) {
            res.json(dbLists);
        })
    })

    // POST route for saving a checklist item
    app.post("/api/lists", function(req, res){
        // sanity check
        console.log("YOOOO")
        db.List.create({
            title: req.body.title,
            UserId: req.body.userId
        }).then(function(dbList){
            console.log(dbList)
            res.json(dbList);   
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });

    app.get("/api/lists/:id", function(req, res) {
        db.List.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Item]
        }).then(function(dbList) {
            console.log(dbList)
            res.json(dbList)
        }).catch(function(err) {
            res.json(err);
        })
    })

    app.post("/api/items", function(req, res) {
        db.Item.create(req.body).then(dbItem => {
            res.json(dbItem)
        })
        .catch(err => {
            res.json(err);
        })
    })
   

    app.delete("/api/items/:id", function(req, res) {
        db.Item.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbItem) {
            res.json(dbItem);
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