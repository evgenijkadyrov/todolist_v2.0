import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducer} from "./state/store";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootReducer, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootReducer, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {

        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, []);

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, []);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, []);

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))

    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, []);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, []);

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string,) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))

    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))

    }, []);

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((todolist) => {
                let allTodolistTasks = tasks[todolist.id]
                let tasksForTodolist = allTodolistTasks

                return <Todolist
                    key={todolist.id}
                    id={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={todolist.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}

                />
            })
            }

        </div>
    );

}

export default AppWithRedux;
