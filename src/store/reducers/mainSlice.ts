import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Workout} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import {ExerciseType} from "@component/components/MyProgram/ExercisesList/ExercisesList";

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
    exercises: ExerciseType[],
}

const initialState: MainState = {
    activeMenu: '',
    currentProgram: null,
    myProgramState: 'view',
    constructorState: '',
    myPrograms: [],
    exercises: [
        {
            name: 'Жим ногами',
            muscle: 'Квадрицепс',
            group: 'legs'
        },
        {
            name: 'Приседания со штангой',
            muscle: 'Квадрицепс',
            group: 'legs'
        },
        {
            name: 'Мёртвая тяга',
            muscle: 'Бицепс бедра',
            group: 'legs'
        },
        {
            name: 'Жим лёжа',
            muscle: 'Грудные',
            group: 'chest'
        },
        {
            name: 'Разводка гантелей лёжа на скамье',
            muscle: 'Грудные',
            group: 'chest'
        },
        {
            name: 'Сгибания рук в тренажёре "Бабочка"',
            muscle: 'Грудные',
            group: 'chest'
        },
        {
            name: 'Тяга штанги в наклоне',
            muscle: 'Широчайшие',
            group: 'back'
        },
        {
            name: 'Подтягивания широким хватом',
            muscle: 'Трапецевидная',
            group: 'back'
        },
    ]
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