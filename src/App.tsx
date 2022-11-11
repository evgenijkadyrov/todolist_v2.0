import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType='all'|'active'|'completed'

function App() {
    let [tasks,setTask] =useState( [
        {id: v1(), title: 'Js', isDone: false},
        {id: v1(), title: 'Css', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'webql', isDone: false},
        {id: v1(), title: 'mongo', isDone: false},
    ])
    let [filter,setFilter]=useState<FilterType>('all')

    let tasksForTodolist=tasks
    if(filter==='completed'){
        tasksForTodolist=tasks.filter(el=>el.isDone===true)
            }
    if(filter==='active'){
        tasksForTodolist=tasks.filter(el=>el.isDone===false)
    }
function changeFilter(filter:FilterType){
        setFilter(filter)
}

    function removeTask(taskId: string) {
        let filteredTasks = tasks.filter(el =>
            el.id !== taskId
        )
       setTask(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist title={'what to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>

        </div>
    );
}

export default App;
