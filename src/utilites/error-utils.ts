import {SetAppError, SetAppStatus} from "../components/App/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerAppError=<D>(data:ResponseType<D>,dispatch:Dispatch)=>{
    if (data.messages[0]) {
        dispatch(SetAppError({error:data.messages[0]}))
    } else {
        dispatch(SetAppError({error:'Some mistake'}))
    }
    dispatch(SetAppStatus({status:'failed'}))
}
export const handleServerNetworkAppError=(error: { message:string|null }, dispatch:Dispatch)=>{
    dispatch(SetAppError({error:error.message}?{error:error.message}:{error:'Some errror occupied' }))
    dispatch(SetAppStatus({status:'failed'}))
}