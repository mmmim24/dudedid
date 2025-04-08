import React from 'react'
import SingleTask from './SingleTask'

const WebViw = ({ ctx }) => {
    const { state, dispatch } = ctx;
    const [Pending, setPending] = React.useState([])
    const [started, setStarted] = React.useState([])
    const [Completed, setCompleted] = React.useState([])
    React.useEffect(() => {
        const PendingTasks = state.filter(task => task.status === 'Pending')
        const startedTasks = state.filter(task => task.status === 'Started')
        const CompletedTasks = state.filter(task => task.status === 'Completed')
        setPending(PendingTasks)
        setStarted(startedTasks)
        setCompleted(CompletedTasks)
    }, [state]);

    const clearTask = (status) => {
        dispatch({ type: 'DELETE_ALL', payload: status });
    }


    return (
        <>
            <div className='m-10 grid grid-cols-3 gap-10 h-[60vh]'>
                <div className='h-[100%] bg-gray-800 overflow-scroll rounded-xl shadow-md shadow-gray-700'>
                    <h1 className='uppercase my-4 text-center font-bold text-2xl text-gray-400'>
                        Pending
                    </h1>
                    {
                        Pending.length === 0
                            ? <p className='text-center text-gray-500'>No tasks Pending</p>
                            : <>
                                <button
                                    onClick={() => clearTask('Pending')}
                                    className='bg-red-500 w-[80px] text-[#fafafa] rounded-lg p-2 cursor-pointer font-semibold hover:font-bold duration-300 linear'
                                >
                                    Clear All
                                </button>
                                {
                                    Pending.map((t) => {
                                        return (
                                            <SingleTask key={t.id} task={t} />
                                        )
                                    })
                                }
                            </>
                    }
                </div>
                <div className='h-[100%] bg-gray-800 overflow-scroll rounded-xl shadow-md shadow-gray-700'>
                    <h1 className='uppercase my-4 text-center font-bold text-2xl text-gray-400'>
                        Started
                    </h1>
                    {
                        started.length === 0
                            ? <p className='text-center text-gray-500'>No tasks Started</p>
                            : <>
                                <button
                                    onClick={() => clearTask('Started')}
                                    className='bg-red-500 w-[80px] text-[#fafafa] rounded-lg p-2 cursor-pointer font-semibold hover:font-bold duration-300 linear'
                                >
                                    Clear All
                                </button>
                                {
                                    started.map((t) => {
                                        return (
                                            <SingleTask key={t.id} task={t} />
                                        )
                                    })
                                }
                            </>
                    }
                </div>
                <div className='h-[100%] bg-gray-800 overflow-scroll rounded-xl shadow-md shadow-gray-700'>
                    <h1 className='uppercase my-4 text-center font-bold text-2xl text-gray-400'>
                        Completed
                    </h1>
                    {
                        Completed.length === 0
                            ? <p className='text-center text-gray-500'>No tasks Completed</p>
                            : <>
                                <button
                                    onClick={() => clearTask('Completed')}
                                    className='bg-red-500 w-[80px] text-[#fafafa] rounded-lg p-2 cursor-pointer font-semibold hover:font-bold duration-300 linear'
                                >
                                    Clear All
                                </button>
                                {
                                    Completed.map((t) => {
                                        return (
                                            <SingleTask key={t.id} task={t} />
                                        )
                                    })
                                }
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default WebViw