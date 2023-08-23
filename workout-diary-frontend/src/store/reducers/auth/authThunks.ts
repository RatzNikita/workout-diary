import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "@component/service/api/api";
import {AuthForm} from "@component/types/authTypes";

export const signup = createAsyncThunk(
    '/registration',
    async (requiredInfo: AuthForm) => {
        const response = await $api.post('/signup', requiredInfo)
    }
)

export const signin = createAsyncThunk(
    '/login',
    async (requiredInfo: AuthForm) => {
        const response: { token: string } = await $api.post('/signin', requiredInfo)
        return response;
    }
)

export const getUserInfo = createAsyncThunk(
    '/getUserInfo',
    async () => {
        const response = await $api.get('/user',)
        return {
            user: response,
        }
    }
)

