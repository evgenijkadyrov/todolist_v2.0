import React, {useCallback} from "react";
import {FilterType} from "./App";
import './App.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Task} from "./Task";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist called")
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
        tasksForTodolist = props.tasks.filter(el => el.isDone === true)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(el => el.isDone === false)
    }

    return <div>

        <h3><EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            <button onClick={OnClickRemoveTodoHandler}>X</button>
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
            <button className={props.filter === 'all' ? "active-filter" : ''} onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
});

