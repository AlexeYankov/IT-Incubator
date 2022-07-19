import {TasksStateType, TodoListType} from "../App";
import todolist, {TasksType} from "../Todolist";
import {v1} from "uuid";

const TasksReducer = (state: TasksStateType, action:reduceACType): TasksStateType => {
    switch(action.type) {
        case "REMOVE-TASK": {
            const currentTodoListTasks = state[action.payload.todolistID]
            const updatedTasks = currentTodoListTasks.filter(t => t.id !== action.payload.taskID)
            return {...state, [action.payload.todolistID]: updatedTasks }
        }
        case "ADD-TASK": {
            const newTask: TasksType = {
                id: v1(), title: action.payload.title, isDone: false
            }
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        default:
            return state
    }
}

// export const todoListReducer = (state: , action:) => {
//     switch(action.type) {
//
//     }
// }

type reduceACType = removeTaskACType | addTaskACType
type  removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskID:string, todolistID: string)=>{
    return {
        type: "REMOVE-TASK",
        payload: {
            taskID,
            todolistID,
        }
    } as const
}

type  addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistID:string)=>{
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todolistID
        }
    } as const
}







export default TasksReducer