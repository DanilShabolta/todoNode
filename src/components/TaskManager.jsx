import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import '../style.css';
import { getTasksFromLocalStorage, saveTaskToLocalStorage } from './taskStorage';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);
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

    const handleDragStart = (index) => {
        setDraggedTaskIndex(index);
    };

    const handleDragOver = (index) => {
        if (draggedTaskIndex === null || draggedTaskIndex === index) return;

        const updatedTasks = [...tasks];
        const draggedTask = updatedTasks[ draggedTaskIndex];
        updatedTasks.splice(draggedTaskIndex, 1);
        updatedTasks.splice(index, 0, draggedTask);
        
        setTasks(updatedTasks);
        setDraggedTaskIndex(index);
        saveTaskToLocalStorage(updatedTasks);
    };

    const handleDragEnd = () => {
        setDraggedTaskIndex(null);
    };

    return (
        <div id="app">
            <TaskForm addTask={addTask} />
            {showNoTasksMessage && <div id="no-tasks-message">No tasks</div>}
            <TaskList 
                tasks={tasks} 
                removeTask={removeTask} 
                handleDragStart={handleDragStart} 
                handleDragOver={handleDragOver} 
                handleDragEnd={handleDragEnd} 
            />
        </div>
    );
};

export default TaskManager;