import {AxiosResponse} from "axios";
import {authAPI, AuthMeType, ResponseType} from "../api/todolists-api";
import {all, call, put, takeEvery} from "redux-saga/effects";
import {setIsLoginOn} from "./login-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {SetAppIsInitialized} from "./app-reducer";

 export function* initializedAppSaga() {
    try {
        const res: AxiosResponse<ResponseType<AuthMeType>> = yield call(authAPI.me)
        if (res.data.resultCode === 0) {

            yield put(setIsLoginOn(true))

        } else {
            handleServerAppError(res.data, put)
        }
        yield put(SetAppIsInitialized(true))
    } catch (e) {
        handleServerNetworkAppError(e, put)
    }
}

 export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'} as const)
// export function* initializeAppWatcher(){
//
//      yield all([takeEvery('APP/INITIALIZE-APP',initializedAppSaga)])
// }

export type SetInitialized = ReturnType<typeof SetAppIsInitialized>