import React from 'react'
import ReactDOM from 'react-dom';
import { TaskStore } from '../store/taskStore';

const EditTaskModal = ({ isOpen, onClose, task }) => {
    if (!isOpen) return null;

    const [updatedTask, setUpdatedTask] = React.useState(task);
    const { state, dispatch } = React.useContext(TaskStore);
    const [isDisabled, setIsDisabled] = React.useState(true);

    const focusRef = React.useRef(null);

    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        dispatch({ type: 'EDIT_TASK', payload: updatedTask });
        onClose();
    }

    React.useEffect(() => {
        if (updatedTask.title !== task.title || updatedTask.description !== task.description || updatedTask.status !== task.status) {
            setIsDisabled(false);
        } else {
            focusRef.current.focus();
            setIsDisabled(true);
        }
    }, [updatedTask, task]);

    return ReactDOM.createPortal(
        (
            <div className='w-full h-full fixed bg-[rgba(0,0,0,0.7)] flex items-center justify-center' onClick={onClose}>
                <div className='w-[300px] h-[300px] bg-[#242424] rounded-lg shadow-lg flex flex-col items-center justify-center' onClick={(e) => e.stopPropagation()}>
                    <input
                        name='title'
                        type="text"
                        defaultValue={task.title}
                        className='w-[80%] h-[40px] bg-[#1e1e1e] rounded-lg text-white p-2 mb-4'
                        onChange={handleChange}
                    />
                    <textarea
                        ref={focusRef}
                        name='description'
                        defaultValue={task.description}
                        className='w-[80%] h-[100px] bg-[#1e1e1e] rounded-lg text-white p-2 mb-4'
                        onChange={handleChange}
                    />
                    <div className='flex items-center justify-between w-[80%]'>
                        <select
                            name='status'
                            value={updatedTask.status}
                            onChange={handleChange}
                            className='bg-gray-700 text-gray-300 p-2 rounded-lg'
                        >
                            <option value="started">Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button
                            className={isDisabled ? 'bg-[rgba(255,255,255,0.5)] w-[75px] text-[#242424] rounded-4xl py-2 px-4' : 'bg-white w-[75px] text-[#242424] rounded-4xl py-2 px-4 cursor-pointer hover:font-bold duration-300 linear'}
                            disabled={isDisabled}
                            onClick={handleClick}
                        >Save
                        </button>
                    </div>
                </div>
            </div >
        )
        , document.getElementById('edit-task')
    )
}

export default EditTaskModal