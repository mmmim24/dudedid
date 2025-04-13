import React from 'react'
import ReactDOM from 'react-dom';
import { useTaskStore } from '../store/taskStore';

const CreateTaskModal = ({ onClose }) => {
    const [task, setTask] = React.useState({
        title: '',
        description: '',
        priority: 'Low',
    });
    const { createTask } = useTaskStore();
    const [isDisabled, setIsDisabled] = React.useState(true);

    const focusRef = React.useRef(null);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        if (task.title !== null && task.description !== null) {
            const id = Date.now();
            const newTask = {
                id: id,
                title: task.title,
                description: task.description,
                status: 'pending',
                priority: task.priority
            }
            createTask(newTask);
        }
        onClose();
    }

    React.useEffect(() => {
        if (task.title && task.description) {
            setIsDisabled(false);
        } else {
            focusRef.current.focus();
            setIsDisabled(true);
        }
    }, [task]);
    return ReactDOM.createPortal(
        (
            <div className='w-full h-full fixed bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(0,0,0,0.7)] flex items-center justify-center' onClick={onClose}>
                <div className='w-[300px] h-[300px] bg-gray-500 dark:bg-[#242424] rounded-lg shadow-lg flex flex-col items-center justify-center' onClick={(e) => e.stopPropagation()}>
                    <input
                        ref={focusRef}
                        name='title'
                        type="text"
                        placeholder='Add title'
                        className='w-[80%] h-[40px] bg-gray-400 dark:bg-[#1e1e1e] rounded-lg p-2 mb-4'
                        onChange={handleChange}
                    />
                    <textarea
                        name='description'
                        placeholder='Add description'
                        className='w-[80%] h-[100px] bg-gray-400 dark:bg-[#1e1e1e] rounded-lg p-2 mb-4'
                        onChange={handleChange}
                    />
                    <div className='flex items-center justify-between w-[80%]'>
                        <label className='font-semibold'>Priority</label>
                        <select
                            name='priority'
                            onChange={handleChange}
                            className='bg-gray-300 dark:bg-gray-700 dark:text-gray-300 p-2 rounded-lg outline-none'
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <button
                            className={isDisabled ? 'bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(255,255,255,0.5)] text-gray-200 dark:text-[#242424] rounded-lg py-2 px-4' : 'bg-gray-900 dark:bg-white text-white dark:text-[#242424] font-bold rounded-lg py-2 px-4 cursor-pointer hover:font-bold duration-300 linear'}
                            disabled={isDisabled}
                            onClick={handleClick}
                        >Save
                        </button>
                    </div>
                </div>

            </div >
        )
        , document.getElementById('create-task')
    )
}

export default CreateTaskModal