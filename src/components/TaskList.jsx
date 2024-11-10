import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, removeTask, handleDragStart, handleDragOver, handleDragEnd }) => {
    return (
        <div id="task-list">
            {tasks.map((task, index) => (
                <TaskItem 
                    key={index} 
                    task={task} 
                    removeTask={removeTask}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => {
                        e.preventDefault();
                        handleDragOver(index);
                    }}
                    onDragEnd={handleDragEnd}
                />
            ))}
        </div>
    );
};

export default TaskList;