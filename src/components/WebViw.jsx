import React from 'react'
import { TaskStore } from '../store/taskStore'
import SingleTask from './SingleTask'

const WebViw = () => {
    const { state, dispatch } = React.useContext(TaskStore)
    const [started, setStarted] = React.useState([])
    const [InProgress, setInProgress] = React.useState([])
    const [Completed, setCompleted] = React.useState([])
    React.useEffect(() => {
        const startedTasks = state.filter(task => task.status === 'started')
        const InProgressTasks = state.filter(task => task.status === 'In Progress')
        const CompletedTasks = state.filter(task => task.status === 'Completed')
        setStarted(startedTasks)
        setInProgress(InProgressTasks)
        setCompleted(CompletedTasks)
    }, [state]);

    const clearTask = (status) => {
        dispatch({ type: 'CLEAR_ALL', payload: status });
    }


    return (
        <>
            <div className='m-10 grid grid-cols-3 gap-10 h-[60vh]'>
                <div className='h-[100%] bg-gray-800 overflow-scroll rounded-xl shadow-md shadow-gray-700'>
                    <h1 className='uppercase my-4 text-center font-bold text-2xl text-gray-400'>
                        started
                    </h1>
                    {
                        started.length === 0
                            ? <p className='text-center text-gray-500'>No tasks started</p>
                            : <>
                                <button
                                    onClick={() => clearTask('started')}
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
                        In Progress
                    </h1>
                    {
                        InProgress.length === 0
                            ? <p className='text-center text-gray-500'>No tasks in progress</p>
                            : <>
                                <button
                                    onClick={() => clearTask('In Progress')}
                                    className='bg-red-500 w-[80px] text-[#fafafa] rounded-lg p-2 cursor-pointer font-semibold hover:font-bold duration-300 linear'
                                >
                                    Clear All
                                </button>
                                {
                                    InProgress.map((t) => {
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