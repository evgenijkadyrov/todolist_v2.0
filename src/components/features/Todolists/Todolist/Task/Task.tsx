import React, {ChangeEvent, useCallback} from "react";
import EditableSpan from "../../../../EditableSpan";

import {TaskResponseType, TaskStatuses} from "../../../../../api/todolists-api";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
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
                props.changeTaskStatus(props.taskId, props.task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New,)
            }
        const onChangeTitleHandler = useCallback((newTitle: string) => {
            props.changeTaskTitle(props.task.id, newTitle, props.taskId)
        }, [props.changeTaskTitle, props.task.id, props.taskId])
        return (
            <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <Checkbox color={'primary'}
                          checked={props.task.status === TaskStatuses.Completed}
                          onChange={onChangeStatusHandler}/>
                <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={onClickRemoveHandler}><DeleteIcon fontSize={'small'}/>
                </IconButton>
            </div>)
    }
    )
;