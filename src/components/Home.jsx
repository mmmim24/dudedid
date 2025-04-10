import React from 'react'
import { useTaskStore } from '../store/taskStore';
import MobileView from './MobileView';
import WebViw from './WebViw';

const Home = () => {
    const { tasks, deleteAll } = useTaskStore();
    const [isMobile, setIsMobile] = React.useState(true);
    const handleResize = () => {
        if (window.innerWidth > 1024) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    }
    tasks.sort((priorityA, priorityB) => {
        const priorityOrder = ['High', 'Medium', 'Low'];
        return priorityOrder.indexOf(priorityA.priority) - priorityOrder.indexOf(priorityB.priority);
    });
    React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return (
        <>
            {
                isMobile ? <MobileView ctx={{ tasks, deleteAll }} /> : <WebViw ctx={{ tasks, deleteAll }} />
            }
        </>
    )
}

export default Home