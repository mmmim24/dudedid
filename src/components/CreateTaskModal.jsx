import React, { useId } from 'react'
import ReactDOM from 'react-dom';
import { TaskStore } from '../store/taskStore';

const CreateTaskModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [task, setTask] = React.useState({
        title: null,
        description: null
    });
    const { state, dispatch } = React.useContext(TaskStore);
    const [isDisabled, setIsDisabled] = React.useState(true);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        if (task.title !== null && task.description !== null) {
            const id = Date.now();
            const newTask = {
                id: id,
                title: task.title,
                description: task.description,
                status: 'started',
            }
            dispatch({ type: 'ADD_TASK', payload: newTask });
        }
        onClose();
    }

    React.useEffect(() => {
        if (task.title && task.description) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [task]);

    return ReactDOM.createPortal(
        (
            <div className='w-full h-full fixed bg-[rgba(0,0,0,0.7)] flex items-center justify-center' onClick={onClose}>
                <div className='w-[300px] h-[300px] bg-[#242424] rounded-lg shadow-lg flex flex-col items-center justify-center' onClick={(e) => e.stopPropagation()}>
                    <input
                        name='title'
                        type="text"
                        placeholder='Add title'
                        className='w-[80%] h-[40px] bg-[#1e1e1e] rounded-lg text-white p-2 mb-4'
                        onChange={handleChange}
                    />
                    <textarea
                        name='description'
                        placeholder='Add description'
                        className='w-[80%] h-[100px] bg-[#1e1e1e] rounded-lg text-white p-2 mb-4'
                        onChange={handleChange}
                    />
                    <div className='flex items-center justify-end w-[80%]'>
                        <button
                            className={isDisabled ? 'bg-[rgba(255,255,255,0.5)] w-[75px] text-[#242424] rounded-4xl py-2 px-4' : 'bg-white w-[75px] text-[#242424] rounded-4xl py-2 px-4 cursor-pointer hover:font-bold duration-300 linear'}
                            disabled={isDisabled}
                            onClick={handleClick}
                        >Save
                        </button>
                    </div>
                </div>

            </div >
        )
        , document.getElementById('create-task')
    )
}

export default CreateTaskModal