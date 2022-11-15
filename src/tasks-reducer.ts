import React from "react";
import {FilterType, TasksStateType, TodolistType} from "./App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

type actionType =
    RemoveTaskActionType
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistActionType
    | RemoveTodolistActionType


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    id: string
}
type AddTaskAT = {
    type: "ADD-TASK"
    todolistId: string
    title: string
}
type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    id: string
    isDone: boolean
}
type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    id: string
    title: string
}
export const tasksReducer = (state: TasksStateType, action: actionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy={...state}
            let tasks = stateCopy[action.todolistId]
            let filteredTasks = tasks.filter(el => el.id !== action.id)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy={...state}
            let newTask = {id: v1(), title: action.title, isDone: false}
           let tasks=stateCopy[action.todolistId]
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy={...state}
            let todolistTasks = stateCopy[action.todolistId]
            let task = todolistTasks.find(el => el.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy={...state}
            let todolistTasks = stateCopy[action.todolistId]
            let task = todolistTasks.find(el => el.id === action.id)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            let copyState = {...state}
            copyState[action.todolistId] = []
            return copyState
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            throw new Error('I dont understand')
    }
}
export const removeTaskAC = (todolistId: string, id: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK", todolistId, id
    }
}
export const addTaskAC = (todolistId: string, title: string): AddTaskAT => {
    return {
        type: "ADD-TASK", todolistId, title
    }

}
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean): ChangeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", todolistId, id, isDone}
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", todolistId, id, title}
}
