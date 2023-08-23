import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getUserInfo, signin} from "@component/store/reducers/auth/authThunks";
import $api from "@component/service/api/api";

interface MainState {
    activeMenu: string,
    myProgramState: string,
    constructorState: string,
    isLoading: boolean,
    userId: string,
    username: string,
    isLoggedIn: boolean,
    token: string,
}

const initialState: MainState = {
    activeMenu: '',
    myProgramState: 'view',
    constructorState: '',
    isLoading: false,
    isLoggedIn: false,
    userId: '',
    username: '',
    token: '',
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
    extraReducers: (builder) => {
        builder.addCase(signin.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(signin.fulfilled, (state, action) => {

            state.token = action.payload.token
            console.log(action.payload.token)
            $api.setToken(action.payload.token)
            state.isLoggedIn = true
            state.isLoading = false
        })
        builder.addCase(signin.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.username = action.payload.user.username
            state.userId = action.payload.user._id
        })
    }
})

export const {
    setActiveMenu,
} = mainSlice.actions
export default mainSlice.reducer