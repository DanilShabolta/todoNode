import React from 'react';
import '../style.css';

const TaskItem = ({ task, removeTask, onDragStart, onDragOver, onDragEnd }) => {
    return (
        <div 
            className="task-container"
            draggable={true}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="task-main">
                <div className='task-container-text'>
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">{task.text}</p>
                </div>
                <button onClick={() => removeTask(task)} className="delete-btn">X</button>
            </div>
        </div>
    );
};

export default TaskItem;