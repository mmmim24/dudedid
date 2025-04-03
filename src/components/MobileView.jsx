import React from 'react'
import SingleTask from './SingleTask'
import { TaskStore } from '../store/taskStore'

const MobileView = () => {

    const [task, setTask] = React.useState([]);
    const { state, dispatch } = React.useContext(TaskStore);
    const [currentStatus, setCurrentStatus] = React.useState('started');

    const handleClick = (status) => {
        setCurrentStatus(status);
    }

    React.useEffect(() => {
        setTask(state.filter(t => t.status === currentStatus));
    }, [currentStatus, state]);

    const clearAllTask = () => {
        dispatch({ type: 'CLEAR_ALL', payload: 'started' });
        dispatch({ type: 'CLEAR_ALL', payload: 'on-going' });
        dispatch({ type: 'CLEAR_ALL', payload: 'finished' });
    }

    return (
        <>
            <div className='my-6 flex gap-6 items-center justify-around'>
                <button
                    className='focus:text-white uppercase my-4 text-center font-bold text-lg text-gray-400'
                    onClick={() => handleClick('started')}
                >
                    Started
                </button>
                <button
                    className='focus:text-white active:text-white uppercase my-4 text-center font-bold text-lg text-gray-400'
                    onClick={() => handleClick('on-going')}
                >
                    On Going
                </button>
                <button
                    className='focus:text-white uppercase my-4 text-center font-bold text-lg text-gray-400'
                    onClick={() => handleClick('finished')}
                >
                    Finished
                </button>
            </div>
            {
                task.length === 0
                    ? <p className='text-center text-gray-500'>No tasks </p>
                    : <>
                        <button
                            onClick={() => clearAllTask()}
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
        </>
    )
}

export default MobileView