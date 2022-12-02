import {applyMiddleware, combineReducers, createStore} from "redux";
import {actionTodolistsType, todolistsReducer} from "./todolist-reducer";
import {actionTasksType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from "./app-reducer";
import {IsLoginOnType, loginReducer} from "./login-reducer";
import createSagaMiddleware from 'redux-saga'
import {
    AddTaskWorkerSaga,
    fetchTasksWorkerSaga,
    RemoveTaskWorkerSaga,
    tasksSagaActionsType,
    UpdateTaskWorkerSaga,
} from "./tasks-sagas";
import {initializedAppSaga} from "./app-sagas";
import {
    AddTodolistWorkerSaga,
    ChangeTodolisTitleWorkerSaga,
    FetchTodolistsWorkerSaga,
    RemoveTodolistWorkerSaga,
    TodolistsActionSagasType
} from "./todolists-sagas";
import {takeEvery} from "redux-saga/effects";
import {LoginATypes, LoginWorkerSaga, LogoutWorkerSaga} from "./login-sagas";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,

})
const sagaMiddleware = createSagaMiddleware()
type ActionsType =
    actionTodolistsType
    | actionTasksType
    | IsLoginOnType
    | AppActionsType
    | tasksSagaActionsType
    | TodolistsActionSagasType
    | LoginATypes

export type AppRootReducer = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware))
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('APP/INITIALIZE-APP', initializedAppSaga)
    yield takeEvery('tasks/REMOVE-TASK', RemoveTaskWorkerSaga)
    yield  takeEvery('tasks/ADD-TASK', AddTaskWorkerSaga)
    yield  takeEvery('tasks/UPDATE-TASK', UpdateTaskWorkerSaga)
    yield takeEvery('tasks/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('todolists/FETCH-TODOLISTS', FetchTodolistsWorkerSaga)
    yield takeEvery('todolists/REMOVE-TODOLIST', RemoveTodolistWorkerSaga)
    yield takeEvery('todolists/ADD-TODOLIST', AddTodolistWorkerSaga)
    yield takeEvery('todolists/CHANGE-TODOLIST-TITLE', ChangeTodolisTitleWorkerSaga)
    yield takeEvery('login/LOGIN-APP', LoginWorkerSaga)
    yield takeEvery('login/LOGOUT-APP', LogoutWorkerSaga)


}

// @ts-ignore
window.store = store