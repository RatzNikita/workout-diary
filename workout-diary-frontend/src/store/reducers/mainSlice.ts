import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Exercise, TrainingProgram, Workout} from "@component/types/workoutTypes";

interface MainState {
    activeMenu: string,
    myProgramState: string,
    constructorState: string,
}

const initialState: MainState = {
    activeMenu: '',
    myProgramState: 'view',
    constructorState: '',
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
    },
})

export const {
    setActiveMenu,
    setMyProgramState,
   } = mainSlice.actions
export default mainSlice.reducer