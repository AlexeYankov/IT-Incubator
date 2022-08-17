import {TasksStateType} from "../App";
import {TasksType} from "../Todolist";
import {v1} from "uuid";

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: reduceACType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const currentTodoListTasks = state[action.payload.todolistID]
            const updatedTasks = currentTodoListTasks.filter(t => t.id !== action.payload.taskID)
            return {...state, [action.payload.todolistID]: updatedTasks}
        }
        case "ADD-TASK-TO-CURRENT-TODOLIST": {
            const newTask: TasksType = {
                id: action.payload.taskID, title: action.payload.title, isDone: false
            }
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case "CHANGE-CURRENT-TASK-STATUS": {
            const currentTodoListTasks: TasksType[] = state[action.payload.todolistID]
            const updatedTasks: TasksType[] = currentTodoListTasks.map(t => t.id === action.payload.tasksID ? {
                ...t,
                isDone: action.payload.isDone
            } : t)
            return ({...state, [action.payload.todolistID]: updatedTasks})
        }
        case "EDIT-CURRENT-TASK": {
        //     return ({
        //         ...state,
        //         [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.tasksID ? {
        //             ...el,
        //             title: action.payload.newTitle
        //         } : el)
        //     })
        // }
            const currentTodoListTasks: TasksType[] = state[action.payload.todolistID]
            const updatedTasks: TasksType[] = currentTodoListTasks.map(t => t.id === action.payload.tasksID ? {
                ...t,
                title: action.payload.newTitle
            } : t)
            return ({...state, [action.payload.todolistID]: updatedTasks})
        }
        case "ADD-START-TASK-TO-CURRENT-TODOLIST": {
            return {...state, [action.payload.todolistID]: []}
        }
        default:
            return state
    }
}

type reduceACType = removeTaskACType | addTaskACType | changeTaskACType | editTaskACType | addStartTaskACType
type  removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistID,
            taskID,
        }
    } as const
}

type  addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TASK-TO-CURRENT-TODOLIST",
        payload: {
            todolistID,
            taskID: v1(),
            title,}
    } as const
}

type  changeTaskACType = ReturnType<typeof changeTasksStatusAC>
export const changeTasksStatusAC = (todolistID: string, tasksID: string, isDone: boolean) => {
    return {
        type: "CHANGE-CURRENT-TASK-STATUS",
        payload: {
            todolistID,
            tasksID,
            isDone,
        }
    } as const
}

type  editTaskACType = ReturnType<typeof editTaskAC>
export const editTaskAC = (todolistID: string, tasksID: string, newTitle: string) => {
    return {
        type: "EDIT-CURRENT-TASK",
        payload: {
            todolistID,
            tasksID,
            newTitle,
        }
    } as const
}

type  addStartTaskACType = ReturnType<typeof addStartTaskAC>
export const addStartTaskAC = (todolistID: string) => {
    return {
        type: "ADD-START-TASK-TO-CURRENT-TODOLIST",
        payload: {
            todolistID,
        }
    } as const
}

export default tasksReducer