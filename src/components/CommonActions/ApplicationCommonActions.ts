import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../Application/types";

const SetAppStatus=createAction<{status:RequestStatusType}>('app/setAppStatus')
const SetAppError=createAction<{error:null|string}>('app/setAppError')

export const ActionsCommonType={
     SetAppError, SetAppStatus
}