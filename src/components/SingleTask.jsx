import React from 'react'
import { TaskStore } from '../store/taskStore';
import EditTaskModal from './EditTaskModal';

const SingleTask = ({ task }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const { state, dispatch } = React.useContext(TaskStore);
    const handleChange = (event, payload) => {
        const newStatus = event.target.value;
        const updatedTask = { ...payload, status: newStatus };
        dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    }
    const clearTask = () => {
        dispatch({ type: 'CLEAR_TASK', payload: task });
    }
    // console.log(state)
    return (
        <div>
            <div className='h-[200px] bg-gray-400 dark:bg-gray-900 m-2 p-4 rounded-lg'>
                <h2 className='font-bold text-gray-900 dark:text-inherit'>{task.title}</h2>
                <p className='h-[100px] overflow-clip text-gray-900 dark:text-inherit'>{task.description}</p>
                <div className='flex justify-between items-center gap-2 mt-2 font-semibold'>
                    <button
                        onClick={() => toggleModal()}
                        className='bg-white w-[75px] text-[#242424] rounded-lg py-1 px-2 cursor-pointer hover:font-bold duration-300 linear'
                    >
                        Edit
                    </button>
                    <select
                        name='status'
                        value={task.status}
                        onChange={(e) => handleChange(e, task)}
                        className='dark:bg-gray-700 bg-gray-900 text-white dark:text-gray-300 p-2 rounded-lg py-1.5 px-2'
                    >
                        <option value="started">Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button
                        onClick={() => clearTask()}
                        className='bg-red-500 w-[75px] text-[#fafafa] rounded-lg py-1 px-2 cursor-pointer hover:font-bold duration-300 linear'
                    >
                        Clear
                    </button>
                </div>
            </div>
            <EditTaskModal isOpen={isOpen} onClose={closeModal} task={task} />
        </div>
    )
}

export default SingleTask