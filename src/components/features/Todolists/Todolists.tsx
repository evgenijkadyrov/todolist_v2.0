import {useSelector} from "react-redux";
import {useActions, useAppDispatch} from "../../../state/store";
import {

    changeTodolistFilterAC,


    FilterType,

} from "./todolist-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../../api/todolists-api";

import AddItemForm from "../../AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Navigate} from "react-router-dom";
import {tasksActions, todolistsActions, todolistsSelectors} from "../Todolists";
import {loginSelectors} from "../../Login";

type TodolistsListPropsType = {
    demo?: boolean
}
export const TodolistsList = (props: TodolistsListPropsType) => {

    const todolists = useSelector(todolistsSelectors.selectTodolists)
    const tasks = useSelector(todolistsSelectors.selectTasks)
    const isLoginOn=useSelector(loginSelectors.selectIsLoginOn)

    const {fetchTodolistsTC,addTodolistTC,changeTodolistEntityStatusAC,changeTodolistFilterAC,changeTodolistTitleTC,removeTodolistTC}=useActions(todolistsActions)
    const {updateTask,addTask,removeTask}=useActions(tasksActions)

    useEffect(() => {
        if (props.demo||!isLoginOn){
            return
        }
            fetchTodolistsTC()

    }, [])


    const addTodolist = useCallback((title: string) => {
        addTodolistTC({title})

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