import {Food, FoodServing, Meal} from "@component/types/mealTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TrainingProgram} from "@component/types/workoutTypes";
import {getTime} from "@component/utils/helpFunctions";
import {createFood, deleteFood, getFoods} from "@component/store/reducers/food/foodThunks";


interface MealState {
    foods: Food[]
}

const initialState: MealState = {
    foods: [],
}


const foodSlice = createSlice(
    {
        name: 'food',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(createFood.fulfilled, (state, action) => {
                state.foods = [...state.foods, action.payload.food]
            })
            builder.addCase(getFoods.fulfilled, (state, action) => {
                state.foods = action.payload.foods
            })
            builder.addCase(deleteFood.fulfilled, (state, action) => {
                console.log(action.payload)
                state.foods = state.foods.filter(food => food._id !== action.payload.id)
            })
        }
    }
)

export const {} = foodSlice.actions
export default foodSlice.reducer;