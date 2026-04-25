const dbService = require("./dbService");

exports.handler = async (event) => {
  const tasks = await dbService.getAllTasks();

  if (!tasks) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Could not retrieve tasks" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(tasks),
  };
};
