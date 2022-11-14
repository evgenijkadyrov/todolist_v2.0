import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])


    let [tasks, setTask] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'Js', isDone: false},
            {id: v1(), title: 'Css', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'webql', isDone: false},
            {id: v1(), title: 'mongo', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'water', isDone: true},

        ]
    })

    function changeFilter(filter: FilterType, todolistId: string) {

        let todolist = todolists.find((el) => el.id === todolistId)
        if (todolist) {
            todolist.filter = filter
        }
        setTodolists([...todolists])
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(el => el.id === taskId)

        if (task) {
            task.isDone = isDone
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

        let newTask = {id: v1(), title: title, isDone: false}
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
        let todolist: TodolistType = {id: v1(), title: title, filter: 'all'}
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

export default App;
