import React from "react";
export const TaskStore = React.createContext()
export const TaskProvider = ({ children }) => {
    const tasks = [
        // {
        //     "id": 1,
        //     "title": "Devops Roadmap",
        //     "description": "Operating Systems, Networking and Cloud Computing",
        //     "status": "In Progress"
        // },
        // {
        //     "id": 2,
        //     "title": "Web Development",
        //     "description": "HTML, CSS, JavaScript, React, Node.js",
        //     "status": "Completed"
        // },
        // {
        //     "id": 3,
        //     "title": "Data Science",
        //     "description": "Python, R, SQL, Machine Learning",
        //     "status": "In Progress"
        // },
        // {
        //     "id": 4,
        //     "title": "Mobile Development",
        //     "description": "Flutter, React Native, Swift, Kotlin",
        //     "status": "started"
        // }
    ];
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
                        const updatedTask = {
                            title: action.payload.title,
                            description: action.payload.description,
                            status: action.payload.status
                        };
                        return { ...task, ...updatedTask };
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