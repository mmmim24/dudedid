import React from 'react'
import { TaskStore } from '../store/taskStore'
import SingleTask from './SingleTask'

const WebViw = () => {
    const { state, dispatch } = React.useContext(TaskStore)
    const [started, setStarted] = React.useState([])
    const [onGoing, setOnGoing] = React.useState([])
    const [finished, setFinished] = React.useState([])
    React.useEffect(() => {
        const startedTasks = state.filter(task => task.status === 'started')
        const onGoingTasks = state.filter(task => task.status === 'on-going')
        const finishedTasks = state.filter(task => task.status === 'finished')
        setStarted(startedTasks)
        setOnGoing(onGoingTasks)
        setFinished(finishedTasks)
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
                        on-going
                    </h1>
                    {
                        onGoing.length === 0
                            ? <p className='text-center text-gray-500'>No tasks in progress</p>
                            : <>
                                <button
                                    onClick={() => clearTask('on-going')}
                                    className='bg-red-500 w-[80px] text-[#fafafa] rounded-lg p-2 cursor-pointer font-semibold hover:font-bold duration-300 linear'
                                >
                                    Clear All
                                </button>
                                {
                                    onGoing.map((t) => {
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
                        finished
                    </h1>
                    {
                        finished.length === 0
                            ? <p className='text-center text-gray-500'>No tasks finished</p>
                            : <>
                                <button
                                    onClick={() => clearTask('finished')}
                                    className='bg-red-500 w-[80px] text-[#fafafa] rounded-lg p-2 cursor-pointer font-semibold hover:font-bold duration-300 linear'
                                >
                                    Clear All
                                </button>
                                {
                                    finished.map((t) => {
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