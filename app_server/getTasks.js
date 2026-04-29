const dbService = require("./dbService");

exports.handler = async (event) => {
  const tasks = await dbService.getAllTasks();

  if (!tasks) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "https://d1dd1v9c4h1lsi.cloudfront.net",
      },
      body: JSON.stringify({ error: "Could not retrieve tasks" }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://d1dd1v9c4h1lsi.cloudfront.net",
    },
    body: JSON.stringify(tasks),
  };
};
