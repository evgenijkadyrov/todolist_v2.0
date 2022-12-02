import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootReducer} from "../../../state/store";
import {
    changeTodolistFilterAC,
        FilterType,
    TodolistDomainType
} from "../../../state/todolist-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../../api/todolists-api";
import AddItemForm from "../../AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../App/App";
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Navigate} from "react-router-dom";
import {addTaskA, removeTaskA, UpdateTaskA} from "../../../state/tasks-sagas";
import {
    AddTodolistA,
    ChangeTodolistTitleA,
    fetchTodolistsA,
    RemoveTodolistA,
    RemoveTodolistWorkerSaga
} from "../../../state/todolists-sagas";

type TodolistsListPropsType = {
    demo?: boolean
}
export const TodolistsList = (props: TodolistsListPropsType) => {
    const todolists = useSelector<AppRootReducer, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootReducer, TasksStateType>(state => state.tasks)
    const isLoginOn=useSelector<AppRootReducer>(state=>state.login.isLoginOn)
    const useAppDispatch = () => useDispatch<AppDispatch>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (props.demo||!isLoginOn){
            return
        }
            dispatch(fetchTodolistsA())

    }, [])


    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {

        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, []);

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(UpdateTaskA(todolistId, taskId, {status}))
    }, []);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(UpdateTaskA(todolistId, taskId, {title: newTitle}))
    }, []);

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskA(todolistId, taskId))

    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskA(todolistId, title))
    }, []);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistA(todolistId))
    }, []);

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string,) => {
        dispatch(ChangeTodolistTitleA(todolistId, newTitle))

    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistA(title))

    }, []);
    if(!isLoginOn){
        return <Navigate to={'/login'}/>
    }
    return (
        <div className="App">
            <Container fixed>
                <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>

                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        let allTodolistTasks = tasks[todolist.id]
                        let tasksForTodolist = allTodolistTasks

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={todolist.id}
                                    demo={props.demo}
                                    todolist={todolist}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}

                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>

            </Container>


        </div>
    );
}