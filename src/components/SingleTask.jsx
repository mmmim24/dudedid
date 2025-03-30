import React from 'react'
import { TaskStore } from '../store/taskStore';

const SingleTask = ({ task }) => {
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
        <>
            <div className='h-[200px] bg-gray-900 m-2 p-4 rounded-lg'>
                <h2 className='font-bold'>{task.title}</h2>
                <p className='h-[100px] overflow-clip'>{task.description}</p>
                <div className='flex justify-between items-center gap-2 mt-2 font-semibold'>
                    <button
                        onClick={() => { }}
                        className='bg-white w-[75px] text-[#242424] rounded-lg py-2 px-4 cursor-pointer hover:font-bold duration-300 linear'
                    >
                        Edit
                    </button>
                    <select
                        value={task.status}
                        onChange={(e) => handleChange(e, task)}
                        className='bg-gray-700 text-gray-300 p-2 rounded-lg'
                    >
                        <option value="started">Started</option>
                        <option value="on-going">On-going</option>
                        <option value="finished">Finished</option>
                    </select>
                    <button
                        onClick={() => clearTask()}
                        className='bg-red-500 w-[75px] text-[#fafafa] rounded-lg py-2 px-4 cursor-pointer hover:font-bold duration-300 linear'
                    >
                        Clear
                    </button>
                </div>
            </div>
        </>
    )
}

export default SingleTask