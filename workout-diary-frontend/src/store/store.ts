import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainSlice from "@component/store/reducers/mainSlice";
import exercisesSlice from "@component/store/reducers/exercises/exercisesSlice";
import trainingProgramsSlice from "@component/store/reducers/trainingPrograms/trainingProgramsSlice";
import mealSlice from "@component/store/reducers/meal/mealSlice";

const reducer = combineReducers({
    main: mainSlice,
    exercises: exercisesSlice,
    trainingPrograms: trainingProgramsSlice,
    meal: mealSlice,
})

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch