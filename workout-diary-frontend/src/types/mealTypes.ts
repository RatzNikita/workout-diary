
export interface Food {
    name: string,
    fats: number,
    carbs: number,
    proteins: number,
    energy: number,
}

export interface Meal {
    foods: Food[],
}