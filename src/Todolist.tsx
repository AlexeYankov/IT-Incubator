import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import './App.css';
import {FilterValuesType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TasksType[]
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}


const TodoList = (props: PropsType) => {
    const [title, setTitle] = useState<string>("")
    const getTasksForRender = () => {
        let tasksForRender = props.tasks
            if (props.filter === "active") {
                tasksForRender = props.tasks.filter(t => t.isDone === false)
            }
            if (props.filter === "completed") {
                tasksForRender = props.tasks.filter(t => t.isDone === true)
            }
        return tasksForRender;
    }
    const tasksForRender = getTasksForRender()
    const tasksJSXElements = tasksForRender.length
        ? tasksForRender.map(t => {
            const removeTask = () => props.removeTask(t.id)
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>List is empty</span>
    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }
    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={changeFilter("all")}>All</button>
                <button onClick={changeFilter("active")}>Active</button>
                <button onClick={changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
};

export default TodoList;
