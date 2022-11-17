import React from "react";
import {Task} from "../Task";
import AddItemForm from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
    title: 'Task component',
    component: Task
} as ComponentMeta<typeof Task>

const removeTaskCallback = action('remove changed')
const changeTaskCallback = action('status changed')
const changeTitleCallback = action('title changed')

const baseArgs = {
    removeTask : removeTaskCallback,
    changeTaskStatus : changeTaskCallback,
    changeTaskTitle : changeTitleCallback,
}
const Template:ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs,
    task:{id: '1', title: 'Css', status: TaskStatuses.Completed, priority:TaskPriorities.Low, addedDate:'', deadline:'', order:0, description:'', startDate:'', todoListId:'todolistId1'},
taskId:'todolist1'
}
export const TaskIsNotIsDoneExample = Template.bind({})
TaskIsNotIsDoneExample.args = {
    ...baseArgs,
    task:{id: '1', title: 'Css', status: TaskStatuses.New, priority:TaskPriorities.Low, addedDate:'', deadline:'', order:0, description:'', startDate:'', todoListId:'todolistId2'},
    taskId:'todolist2'
}

// ****old version****
// export const TaskBaseExample = () => {
//     return <>
//         <Task
//             removeTask={removeTaskCallback}
//             changeTaskStatus={changeTaskCallback}
//             changeTaskTitle={changeTitleCallback}
//             task={{id: '1', title: 'Css', isDone: true}}
//             taskId={'todolist1'}
//         />
//         <Task
//             removeTask={removeTaskCallback}
//             changeTaskStatus={changeTaskCallback}
//             changeTaskTitle={changeTitleCallback}
//             task={{id: '1', title: 'Js', isDone: false}}
//             taskId={'todolist2'}
//         />
//     </>
// }