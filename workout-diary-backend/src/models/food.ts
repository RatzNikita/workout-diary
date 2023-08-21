import mongoose from "mongoose";

export enum FoodGroup {
    garnish = 'garnish',
    meat = "meat",
    vegetable = "vegetable",
    fruit = "fruit",
    dessert = "dessert",
    sauce = "sauce",
    drink = "drink",
    sportmeal = "sportmeal",
    milk = "milk",
    bakery = "bakery"
}

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        maxLength: 100,
        required: true,
        unique: true,
    },
    group: {
        type: String,
        enum: FoodGroup,
        required: true,
    },
    proteins: {
        type: Number,
        required: true,
    },
    carbs: {
        type: Number,
        required: true,
    },
    fats: {
        type: Number,
        required: true,
    },
    energy: {
        type: Number,
        required: true,
    },
}, {versionKey: false})

export default mongoose.model('food',foodSchema)