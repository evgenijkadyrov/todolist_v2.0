
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolist-reducer";
import {TaskPriorities, TaskResponseType, TaskStatuses, todolistsAPI} from "../api/todolists-api";

import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AppThunk} from "./store";
type SetTasksAT=ReturnType<typeof setTasksAC>
export type actionTasksType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistAT
    | RemoveTodolistAT
    |SetTasksAT
|SetTodolistsAT

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: actionTasksType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let filteredTasks = tasks.filter(el => el.id !== action.id)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            let newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                startDate: '',
                order: 0,
                deadline: '',
                addedDate: '',
                priority: TaskPriorities.Low,
                description: ''
            }
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            let todolistTasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = todolistTasks.map(el => el.id === action.id ? {
                ...el,
                status: action.status
            } : el)

            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let todolistTasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = todolistTasks.map(el => el.id === action.id ? {
                ...el,
                title: action.title
            } : el)
            return stateCopy
        }
        case "ADD-TODOLIST": {
            let copyState = {...state}
            copyState[action.id] = []
            return copyState
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOLISTS":{
           const copyState={...state}
           action.todolists.forEach(el=>{
               copyState[el.id]=[]
           })
            return copyState
        }
        case "SET-TASKS":{
            const copyState={...state}
            copyState[action.todolistId]=action.tasks
            return copyState
        }
        default:
            return state
    }
}
export const removeTaskAC = (todolistId: string, id: string) => ({
    type: "REMOVE-TASK", todolistId, id
} as const)

export const addTaskAC = (todolistId: string, title: string) => ({
    type: "ADD-TASK", todolistId, title
} as const)
export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses) => ({
    type: "CHANGE-TASK-STATUS",
    todolistId,
    id,
    status
} as const)

export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => ({
    type: "CHANGE-TASK-TITLE",
    todolistId,
    id,
    title
} as const)
export const setTasksAC=(tasks:Array<TaskResponseType>, todolistId:string)=>({type:"SET-TASKS",tasks,todolistId}as const)

export const fetchTasksTC=(todolistId:string):AppThunk=>{
   return (dispatch)=>{
        todolistsAPI.getTasks(todolistId)
            .then(res=>{
                dispatch(setTasksAC(res.data.items, todolistId))
            })

    }
}