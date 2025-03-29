import React from "react";
const status = {
    todo: "started",
    running: "on-going",
    completed: "finished"
};
export const TaskStore = React.createContext({
    tasks: [
        {
            title: null,
            description: null,
            status: status.todo,
        }
    ],
    updateValues: () => { }
});
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = React.useState([]);
    const updateValues = (newValues) => {
        setTasks([...tasks, newValues]);
    }
    return (
        <TaskStore.Provider value={{ tasks, updateValues }}>
            {children}
        </TaskStore.Provider>
    );
};