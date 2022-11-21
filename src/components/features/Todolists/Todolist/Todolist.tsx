import React, {useCallback, useEffect} from "react";

import '../../../App/App.css';
import AddItemForm from "../../../../components/AddItemForm";
import EditableSpan from "../../../../components/EditableSpan";
import {Task} from "../../../../components/features/Todolists/Todolist/Task/Task";
import {TaskResponseType, TaskStatuses} from "../../../../api/todolists-api";
import {FilterType} from "../../../../state/todolist-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../state/store";
import {fetchTasksTC} from "../../../../state/tasks-reducer";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "@mui/material";

type PropsType = {
    title: string
    id: string
    tasks: Array<TaskResponseType>
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const useAppDispatch = () => useDispatch<AppDispatch>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title.trim(), props.id)

    }, [props.addTask, props.id]);

    const OnClickRemoveTodoHandler = () => {
        props.removeTodolist(props.id)
    }
    const onChangeTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    let tasksForTodolist = props.tasks
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(el => el.status === TaskStatuses.New)
    }

    return <div>

        <h3><EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={OnClickRemoveTodoHandler}>
                <DeleteIcon fontSize={'small'}/>
            </IconButton>

        </h3>

        <AddItemForm addItem={addTask}/>
        <ul>
            {tasksForTodolist.map(el => <Task removeTask={props.removeTask}
                                              changeTaskStatus={props.changeTaskStatus}
                                              changeTaskTitle={props.changeTaskTitle}
                                              task={el}
                                              taskId={props.id}
                                              key={el.id}
            />)}

        </ul>
        <div>
            <Button variant={props.filter==='all'?'outlined':'text'}  onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter==='active'?'outlined':'text'} color={'error'} onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter==='completed'?'outlined':'text'} color={'secondary'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
});

