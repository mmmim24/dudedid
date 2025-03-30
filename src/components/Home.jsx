import React from 'react'
import MobileView from './MobileView';
import WebViw from './WebViw';

const Home = () => {
    return (
        <>
            <div className='hidden lg:block'>
                <WebViw />
            </div>
            <div className='lg:hidden'>
                <MobileView />
            </div>
        </>
    )
}

export default Home