import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Workout} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";

export interface TrainingProgram {
    name: string,
    workouts: Workout[]
}

interface MainState {
    activeMenu: string,
    myProgramState: string,
    constructorState: string,
    currentProgram: TrainingProgram | null,
    myPrograms: TrainingProgram[],
}

const initialState: MainState = {
    activeMenu: '',
    currentProgram: null,
    myProgramState: 'view',
    constructorState: '',
    myPrograms: []
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setActiveMenu(state, action: PayloadAction<string>) {
            state.activeMenu = action.payload
        },
        setMyProgramState(state, action: PayloadAction<string>) {
            state.myProgramState = action.payload
        },
        setConstructorState(state, action: PayloadAction<string>) {
            state.constructorState = action.payload
        },
        setProgram(state, action: PayloadAction<TrainingProgram>) {
            state.myPrograms = [...state.myPrograms, action.payload]
            state.myProgramState = 'view'
        },
        setCurrentProgram(state, action: PayloadAction<TrainingProgram>) {
            state.currentProgram = action.payload
        },
        setWorkout(state, action: PayloadAction<Workout>) {
            if (state.currentProgram !== null) {
                state.currentProgram.workouts = state.currentProgram.workouts
                    .map(workout => {
                        if (workout.day === action.payload.day) {
                            return {...action.payload}
                        }
                        return workout
                    })
                state.myPrograms = state.myPrograms.map(program => {
                    if(state.currentProgram && program.name === state.currentProgram.name) {
                        return {...state.currentProgram}
                    }
                    return program
                })
            }
        }
    },
})

export const {
    setActiveMenu,
    setMyProgramState,
    setProgram,
    setCurrentProgram,
    setWorkout} = mainSlice.actions
export default mainSlice.reducer