const { v4: uuidv4 } = require("uuid");
const dbService = require("./dbService");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const taskId = event.pathParameters.id;
  const updatedTask = await dbService.updateTaskStatus(taskId, body.status);

  if (!updatedTask) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "https://d1dd1v9c4h1lsi.cloudfront.net",
      },
      body: JSON.stringify({ error: "Task not found" }),
    };
  }
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://d1dd1v9c4h1lsi.cloudfront.net",
    },
    body: JSON.stringify(updatedTask),
  };
};
