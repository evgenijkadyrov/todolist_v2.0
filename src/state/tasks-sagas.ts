import {GetTasksType, ResponseType, TaskResponseType, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {RootState} from "./store";
import {all, call, put, select, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {SetAppStatus} from "./app-reducer";
import {addTaskAC, removeTaskAC, setTasksAC, UpdateDomainTaskType, updateTaskAC} from "./tasks-reducer";


//sagas
export function* fetchTasksWorkerSaga(action: fetchTasksSagaAction) {
    yield put(SetAppStatus('loading'))
    try {
        const res: AxiosResponse<GetTasksType> = yield call(todolistsAPI.getTasks, action.todolistId)

        yield put(setTasksAC(res.data.items, action.todolistId))
        yield put(SetAppStatus('success'))
    } catch (e) {
        handleServerNetworkAppError(e, put)
    }
}

export function* RemoveTaskWorkerSaga(action: removeTaskSagaAction) {
    yield put(SetAppStatus('loading'))
    try {
        const res: AxiosResponse<ResponseType<{}>> = yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId)

        yield put(removeTaskAC(action.todolistId, action.taskId))
        yield put(SetAppStatus('success'))
    } catch (error) {
        handleServerNetworkAppError(error, put)
    }
}

export function* AddTaskWorkerSaga(action: AddTaskSagaAction) {
    yield put(SetAppStatus('loading'))
    try {
        const res: AxiosResponse<ResponseType<{ item: TaskResponseType }>> = yield call(todolistsAPI.createTask, action.todolistId, action.title)

        if (res.data.resultCode === 0) {
            yield put(addTaskAC(res.data.data.item))
            yield put(SetAppStatus('success'))
        }
        handleServerAppError(res.data, put)
    } catch (error) {
        handleServerNetworkAppError(error, put)
    }
}

export function* UpdateTaskWorkerSaga(action: UpdateTaskSagaAction) {

    const state: RootState = yield select()
    const task: TaskResponseType = yield state.tasks[action.todolistId].find(el => el.id === action.taskId)
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
        ...action.model
    }


    try {
        const res: AxiosResponse<ResponseType<{ item: TaskResponseType }>> = yield call(todolistsAPI.updateTask, action.todolistId, action.taskId, payload)
        if (res.data.resultCode === 0) {
            yield put(updateTaskAC(action.todolistId, action.taskId, action.model))
        } else {
            handleServerAppError(res.data, put)
        }

    } catch (error) {
        handleServerNetworkAppError(error, put)
    }
}

//activators
export const removeTaskA = (todolistId: string, taskId: string) => ({
    type: 'tasks/REMOVE-TASK',
    todolistId,
    taskId
} as const)
export const UpdateTaskA = (todolistId: string, taskId: string, model: UpdateDomainTaskType) => ({
    type: 'tasks/UPDATE-TASK',
    todolistId,
    taskId,
    model
} as const)
export const fetchTasks = (todolistId: string) => ({type: 'tasks/FETCH-TASKS', todolistId} as const)
export const addTaskA = (todolistId: string, title: string) => ({type: 'tasks/ADD-TASK', todolistId, title} as const)


// export function* TasksWatcherSaga() {
//     yield all([
//         takeEvery('tasks/REMOVE-TASK',RemoveTaskWorkerSaga),
//         takeEvery('tasks/ADD-TASK',AddTaskWorkerSaga),
//         takeEvery('tasks/UPDATE-TASK',UpdateTaskWorkerSaga),
//         takeEvery('tasks/FETCH-TASKS',fetchTasksWorkerSaga)
//     ])
//
// }

//types

 type fetchTasksSagaAction = ReturnType<typeof fetchTasks>
 type removeTaskSagaAction = ReturnType<typeof removeTaskA>
 type AddTaskSagaAction = ReturnType<typeof addTaskA>
 type UpdateTaskSagaAction = ReturnType<typeof UpdateTaskA>

export type tasksSagaActionsType=
|fetchTasksSagaAction
|removeTaskSagaAction
|AddTaskSagaAction
|UpdateTaskSagaAction