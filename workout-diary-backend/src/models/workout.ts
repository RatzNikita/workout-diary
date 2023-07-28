import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        maxLength: 30,
        required: true
    },
    exercises: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'exercise',
        default: [],
    }
})

module.exports = mongoose.model('workout',workoutSchema);