import React, { useState, useEffect } from 'react';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskText, setTaskText] = useState('');
    const [editTask, setEditTask] = useState(null);
    const [showNoTasksMessage, setShowNoTasksMessage] = useState(true);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [confirmDeleteTask, setConfirmDeleteTask] = useState(null);
    const [shareMenuVisible, setShareMenuVisible] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        const storedTasks = getTasksFromLocalStorage();
        setTasks(storedTasks);
        setShowNoTasksMessage(storedTasks.length === 0);
    };

    const getTasksFromLocalStorage = () => {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    };

    const saveTaskToLocalStorage = (newTasks) => {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const addTask = () => {
        if (taskTitle.trim() && taskText.trim()) {
            const newTask = { title: taskTitle, text: taskText };
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            saveTaskToLocalStorage(updatedTasks);
            setTaskTitle('');
            setTaskText('');
            setShowNoTasksMessage(false);
        }
    };

    const removeTask = (taskToRemove) => {
        const updatedTasks = tasks.filter(task => task !== taskToRemove);
        setTasks(updatedTasks);
        saveTaskToLocalStorage(updatedTasks);
        setShowNoTasksMessage(updatedTasks.length === 0);
        setOverlayVisible(false);
        setConfirmDeleteTask(null);
    };

    const startEditTask = (task) => {
        setEditTask(task);
        setTaskTitle(task.title);
        setTaskText(task.text);
    };

    const saveEditTask = () => {
        if (taskTitle.trim() && taskText.trim() && editTask) {
            const updatedTasks = tasks.map(task =>
                task === editTask ? { title: taskTitle, text: taskText } : task
            );
            setTasks(updatedTasks);
            saveTaskToLocalStorage(updatedTasks);
            setEditTask(null);
            setTaskTitle('');
            setTaskText('');
        }
    };

    const handleDeleteConfirmation = (task) => {
        setConfirmDeleteTask(task);
        setOverlayVisible(true);
    };

    const handleOverlayClick = () => {
        setOverlayVisible(false);
        setShareMenuVisible(false);
        setConfirmDeleteTask(null);
    };

    const toggleShareMenu = () => {
        setShareMenuVisible(!shareMenuVisible);
    };

    return (
        <div id="app">
          <div id="task-form">
            <div id="task-input-container">
              <div id="task-input-text">
                <input
                    id="task-title"
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Task Title"
                />
                <input
                    id="task-input"
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Task Description"
                />
                </div>
                {editTask ? (  
                    <button onClick={saveEditTask}>Save Edit</button>
                ) : (
                  <div className="add-button-container">
                    <button onClick={addTask}>+</button>
                  </div>
                )}
            </div>
            </div>


            {showNoTasksMessage && <div id="no-tasks-message">No tasks</div>}
            <div id="task-list">
                {tasks.map((task, index) => (
                    <div key={index} className="task-container">
                        <div className="task-main">
                            <div id="task-container-text">
                            <h3 class="task-title">{task.title}</h3>
                            <p class="task-description">{task.text}</p>
                            </div>
                            <button onClick={() => handleDeleteConfirmation(task)} class="delete-btn">X</button>
                            <button onClick={() => startEditTask(task)}><img src="./src/assets/button edit.png"/></button>
                            <button onClick={toggleShareMenu}><img src="./src/assets/button share.png"/></button>
                        </div>
                        {shareMenuVisible && (
                            <div className="share-menu">
                                <button class="share-copy"><img src="./src/assets/share/share copy.png" alt="Share Copy"/></button>
                                <button class="share-vk"><img src="./src/assets/share/share vk.png" alt="Share VK"/></button>
                                <button class="share-tg"><img src="./src/assets/share/share tg.svg" alt="Share TG"/></button>
                                <button class="share-ws"><img src="./src/assets/share/share ws.svg" alt="Share WS"/></button>
                                <button class="share-fb"><img src="./src/assets/share/share fb.svg" alt="Share FB"/></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {overlayVisible && (
                <div className="overlay" onClick={handleOverlayClick}>
                    <div className="confirm-delete">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this task?</p>
                        <button onClick={() => removeTask(confirmDeleteTask)}>Yes</button>
                        <button onClick={handleOverlayClick}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskManager;