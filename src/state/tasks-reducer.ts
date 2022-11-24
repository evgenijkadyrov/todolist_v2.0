import {
    addTodolistAC,
    AddTodolistAT,
    removeTodolistAC,
    RemoveTodolistAT,
    setTodolistsAC,
    SetTodolistsAT
} from "./todolist-reducer";
import {TaskPriorities, TaskResponseType, TaskStatuses, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {TasksStateType} from "../components/App/App";
import {AppThunk, RootState} from "./store";
import {SetAppStatus, SetErrorType, SetStatusType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TasksStateType = {}
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasksTC', (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    return todolistsAPI.getTasks(todolistId)
        .then(res => {
            thunkAPI.dispatch(SetAppStatus({status: 'success'}))
            return {tasks: res.data.items, todolistId}
        })
})

export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, id: string }>) {
            const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload.id)
            state[action.payload.todolistId].splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskResponseType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, id: string, model: UpdateDomainTaskType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.id)
            tasks[index] = {...tasks[index], ...action.payload.model}
        }


    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(el => {
                state[el.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, ((state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        }))

    }

})
export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC} = slice.actions


//thunks

export const RemoveTaskTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        dispatch(SetAppStatus({status: 'loading'}))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC({todolistId, id: taskId}))
                dispatch(SetAppStatus({status: 'success'}))
            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export const AddTaskTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(SetAppStatus({status: 'loading'}))
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(addTaskAC({task: res.data.data.item}))
                        dispatch(SetAppStatus({status: 'success'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }

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
        dispatch(SetAppStatus({status: 'loading'}))
        todolistsAPI.updateTask(todolistId, taskId, payload)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistId, id: taskId, model}))
                    dispatch(SetAppStatus({status: 'success'}))
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
    | SetTodolistsAT
    | SetErrorType
    | SetStatusType