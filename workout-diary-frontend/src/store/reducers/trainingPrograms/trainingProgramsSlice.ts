import {TrainingProgram} from "@component/types/workoutTypes";
import {createSlice} from "@reduxjs/toolkit";
import {createProgram, getPrograms} from "@component/store/reducers/trainingPrograms/trainingProgramsThunks";

interface TrainingProgramsState {
    error: string | null,
    trainingPrograms: TrainingProgram[],
}

const initialState : TrainingProgramsState = {
    error: null,
    trainingPrograms: []
}

const trainingProgramsSlice = createSlice({
    name: 'trainingPrograms',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createProgram.fulfilled,(state,action) => {
            state.trainingPrograms = [...state.trainingPrograms,action.payload.trainingProgram]
        })
        builder.addCase(createProgram.rejected,(state) => {
            state.error = 'Не удалось добавить программу'
        })
        builder.addCase(getPrograms.fulfilled,(state,action) => {
            state.trainingPrograms = action.payload.trainingPrograms
        })
        builder.addCase(getPrograms.rejected,(state) => {
            state.error = 'Не удалось получить список программ';
        })
    }
})

export default trainingProgramsSlice.reducer;