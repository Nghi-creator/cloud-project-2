let tasksDB = [];

exports.getAllTasks = () => {
  return tasksDB;
};

exports.addTask = (task) => {
  tasksDB.push(task);
  return task;
};

exports.updateTaskStatus = (taskId, status) => {
  const taskIndex = tasksDB.findIndex((t) => t.taskId === taskId);
  if (taskIndex === -1) return null;

  tasksDB[taskIndex].status = status;
  return tasksDB[taskIndex];
};

exports.deleteTask = (taskId) => {
  const initialLength = tasksDB.length;
  tasksDB = tasksDB.filter((t) => t.taskId !== taskId);
  return tasksDB.length !== initialLength;
};
