import {authAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginTC} from "./login-reducer";

export type initialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}
const initialState: initialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const inializedTC = createAsyncThunk('app/isInitialised', async (param, {dispatch}) => {
    try {
        const res = await authAPI.me()

        if (res.data.resultCode === 0) {

            dispatch(loginTC.fulfilled({isLoginOn:true},'required',{email:'',password:'',rememberMe:false}))

        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (error: any) {
        handleServerNetworkAppError(error, dispatch)
    }
})

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        SetAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },

        SetAppError(state, action: PayloadAction<{ error: string | null }>) {

            // @ts-ignore
            state.error = action.payload.error
        }
    },
    extraReducers: (builder => {
        builder.addCase(inializedTC.fulfilled, (state, action) => {
            state.isInitialized = true
        })
    })
})
export const appReducer = slice.reducer

export const {SetAppError, SetAppStatus} = slice.actions


//types
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'

export type SetErrorType = ReturnType<typeof SetAppError>
export type SetStatusType = ReturnType<typeof SetAppStatus>;


export type AppActionsType =
    | SetErrorType
    | SetStatusType
