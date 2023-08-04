export interface Food {
    name: string,
    group: FoodGroup,
    fats: number,
    carbs: number,
    proteins: number,
    energy: number,
}

export interface Meal {
    foods: Food[],
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