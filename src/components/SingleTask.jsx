import React from 'react'
import { MdDragIndicator, MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import TaskDetails from './TaskDetails';
import { useDraggable } from '@dnd-kit/core';
const SingleTask = ({ task, isExpanded = false, toggleAccordion }) => {

    const { attributes, listeners, setNodeRef } = useDraggable({
        id: task.id,
    });

    // console.log(task.id)
    const className =
        task.priority === 'High'
            ? 'border-yellow-500'
            : (task.priority === 'Medium'
                ? 'border-blue-500'
                : 'border-green-500'
            );

    return (
        <div>
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className={
                    className +
                    ' border-l-3 bg-gray-300 dark:bg-gray-900 m-2 p-2 flex justify-between items-center h-[50px]' +
                    (isExpanded ? ' rounded-t-lg' : ' rounded-lg')
                }
            >
                <div
                    onClick={toggleAccordion}
                    className='text-gray-900 text-xl dark:text-white cursor-pointer w-1/12'
                >
                    {
                        isExpanded
                            ? <MdOutlineKeyboardDoubleArrowUp />
                            : <MdOutlineKeyboardDoubleArrowDown />
                    }
                </div>
                <h2 className='w-8/12 font-bold text-gray-900 dark:text-inherit'>
                    {task.title.length > 18 ? `${task.title.slice(0, 15)} ...` : task.title}
                </h2>
                <div className='w-1/12 flex justify-center items-center gap-4 font-semibold'>
                    <button className='text-[#242424] cursor-grab'
                    >
                        <MdDragIndicator className='text-xl text-gray-900 dark:text-white' />
                    </button>
                </div>
            </div>
            {
                isExpanded && <TaskDetails task={task} className={className} toggleAccordion={toggleAccordion} />
            }
        </div>
    )
}

export default SingleTask