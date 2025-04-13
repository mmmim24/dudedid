import React from 'react'

const Footer = () => {

    const [dateTime, setDateTime] = React.useState();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        weekday: 'long'
    }

    function update() {
        var date = new Date();
        setDateTime(date.toLocaleDateString('en-US', options));
    }

    React.useEffect(() => {
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);



    return (
        <>
            <div className='h-[10vh] flex flex-col border-x-4 lg:flex-row justify-center items-center text-xs md:text-sm lg:text-md lg:gap-10'>
                <div className="flex">
                    <p>Task Tracker</p>
                    <a href='https://www.github.com/mmmim24/dudedid' target='_blank'>&copy; Mustaq Mujahid Mim </a>
                </div>
                <div>
                    <p>{dateTime}</p>
                </div>
            </div>
        </>
    )
}

export default Footer