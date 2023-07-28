import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "@component/service/api/api";


export const getExercises = createAsyncThunk(
    '/getExercises',
    async () => {
        const response = await $api.get('/exercises')
        return {
            exercises: response.data,
        }
    }
)
