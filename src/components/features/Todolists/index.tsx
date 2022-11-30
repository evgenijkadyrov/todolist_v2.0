import * as todolistsSelectors from './selectors'
import {ActionsType as asyncTodolistsActions} from './todolist-reducer'
import {slice as todolistsSlice} from './todolist-reducer'
import {slice as tasksSlice} from './tasks-reducer'
import {ActionType as tasksActions} from './tasks-reducer'
import {TodolistsList}from './Todolists'

const todolistsActions={
    ...asyncTodolistsActions, ...todolistsSlice.actions
}
const tasksReducer=tasksSlice.reducer
const todolistsReducer=todolistsSlice.reducer
export {
    todolistsSelectors,
    todolistsActions,
    tasksActions,tasksReducer,todolistsReducer,TodolistsList
}
