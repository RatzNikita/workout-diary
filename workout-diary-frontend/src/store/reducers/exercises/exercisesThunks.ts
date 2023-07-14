import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "@component/service/api/api";
import {WeightChangeRequest} from "@component/types/workoutTypes";


export const getExercises = createAsyncThunk(
    '/getExercises',
    async () => {
        const response = await $api.get('/exercises')
        return {
            exercises: response.data,
        }
    }
)
