const Workout = require('../models/workout');

module.exports.createWorkout = (req,res) => Workout.create