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

    const { dispatch } = React.useContext(TaskStore);
    const handleChange = (event, payload) => {
        const newPriority = event.target.value;
        const updatedTask = { ...payload, priority: newPriority };
        dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    }
    const clearTask = () => {
        dispatch({ type: 'DELETE_TASK', payload: task });
    }
    // console.log(task.id)
    const className =
        task.priority === 'High'
            ? 'border-red-500'
            : (task.priority === 'Medium'
                ? 'border-yellow-500'
                : 'border-green-500'
            );

    return (
        <div>
            <div className={className + ' border-l-3 h-[100px] bg-gray-400 dark:bg-gray-900 m-2 p-4 rounded-lg'}>
                <h2 className='font-bold text-gray-900 dark:text-inherit'>{task.title}</h2>
                <div className='flex justify-between items-center gap-2 mt-2 font-semibold'>
                    <button
                        onClick={() => toggleModal()}
                        className='bg-white w-[75px] text-[#242424] rounded-lg py-1 px-2 cursor-pointer hover:font-bold duration-300 linear'
                    >
                        Edit
                    </button>
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