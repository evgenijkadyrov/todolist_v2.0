export type DataLoginPropsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
//types api
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FieldsErrorType = { field: string, error: string };
export type ResponseType<D> = {
    fieldsErrors?: Array<FieldsErrorType>
    data: D
    messages: Array<string>
    resultCode: number
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Imediently,
    Later
}

export type TaskResponseType = {
    description: string | null
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string

}
export type GetTasksType = {
    items: Array<TaskResponseType>
    totalCount: number
    error: string | null
}
export type UpdateTaskType = {
    title: string
    description: string | null
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}