
import {appReducer, RequestStatusType, SetAppStatus,initialStateType,SetAppIsInitialized,SetAppError} from "./app-reducer";

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
    const endState=appReducer(startState,SetAppIsInitialized({value:true}))
    expect(endState.isInitialized).toBe(true)
})

test('error should be changed',()=>{
    const endState=appReducer(startState,SetAppError({error:'new error'}))
    expect(endState.error).toBe('new error')
})