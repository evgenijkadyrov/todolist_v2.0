import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {actionTodolistsType, todolistsReducer} from "./todolist-reducer";
import {actionTasksType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction,ThunkDispatch} from 'redux-thunk'

const rootReducer=combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})
type ActionsType=actionTodolistsType|actionTasksType
export type AppRootReducer=ReturnType<typeof rootReducer>
export const store=createStore(rootReducer, applyMiddleware(thunk))
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType=void>=ThunkAction< ReturnType, RootState, unknown, ActionsType>
// @ts-ignore
window.store=store