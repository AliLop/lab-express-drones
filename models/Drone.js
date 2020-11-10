const mongoose = require ('mongoose');
const { Schema, model } = mongoose;
 
const droneSchema = new Schema (
  {
    name: String, 
    propellers: Number, 
    maxSpeed: {
        type: Number,
        max: 18
    }
  }, {
    timestamps: true // to record created at & updated at 
  }
)
 
module.exports = model('Drone', droneSchema); 