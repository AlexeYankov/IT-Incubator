import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import './App.css';
import {FilterValuesType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    tasks: TasksType[]
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskisDone: string) => void
}


const TodoList = (props: TodoListType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
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
            const changeTaskStatus = () => props.changeTaskStatus(t.id)
            const taskClasses = t.isDone ? 'is-done' : ''
            return (
                <li key={t.id}>
                    <input onClick={changeTaskStatus} type="checkbox" checked={t.isDone}/>
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>List is empty</span>
    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }
    const addTask = () => {
        const taskTitle = title.trim()
        if(taskTitle){
            props.addTask(taskTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''
    const errorInputStyle = error ? {border: "2px solid red", outline: 'none'} : undefined

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const taskTitle = e.currentTarget.value.trim()
        setTitle(e.currentTarget.value)
        if(error && taskTitle)setError(false)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    style={errorInputStyle}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color: "red", fontWeight: "bold"}}>Title is required!</div>}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>

                <button className={allBtnClasses} onClick={changeFilter("all")}>All</button>
                <button className={activeBtnClasses} onClick={changeFilter("active")}>Active</button>
                <button className={completedBtnClasses} onClick={changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
};

export default TodoList;
