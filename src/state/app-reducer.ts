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

// export const appReducer = (state = initialState, action: AppActionsType) => {
//     switch (action.type) {
//         case "APP/SET-STATUS": {
//             return {...state, status: action.status}
//         }
//         case "APP/SET-ERROR": {
//             return {...state, error: action.error}
//         }
//         case "APP-SET-IS-INITIALIZED": {
//             return {...state, isInitialized: action.isInitialized}
//         }
//         default:
//             return {...state}
//     }

//}
//actions
// export const SetAppError = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
// export const SetAppStatus = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
// export const SetAppIsInitialized = (value: boolean) => ({type: "APP-SET-IS-INITIALIZED", isInitialized: value} as const)

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
 //type InitialStateType = {
//     status: RequestStatusType
//     error: string | null
//     isInitialized: boolean
// }
export type SetErrorType = ReturnType<typeof SetAppError>
export type SetStatusType = ReturnType<typeof SetAppStatus>;
export type SetInitialized = ReturnType<typeof SetAppIsInitialized>

export type AppActionsType =
    |SetErrorType
    | SetStatusType
    | SetInitialized