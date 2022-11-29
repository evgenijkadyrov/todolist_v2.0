
import {tasksReducer, } from "./tasks-reducer";
import { } from "./todolist-reducer";
import {TaskPriorities, TaskResponseType, TaskStatuses} from "../../../api/todolists-api";
import {TasksStateType} from "../../App/App";
import {tasksActions, todolistsActions} from "./index";

let startState:TasksStateType
beforeEach(()=>{
    startState  = {
        ['todolistId1']:[
            {id:'1',title:'Js',status:TaskStatuses.New, addedDate:'', deadline:'', description:'', order:0, priority:TaskPriorities.Low, startDate:'', todoListId:'todolistId1'},
            {id:'2',title:'Css',status:TaskStatuses.New, addedDate:'', deadline:'', description:'', order:0, priority:TaskPriorities.Low, startDate:'', todoListId:'todolistId1'},
            {id:'3',title:'React',status:TaskStatuses.New, addedDate:'', deadline:'', description:'', order:0, priority:TaskPriorities.Low, startDate:'', todoListId:'todolistId1'},
        ],
        ['todolistId2']:[
            {id:'1',title:'milk',status:TaskStatuses.New, addedDate:'', deadline:'', description:'', order:0, priority:TaskPriorities.Low, startDate:'', todoListId:'todolistId2'},
            {id:'2',title:'bread',status:TaskStatuses.Completed, addedDate:'', deadline:'', description:'', order:0, priority:TaskPriorities.Low, startDate:'', todoListId:'todolistId2'},
            {id:'3',title:'coffe',status:TaskStatuses.New, addedDate:'', deadline:'', description:'', order:0, priority:TaskPriorities.Low, startDate:'', todoListId:'todolistId2'},
        ]
    }
})



test('correct task should be removed', () => {
    const updateModel = {todolistId:'todolistId2',taskId:'2'};
    const endState = tasksReducer(startState, tasksActions.removeTask.fulfilled(updateModel,'requiredId',updateModel))
   expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
})

test('correct task should be added', () => {

    const task = {
        task: {
            id: '1',
            title: 'MILK',
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'todolistId1'
        }
    };
    const endState=tasksReducer(startState, tasksActions.addTask.fulfilled(task,'requiredId', {todolistId:'todolistId1',title:'MILK'}))

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId1'][0].title).toBe('MILK')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('task status should be changed', () => {


    const updateModel = {todolistId:'todolistId1',taskId:'2',model:{status:TaskStatuses.Completed}};
    const endState=tasksReducer(startState, tasksActions.updateTask.fulfilled(updateModel,'required',updateModel))
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('task title should be changed', () => {


    const updateModel = {todolistId:'todolistId2',taskId:'2',model:{title:'pizza'}};
    const endState=tasksReducer(startState, tasksActions.updateTask.fulfilled(updateModel,'requist',updateModel))
    expect(endState['todolistId1'][1].title).toBe('Css')
    expect(endState['todolistId2'][1].title).toBe('pizza')
})

test('new array should be added when new todolist is added', () => {


    const todolist = {id: 'todolistId3', title: 'how', order:0, addedDate:'',filter: 'all', entityStatus: 'idle'};
    const endState = tasksReducer(startState, todolistsActions.addTodolist.fulfilled({todolist},'required',{title:'how'}))


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

        const endState = tasksReducer(startState, todolistsActions.removeTodolist.fulfilled({id:'todolistId2'},'required',{id:'todolistId2'}))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
test ('tasks should be added to todolist',()=>{
    const tasks=startState['todolistId1']

    const endState=tasksReducer({
        'todolistId1':[],
        'todolistId2':[],

    },tasksActions.fetchTasks.fulfilled({tasks, todolistId: 'todolistId1'},'requiredId','todolistId1' ))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})