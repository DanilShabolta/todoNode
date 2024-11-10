import React, { useState } from 'react';
import '../style.css';

const TaskItem = ({ task, onDragStart, onDragOver, onDragEnd, openInfo, editTask, openShareMenu, openConfirm}) => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = (event) => {
        event.stopPropagation();
        setMenuVisible(prev => !prev);
    };

    return (
        <div 
            className="task-container"
            draggable={true}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onClick={toggleMenu}
        >
            <div className="task-main">
                <div className='task-container-text'>
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">{task.text}</p>
                </div>
                <button onClick={() => openConfirm(task)} className="delete-btn">X</button>
            </div>
                <div className={`task-dropdown-menu ${isMenuVisible ? 'visible' : ''}`}>
                    <button onClick={() => openShareMenu(task)}><img src="../src/assets/button share.png"/></button>
                    <button onClick={() => editTask(task)}><img src="../src/assets/button edit.png"/></button>
                    <button onClick={() => openInfo(task)}><img src="../src/assets/button info.png"/></button>
                </div>
        </div>
    );
};

export default TaskItem;