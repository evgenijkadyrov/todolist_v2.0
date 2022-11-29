import React, {useCallback, useEffect} from "react";

import '../../../App/App.css';
import AddItemForm from "../../../../components/AddItemForm";
import EditableSpan from "../../../../components/EditableSpan";
import {Task} from "../../../../components/features/Todolists/Todolist/Task/Task";
import {TaskResponseType, TaskStatuses} from "../../../../api/todolists-api";
import {TodolistDomainType} from "../todolist-reducer";
import {useActions} from "../../../../state/store";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "@mui/material";
import {tasksActions, todolistsActions} from "../index";

type PropsType = {
    demo?: boolean
    todolist: TodolistDomainType
    tasks: Array<TaskResponseType>
}

export const Todolist = React.memo((props: PropsType) => {

    const {fetchTasks, removeTask, addTask,} = useActions(tasksActions)
    const {removeTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC,} = useActions(todolistsActions)

    useEffect(() => {
        if (!props.demo)
            fetchTasks(props.todolist.id)
    }, [])

    const onAllClickHandler = useCallback(() => {

        changeTodolistFilterAC({newFilter: 'all', id: props.todolist.id})
    }, [props.todolist.id])
    const onActiveClickHandler = useCallback(() => {

        changeTodolistFilterAC({newFilter: 'active', id: props.todolist.id})
    }, [props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        changeTodolistFilterAC({newFilter: 'completed', id: props.todolist.id})
    }, [props.todolist.id])

    const addTaskCallback = useCallback((title: string) => {
        addTask({title: title.trim(), todolistId: props.todolist.id})

    }, [props.todolist.id]);

    const OnClickRemoveTodoHandler = useCallback(() => {
        removeTodolistTC({id: props.todolist.id})
    }, [props.todolist.id])
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: newTitle})
    }, [props.todolist.id,])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(el => el.status === TaskStatuses.New)
    }

    return <div>

        <h3><EditableSpan title={props.todolist.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={OnClickRemoveTodoHandler} disabled={props.todolist.entityStatus === 'loading'}>
                <DeleteIcon fontSize={'small'}/>
            </IconButton>

        </h3>

        <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === 'loading'}/>
        <ul>
            {tasksForTodolist.map(el => <Task
                task={el}
                todolistId={props.todolist.id}
                key={el.id}
            />)}

        </ul>
        <div>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'} color={'error'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'} color={'secondary'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
});

