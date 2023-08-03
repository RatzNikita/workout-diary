
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
    garnish,
    meat,
    vegetable,
    fruit,
    dessert,
    sauce,
    drink,
    sportmeal,
    milk,
    bakery
}