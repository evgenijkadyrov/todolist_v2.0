import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolist-reducer";
import {TaskPriorities, TaskResponseType, TaskStatuses} from "../api/todolists-api";
import {TasksStateType} from "../components/App/App";
import {SetErrorType, SetStatusType} from "./app-reducer";


const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: actionTasksType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.id)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {...el, ...action.model} : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}

        default:
            return state
    }
}
//actions
export const removeTaskAC = (todolistId: string, id: string) => ({
    type: "REMOVE-TASK", todolistId, id
} as const)

export const addTaskAC = (task: TaskResponseType) => ({
    type: "ADD-TASK", task
} as const)
export const updateTaskAC = (todolistId: string, id: string, model: UpdateDomainTaskType) => ({
    type: "UPDATE-TASK",
    todolistId, id, model
} as const)

export const setTasksAC = (tasks: Array<TaskResponseType>, todolistId: string) => ({
    type: "SET-TASKS",
    tasks,
    todolistId
} as const)

//types
type SetTasksAT = ReturnType<typeof setTasksAC>

export type UpdateDomainTaskType = {
    title?: string
    description?: string | null
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string | null
    deadline?: string | null
}

export type actionTasksType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTasksAT
    | SetTodolistsAT
    | SetErrorType
    | SetStatusType
