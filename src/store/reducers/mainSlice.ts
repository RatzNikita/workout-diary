import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Workout} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";

interface TrainingProgram {
    name: string,
    workouts: Workout[]
}

interface MainState {
    activeMenu: string,
    myProgramState: string,
    constructorState: string,
    myPrograms: TrainingProgram[],
}

const initialState : MainState  = {
    activeMenu: '',
    myProgramState: 'view',
    constructorState: '',
    myPrograms: []
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setActiveMenu(state,action : PayloadAction<string>) {
            state.activeMenu = action.payload
        },
        setMyProgramState(state,action : PayloadAction<string>) {
            state.myProgramState = action.payload
        },
        setConstructorState(state,action : PayloadAction<string>) {
            state.constructorState = action.payload
        },
        setProgram(state,action: PayloadAction<TrainingProgram>) {
            state.myPrograms = [...state.myPrograms,action.payload]
            state.myProgramState = 'view'
        }
    },
})

export const { setActiveMenu,setMyProgramState,setProgram } = mainSlice.actions
export default mainSlice.reducer