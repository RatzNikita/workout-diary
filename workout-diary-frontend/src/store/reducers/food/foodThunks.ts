import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "@component/service/api/api";
import {Food} from "@component/types/mealTypes";

export const createFood = createAsyncThunk(
    '/createFood',
    async (food: Food) => {
        const response = await $api.post('/food/add', food)
        return {
            food: response,
        }
    }
)

export const getFoods = createAsyncThunk(
    '/getFoods',
    async () => {
        const response = await $api.get('/food')
        return {
            foods: response,
        }
    }
)

export const deleteFood = createAsyncThunk(
    '/deleteFood',
    async (id: string) => {
        const response = await $api.delete('/food/' + id)
        return {
            id: response.id,
        }
    }
)
