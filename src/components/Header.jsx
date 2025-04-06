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
                    <button className='w-[100px] rounded-2xl border-2 py-2 px-4 cursor-pointer hover:font-bold duration-300 linear' onClick={toggleModal}>+ Create</button>
                </div>
                <CreateTaskModal isOpen={isOpen} onClose={closeModal} />
            </div>
        </>
    )
}

export default Header