import React from 'react'
import ReactDOM from 'react-dom';
import { TaskStore } from '../store/taskStore';

const CreateTaskModal = ({ isOpen, onClose }) => {
    const { tasks, updateValues } = React.useContext(TaskStore);
    if (!isOpen) return null;
    const [task, setTask] = React.useState({
        title: null,
        description: null
    });
    const [isDisabled, setIsDisabled] = React.useState(true);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (task.title !== null && task.description !== null) {
            const newTask = {
                title: task.title,
                description: task.description,
                status: 'started',
            }
            updateValues(newTask);
        }
        console.log('Task created');
        onClose();
    }

    React.useEffect(() => {
        if (task.title && task.description) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [task]);

    console.log(task);

    return ReactDOM.createPortal(
        (
            <div className='w-full h-full fixed bg-[rgba(0,0,0,0.5)] flex items-center justify-center'>
                <div className='w-[300px] h-[300px] bg-[#242424] rounded-lg shadow-lg flex flex-col items-center justify-center'>
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
                        resize={false}
                        onChange={handleChange}
                    />
                    <button
                        className='bg-white text-[#242424] rounded-2xl py-2 px-4 cursor-pointer hover:font-bold duration-300 linear'
                        disabled={isDisabled}
                        onClick={handleClick}
                    >Save
                    </button>
                </div>

            </div >
        )
        , document.getElementById('create-task')
    )
}

export default CreateTaskModal