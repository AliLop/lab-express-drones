const express = require('express');

// require the Drone model here
const Drone = require('../models/Drone.js');

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((allTheDBDrones) => {
      console.log("/drones", allTheDBDrones)
      res.render('drones/list', {drones: allTheDBDrones})
    })
    .catch((err) => {
      console.log('error', err);
    })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  let {name, propellers, maxSpeed } = req.body;

  Drone.create({
    name,
    propellers,
    maxSpeed
  })
  .then (() => {
    res.redirect('/drones');  
  })
  .catch ((err) => {
    console.log('error', err)
    res.redirect('drones/create-form')
  });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneId = req.params.id

  Drone.findById(droneId)
    .then((theOneDrone) => {
      res.render('drones/update-form', { drone: theOneDrone});
    })
    .catch((err) => {
      res.render('error',  {err});
    })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneId = req.params.id;
  let {name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(droneId, {
      name,
      propellers,
      maxSpeed
    })
    .then(() => {
        res.redirect(`/drones`);
      })
    .catch(() => {
      res.redirect(`drones/${droneId}/edit`);
    })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  let droneId = req.params.id;
  Drone.findByIdAndRemove(droneId)
    .then(() => {   
      res.redirect('/drones');    
    })
    .catch((err) => {
      res.render('error',  {err});
    });
});

module.exports = router;
