import React from "react";

const initialState:InitialStateType={
    status:'idle',
    error:'null'
}
export const appReducer=(state:InitialStateType=initialState,action:ActionsType):InitialStateType=>{
    switch (action.type) {
        case "APP/SET-STATUS":{
            return {...state, status:action.status}
        }
            case "APP/SET-ERROR":{
                return {...state, error:action.error}
            }
        default: return {...state}
    }

}
//actions
export const SetAppError=(error:string|null)=>({type:"APP/SET-ERROR",error}as const)
export const SetAppStatus=(status:RequestStatusType)=>({type:"APP/SET-STATUS",status} as const)

//types
export type RequestStatusType='idle'|'loading'|'success'|'failed'
type InitialStateType={
    status:RequestStatusType
    error:string |null
}
export type SetErrorType=ReturnType<typeof SetAppError>
export type SetStatusType = ReturnType<typeof SetAppStatus>;
type ActionsType=
    SetErrorType
    |SetStatusType