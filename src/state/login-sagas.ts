import {AxiosResponse} from "axios";
import {authAPI, DataLoginPropsType, ResponseType} from "../api/todolists-api";
import {call, put} from "redux-saga/effects";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {SetAppIsInitialized, SetAppStatus} from "./app-reducer";
import {setIsLoginOn} from "./login-reducer";

//sagas
export function* LoginWorkerSaga(action: LoginAType) {
    yield put(SetAppStatus('loading'))
    try {

        const res: AxiosResponse<ResponseType<{ userId: number }>> = yield call(authAPI.loginMe, action.data)

        if (res.data.resultCode === 0) {
            yield  put(setIsLoginOn(true))
            yield put(SetAppStatus('success'))
        } else {
            handleServerAppError(res.data, put)
        }
    } catch (error) {
        handleServerNetworkAppError(error, put)

    }
}
export function* LogoutWorkerSaga() {
    try {
        const res: AxiosResponse<ResponseType<{}>> = yield call(authAPI.logout)

        if (res.data.resultCode === 0) {

           yield put(setIsLoginOn(false))

        } else {
            handleServerAppError(res.data, put)
        }
        yield put(SetAppIsInitialized(true))
    } catch (error) {
        handleServerNetworkAppError(error, put)
    }
}

//activators
export const LoginA = (data: DataLoginPropsType) => ({type: 'login/LOGIN-APP', data} as const)

export const LogoutA = () => ({type: 'login/LOGOUT-APP'})

//types
type LogoutAType = ReturnType<typeof LogoutA>
type LoginAType = ReturnType<typeof LoginA>

export type LoginATypes = LoginAType
    | LogoutAType