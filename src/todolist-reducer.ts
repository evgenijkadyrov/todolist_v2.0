import React from "react";
import {FilterType, TodolistType} from "./App";
import {v1} from "uuid";

type actionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
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
export const todolistsReducer = (state: Array<TodolistType>, action: actionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            const todolist = state.filter(el => el.id !== action.id)
            return todolist
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: v1(), title: action.title, filter: 'all'}
            return [...state, newTodolist]
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
            throw new Error('I dont understand')
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST", id: todolistId
    }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title}

}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}
}
export const ChangeTodolistFilterAC = (newFilter: FilterType, id: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", newFilter, id}
}