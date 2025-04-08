import React from 'react'
import logo from '/tasks.svg';
import CreateTaskModal from './CreateTaskModal';

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div>
                <div className='flex items-center justify-around gap-4 p-4 border-l-4 border-r-4'>
                    <img src={logo} alt="Logo" className="h-10" />
                    <h1 className="font-bold text-md md:text-lg lg:text-xl">DUDEDID- task tracker</h1>
                    <button className='rounded-lg hover:bg-white hover:text-black border-2 py-1 px-2 cursor-pointer font-bold duration-500 linear' onClick={toggleModal}>+ NEW +</button>
                </div>
                <CreateTaskModal isOpen={isOpen} onClose={closeModal} />
            </div>
        </>
    )
}

export default Header