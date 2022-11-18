import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolist-reducer";
import {TaskPriorities, TaskResponseType, TaskStatuses, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {TasksStateType} from "../App";
import {AppThunk, RootState} from "./store";

type SetTasksAT = ReturnType<typeof setTasksAC>

export type UpdateDomainTaskType={
    title?:string
    description?:string|null
    status?:TaskStatuses
    priority?:TaskPriorities
    startDate?:string|null
    deadline?:string|null
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
            let newTask = action.task
            let tasks = stateCopy[newTask.todoListId]
            stateCopy[newTask.todoListId] = [newTask, ...tasks]
            return stateCopy
        }
        case "UPDATE-TASK": {
            const stateCopy = {...state}
            let todolistTasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = todolistTasks.map(el => el.id === action.id ? {
                ...el,
                ...action.model
            } : el)

            return stateCopy
        }

        case "ADD-TODOLIST": {
            let copyState = {...state}
            copyState[action.todolist.id] = []
            return copyState
        }
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
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}
export const removeTaskAC = (todolistId: string, id: string) => ({
    type: "REMOVE-TASK", todolistId, id
} as const)

export const addTaskAC = (task: TaskResponseType) => ({
    type: "ADD-TASK", task
} as const)
export const updateTaskAC = (todolistId: string, id: string, model: UpdateDomainTaskType) => ({
    type: "UPDATE-TASK",
    todolistId,
    id,
model
} as const)


export const setTasksAC = (tasks: Array<TaskResponseType>, todolistId: string) => ({
    type: "SET-TASKS",
    tasks,
    todolistId
} as const)

export const fetchTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const RemoveTaskTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}
export const AddTaskTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))

            })
    }
}
export const UpdateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskType): AppThunk => {
    return (dispatch, getState: () => RootState) => {
        const state = getState()
        const task = state.tasks[todolistId].find(el => el.id === taskId)
        if (!task) {
            console.warn('Erorror')
            return
        }
        const payload: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status:task.status,
            title: task.title,
            ...model
        }

        todolistsAPI.updateTask(todolistId, taskId,payload ).then(res => {
            dispatch(updateTaskAC(todolistId, taskId, model))
        })
    }

}
