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
export const SetError=(error:string|null)=>({type:"APP/SET-ERROR",error}as const)
export const SetStatus=(status:RequestStatusType)=>({type:"APP/SET-STATUS",status} as const)

//types
export type RequestStatusType='idle'|'loading'|'success'|'failed'
type InitialStateType={
    status:RequestStatusType
    error:string |null
}
export type SetErrorType=ReturnType<typeof SetError>
export type SetStatusType = ReturnType<typeof SetStatus>;
type ActionsType=
    SetErrorType
    |SetStatusType