export const getTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem('tasks');
 return tasks ? JSON.parse(tasks) : [];
};

export const saveTaskToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};