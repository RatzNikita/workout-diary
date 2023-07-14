import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "@component/service/api/api";
import {TrainingProgramRequest, WeightChangeRequest} from "@component/types/workoutTypes";

export const createProgram = createAsyncThunk(
    '/createTrainingProgram',
    async (program : TrainingProgramRequest) => {
        const response = await $api.post('/trainingProgram',program)
        return {
            trainingProgram: response.data,
        }
    }
)

export const getPrograms = createAsyncThunk(
    '/getTrainingPrograms',
    async () => {
        const response = await $api.get('/trainingProgram')
        return {
            trainingPrograms: response.data,
        }
    }
)


export const setWeight = createAsyncThunk(
    '/setWeight',
    async (data: WeightChangeRequest) => {
        const response = await $api.patch('/trainingProgram/setWeight', data)
        return response.data
    }
)