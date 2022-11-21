import React from 'react';
import './App.css';
import {TaskResponseType} from "../../api/todolists-api";
import {TodolistsList} from "../features/Todolists/Todolists";
import {Toolbar} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import ErrorSnackBar from "../SnackBar";
import {useSelector} from "react-redux";
import {AppRootReducer} from "../../state/store";
import {RequestStatusType} from "../../state/app-reducer";
import LinearProgress from "@mui/material/LinearProgress";


export type TasksStateType = {
    [key: string]: Array<TaskResponseType>
}

function App() {
const status=useSelector<AppRootReducer, RequestStatusType>(state=>state.app.status)
       return (
        <div className="App">
            <ErrorSnackBar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 3 }}
                    >
                       <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status==='loading'&& <LinearProgress/>}
           <TodolistsList demo={false}/>

        </div>
    );

}
export default App;
