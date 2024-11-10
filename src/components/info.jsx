import React from 'react';
import '../style.css';

const Info = ({ taskTitle, taskText, onClose }) => {
    return (
        <div className='overlay' onClick={onClose}>
            <div className='info-content' onClick={(e) => e.stopPropagation()}>
                <h3>{taskTitle}</h3>
                <p>{taskText}</p>
                <button onClick={onClose}>ok</button>
            </div>
        </div>
    );
};

export default Info;