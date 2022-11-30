import {authAPI} from "../../api/todolists-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkAppError,
    handleServerAppError,
    handleServerNetworkAppError
} from "../../utilites/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginActions} from "../Login";
import {ActionsCommonType} from "../CommonActions/ApplicationCommonActions";
import {initialStateType} from "./types";

const initialState: initialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
const inialized = createAsyncThunk('application/isInitialised', async (param, thunkAPI) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(loginActions.login.fulfilled({isLoginOn: true}, 'required', {
                email: '',
                password: '',
                rememberMe: false
            }))

        } else {
           return handleAsyncServerAppError(res.data,thunkAPI)
        }

    } catch (error: any) {
        handleAsyncServerNetworkAppError(error,thunkAPI)
    }
})
export const ActionsType = {
    inialized
}
export const slice = createSlice({
    name: 'application',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(inialized.fulfilled, (state, action) => {
            state.isInitialized = true
        })
        builder.addCase(ActionsCommonType.SetAppStatus, (state, action) => {
            state.status = action.payload.status
        })
        builder.addCase(ActionsCommonType.SetAppError, (state, action) => {
            state.error = action.payload.error
        })
    })
})








