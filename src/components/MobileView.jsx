import React from 'react'
import SingleTask from './SingleTask'

const MobileView = ({ ctx }) => {

    const [task, setTask] = React.useState([]);
    const { tasks, deleteAll } = ctx;
    const [currentStatus, setCurrentStatus] = React.useState('Pending');

    const handleClick = (status) => {
        setCurrentStatus(status);
    }
    React.useEffect(() => {
        setTask(tasks.filter(t => t.status === currentStatus));
    }, [currentStatus, tasks]);

    return (
        <>
            <div className='my-6 flex gap-6 items-center justify-around'>
                <button
                    className='uppercase my-4 text-center font-bold text-lg text-gray-400'
                    onClick={() => handleClick('Pending')}
                >
                    {
                        currentStatus === 'Pending'
                            ? <span className="border-b-2 pb-2 text-black dark:text-white">Pending</span>
                            : <span>Pending</span>
                    }
                </button>
                <button
                    className='uppercase my-4 text-center font-bold text-lg text-gray-400'
                    onClick={() => handleClick('Started')}
                >
                    {
                        currentStatus === 'Started'
                            ? <span className="border-b-2 pb-2 text-black dark:text-white">Started</span>
                            : <span>Started</span>
                    }
                </button>
                <button
                    className='uppercase my-4 text-center font-bold text-lg text-gray-400'
                    onClick={() => handleClick('Completed')}
                >
                    {
                        currentStatus === 'Completed'
                            ? <span className="border-b-2 pb-2 text-black dark:text-white">Finished</span>
                            : <span>Finished</span>
                    }
                </button>
            </div>
            <div className='overflow-scroll h-[80vh]'>
                {
                    task.length === 0
                        ? <p className='text-center text-gray-500'>No tasks </p>
                        : <>
                            <button
                                onClick={() => deleteAll(currentStatus)}
                                className='bg-red-500 w-[80px] text-[#fafafa] rounded-lg p-2 cursor-pointer font-semibold hover:font-bold duration-300 linear'
                            >
                                Clear All
                            </button>
                            {
                                task.map((t) => {
                                    return (
                                        <SingleTask key={t.id} task={t} />
                                    )
                                })
                            }
                        </>
                }
            </div>
        </>
    )
}

export default MobileView