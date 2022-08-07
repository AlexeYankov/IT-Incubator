import {v1} from "uuid";
import TodolistReducer from "../reducers/reducerForTodolists";
import TasksReducer from "../reducers/reducerForTasks";
import { TasksStateType, TodoListType} from "../App";

let a1: string
let a2: string
let a3: string
let a4: string

test('user reducer should remove Todolist',()=>{
    a1 = v1()
    a2 = v1()
    a3 = v1()
    const removeTodolistID = a1
    const startState: TodoListType[] = [
        {id: a1, title: "WTB", filter: 'all'},
        {id: a2, title: "WTB", filter: 'all'},
        {id: a3, title: "WTB", filter: 'all'},
    ]
    const endState = TodolistReducer(startState,{type:'REMOVE-TODOLIST', payload: {todolistID: removeTodolistID}})

    expect(endState.length).toBe(2)
})

test('user reducer should change-filter-todolist Todolist', ()=>{
    a1 = v1()
    a2 = v1()
    a3 = v1()
    const todolistIDtest = a1
    const newValueFilter1 = 'active'
    const startStateTodolists: TodoListType[] = [
        {id: a1, title: "WTB", filter: 'all'},
        {id: a2, title: "WTB", filter: 'active'},
        {id: a3, title: "WTB", filter: 'active'},
    ]

    const endState = TodolistReducer(startStateTodolists,{type:'CHANGE-FILTER-TODOLIST', payload: {newValueFilter: newValueFilter1, todolistID: todolistIDtest}})

    expect(endState[0].filter).toBe('active')
})

test('user reducer should edit Todolist name',()=>{
    a1 = v1()
    a2 = v1()
    a3 = v1()
    const todolistIDtest = a2
    const newTitleTest = 'Milk'
    const startStateTodolists: TodoListType[] = [
        {id: a1, title: "WTB", filter: 'all'},
        {id: a2, title: "WTs", filter: 'active'},
        {id: a3, title: "WTB", filter: 'active'},
    ]
    const endState = TodolistReducer(startStateTodolists,{type:'EDIT-TODOLIST', payload: {todolistID: todolistIDtest, newTitle: newTitleTest}})

    expect(endState[1].title).toBe('Milk')

})

test('user reducer should add new Todolist',()=>{
    a1 = v1()
    a2 = v1()
    a3 = v1()
    a4 = v1()
    const todolistIDtest = a4
    const newTitleTest = 'Milk'
    const startStateTodolists: TodoListType[] = [
        {id: a1, title: "WTB", filter: 'all'},
        {id: a2, title: "WTs", filter: 'active'},
        {id: a3, title: "WTB", filter: 'active'},
    ]
    const endState = TodolistReducer(startStateTodolists,{type:'ADD-TODOLIST', payload: {newTitle: newTitleTest, newID: todolistIDtest}})

    expect(endState.length).toBe(4)

})

test('user reducer should remove Task to Todolist',()=>{

    a1 = v1()
    a2 = v1()
    a3 = v1()
    const todolistIDTest = a3
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const startStateTodolists: TasksStateType = {
        [a1]: [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "RSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: true},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'REMOVE-TASK', payload: {taskID: newID, todolistID: todolistIDTest}})

    expect(endState[todolistIDTest].length).toBe(2)
    expect(endState[todolistIDTest][0].id).toBe(newID1)

})

test('user reducer should Add Task to Todolist',()=>{
    a1 = v1()
    a2 = v1()
    a3 = v1()
    const todolistIDTest = a3
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const newID3 = '16'
    const todoNewTitle = 'Milk'
    const startStateTodolists: TasksStateType = {
        [a1]: [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "RSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: true},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'ADD-TASK', payload: {title: todoNewTitle, todolistID: todolistIDTest,taskID: newID3}})

    expect(endState[todolistIDTest].length).toBe(4)
    expect(endState[todolistIDTest][0].id).toBe(newID3)
})

test('user reducer should change Task status to Todolist',()=>{
    a1 = v1()
    a2 = v1()
    a3 = v1()
    const todolistIDTest = a3
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const changeCheck = true
    const startStateTodolists: TasksStateType = {
        [a1]: [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "RSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: false},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'CHANGE-TASK-STATUS', payload: {tasksID: newID, todolistID: todolistIDTest, isDone: changeCheck}})

    expect(endState[todolistIDTest][0].isDone).toBe(true)
})

test ('user reducer should Add new Todolist to Todolist',()=>{
    a1 = v1()
    a2 = v1()
    a3 = v1()
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const newID3 = '18'
    const testTasks = [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "tts", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ]
    const startStateTodolists: TasksStateType = {
        [a1]: [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "RSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: false},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'ADD-TODOLIST-TASK', payload: {newID: newID3, newTasks: testTasks}})

    expect(endState[newID3][1].title).toBe('tts')
})

test ('user reducer should edit Task title to Todolist',()=>{
    a1 = v1()
    a2 = v1()
    a3 = v1()
    const todolistIDtest = a3
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const changeTitle = 'burger'
    const startStateTodolists: TasksStateType = {
        [a1]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: false},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'EDIT-TASK', payload: {todolistID: todolistIDtest, taskID: newID,  newTitle: changeTitle}})

    expect(endState[todolistIDtest][0].title).toBe('burger')
})






