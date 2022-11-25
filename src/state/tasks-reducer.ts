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
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)

    thunkAPI.dispatch(SetAppStatus({status: 'success'}))
    return {tasks: res.data.items, todolistId}

})
export const removeTaskTC = createAsyncThunk('tasks/RemoveTask', (param: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    return todolistsAPI.deleteTask(param.todolistId, param.taskId)
        .then(res => {
            thunkAPI.dispatch(SetAppStatus({status: 'success'}))
            return ({todolistId: param.todolistId, taskId: param.taskId})
        })
})
export const addTaskTC = createAsyncThunk('tasks/AddTask', (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    return todolistsAPI.createTask(param.todolistId, param.title)
        .then(res => {
            thunkAPI.dispatch(SetAppStatus({status: 'success'}))
            return ({task: res.data.data.item})

            if (res.data.resultCode === 0) {

                thunkAPI.dispatch(SetAppStatus({status: 'success'}))
                return ({task: res.data.data.item})
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
            }
        })
})

export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {

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
        builder.addCase(removeTaskTC.fulfilled, ((state, action) => {
            const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
            state[action.payload.todolistId].splice(index, 1)
        }));
        builder.addCase(addTaskTC.fulfilled, ((state, action) => {
                if (action.payload.task) {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                }


            }
        ))
    }

})
export const tasksReducer = slice.reducer
export const {updateTaskAC} = slice.actions


//thunks


export const UpdateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskType): AppThunk => {
    return (dispatch, getState: () => RootState) => {
        const state = getState()
        // @ts-ignore
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

    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetErrorType
    | SetStatusType