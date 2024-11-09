import React from 'react';

const TaskItem = ({ task, removeTask }) => {
    
    return (
        <div className="task-container">
            <div className="task-main">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{task.text}</p>
                <button onClick={() => removeTask(task)} className="delete-btn">X</button>
            </div>
        </div>
    );
};

export default TaskItem;