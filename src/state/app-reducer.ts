import {AppThunk} from "./store";
import {authAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {setIsLoginOn} from "./login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    error: null,
    isInitialized: false
}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        SetAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        SetAppIsInitialized(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        },
        SetAppError(state,action:PayloadAction<{error:string|null}>){

            // @ts-ignore
            state.error=action.payload.error
        }
    }
})
export const appReducer = slice.reducer

export const {SetAppError, SetAppStatus, SetAppIsInitialized} = slice.actions

//thunks
export const inializedTC = (): AppThunk => {
    return (dispatch) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {

                    dispatch(setIsLoginOn({value: true}))

                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(SetAppIsInitialized({value: true}))
            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })

    }
}
export const logoutTC = (): AppThunk => {
    return (dispatch) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {

                    dispatch(setIsLoginOn({value: false}))

                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(SetAppIsInitialized({value: true}))
            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })

    }
}
//types
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'

export type SetErrorType = ReturnType<typeof SetAppError>
export type SetStatusType = ReturnType<typeof SetAppStatus>;
export type SetInitialized = ReturnType<typeof SetAppIsInitialized>

export type AppActionsType =
    |SetErrorType
    | SetStatusType
    | SetInitialized