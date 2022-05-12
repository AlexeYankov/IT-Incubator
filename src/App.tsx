import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from './Todolist';

function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML+CSS", isDone: true},
        {id: 2, title: "RSS", isDone: true},
        {id: 3, title: "TS", isDone: false},
        {id: 4, title: "GG", isDone: true},
        {id: 5, title: "RR", isDone: false}
    ])
    const todoListTitle1: string = "WTB"
    const todoListTitle2: string = "WTS"
    const todoListTitle3: string = "WTR"
    const todoListTitle4: string = "WTD"
    const removeTask = (taskID: number) => {
        console.log(tasks)
        setTasks(tasks.filter(t => t.id !== taskID))
    }
    //
    return (
        <div className="App">
            <TodoList
                title={todoListTitle1}
                tasks={tasks}
                removeTask={removeTask}
            />
            <TodoList
                tasks={tasks}
                title={todoListTitle2}
                removeTask={removeTask}
            />
            <TodoList
                tasks={tasks}
                title={todoListTitle3}
                removeTask={removeTask}
            />
            <TodoList
                tasks={tasks}
                title={todoListTitle4}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
