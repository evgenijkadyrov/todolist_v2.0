import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "./store";
import {RequestStatusType, SetAppStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";


const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionTodolistsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id)

        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)

        case  "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.newFilter} : el)
        case "SET-TODOLISTS-ENTITYSTATUS":
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.entityStatus} : el)
        case "SET-TODOLISTS": {
            return action.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        }
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string,) => ({
    type: "CHANGE-TODOLIST-TITLE", title, id
} as const)
export const changeTodolistFilterAC = (newFilter: FilterType, id: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    newFilter, id
} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: "SET-TODOLISTS-ENTITYSTATUS",
    id,
    entityStatus
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)


//types
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type SetTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export type actionTodolistsType =
    | RemoveTodolistAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsAT
    | SetTodolistEntityStatusAT

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}