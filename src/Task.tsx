import React, {ChangeEvent, useCallback} from "react";
import EditableSpan from "./EditableSpan";

import {TaskResponseType, TaskStatuses} from "./api/todolists-api";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskResponseType
    taskId: string
}
export const Task = React.memo((props: TaskPropsType) => {
        const onClickRemoveHandler = () => {
            props.removeTask(props.task.id, props.taskId)
        }
        const onChangeStatusHandler =
            (e: ChangeEvent<HTMLInputElement>) => {
                let newStatusValue = e.currentTarget.checked
                props.changeTaskStatus(props.task.id, newStatusValue?TaskStatuses.Completed:TaskStatuses.New, props.taskId)
            }
        const onChangeTitleHandler = useCallback((newTitle: string) => {
            props.changeTaskTitle(props.task.id, newTitle, props.taskId)
        }, [props.changeTaskTitle, props.task.id, props.taskId])
        return (
            <li key={props.task.id} className={props.task.status===TaskStatuses.Completed ? 'is-done' : ''}><input type="checkbox"
                                                                                          checked={props.task.status===TaskStatuses.Completed}
                                                                                          onChange={onChangeStatusHandler}/>
                <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
                <button onClick={onClickRemoveHandler}>x
                </button>
            </li>)
    }
    )
;