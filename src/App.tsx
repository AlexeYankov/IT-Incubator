import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from './Todolist';

export type FilterValuesType = "all" | "active" | "completed"


function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML+CSS", isDone: true},
        {id: 2, title: "RSS", isDone: true},
        {id: 3, title: "TS", isDone: false},
        {id: 4, title: "GG", isDone: true},
        {id: 5, title: "RR", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const todoListTitle1: string = "WTB"
    const todoListTitle2: string = "WTS"
    const todoListTitle3: string = "WTR"
    const todoListTitle4: string = "WTD"
    const removeTask = (taskID: number) => {
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
            />
            <TodoList
                tasks={tasks}
                filter={filter}
                title={todoListTitle2}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            <TodoList
                tasks={tasks}
                filter={filter}
                title={todoListTitle3}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            <TodoList
                tasks={tasks}
                filter={filter}
                title={todoListTitle4}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
