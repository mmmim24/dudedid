import React from 'react'
import { TaskStore } from '../store/taskStore';

const Home = () => {
    const { tasks } = React.useContext(TaskStore);
    return (
        <div>
            {
                tasks.map((task, index) => (
                    <div key={index}
                    // className='w-[300px] h-[100px] bg-[#242424] rounded-lg shadow-lg flex flex-col items-center justify-center mb-4'
                    >
                        <h1 className='text-white font-bold'>{task.title}</h1>
                        <p className='text-gray-400'>{task.description}</p>
                        <p className='text-gray-400'>{task.status}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Home