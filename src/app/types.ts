import {TaskResponseType} from "../api/types";

export type PropsType = {
    demo?: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskResponseType>
}