import React from "react";
import {AppThunk} from "./store";
import {authAPI, AuthMeType, ResponseType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {addTodolistAC} from "./todolist-reducer";
import {loginTC, setIsLoginOn} from "./login-reducer";
import {call, put } from "redux-saga/effects";
import {AxiosResponse} from "axios";

const initialState: InitialStateType = {
    status: 'idle',
    error: 'null',
    isInitialized: false
}
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS": {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "APP-SET-IS-INITIALIZED": {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return {...state}
    }

}
//actions
export const SetAppError = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const SetAppStatus = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const SetAppIsInitialized = (value: boolean) => ({type: "APP-SET-IS-INITIALIZED", isInitialized: value} as const)

export function* initializedAppSaga(){
    try{
        const res:AxiosResponse<ResponseType<AuthMeType>> = yield call(authAPI.me)
        if (res.data.resultCode === 0) {

            yield put(setIsLoginOn(true))

        } else {
            handleServerAppError(res.data, put)
        }
        yield put(SetAppIsInitialized(true))
    }
    catch (e) {
        handleServerNetworkAppError(e, put)
    }
}
export const initializeApp=()=>({type:'APP/INITIALIZE-APP'}as const)

//thunks
// export const inializedTC = (): AppThunk => {
//     return (dispatch) => {
//         authAPI.me()
//             .then(res => {
//                 if (res.data.resultCode === 0) {
//
//                     dispatch(setIsLoginOn(true))
//
//                 } else {
//                      handleServerAppError(res.data, dispatch)
//                 }
//                 dispatch(SetAppIsInitialized(true))
//             })
//             .catch(error => {
//                  handleServerNetworkAppError(error, dispatch)
//             })
//
// }}
export const logoutTC = (): AppThunk => {
    return (dispatch) => {
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {

                    dispatch(setIsLoginOn(false))

                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(SetAppIsInitialized(true))
            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })

    }}
//types
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type SetErrorType = ReturnType<typeof SetAppError>
export type SetStatusType = ReturnType<typeof SetAppStatus>;
export type SetInitialized = ReturnType<typeof SetAppIsInitialized>
export type AppActionsType =
    SetErrorType
    | SetStatusType
    | SetInitialized