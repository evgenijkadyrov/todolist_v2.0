import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {FilterType, TodolistDomainType} from "./state/todolist-reducer";
import {TaskPriorities, TaskResponseType, TaskStatuses} from "./api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskResponseType>
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all',order:0,addedDate:''},
        {id: todolistId2, title: 'What to buy', filter: 'all',order:0,addedDate:''}
    ])


    let [tasks, setTask] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'Js', status:TaskStatuses.New,todoListId:todolistId1,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'Css', status:TaskStatuses.New,todoListId:todolistId1,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'React', status:TaskStatuses.New,todoListId:todolistId1,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},

        ],
        [todolistId2]: [
            {id: v1(), title: 'milk', status:TaskStatuses.New,todoListId:todolistId2,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'bread', status:TaskStatuses.New,todoListId:todolistId2,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},

        ]
    })

    function changeFilter(filter: FilterType, todolistId: string) {

        let todolist = todolists.find((el) => el.id === todolistId)
        if (todolist) {
            todolist.filter = filter
        }
        setTodolists([...todolists])
    }

    function changeTaskStatus( todolistId: string,taskId: string, status:TaskStatuses) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(el => el.id === taskId)

        if (task) {
            task.status = status
        }
        setTask({...tasks})
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(el => el.id === taskId)

        if (task) {
            task.title = newTitle
        }
        setTask({...tasks})
    }

    function removeTask(taskId: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]

        let filteredTasks = todolistTasks.filter(el =>
            el.id !== taskId
        )
        tasks[todolistId] = filteredTasks
        setTask({...tasks})
    }

    function addTask(title: string, todolistId: string) {

        let newTask = {id: v1(), title: title, status:TaskStatuses.New,todoListId:todolistId,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTask({...tasks})
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTask({...tasks})
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string,) => {
        const todolist = todolists.find(el =>
            el.id === todolistId
        )
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }

    }

    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {id: v1(), title: title, filter: 'all', addedDate:'', order:0}
        setTodolists([todolist, ...todolists])
        setTask({[todolist.id]: [], ...tasks})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((todolist) => {
                let allTodolistTasks = tasks[todolist.id]
                let tasksForTodolist = allTodolistTasks
                if (todolist.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(el => el.status === TaskStatuses.Completed)
                }
                if (todolist.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(el => el.status === TaskStatuses.New)
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

export default App;
