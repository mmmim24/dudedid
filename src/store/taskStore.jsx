import React from "react";
import { useAuth } from "./authStore";
import supabase from "../lib/supabaseClient";
import toast from "react-hot-toast";
const TaskStore = React.createContext()
const taskList = [
    {
        "id": 1,
        "title": "Devops Roadmap",
        "description": "Operating Systems, Networking and Cloud Computing",
        "status": "started",
        "priority": "High",
        "created_at": "2023-10-03T12:00:00Z"
    },
    {
        "id": 2,
        "title": "Web Development",
        "description": "HTML, CSS, JavaScript, React, Node.js",
        "status": "completed",
        "priority": "High",
        "created_at": "2023-10-01T12:00:00Z"
    },
    {
        "id": 3,
        "title": "Data Science",
        "description": "Python, R, SQL, Machine Learning",
        "status": "started",
        "priority": "Medium",
        "created_at": "2023-10-02T12:00:00Z"
    },
    {
        "id": 4,
        "title": "Mobile Development",
        "description": "Flutter, React Native, Swift, Kotlin",
        "status": "pending",
        "priority": "Low",
        "created_at": "2023-10-04T12:00:00Z"
    }
];
const TaskProvider = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = React.useState(true);
    const [tasks, setTasks] = React.useState(taskList);

    const fetchTasks = async () => {
        if (user) {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('tasks')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at');

                if (error) {
                    throw error;
                }
                setTasks(data || []);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        }
        else {
            setLoading(false);
            setTasks(taskList);
        }
    };

    const createTask = async (task) => {
        if (!user) {
            setTasks(prev => [...prev, task]);
            toast.success('Tasks created successfully');
        }
        else {

            try {
                const { data, error } = await supabase
                    .from('tasks')
                    .insert(task)
                    .select();

                if (error) {
                    throw error;
                }
                else {
                    setTasks(prev => [...prev, data[0]]);
                    toast.success('Tasks created successfully');
                }

            } catch (error) {
                toast.error('Error creating task', {
                    position: "bottom-center"
                });
                console.error('Error creating task:', error);
            }
        }
    };

    const deleteTask = async (task) => {
        if (!user) {
            setTasks(prev =>
                prev.filter(t => t.id !== task.id)
            );
            toast.success('Task deleted');
        }
        else {

            try {
                const { error } = await supabase
                    .from('tasks')
                    .delete()
                    .eq('id', task.id)
                    .eq('user_id', user.id);

                if (error) {
                    throw error;
                }
                else {
                    setTasks(prev => prev.filter(t => t.id !== task.id));
                    toast.success('Task deleted');
                }

            } catch (error) {
                toast.error('Error deleting task', {
                    position: "bottom-center"
                });
                console.error('Error deleting task:', error);
            }
        }
    };

    const deleteAll = async (status) => {
        if (!user) {
            setTasks(prev => prev.filter(task => task.status !== status));
            toast.success(`All ${status} tasks deleted`);
        }
        else {

            try {
                const { error } = await supabase
                    .from('tasks')
                    .delete()
                    .eq('status', status)
                    .eq('user_id', user.id);

                if (error) {
                    throw error;
                }
                else {
                    setTasks(prev => prev.filter(task => task.status !== status));
                    toast.success(`All ${status} tasks deleted`);
                }

            } catch (error) {
                toast.error('Error deleting tasks', {
                    position: "bottom-center"
                });
                console.error('Error deleting tasks:', error);
            }
        }
    };

    const updateTask = async (updatedTask) => {
        if (!user) {
            setTasks(prev =>
                prev.map(task => task.id === updatedTask.id ? updatedTask : task)
            );
            return;
        }
        else {

            try {
                const { error } = await supabase
                    .from('tasks')
                    .update(updatedTask)
                    .eq('id', updatedTask.id)
                    .eq('user_id', user.id);

                if (error) {
                    throw error;
                }
                else {
                    setTasks(prev =>
                        prev.map(task => task.id === updatedTask.id ? updatedTask : task)
                    );
                }

            } catch (error) {
                toast.error('Error updating task', {
                    position: "bottom-center"
                });
                console.error('Error updating task:', error);
            }
        }
    };

    React.useEffect(() => {
        if (user) {
            fetchTasks();
        } else {
            setLoading(false);
            setTasks(taskList);
        }
    }, [user]);

    const ctxValue = {
        tasks,
        loading,
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