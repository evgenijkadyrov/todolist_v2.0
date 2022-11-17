
import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

type actionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType =TodolistType &{
        filter: FilterType
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    newFilter: FilterType
    id: string
}
const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {

            return state.filter(el => el.id !== action.id)

        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistDomainType = {id: action.todolistId, title: action.title, filter: 'all', addedDate:'',order:0}
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            let todolist = state.find(el => el.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case  "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find((el) => el.id === action.id)
            if (todolist) {
                todolist.filter = action.newFilter
            }
            return ([...state])
        }

        default:
            return state
    }
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST", id: todolistId
    }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}

}
export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}
}
export const changeTodolistFilterAC = (newFilter: FilterType, id: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", newFilter, id}
}