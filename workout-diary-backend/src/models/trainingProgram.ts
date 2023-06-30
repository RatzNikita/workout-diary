import mongoose from "mongoose";

const trainingProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        maxLength: 30,
        required: true
    },
    workouts: [{
        _id: false,
        day: {
            type: String,
            required: true
        },
        exercises: [{
            _id: false,
            exercise: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'exercise',
                required: true
            },
            sets: {
                type: Number,
                required: true,
            },
            reps: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                default: 0,
            }
        }]
    }],
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now(),
    },
}, {versionKey: false})

export default mongoose.model('trainingProgram', trainingProgramSchema);