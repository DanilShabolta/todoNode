import React, { useState } from 'react';
import '../../style.css';


const TaskForm = ({ addTask }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskText, setTaskText] = useState('');

    const handleAddTask = () => {
        if (taskTitle.trim() && taskText.trim()) {
            const newTask = { title: taskTitle, text: taskText };
            addTask(newTask);
            setTaskTitle('');
            setTaskText('');
        }
    };

    return (
        <div id="task-form">
            <div id="task-input-container">
                <div className='task-input-text'>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Task Title"
                />
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Task Description"
                />
                </div>
                <button onClick={handleAddTask} className='add-button-container'>+</button>
            </div>
        </div>
    );
};

export default TaskForm;