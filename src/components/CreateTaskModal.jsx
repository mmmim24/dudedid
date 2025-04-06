import React from 'react'
import ReactDOM from 'react-dom';
import { TaskStore } from '../store/taskStore';

const CreateTaskModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [task, setTask] = React.useState({
        title: null,
        description: null
    });
    const { state, dispatch } = React.useContext(TaskStore);
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
                status: 'started',
            }
            dispatch({ type: 'ADD_TASK', payload: newTask });
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
                    {/* date will be implemented lateer */}
                    {/* <div className='flex flex-col items-left justify-left w-[80%]'>
                        <label
                            className='m-2 text-gray-900 dark:text-inherit font-semibold'
                            htmlFor='status'
                        >Due Date
                        </label>
                        <input
                            name='date'
                            min={new Date().toISOString().split('T')[0]}
                            placeholder='Add date'
                            className='h-[40px] bg-gray-400 dark:bg-[#1e1e1e] rounded-lg p-2 mb-4'
                            type='date'
                        />
                        <input
                            name='time'
                            placeholder='Add time'
                            className='h-[40px] bg-gray-400 dark:bg-[#1e1e1e] rounded-lg p-2 mb-4'
                            type='time'
                        />
                    </div> */}
                    <div className='flex items-center justify-end w-[80%]'>
                        <button
                            className={isDisabled ? 'bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(255,255,255,0.5)] w-[75px] text-gray-200 dark:text-[#242424] rounded-4xl py-2 px-4' : 'bg-gray-900 dark:bg-white w-[75px] text-white dark:text-[#242424] rounded-4xl py-2 px-4 cursor-pointer hover:font-bold duration-300 linear'}
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