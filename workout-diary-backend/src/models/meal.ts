import mongoose from 'mongoose'


const mealSchema = new mongoose.Schema({
    foods: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'foods',
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
},{versionKey: false})

export default mongoose.model('meal', mealSchema)