import React from 'react';
import './App.css';
import {TaskResponseType} from "../../api/todolists-api";
import {TodolistsList} from "../features/Todolists/Todolists";


export type TasksStateType = {
    [key: string]: Array<TaskResponseType>
}

function App() {

       return (
        <div className="App">
           <TodolistsList/>

        </div>
    );

}
export default App;
