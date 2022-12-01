import React, {useCallback, useEffect} from "react";

import '../../../App/App.css';
import AddItemForm from "../../../../components/AddItemForm";
import EditableSpan from "../../../../components/EditableSpan";
import {Task} from "../../../../components/features/Todolists/Todolist/Task/Task";
import {TaskResponseType, TaskStatuses} from "../../../../api/todolists-api";
import {FilterType, TodolistDomainType} from "../../../../state/todolist-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../state/store";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "@mui/material";
import {fetchTasks} from "../../../../state/tasks-sagas";

type PropsType = {
    demo?: boolean
    todolist: TodolistDomainType
    tasks: Array<TaskResponseType>
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const useAppDispatch = () => useDispatch<AppDispatch>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!props.demo)
            dispatch(fetchTasks(props.todolist.id))
    }, [])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title.trim(), props.todolist.id)

    }, [props.addTask, props.todolist.id]);

    const OnClickRemoveTodoHandler = () => {
        props.removeTodolist(props.todolist.id)
    }
    const onChangeTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }
    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(el => el.status === TaskStatuses.New)
    }

    return <div>

        <h3><EditableSpan title={props.todolist.title} onChange={onChangeTitleHandler}/>
            <IconButton  onClick={OnClickRemoveTodoHandler} disabled={props.todolist.entityStatus==='loading'}>
                <DeleteIcon fontSize={'small'}/>
            </IconButton>

        </h3>

        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus==='loading'}/>
        <ul>
            {tasksForTodolist.map(el => <Task removeTask={props.removeTask}
                                              changeTaskStatus={props.changeTaskStatus}
                                              changeTaskTitle={props.changeTaskTitle}
                                              task={el}
                                              taskId={props.todolist.id}
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

