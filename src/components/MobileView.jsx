import React from 'react'
import SingleTask from './SingleTask'
import { TaskStore } from '../store/taskStore'

const MobileView = () => {

    const [task, setTask] = React.useState();
    const { state, dispatch } = React.useContext(TaskStore);

    const handleClick = (status) => {
        setTask(state.filter(t => t.status === status));
    }

    return (
        <>
            <div className='my-6 flex gap-6 items-center justify-around'>
                <h1
                    className='uppercase my-4 text-center font-bold text-lg text-gray-400'
                    onClick={() => handleClick('started')}
                >
                    Started
                </h1>
                <h1
                    className='uppercase my-4 text-center font-bold text-lg text-gray-400'
                    onClick={() => handleClick('on-going')}
                >
                    On Going
                </h1>
                <h1
                    className='uppercase my-4 text-center font-bold text-lg text-gray-400'
                    onClick={() => handleClick('finished')}
                >
                    Finished
                </h1>
            </div>
            {
                task.length === 0
                    ? <p className='text-center text-gray-500'>No tasks </p>
                    : <>
                        <button
                            onClick={() => clearTask('started')}
                            className='bg-red-500 w-[80px] text-[#fafafa] rounded-lg p-2 cursor-pointer font-semibold hover:font-bold duration-300 linear'
                        >
                            Clear All
                        </button>
                        {
                            state.map((t) => {
                                return (
                                    <SingleTask key={t.id} task={t} />
                                )
                            })
                        }
                    </>
            }
        </>
    )
}

export default MobileView