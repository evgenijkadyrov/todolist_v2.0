import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolist-reducer";
import {TaskPriorities, TaskResponseType, TaskStatuses, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {TasksStateType} from "../components/App/App";
import {AppThunk, RootState} from "./store";
import {SetAppError, SetErrorType, SetAppStatus, SetStatusType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";


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

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => {

    return (dispatch) => {
        dispatch(SetAppStatus('loading'))
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(SetAppStatus('success'))

            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export const RemoveTaskTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        dispatch(SetAppStatus('loading'))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(SetAppStatus('success'))
            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export const AddTaskTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(SetAppStatus('loading'))
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(addTaskAC(res.data.data.item))
                        dispatch(SetAppStatus('loading'))
                    }
                    handleServerAppError(res.data, dispatch)
                }
            )
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)
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
            status: task.status,
            title: task.title,
            ...model
        }

        todolistsAPI.updateTask(todolistId, taskId, payload)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, model))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)

            })
    }

}

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