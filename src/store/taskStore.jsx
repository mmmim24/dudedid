import React from "react";
export const TaskStore = React.createContext()
export const TaskProvider = ({ children }) => {
    const tasks = [
        {
            "id": 1,
            "title": "Devops Roadmap",
            "description": "Operating Systems, Networking and Cloud Computing",
            "status": "Started",
            "priority": "High"
        },
        {
            "id": 2,
            "title": "Web Development",
            "description": "HTML, CSS, JavaScript, React, Node.js",
            "status": "Completed",
            "priority": "High"
        },
        {
            "id": 3,
            "title": "Data Science",
            "description": "Python, R, SQL, Machine Learning",
            "status": "Started",
            "priority": "Medium"
        },
        {
            "id": 4,
            "title": "Mobile Development",
            "description": "Flutter, React Native, Swift, Kotlin",
            "status": "Pending",
            "priority": "Low"
        }
    ];
    const reducer = (state, action) => {
        switch (action.type) {
            case 'CREATE_TASK':
                return [...state, action.payload];
            case 'DELETE_TASK':
                return state.filter(task => task.id !== action.payload.id);
            case 'DELETE_ALL':
                return state.filter(task => task.status !== action.payload);
            case 'UPDATE_TASK':
                return state.map(task => {
                    if (task.id === action.payload.id) {
                        return { ...task, ...action.payload };
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