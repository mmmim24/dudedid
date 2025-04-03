import React from "react";
const status = {
    todo: "started",
    running: "on-going",
    completed: "finished"
};
export const TaskStore = React.createContext()
export const TaskProvider = ({ children }) => {
    const tasks = [];
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TASK':
                return [...state, action.payload];
            case 'CLEAR_TASK':
                return state.filter(task => task.id !== action.payload.id);
            case 'CLEAR_ALL':
                return state.filter(task => task.status !== action.payload);
            case 'EDIT_TASK':
                return state.map(task => {
                    if (task.id === action.payload.id) {
                        return { ...task, title: action.payload.newTitle };
                    }
                    return task;
                });
            case 'UPDATE_TASK':
                return state.map(task => {
                    if (task.id === action.payload.id) {
                        return { ...task, status: action.payload.status };
                    }
                    return task;
                });
            default:
                return state;
        }
    };
    const [state, dispatch] = React.useReducer(reducer, tasks);
    return (
        <TaskStore.Provider value={{ state, dispatch }}>
            {children}
        </TaskStore.Provider>
    );
};