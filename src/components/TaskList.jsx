import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, removeTask }) => {
    return (
        <div id="task-list">
            {tasks.map((task, index) => (
                <TaskItem key={index} task={task} removeTask={removeTask} />
            ))}
        </div>
    );
};

export default TaskList;