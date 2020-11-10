// Iteration #1
const mongoose = require('mongoose');
const Drone = require('../models/Drone.js');
const DB_NAME = 'express-drones-dev';  
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const drones = [
  {
    name: "Harry", 
    propellers: 3, 
    maxSpeed: 12
  },
  {
   name: "Hermione", 
    propellers: 5, 
    maxSpeed: 18
  },
  {
    name: "Ron", 
    propellers: 2, 
    maxSpeed: 5
  }
];


Drone.create(drones)
  .then(dronesFromDB => {
    console.log(`Created ${dronesFromDB.length} drones`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating drones from the DB: ${err}`));