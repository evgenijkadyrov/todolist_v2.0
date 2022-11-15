import {FilterType, TasksStateType, TodolistType} from "./App";
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
let startState:TasksStateType
beforeEach(()=>{
    startState  = {
        'todolistId1':[
            {id:'1',title:'Js',isDone:false},
            {id:'2',title:'Css',isDone:false},
            {id:'3',title:'React',isDone:false},
        ],
        'todolistId2':[
            {id:'1',title:'milk',isDone:false},
            {id:'2',title:'bread',isDone:true},
            {id:'3',title:'coffe',isDone:false},
        ]
    }
})
test('correct task should be removed', () => {


    const endState = tasksReducer(startState, removeTaskAC('todolistId1','1'))
    expect(endState).toEqual(
        { 'todolistId1':[

                {id:'2',title:'Css',isDone:false},
                {id:'3',title:'React',isDone:false},
            ],
            'todolistId2':[
                {id:'1',title:'milk',isDone:false},
                {id:'2',title:'bread',isDone:true},
                {id:'3',title:'coffe',isDone:false},
            ]}
    )

})

test('correct task should be added', () => {

const endState=tasksReducer(startState, addTaskAC('todolistId2','tea'))
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'Js', isDone: false},
            {id: '2', title: 'Css', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '4', title: 'tea', isDone: false},
            {id: '1', title: 'milk', isDone: false},
            {id: '2', title: 'bread', isDone: true},
            {id: '3', title: 'coffe', isDone: false},

        ]
    })
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].title).toBe('tea')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('task status should be changed', () => {


    const endState=tasksReducer(startState, changeTaskStatusAC('todolistId1','2',true))
    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('task title should be changed', () => {


    const endState=tasksReducer(startState, changeTaskTitleAC('todolistId2','2','pizza'))
    expect(endState['todolistId1'][1].title).toBe('Css')
    expect(endState['todolistId2'][1].title).toBe('pizza')
})

test('new array should be added when new todolist is added', () => {

    const action = AddTodolistAC('new todolist','todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})