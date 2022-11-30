import {appActions, appReducer} from "../Application";
import {initialStateType, RequestStatusType} from "./types";
import {ActionsCommonType} from "../CommonActions/ApplicationCommonActions";


let startState: initialStateType;
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})
test('appStatus should be changed', () => {

    const newStatus: RequestStatusType = 'loading';
    const endState = appReducer(startState, ActionsCommonType.SetAppStatus({status: newStatus}))

    expect(endState.status).toBe(newStatus)
})

test('isInitialized shoul be changed', () => {
    const endState = appReducer(startState, appActions.inialized.fulfilled(undefined, 'req',))
    expect(endState.isInitialized).toBe(true)
})

test('error should be changed', () => {
    const endState = appReducer(startState, ActionsCommonType.SetAppError({error: 'new error'}))
    expect(endState.error).toBe('new error')
})