import React from 'react'
import ReactDOM from 'react-dom';
import { useTaskStore } from '../store/taskStore';

const EditTaskModal = ({ isOpen, onClose, task }) => {
    if (!isOpen) return null;

    const [updatedTask, setUpdatedTask] = React.useState(task);
    const { updateTask } = useTaskStore();
    const [isDisabled, setIsDisabled] = React.useState(true);

    const focusRef = React.useRef(null);

    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        updateTask(updatedTask);
        onClose();
    }

    React.useEffect(() => {
        if (updatedTask.title !== task.title || updatedTask.description !== task.description || updatedTask.status !== task.status || updatedTask.priority !== task.priority) {
            setIsDisabled(false);
        } else {
            focusRef.current.focus();
            setIsDisabled(true);
        }
    }, [updatedTask, task]);

    return ReactDOM.createPortal(
        (
            <div className='w-full h-full fixed bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(0,0,0,0.7)] flex items-center justify-center' onClick={onClose}>
                <div className='w-[300px] h-[400px] gap-4 bg-gray-500 dark:bg-[#242424] rounded-lg shadow-lg flex flex-col items-center justify-center' onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col justify-between items-left gap-2 w-[80%]">
                        <label className="ml-1 font-semibold">Title</label>
                        <input
                            name='title'
                            type="text"
                            defaultValue={updatedTask.title}
                            className='h-[40px] bg-gray-400 dark:bg-[#1e1e1e] rounded-lg p-2'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col justify-between items-left gap-2 w-[80%]">
                        <label className="ml-1 font-semibold">Description</label>
                        <textarea
                            ref={focusRef}
                            name='description'
                            defaultValue={updatedTask.description}
                            className='h-[65px] bg-gray-400 dark:bg-[#1e1e1e] rounded-lg p-2'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[80%]">
                        <label className="ml-1 font-semibold">Priority</label>
                        <select
                            name='priority'
                            value={updatedTask.priority}
                            onChange={handleChange}
                            className='w-28 bg-gray-300 dark:bg-gray-700 dark:text-gray-300 p-2 rounded-lg outline-none'
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center w-[80%]">
                        <label className="ml-1 font-semibold">Status</label>
                        <select
                            name='status'
                            value={updatedTask.status}
                            onChange={handleChange}
                            className='w-28 bg-gray-300 dark:bg-gray-700 dark:text-gray-300 p-2 rounded-lg outline-none'
                        >
                            <option value="Pending">Pending</option>
                            <option value="Started">Started</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button
                        className={isDisabled ? 'bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(255,255,255,0.5)] w-[80%] text-gray-200 dark:text-[#242424] rounded-lg py-2 px-4' : 'bg-gray-900 dark:bg-white w-[80%] text-white dark:text-[#242424] font-bold rounded-lg py-2 px-4 cursor-pointer hover:font-bold duration-300 linear'}
                        disabled={isDisabled}
                        onClick={handleClick}
                    >Save
                    </button>
                </div>
            </div >
        )
        , document.getElementById('edit-task')
    )
}

export default EditTaskModal