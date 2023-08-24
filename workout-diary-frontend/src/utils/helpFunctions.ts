import {Meal} from "@component/types/mealTypes";

export function getTime() {
    const today = new Date();
    return `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`
}

export function getTotalNutrientSum(meals: Meal[]) {
    const proteins = meals.reduce((previousValue, currentValue) => previousValue + currentValue.foods.reduce((previousValue1, currentValue1) => previousValue1 + (currentValue1.food.proteins * currentValue1.weight / 100), 0), 0).toFixed(1)
    const fats = meals.reduce((previousValue, currentValue) => previousValue + currentValue.foods.reduce((previousValue1, currentValue1) => previousValue1 + (currentValue1.food.fats * currentValue1.weight / 100), 0), 0).toFixed(1)
    const carbs = meals.reduce((previousValue, currentValue) => previousValue + currentValue.foods.reduce((previousValue1, currentValue1) => previousValue1 + (currentValue1.food.carbs * currentValue1.weight / 100), 0), 0).toFixed(1)
    const energy = meals.reduce((previousValue, currentValue) => previousValue + currentValue.foods.reduce((previousValue1, currentValue1) => previousValue1 + (currentValue1.food.energy * currentValue1.weight / 100), 0), 0).toFixed(1)
    return {
        proteins,
        fats,
        carbs,
        energy,
    }
}

export function getNutrientSum(meal: Meal) {
    const proteins = meal.foods.reduce((previousValue1, currentValue1) => previousValue1 + (currentValue1.food.proteins * currentValue1.weight / 100), 0).toFixed(1)
    const fats = meal.foods.reduce((previousValue1, currentValue1) => previousValue1 + (currentValue1.food.fats * currentValue1.weight / 100), 0).toFixed(1)
    const carbs = meal.foods.reduce((previousValue1, currentValue1) => previousValue1 + (currentValue1.food.carbs * currentValue1.weight / 100), 0).toFixed(1)
    const energy = meal.foods.reduce((previousValue1, currentValue1) => previousValue1 + (currentValue1.food.energy * currentValue1.weight / 100), 0).toFixed(1)
    return {
        proteins,
        fats,
        carbs,
        energy,
    }
}


