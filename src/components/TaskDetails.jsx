import React from 'react'
import { useTaskStore } from '../store/taskStore';
import { formatDate } from '../utils/format';

const TaskDetails = ({ task, className, toggleAccordion }) => {

    const [updatedTask, setUpdatedTask] = React.useState(task);
    const { updateTask, deleteTask } = useTaskStore();
    const [isDisabled, setIsDisabled] = React.useState(true);

    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    }
    const handleSave = (e) => {
        e.preventDefault();
        updateTask(updatedTask);
        toggleAccordion();
    }

    React.useEffect(() => {
        if (updatedTask.title !== task.title || updatedTask.description !== task.description || updatedTask.status !== task.status || updatedTask.priority !== task.priority) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [updatedTask, task]);

    return (
        <>
            <div className={`${className} border-l-3 bg-gray-100 dark:bg-gray-700 mx-2 -mt-2 p-3 rounded-b-lg transition-all duration-300 flex flex-col gap-1 text-xs`}>

                <div className="flex flex-col justify-center items-left gap-1">
                    <label htmlFor='title' className="ml-1 font-semibold text-left">Title</label>
                    <input
                        name='title'
                        id='title'
                        type="text"
                        defaultValue={updatedTask.title}
                        className='h-[30px] bg-gray-300 dark:bg-gray-900 rounded-lg p-2 outline-none'
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col justify-center items-left gap-1">
                    <label htmlFor='description' className="ml-1 text-left font-semibold">Description</label>
                    <textarea
                        name='description'
                        id='description'
                        defaultValue={updatedTask.description}
                        className='h-[60px] bg-gray-300 dark:bg-gray-900 rounded-lg p-2 outline-none'
                        onChange={handleChange}
                    />
                </div>
                {task.created_at && <div className="flex flex-col justify-center items-left gap-1">
                    <label htmlFor='created_at' className="ml-1 text-left font-semibold">Created At</label>
                    <input
                        name='created_at'
                        id='created_at'
                        type="text"
                        defaultValue={formatDate(task.created_at)}
                        className='h-[30px] bg-gray-300 dark:bg-gray-900 rounded-lg p-2 outline-none'
                        readOnly
                    />
                </div>}
                <div className='flex justify-between items-center gap-1 mt-2'>
                    <label htmlFor='priority' className="w-1/2 ml-1 text-left font-semibold">Priority</label>
                    <select
                        name='priority'
                        id='priority'
                        value={updatedTask.priority}
                        onChange={handleChange}
                        className='h-[30px] w-1/2 bg-gray-300 dark:bg-gray-900 rounded-lg px-1 outline-none'
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>



                <div className='flex justify-between items-center gap-1 mt-2'>
                    <label htmlFor='status' className="w-1/2 ml-1 text-left font-semibold">Status</label>
                    <select
                        name='status'
                        id='status'
                        value={updatedTask.status}
                        onChange={handleChange}
                        className='h-[30px] w-1/2 bg-gray-300 dark:bg-gray-900 rounded-lg px-1 outline-none'
                    >
                        <option value="pending">Pending</option>
                        <option value="started">Started</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>


                <div className='flex justify-between items-center gap-3 mt-2'>
                    <button
                        onClick={() => deleteTask(task)}
                        className='w-1/2 text-[#fafafa] cursor-pointer bg-red-700 rounded-lg px-2 py-1.5 font-semibold hover:font-bold duration-300 linear'
                    >
                        Delete
                    </button>
                    <button
                        className={isDisabled ? 'bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(255,255,255,0.5)] w-1/2 text-gray-200 font-semibold dark:text-[#242424] rounded-lg py-1.5 px-2' : 'bg-gray-900 dark:bg-white w-1/2 text-white dark:text-[#242424] font-semibold rounded-lg py-1.5 px-2 cursor-pointer hover:font-bold duration-300 linear'}
                        disabled={isDisabled}
                        onClick={handleSave}
                    >Save
                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskDetails