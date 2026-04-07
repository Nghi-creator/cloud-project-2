const { v4: uuidv4 } = require("uuid");
const dbService = require("./dbService");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const taskId = event.pathParameters.id;
  const updatedTask = dbService.updateTaskStatus(taskId, body.status);

  if (!updatedTask) {
    return {
      statusCode: 404,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Task not found" }),
    };
  }
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(updatedTask),
  };
};
