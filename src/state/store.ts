import {applyMiddleware, combineReducers, createStore} from "redux";
import {actionTodolistsType, todolistsReducer} from "./todolist-reducer";
import {actionTasksType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer, initializedAppSaga} from "./app-reducer";
import {IsLoginOnType, loginReducer} from "./login-reducer";
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'
import {tasksSagaActionsType, TasksWatcherSaga,} from "./tasks-sagas";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,

})
const sagaMiddleware = createSagaMiddleware()
type ActionsType = actionTodolistsType | actionTasksType | IsLoginOnType | AppActionsType | tasksSagaActionsType
export type AppRootReducer = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware))
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('APP/INITIALIZE-APP', initializedAppSaga)
    yield TasksWatcherSaga()
}

// @ts-ignore
window.store = store