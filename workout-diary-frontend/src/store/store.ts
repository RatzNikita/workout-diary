import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainSlice from "@component/store/reducers/mainSlice";
import exercisesSlice from "@component/store/reducers/exercises/exercisesSlice";
import trainingProgramsSlice from "@component/store/reducers/trainingPrograms/trainingProgramsSlice";
import mealSlice from "@component/store/reducers/meal/mealSlice";
import foodSlice from "@component/store/reducers/food/foodSlice"
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'


const reducer = combineReducers({
    main: mainSlice,
    exercises: exercisesSlice,
    trainingPrograms: trainingProgramsSlice,
    meal: mealSlice,
    food: foodSlice,
})


const persistConfig = {
    key: 'root',
    storage,

}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch