export interface Food {
    _id?: string,
    name: string,
    group: FoodGroup,
    fats: number,
    carbs: number,
    proteins: number,
    energy: number,
}


export interface FoodServing {
    food: Food,
    weight: number,
}

export interface Meal {
    foods: FoodServing[],
    time: string,
}

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