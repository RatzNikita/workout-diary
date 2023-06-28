const mongoose = require('mongoose')

const trainingProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        maxLength: 30,
        required: true
    },
    workouts: [{
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
    }],
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now(),
    },
}, {versionKey: false})

export default mongoose.model('trainingProgram', trainingProgramSchema);