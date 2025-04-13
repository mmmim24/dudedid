import React from 'react'
import Droppable from './Droppable';

const WebViw = ({ ctx }) => {
    const { tasks } = ctx;
    const [pending, setPending] = React.useState([])
    const [started, setStarted] = React.useState([])
    const [completed, setCompleted] = React.useState([])

    const [expandedTaskId, setExpandedTaskId] = React.useState();
    const toggleAccordion = (taskId) => {
        setExpandedTaskId(prevId => prevId === taskId ? null : taskId);
    };

    React.useEffect(() => {
        const pendingTasks = tasks.filter(task => task.status === 'pending')
        const startedTasks = tasks.filter(task => task.status === 'started')
        const completedTasks = tasks.filter(task => task.status === 'completed')
        setPending(pendingTasks)
        setStarted(startedTasks)
        setCompleted(completedTasks)
    }, [tasks]);

    return (
        <div className='m-10 grid grid-cols-3 gap-10 h-[80vh]'>
            <Droppable
                id="pending"
                tasks={pending}
                expandedTaskId={expandedTaskId}
                toggleAccordion={toggleAccordion}
            />
            <Droppable
                id="started"
                tasks={started}
                expandedTaskId={expandedTaskId}
                toggleAccordion={toggleAccordion}
            />
            <Droppable
                id="completed"
                tasks={completed}
                expandedTaskId={expandedTaskId}
                toggleAccordion={toggleAccordion}
            />
        </div>
    )
}

export default WebViw