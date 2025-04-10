import React from "react";
const TaskStore = React.createContext()
const taskList = [
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
const taskReducer = (state, action) => {
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
const TaskProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(taskReducer, taskList);

    const tasks = state;

    function createTask(task) {
        dispatch({ type: 'CREATE_TASK', payload: task });
    }
    function deleteTask(task) {
        dispatch({ type: 'DELETE_TASK', payload: task });
    }
    function deleteAll(status) {
        dispatch({ type: 'DELETE_ALL', payload: status });
    }
    function updateTask(task) {
        dispatch({ type: 'UPDATE_TASK', payload: task });
    }

    const ctxValue = {
        tasks,
        createTask,
        deleteTask,
        deleteAll,
        updateTask
    };

    return (
        <TaskStore.Provider value={ctxValue}>
            {children}
        </TaskStore.Provider>
    );
};

export const useTaskStore = () => React.useContext(TaskStore);
export default TaskProvider;