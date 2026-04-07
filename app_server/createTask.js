const { v4: uuidv4 } = require("uuid");
const dbService = require("./dbService");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const newTask = {
    taskId: uuidv4(),
    title: body.title,
    description: body.description,
    priority: body.priority,
    dueDate: body.dueDate,
    status: body.status || "pending",
    createdAt: new Date().toISOString(),
  };

  dbService.addTask(newTask);

  if (!newTask) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Invalid task data" }),
    };
  }

  return {
    statusCode: 201,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(newTask),
  };
};
