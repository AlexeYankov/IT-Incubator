import React, {memo, useCallback} from 'react';
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import TodolistInput from "./components/todolistInput";
import TodolistTitle from "./components/TodolistTitle";
import {AppRootStateType} from "./state/store";

import {TodoListType} from './App';
import './App.css';
import {
    changeFilterTodolistAC,
    editTodolistAC,
    removeTodolistAC
} from "./reducers/reducerForTodolists";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC} from "./reducers/reducerForTasks";
import {Tasks} from "./components/TasksForTodolist";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodoListType
}


export const TodoList = memo(({todolist}: PropsType) => {
    console.log('Todolist')
    const {id, title, filter} = {...todolist}
    let tasks1 = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])

    const dispatch = useDispatch()

    let tasksForTodolist = tasks1

    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }

    let tasksForRender = tasksForTodolist.map(t => {

        return (
            <Tasks
                key={t.id}
                task={t}
                todolistID={id}
            />
        )
    })

    const changeFilter = useCallback((filter: string) => {
        dispatch(changeFilterTodolistAC(id, filter))
    }, [dispatch, id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(id, title))
    },[dispatch, id])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [dispatch, id])

    const editTodolistTitleHandler = useCallback((newTitle: string) => {
        dispatch(editTodolistAC(id, newTitle))
    }, [dispatch, id])

    const styleForRTodoList = {
        maxWidth: '20px',
        maxHeight: '20px',
        minWidth: '20px',
        minHeight: '20px',
        fontsize: '20px',
        color: 'black',
        marginTop: '15px',
    }

    const filterAll = {
        fontsize: '20px',
        color: 'black',
        marginLeft: '10px',
    }

    const memouizedButtonAll = useCallback(() => {
        changeFilter("all")
    }, [changeFilter])
    const memouizedButtonActive = useCallback(() => {
        changeFilter("active")
    }, [changeFilter])
    const memouizedButtonCompleted = useCallback(() => {
        changeFilter("completed")
    }, [changeFilter])

    const allBtnClasses = filter === 'all' ? 'contained' : 'outlined'
    const activeBtnClasses = filter === 'active' ? 'contained' : 'outlined'
    const completedBtnClasses = filter === 'completed' ? 'contained' : 'outlined'
    return (
        <div>
            <TodolistTitle title={title} setTodolistTaskTitle={editTodolistTitleHandler}/>
            <DeleteIcon onClick={removeTodolist} style={styleForRTodoList}/>

            <TodolistInput addNewTodolist={addTask}/>
            <ul>
                {tasksForRender}
            </ul>
            <div>
                <Button variant={allBtnClasses} onClick={memouizedButtonAll} style={filterAll}>All</Button>
                <Button variant={activeBtnClasses} onClick={memouizedButtonActive}
                        style={filterAll}>Active</Button>
                <Button variant={completedBtnClasses} onClick={memouizedButtonCompleted}
                        style={filterAll}>Completed</Button>
            </div>
        </div>
    )
})

export default TodoList;
