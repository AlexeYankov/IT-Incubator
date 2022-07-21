import {TasksStateType, TodoListType} from "../App";
import {TasksType} from "../Todolist";
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
        case "CHANGE-TASK-STATUS": {
            const currentTodoListTasks: TasksType[] = state[action.payload.todolistID]
            const updatedTasks: TasksType[] = currentTodoListTasks.map(t => t.id === action.payload.tasksID ? {...t, isDone: action.payload.isDone} : t)
            return ({...state, [action.payload.todolistID]: updatedTasks})
        }
        case "ADD-TODOLIST-TASK": {
            return ({...state, [action.payload.newID]: [
                        {id: v1(), title: "HTML+CSS", isDone: true},
                        {id: v1(), title: "RSS", isDone: true},
                        {id: v1(), title: "TS", isDone: false},
                        {id: v1(), title: "GG", isDone: true},
                        {id: v1(), title: "RR", isDone: false}
                    ]})
        }
        case "EDIT-TASK": {
            return ({...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? {...el, title: action.payload.newTitle} : el)
        })}
        default:
            return state
    }
}

type reduceACType = removeTaskACType | addTaskACType | changeTaskACType | editTaskACType | addNewTodolistTaskACType
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
type  changeTaskACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (tasksID: string, todolistID:string, isDone: boolean)=>{
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            tasksID,
            todolistID,
            isDone
        }
    } as const
}
type  editTaskACType = ReturnType<typeof editTaskAC>
export const editTaskAC = (todolistID: string, taskID: string, newTitle: string)=>{
    return {
        type: "EDIT-TASK",
        payload: {
            todolistID,
            taskID,
            newTitle
        }
    } as const
}

type  addNewTodolistTaskACType = ReturnType<typeof addNewTodolistTaskAC>
export const addNewTodolistTaskAC = (newID: string)=>{
    return {
        type: "ADD-TODOLIST-TASK",
        payload: {
            newID
        }
    } as const
}







export default TasksReducer