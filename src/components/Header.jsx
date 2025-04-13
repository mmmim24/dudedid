import React from 'react'
import logo from '/tasks.png';
import CreateTaskModal from './CreateTaskModal';

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div>
                <div className='flex h-[10vh] items-center justify-around gap-4 p-4 border-x-4'>
                    <button className='rounded-lg hover:bg-white hover:text-black border-2 py-1 px-2 cursor-pointer font-bold duration-500 linear' onClick={openModal}>NEW</button>
                    <h1 className="font-bold text-md md:text-lg lg:text-xl">Task Tracker</h1>
                    <button className='rounded-lg hover:bg-white hover:text-black border-2 py-1 px-2 cursor-pointer font-bold duration-500 linear'>LOGIN</button>
                </div>
                {
                    isOpen &&
                    <CreateTaskModal onClose={closeModal} />
                }
            </div>
        </>
    )
}

export default Header