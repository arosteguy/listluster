// const router = require("express").Router();

// router.get("/test", (req, res) => {
//     res.json({
//         test:"Hello"
//     })
// })


// Our Burger controller
// =====================
// This file uses Sequelize to manage data manipulation
// for all apropos http requests.
// NOTE: This is the same file from last unit's homework,
// but with each route gutted and replaced with sequelize queries
// where references to our outmoded ORM file once sat.
var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {

  // send us to the next get function instead.
  res.redirect("/");
});

// get route, edited to match sequelize
router.get("/burgers", function(req, res) {
  // replace old function with sequelize function
  db.Burger.findAll({
    include: [db.Customer],
    // Here we specify we want to return our burgers in ordered by ascending burger_name
    order: [
      ["burger_name", "ASC"]
    ]
  })
  // use promise method to pass the burgers...
    .then(function(dbBurger) {
    // into the main index, updating the page
      var hbsObject = {
        burger: dbBurger
      };
      return res.render("index", hbsObject);
    });
});

// post route to create burgers
router.post("/burgers/create", function(req, res) {
  // edited burger create to add in a burger_name
  db.Burger.create({
    burger_name: req.body.burger_name
  })
  // pass the result of our call
    .then(function(dbBurger) {
    // log the result to our terminal/bash window
      console.log(dbBurger);
      // redirect
      res.redirect("/");
    });
});

// put route to devour a burger
router.put("/burgers/update", function(req, res) {
  // If we are given a customer, create the customer and give them this devoured burger
  if (req.body.customer) {
    db.Customer.create({
      customer: req.body.customer,
      BurgerId: req.body.burger_id
    })
      .then(function(dbCustomer) {
        return db.Burger.update({
          devoured: true
        }, {
          where: {
            id: req.body.burger_id
          }
        });
      })
      .then(function(dbBurger) {
        res.json("/");
      });
  }
  // If we aren't given a customer, just update the burger to be devoured
  else {
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.body.burger_id
      }
    })
      .then(function(dbBurger) {
        res.json("/");
      });
  }
});

router.get("/silly", function(req, res) {
    db.List.findAll({}).then((data) => {
        console.log(data);
        res.json(data);
    })
});




router.post("/create", function(req, res) {

    db.List.create({
        list_name: req.body.name,
        list_catagory: req.body.category,
        list_items: req.body.items
    }).then((data) => {
        console.log(data);
        res.json(data);
    }).catch(function(err) {
        console.log(err);
        res.status(404).json(err);
    })
});




module.exports = router;
