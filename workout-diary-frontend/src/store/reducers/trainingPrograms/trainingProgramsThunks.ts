import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "@component/service/api/api";
import {TrainingProgramRequest} from "@component/types/workoutTypes";

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