import React, { useState, useEffect } from 'react';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskText, setTaskText] = useState('');
    const [editTask, setEditTask] = useState(null);
    const [showNoTasksMessage, setShowNoTasksMessage] = useState(true);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [confirmDeleteTask, setConfirmDeleteTask] = useState(false);
    const [shareMenuVisible, setShareMenuVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
    const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);


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
        setOverlayVisible(true);
        setConfirmDeleteTask(null);
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

    const handleOverlayClick = () => {// сброс оверлея и выделенной задачи
        setShareMenuVisible(false);
        setConfirmDeleteTask(null);
        setActiveTaskIndex(null);
        setInfoVisible(false);
    };

    const toggleShareMenu = () => {
        setShareMenuVisible(!shareMenuVisible);
    };

    const toggleInfo = (task) => {
        setInfoVisible(!infoVisible);
        setTaskText(task.text);
        setTaskTitle(task.title);
    };

    const toggleEdit = (task) => {
        setEditVisible(!editVisible);
        setTaskTitle(task.title);
        setTaskText(task.text);
    }

    const handleDragStart = (index) => {//новая фича
        setDraggedTaskIndex(index);
    };

    const handleDragOver = (index) => {
        if (draggedTaskIndex === null || draggedTaskIndex === index) return;
        const updatedTasks = [...tasks];
        const draggedTask = updatedTasks[draggedTaskIndex];
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
                        <div className="add-button-container">
                            <button onClick={addTask}>+</button>
                        </div>
                </div>
            </div>

            {showNoTasksMessage && <div id="no-tasks-message">No tasks</div>}
            <div id="task-list">
                {tasks.map((task, index) => (
                    <div 
                        key={index} 
                        className="task-container"
                        draggable={true}
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => {
                            e.preventDefault();
                            handleDragOver(index);
                        }}
                        onDragEnd={handleDragEnd}

                        onClick={() => setActiveTaskIndex(activeTaskIndex === index ? null : index)}
                    >
                        <div className="task-main">
                            <div id="task-container-text">
                                <h3 className="task-title">{task.title}</h3>
                                <p className="task-description">{task.text}</ p>
                            </div>
                            <button onClick={() => handleDeleteConfirmation(task)} className="delete-btn">X</button>
                        </div>
                        
                        {activeTaskIndex === index && (
                            <div className="task-dropdown-menu">
                                <button onClick={() => toggleEdit(task)} className='edit-btn'><img src="./src/assets/button edit.png"/></button>
                                <button onClick={toggleShareMenu}><img src="./src/assets/button share.png"/></button>
                                <button onClick={() => toggleInfo(task)} className='info-btn'><img src="./src/assets/button info.png"/></button>
                                </div>
                        )}

                        {confirmDeleteTask &&(
                            <div className="overlay" onClick={handleOverlayClick}>
                            <div className="confirm-delete" onClick={(e) => e.stopPropagation()}>
                                <h3>Confirm Delete</h3>
                                <p>Are you sure you want to delete this task?</p>
                                <div className='delete-buttons'>
                                <button onClick={() => removeTask(confirmDeleteTask)}>Yes</button>
                                <button onClick={handleOverlayClick}>No</button>
                                </div>
                            </div>
                        </div>
                        )}

                        {shareMenuVisible &&(
                            <div className='overlay' onClick={handleOverlayClick}>
                            <div className="share-menu" onClick={(e) => e.stopPropagation()}>
                                <button class="share-copy"><img src="./src/assets/share/share copy.png" alt="Share Copy"/></button>
                                <button class="share-vk"><img src="./src/assets/share/share vk.png" alt="Share VK"/></button>
                                <button class="share-tg"><img src="./src/assets/share/share tg.svg" alt="Share TG"/></button>
                                <button class="share-ws"><img src="./src/assets/share/share ws.svg" alt="Share WS"/></button>
                                <button class="share-fb"><img src="./src/assets/share/share fb.svg" alt="Share FB"/></button>
                            </div>
                            </div>
                        )}

                        {infoVisible &&(
                            <div className='overlay' onClick={handleOverlayClick}>
                                <div className='info-content' onClick={(e) => e.stopPropagation()}>
                                    <h3>{taskTitle}</h3>
                                    <p>{taskText}</p>
                                    </div>
                            </div>
                        )}

                        {editVisible && (
                            <div className='overlay' onClick={handleOverlayClick}>
                                <div className='edit-container' onClick={(e) => e.stopPropagation()}>
                                    <input type='text' className='edit-title'>{taskTitle}</input>
                                    <textarea className='edit-description'>{taskText}</textarea>
                                    <div className='edit-buttons'>
                                        <button onClick={saveEditTask}>Сохранить</button>
                                        <button onClick={handleOverlayClick}>Отменить</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;