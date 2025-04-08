import React from 'react'
import { TaskStore } from '../store/taskStore';
import MobileView from './MobileView';
import WebViw from './WebViw';

const Home = () => {
    const { state, dispatch } = React.useContext(TaskStore);
    const [isMobile, setIsMobile] = React.useState(true);
    const handleResize = () => {
        if (window.innerWidth > 1024) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    }
    state.sort((priorityA, priorityB) => {
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
                isMobile ? <MobileView ctx={{ state, dispatch }} /> : <WebViw ctx={{ state, dispatch }} />
            }
        </>
    )
}

export default Home