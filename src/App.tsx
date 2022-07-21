import React, {useReducer, useState} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {v1} from "uuid";

import TodoList, {TasksType} from './Todolist';
import TodolistInput from "./components/todolistInput";
import ButtonAppBar from "./ButtonAppBar";
import TodolistReducer, {
    addTodolistTaskAC,
    changeFilterTodolistAC,
    editTodolistTaskAC,
    removeTodolistAC
} from "./reducers/reducerForTodolists";
import TasksReducer, {
    addNewTodolistTaskAC,
    addTaskAC,
    changeTaskAC,
    editTaskAC,
    removeTaskAC
} from "./reducers/reducerForTasks";

import './App.css';

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListID: string]: TasksType[]
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const todolistID_3 = v1()
    const [todoLists, dispatchTodolist] = useReducer(TodolistReducer, [
        {id: todolistID_1, title: "WTB", filter: 'all'},
        {id: todolistID_2, title: "WTS", filter: 'all'},
        {id: todolistID_3, title: "WTR", filter: 'all'}
    ])
    const [tasks, taskDispatch] = useReducer(TasksReducer, {
        [todolistID_1]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "GG", isDone: true},
            {id: v1(), title: "RR", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "GG", isDone: true},
            {id: v1(), title: "RR", isDone: false}
        ],
        [todolistID_3]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "GG", isDone: true},
            {id: v1(), title: "RR", isDone: false}
        ]
    })
    const addTask = (title: string, todolistID: string) => {
        taskDispatch(addTaskAC(title, todolistID))
    }

    const removeTask = (taskID: string, todolistID: string) => {
        taskDispatch(removeTaskAC(taskID, todolistID))
    }

    const changeTaskStatus = (tasksID: string, todolistID: string, isDone: boolean) => {
        taskDispatch(changeTaskAC(tasksID, todolistID, isDone))
    }

    const changeTodolistFilter = (newValueFilter: FilterValuesType, todolistID: string) => {
        dispatchTodolist(changeFilterTodolistAC(newValueFilter, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        dispatchTodolist(removeTodolistAC(todolistID))
        delete tasks[todolistID]
    }

    const getTasksForRender = (todoList: TodoListType) => {
        let tasksForRender = tasks[todoList.id]
        if (todoList.filter === "active") {
            return tasks[todoList.id].filter(t => t.isDone === false)
        }
        if (todoList.filter === "completed") {
            return tasks[todoList.id].filter(t => t.isDone === true)
        }
        return tasksForRender;
    }

    const editTodolist = (todolistID: string, newTitle: string) => {
        dispatchTodolist(editTodolistTaskAC(todolistID, newTitle))
    }

    const editTask = (todolistID: string, taskID: string, newTitle: string) => {
        taskDispatch(editTaskAC(todolistID, taskID, newTitle))
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            todoLists.length
                ?
                <Grid item>
                    <Paper style={{padding: '10px'}}>
                        <TodoList
                            key={tl.id}
                            todoListID={tl.id}
                            title={tl.title}
                            tasks={getTasksForRender(tl)}
                            filter={tl.filter}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeFilter={changeTodolistFilter}
                            addTask={addTask}
                            removeTodolist={removeTodolist}
                            editTodolist={editTodolist}
                            editTask={editTask}
                        />
                    </Paper>
                </Grid>
                : <span>Create your first Todolist!</span>
        )
    })

    const addTodolist = (newTitle: string) => {
        const newID = v1()
        dispatchTodolist(addTodolistTaskAC(newTitle, newID))
        taskDispatch(addNewTodolistTaskAC(newID))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <TodolistInput callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>

            </Container>

        </div>
    );
}

export default App;
