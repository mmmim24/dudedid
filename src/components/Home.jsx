import React from 'react'
import { useTaskStore } from '../store/taskStore';
import MobileView from './MobileView';
import WebViw from './WebViw';
import SingleTask from './SingleTask';
import { DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

const Home = () => {
    const { tasks, loading, deleteAll, updateTask } = useTaskStore();
    const [isMobile, setIsMobile] = React.useState(true);
    const [activeId, setActiveId] = React.useState(null);

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 50
        }
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 50
        }
    })
    const sensors = useSensors(pointerSensor, touchSensor);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { over } = event;
        const draggedTask = tasks.find(task => task.id === activeId);
        if (draggedTask.status !== over.id) {
            updateTask({
                ...draggedTask,
                status: over.id
            });
        }
    };

    const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

    const handleResize = () => {
        if (window.innerWidth > 1024) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    }
    tasks.sort((taskA, taskB) => {
        const priorityOrder = ['Low', 'Medium', 'High'];
        return priorityOrder.indexOf(taskB.priority) - priorityOrder.indexOf(taskA.priority);
    });
    React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    if (loading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <p className="text-xl">Loading your tasks...</p>
            </div>
        );
    }

    return (
        <>
            {isMobile
                ? <MobileView ctx={{ tasks, deleteAll }} />
                : <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <WebViw ctx={{ tasks, deleteAll }} />
                    <DragOverlay className='opacity-80'><SingleTask task={activeTask} /></DragOverlay>
                </DndContext >
            }
        </>
    )
}

export default Home