import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"


function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "RSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
        {id: v1(), title: "GG", isDone: true},
        {id: v1(), title: "RR", isDone: false}
    ])
    // console.log(tasks)
    const addTask = (title: string) => {
        const newTask: TasksType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const todoListTitle1: string = "WTB"
    const todoListTitle2: string = "WTS"
    const todoListTitle3: string = "WTR"
    const todoListTitle4: string = "WTD"
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    //
    return (
        <div className="App">
            <TodoList
                title={todoListTitle1}
                tasks={tasks}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
            <TodoList
                tasks={tasks}
                filter={filter}
                title={todoListTitle2}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
            <TodoList
                tasks={tasks}
                filter={filter}
                title={todoListTitle3}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
            <TodoList
                tasks={tasks}
                filter={filter}
                title={todoListTitle4}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
