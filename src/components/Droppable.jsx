import React from 'react'
import SingleTask from './SingleTask';
import { useDroppable } from '@dnd-kit/core'
import { useTaskStore } from '../store/taskStore';

const Droppable = ({ id, tasks, expandedTaskId, toggleAccordion }) => {
    const { deleteAll } = useTaskStore();
    const { setNodeRef } = useDroppable({
        id,
    });



    return (
        <div ref={setNodeRef} className='h-[100%] bg-gray-400 dark:bg-gray-800 overflow-scroll rounded-xl shadow-md shadow-gray-700'>
            <h1 className='uppercase my-4 text-center font-bold text-2xl dark:text-gray-400'>
                {id}
            </h1>
            <div>
                {
                    tasks.length === 0
                        ? <p className='text-center text-gray-500'>No tasks {id}</p>
                        : <div>
                            <button
                                onClick={() => deleteAll(id)}
                                className='bg-red-700 w-[80px] text-sm text-[#fafafa] rounded-lg px-2 py-1 cursor-pointer font-semibold hover:font-bold duration-300 linear'
                            >
                                Clear All
                            </button>
                            <div>
                                {
                                    tasks.map((t) => {
                                        return (
                                            <SingleTask
                                                key={t.id}
                                                task={t}
                                                isExpanded={expandedTaskId === t.id}
                                                toggleAccordion={() => toggleAccordion(t.id)}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Droppable