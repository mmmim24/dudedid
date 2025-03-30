import React from 'react'
import MobileView from './MobileView';
import WebViw from './WebViw';

const Home = () => {
    return (
        <>
            <div className='hidden md:block'>
                <WebViw />
            </div>
            <div className='md:hidden'>
                <MobileView />
            </div>
        </>
    )
}

export default Home