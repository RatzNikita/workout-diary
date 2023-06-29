import {TrainingProgram} from "@component/types/workoutTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createProgram, getPrograms} from "@component/store/reducers/trainingPrograms/trainingProgramsThunks";

interface TrainingProgramsState {
    error: string | null,
    trainingPrograms: TrainingProgram[],
    currentProgram: TrainingProgram | null,
}

const initialState : TrainingProgramsState = {
    error: null,
    trainingPrograms: [],
    currentProgram: null,
}

const trainingProgramsSlice = createSlice({
    name: 'trainingPrograms',
    initialState,
    reducers: {
        setCurrentProgram(state,action : PayloadAction<TrainingProgram>) {
            state.currentProgram = action.payload
        }
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

export const {setCurrentProgram} = trainingProgramsSlice.actions
export default trainingProgramsSlice.reducer;