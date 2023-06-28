import {Exercise} from "@component/types/workoutTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getExercises} from "@component/store/reducers/exercises/exercisesThunks";


interface ExercisesState {
    error: string | null,
    exercises: Exercise[]
}

const initialState : ExercisesState = {
    exercises: [],
    error: null,
}

const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
        addExercise(state, action : PayloadAction<Exercise>) {
            state.exercises = [...state.exercises,action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getExercises.fulfilled, (state, action) => {
            state.exercises = action.payload.exercises
        })
        builder.addCase(getExercises.rejected,(state) => {
            state.error = 'Не удалось загрузить упражнения'
        })
        }
})

export const {addExercise} = exercisesSlice.actions;
export default exercisesSlice.reducer;