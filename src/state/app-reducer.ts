import {SetInitialized} from "./app-sagas";

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


//types
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type SetErrorType = ReturnType<typeof SetAppError>
export type SetStatusType = ReturnType<typeof SetAppStatus>;
export type AppActionsType =
    SetErrorType
    | SetStatusType
    | SetInitialized