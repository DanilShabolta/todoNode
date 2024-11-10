import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import '../style.css';
import { getTasksFromLocalStorage, saveTaskToLocalStorage } from './taskStorage';


const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [showNoTasksMessage, setShowNoTasksMessage] = useState(true);
    
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        const storedTasks = getTasksFromLocalStorage();
        setTasks(storedTasks);
        setShowNoTasksMessage(storedTasks.length === 0);
    };

    const addTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTaskToLocalStorage(updatedTasks);
        setShowNoTasksMessage(false);
    };

    const removeTask = (taskToRemove) => {
        const updatedTasks = tasks.filter(task => task !== taskToRemove);
        setTasks(updatedTasks);
        saveTaskToLocalStorage(updatedTasks);
        setShowNoTasksMessage(updatedTasks.length === 0);
    };

    return (
        <div id="app">
            <TaskForm addTask={addTask} />
            {showNoTasksMessage && <div id="no-tasks-message">No tasks</div>}
            <TaskList tasks={tasks} removeTask={removeTask} />
        </div>
    );
};

export default TaskManager;