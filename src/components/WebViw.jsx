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



    return (
        <>
            <div className='m-4 grid grid-cols-3 gap-4 h-[60vh]'>
                <div className='h-[100%] bg-gray-800 overflow-scroll rounded-xl shadow-md shadow-gray-700'>
                    <h1 className='uppercase my-4 text-center font-bold text-2xl text-gray-400'>
                        started
                    </h1>
                    {
                        started.length === 0 ? <p className='text-center text-gray-500'>No tasks started</p> :
                            started.map((t, index) => {
                                return (
                                    <SingleTask key={index} task={t} />
                                )
                            })
                    }
                </div>
                <div className='h-[100%] bg-gray-800 overflow-scroll rounded-xl shadow-md shadow-gray-700'>
                    <h1 className='uppercase my-4 text-center font-bold text-2xl text-gray-400'>
                        on-going
                    </h1>
                    {
                        onGoing.length === 0 ? <p className='text-center text-gray-500'>No tasks in progress</p> :
                            onGoing.map((t, index) => {
                                return (
                                    <SingleTask key={index} task={t} />
                                )
                            })
                    }
                </div>
                <div className='h-[100%] bg-gray-800 overflow-scroll rounded-xl shadow-md shadow-gray-700'>
                    <h1 className='uppercase my-4 text-center font-bold text-2xl text-gray-400'>
                        finished
                    </h1>
                    {
                        finished.length === 0 ? <p className='text-center text-gray-500'>No tasks finished</p> :
                            finished.map((t, index) => {
                                return (
                                    <SingleTask key={index} task={t} />
                                )
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default WebViw