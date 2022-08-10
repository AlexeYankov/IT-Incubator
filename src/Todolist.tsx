import React from 'react';
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import TodolistInput from "./components/todolistInput";
import TodolistTitle from "./components/TodolistTitle";
import CheckBox from "./components/CheckBox";
import {AppRootStateType} from "./state/store";

import {TodoListType} from './App';
import './App.css';
import {
    changeFilterTodolistAC,
    editTodolistAC,
    removeTodolistAC
} from "./reducers/reducerForTodolists";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTasksStatusAC, editTaskAC, removeTaskAC} from "./reducers/reducerForTasks";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodoListType
}


export function TodoList({todolist}: PropsType) {
    const {id, title, filter} = {...todolist}
    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])

    const dispatch = useDispatch()

    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true)
    }

    let tasksForRender = tasks.map(t => {
        const styleForRTaskList = {
            maxWidth: '20px',
            maxHeight: '20px',
            minWidth: '20px',
            minHeight: '20px',
            fontsize: '20px',
            color: 'black',
            marginTop: '10px',
        }
        const removeTodolistTask = () => dispatch(removeTaskAC(id, t.id))
        const changeTodolistTaskStatus = (taskID: string, eventValue: boolean) => {
            dispatch(changeTasksStatusAC(id, t.id, eventValue))
        }
        const editTaskTitle = (newTitle: string) => {
            dispatch(editTaskAC(id, t.id, newTitle))
        }


        const taskClasses = t.isDone ? 'is-done' : ''
        return (
            <li key={t.id} className={taskClasses}>
                <CheckBox callBack={(eventValue) => changeTodolistTaskStatus(t.id, eventValue)} checked={t.isDone}/>
                <TodolistTitle title={t.title} setTodolistTaskTitle={() => editTaskTitle(t.id)}/>
                <DeleteIcon onClick={removeTodolistTask} style={styleForRTaskList} className="removeTasks"/>
            </li>
        )
    })

    const changeFilter = (filter: string) => {
        dispatch(changeFilterTodolistAC(id, filter))
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(id, title))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }

    const editTodolistTitleHandler = (newTitle: string) => {
        dispatch(editTodolistAC(id, newTitle))
    }

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
                <Button variant={allBtnClasses} onClick={() => changeFilter("all")} style={filterAll}>All</Button>
                <Button variant={activeBtnClasses} onClick={() => changeFilter("active")}
                        style={filterAll}>Active</Button>
                <Button variant={completedBtnClasses} onClick={() => changeFilter("completed")}
                        style={filterAll}>Completed</Button>
            </div>
        </div>
    )
};

export default TodoList;
