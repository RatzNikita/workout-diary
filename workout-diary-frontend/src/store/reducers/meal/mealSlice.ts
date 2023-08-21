import {FoodServing, Meal} from "@component/types/mealTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TrainingProgram} from "@component/types/workoutTypes";
import {getTime} from "@component/utils/helpFunctions";


interface MealState {
    todayMeals: Meal[],
    currentMeal: FoodServing[],
}

const initialState: MealState = {
    todayMeals: [],
    currentMeal: []
}


const mealSlice = createSlice(
    {
        name: 'meal',
        initialState,
        reducers: {
            addMeal(state, action: PayloadAction<FoodServing[]>) {
                state.todayMeals = [...state.todayMeals, {
                    foods: action.payload,
                    time: getTime(),
                }]
            },
        },
        extraReducers: {}
    }
)

export const {addMeal} = mealSlice.actions
export default mealSlice.reducer;