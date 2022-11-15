import React from 'react';
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

    function changeFilter(filter: FilterType, todolistId: string) {

        const action = changeTodolistFilterAC(filter, todolistId)
        dispatch(action)
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(todolistId, taskId, newTitle)
        dispatch(action)
    }

    function removeTask(taskId: string, todolistId: string) {
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)

    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)


    }

    const changeTodolistTitle = (todolistId: string, newTitle: string,) => {
        const action = changeTodolistTitleAC(newTitle, todolistId)
        dispatch(action)

    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)

    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((todolist) => {
                let allTodolistTasks = tasks[todolist.id]
                let tasksForTodolist = allTodolistTasks
                if (todolist.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(el => el.isDone === true)
                }
                if (todolist.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(el => el.isDone === false)
                }
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
