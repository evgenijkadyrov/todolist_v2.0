import {SetAppStatus} from "./app-reducer";
import {authAPI, DataLoginPropsType} from "../api/todolists-api";
import {AppThunk} from "./store";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// type InitialStateType = {
//     isLoginOn: boolean
// }
const initialState = {
    isLoginOn: false,
}
const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsLoginOn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoginOn = action.payload.value
        }

    }
})
export const loginReducer = slice.reducer
export const {setIsLoginOn} = slice.actions

// export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGIN-ON': {
//             //return {...state, isLoginOn: action.value}
//
//             return {...state, isLoginOn: action.value}
//         }
//         default:
//             return state
//     }
// }
//actions
// export const setIsLoginOn = (value: boolean) => ({
//     type: "login/SET-IS-LOGIN-ON", value
// } as const)

//thunks
export const loginTC = (data: DataLoginPropsType): AppThunk => {

    return (dispatch) => {

        dispatch(SetAppStatus({status:'loading'}))
        authAPI.loginMe(data)

            .then(res => {

                if (res.data.resultCode === 0) {
                    dispatch(setIsLoginOn({value: true}))
                    dispatch(SetAppStatus({status:'success'}))
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
//
// export type ActionsType = IsLoginOnType
//
 export type IsLoginOnType = ReturnType<typeof setIsLoginOn>

