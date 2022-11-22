import {SetAppStatus} from "./app-reducer";
import {authAPI, DataLoginPropsType} from "../api/todolists-api";
import {AppThunk} from "./store";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";


type InitialStateType = {
    isLoginOn: boolean

}
const initialState: InitialStateType = {
    isLoginOn: false,

}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGIN-ON': {
            return {...state, isLoginOn: action.value}
        }
        default:
            return state
    }
}
//actions
export const setIsLoginOn = (value: boolean) => ({
    type: "login/SET-IS-LOGIN-ON", value
} as const)

//thunks
export const loginTC = (data: DataLoginPropsType): AppThunk => {

    return (dispatch) => {

        dispatch(SetAppStatus('loading'))
        authAPI.loginMe(data)

            .then(res => {

                if (res.data.resultCode === 0) {
                    dispatch(setIsLoginOn(true))
                    dispatch(SetAppStatus('success'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)

            })
    }
}


//types

export type ActionsType = IsLoginOnType

export type IsLoginOnType = ReturnType<typeof setIsLoginOn>

