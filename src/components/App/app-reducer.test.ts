
import {appReducer, RequestStatusType, SetAppStatus, initialStateType, SetAppError} from "./app-reducer";
import {appActions} from "./index";

 let startState:initialStateType;
beforeEach(()=>{
     startState={
        status: 'idle',
        error: null,
        isInitialized: false}
})
test('appStatus should be changed',()=>{

    const newStatus:RequestStatusType = 'loading';
    const endState=appReducer(startState,SetAppStatus({status:newStatus}))

    expect(endState.status).toBe(newStatus)
})

test('isInitialized shoul be changed',()=>{
    const endState=appReducer(startState,appActions.inializedTC.fulfilled(undefined,'req',))
    expect(endState.isInitialized).toBe(true)
})

test('error should be changed',()=>{
    const endState=appReducer(startState,SetAppError({error:'new error'}))
    expect(endState.error).toBe('new error')
})