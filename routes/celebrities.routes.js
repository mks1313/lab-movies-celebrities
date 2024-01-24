const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  const newCelebrity = new Celebrity({
    name,
    occupation,
    catchPhrase,
  });

  newCelebrity
    .save()
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/celebrities/:id", (req, res, next) => { 
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/celebrities-details", { celebrity }); 
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/celebrities/:id/edit", (req, res, next) => { 
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/edit-celebrities", { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/celebrities/:id', (req, res, next) => {
  const { id } = req.params; 
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
    .then(() => {
      res.redirect(`/celebrities/${id}`); 
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

