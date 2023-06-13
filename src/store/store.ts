import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainSlice from "@component/store/reducers/mainSlice";

const reducer = combineReducers({
    main: mainSlice
})

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch