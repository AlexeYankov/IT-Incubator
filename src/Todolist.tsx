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
    // filter: FilterValuesType
    removeTask: (taskID: number) => void
}


const TodoList = (props: PropsType) => {
    // console.log(props)
    const tasksJSXElements = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={ () => props.removeTask(t.id)}>x</button>

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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;
