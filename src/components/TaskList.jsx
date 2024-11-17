import React from "react";
import TaskItem from "./ui/TaskItem";

const TaskList = ({
  tasks,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  openInfo,
  openEdit,
  openShareMenu,
  openConfirm,
}) => {
  return (
    <div id="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => {
            e.preventDefault();
            handleDragOver(index);
          }}
          onDragEnd={handleDragEnd}
          openInfo={openInfo}
          editTask={openEdit}
          openShareMenu={openShareMenu}
          openConfirm={openConfirm}
        />
      ))}
    </div>
  );
};

export default TaskList;
