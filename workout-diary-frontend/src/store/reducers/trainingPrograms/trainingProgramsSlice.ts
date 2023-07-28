import {TrainingProgram, Workout} from "@component/types/workoutTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createProgram, getPrograms, setWeight} from "@component/store/reducers/trainingPrograms/trainingProgramsThunks";

interface TrainingProgramsState {
    error: string | null,
    trainingPrograms: TrainingProgram[],
    currentProgram: TrainingProgram | null,
}

const initialState: TrainingProgramsState = {
    error: null,
    trainingPrograms: [],
    currentProgram: null,
}

const trainingProgramsSlice = createSlice({
    name: 'trainingPrograms',
    initialState,
    reducers: {
        setCurrentProgram(state, action: PayloadAction<TrainingProgram>) {
            state.currentProgram = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProgram.fulfilled, (state, action) => {
            state.trainingPrograms = [...state.trainingPrograms, action.payload.trainingProgram]
        })
        builder.addCase(createProgram.rejected, (state) => {
            state.error = 'Не удалось добавить программу'
        })
        builder.addCase(getPrograms.fulfilled, (state, action) => {
            state.trainingPrograms = action.payload.trainingPrograms
        })
        builder.addCase(getPrograms.rejected, (state) => {
            state.error = 'Не удалось получить список программ';
        })
        builder.addCase(setWeight.fulfilled, (state, action: PayloadAction<Workout>) => {
            if (state.currentProgram && state.trainingPrograms) {
                console.log(action.payload)
                state.currentProgram.workouts = state.currentProgram.workouts.map(w => w.day === action.payload.day ? action.payload : w)
                state.trainingPrograms = state.trainingPrograms.map(p => {
                    if (p._id === state.currentProgram?._id) {
                        p.workouts = p.workouts.map(w => w.day === action.payload.day ? action.payload : w)
                    }
                    return p
                })
            }
        })
        builder.addCase(setWeight.rejected,(state) => {
            state.error = 'Не удалось изменить вес'
        })
        builder.addCase(setWeight.pending,(state)=> {
            state.error = null;
        })

    }
})

export const {setCurrentProgram} = trainingProgramsSlice.actions
export default trainingProgramsSlice.reducer;