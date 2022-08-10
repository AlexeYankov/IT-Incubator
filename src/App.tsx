import React, {useState} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {v1} from "uuid";

import TodoList, {TasksType} from './Todolist';
import TodolistInput from "./components/todolistInput";
import ButtonAppBar from "./ButtonAppBar";
import {addTodolistAC } from "./reducers/reducerForTodolists";
import { addStartTaskAC } from "./reducers/reducerForTasks";

import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TodoListType = {
    id: string
    title: string
    filter: string
}
export type TasksStateType = {
    [key: string]: TasksType[]
}

function App() {

    let todolistData = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)

    let dispatch = useDispatch()

    const addTodolist = (newTitle: string) => {
        const newID = v1()
        dispatch(addTodolistAC(newTitle, newID))
        dispatch(addStartTaskAC(newID))
    }

    const todoListsComponents = todolistData.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                    <TodoList
                        key={tl.id}
                        todolist={tl}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <TodolistInput addNewTodolist={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>

            </Container>

        </div>
    );
}

export default App;