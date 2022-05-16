import React from 'react';
import './App.css';
import {FilterValuesType} from './App';

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TasksType[]
    filter: FilterValuesType
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}


const TodoList = (props: PropsType) => {
    let tasksForRender = props.tasks
    if (props.filter === "active"){
        tasksForRender = props.tasks.filter(t => t.isDone === false)
            }
    if (props.filter === "completed"){
        tasksForRender = props.tasks.filter(t => t.isDone === true)
            }
    const tasksJSXElements = tasksForRender.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
