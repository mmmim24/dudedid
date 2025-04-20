import React from 'react'
import CreateTaskModal from './CreateTaskModal';
import { useAuth } from '../store/authStore';
import { FcGoogle } from 'react-icons/fc';

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { user, signInWithGoogle, signOut } = useAuth();
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleAuthClick = () => {
        if (user) {
            signOut();
        } else {
            signInWithGoogle();
        }
    };

    return (
        <>
            <div>
                <div className='flex h-[10vh] items-center justify-around gap-4 p-4 border-x-4'>
                    <button
                        className='rounded-lg hover:bg-white hover:text-black border-2 py-1 px-2 cursor-pointer font-bold duration-500 linear'
                        onClick={openModal}
                    >
                        Create New
                    </button>
                    <h1 className="font-bold text-md md:text-lg lg:text-xl">
                        Task Tracker
                    </h1>
                    <button
                        className='rounded-lg hover:bg-white hover:text-black border-2 py-1 px-2 cursor-pointer font-bold duration-500 linear'
                        onClick={handleAuthClick}
                    >
                        {
                            user
                                ? <div className='flex justify-center items-center gap-2'>
                                    Sign Out
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        referrerPolicy="no-referrer"
                                        className='w-5 rounded-full'
                                    />
                                </div>
                                : <div className='flex justify-center items-center gap-2'>
                                    Sign In with
                                    <FcGoogle />
                                </div>
                        }
                    </button>
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