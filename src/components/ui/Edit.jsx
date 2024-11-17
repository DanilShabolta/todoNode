import React, { useState, useEffect } from 'react';
import '../../style.css';

const Edit = ({ taskTitle, taskText, onClose, saveEditTask }) => {
    const [title, setTitle] = useState(taskTitle);
    const [text, setText] = useState(taskText);

    useEffect(() => {
        setTitle(taskTitle);
        setText(taskText);
    }, [taskTitle, taskText]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSave = () => {
        if (title.trim() && text.trim()) {
            saveEditTask({ title, text });
            onClose();
        }
    };

    return (
        <div className='overlay' onClick={onClose}>
            <div className='edit-container' onClick={(e) => e.stopPropagation()}>
                <input type='text' className='edit-title' value={title} onChange={handleTitleChange} />
                <textarea className='edit-description' value={text} onChange={handleTextChange} />
                <div className='edit-buttons'>
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={onClose}>Отменить</button>
                </div>
            </div>
        </div>
    );
};

export default Edit;