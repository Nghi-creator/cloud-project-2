const { v4: uuidv4 } = require("uuid");
const dbService = require("./dbService");

exports.handler = async (event) => {
  const taskId = event.pathParameters.id;
  const deleted = await dbService.deleteTask(taskId);

  if (!deleted) {
    return {
      statusCode: 404,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Task not found" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Task deleted successfully" }),
  };
};
