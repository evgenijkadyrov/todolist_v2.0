import React, {useCallback, useEffect} from "react";
import '../../../../app/App.css';
import {AddItemForm} from "../../../../components/AddItemForm";
import EditableSpan from "../../../../components/EditableSpan";
import {Task} from "../../../../components/features/Todolists/Todolist/Task/Task";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "@mui/material";
import {tasksActions, todolistsActions} from "../../Todolists";
import Paper from "@mui/material/Paper";
import {useActions, useAppDispatch} from "../../../../utilites/redux-utils";
import {TaskStatuses} from "../../../../api/types";
import {FilterType, PropsType} from "../types";

export const Todolist = React.memo((props: PropsType) => {

    const {fetchTasks,} = useActions(tasksActions)
    const {removeTodolist, changeTodolistFilter, changeTodolistTitle,} = useActions(todolistsActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!props.demo&& !props.tasks.length)
            fetchTasks(props.todolist.id)
    }, [])

    const onFilterButtonClickHandler = useCallback((filter: FilterType) => {

        changeTodolistFilter({newFilter: filter, id: props.todolist.id})
    }, [props.todolist.id])

    const addTaskCallback = useCallback(async (title: string) => {


        const thunk = tasksActions.addTask({title: title.trim(), todolistId: props.todolist.id})
        const action = await dispatch(thunk);
        if (tasksActions.addTask.rejected.match(action)) {

            if (action.payload?.errors?.length) {

                const errorMessages = action.payload?.errors
                throw new Error(errorMessages[0])
            } else {
                throw new Error('Something wrong')
            }
        }
    }, [props.todolist.id]);

    const OnClickRemoveTodoHandler = useCallback(() => {
        removeTodolist({id: props.todolist.id})
    }, [props.todolist.id])
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle({id: props.todolist.id, title: newTitle})
    }, [props.todolist.id,])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(el => el.status === TaskStatuses.New)
    }
    type ColorType = "success" | "inherit" | "primary" | "secondary" | "error" | "info" | "warning" | undefined

    const renderFilterButton = (buttonFilter: FilterType, color: ColorType, text: string) => {
        return <Button variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
                       onClick={() => {
                           onFilterButtonClickHandler(buttonFilter)
                       }}
                       color={color}>{text}
        </Button>
    }
    return <div>
        <Paper style={{padding: '5px', position: 'relative'}}>
            <h3 style={{flexWrap: "wrap", width: '250px'}}><EditableSpan title={props.todolist.title}
                                                                         onChange={onChangeTitleHandler}/>
                <IconButton style={{position: 'absolute', top: '5px', right: '5px'}} onClick={OnClickRemoveTodoHandler}
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <DeleteIcon fontSize={'small'}/>
                </IconButton>

            </h3>

            <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === 'loading'}/>
            <ul>
                {tasksForTodolist.map(el => <Task
                    task={el}
                    todolistId={props.todolist.id}
                    key={el.id}
                />)}
                {!tasksForTodolist.length && <div style={{color: 'grey'}}>No tasks</div>}

            </ul>
            <div>
                {renderFilterButton('all', "success", 'All')}
                {renderFilterButton('active', "info", 'Active')}
                {renderFilterButton('completed', "secondary", 'Completed')}

            </div>
        </Paper>
    </div>

});

