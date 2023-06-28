const mongoose = require('mongoose');

enum MuscleGroup {
    'chest',
    'back',
    'legs',
    'arms',
}

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        maxLength: 30,
        required: true
    },
    muscle: {
        type: String,
        minLength: 4,
        maxLength: 30,
        required: true
    },
    group: {
        type: String,
        enum: MuscleGroup,
        required: true,
    }
},{versionKey: false})

export default mongoose.model('exercise',exerciseSchema)