const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

// Initialize the AWS SDK connection
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "TasksTable";

exports.getAllTasks = async () => {
  const command = new ScanCommand({ TableName: TABLE_NAME });
  const response = await docClient.send(command);
  return response.Items;
};

exports.addTask = async (task) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: task,
  });
  await docClient.send(command);
  return task;
};

exports.updateTaskStatus = async (taskId, status) => {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { taskId: taskId },
    UpdateExpression: "set #s = :status",
    ExpressionAttributeNames: { "#s": "status" },
    ExpressionAttributeValues: { ":status": status },
    ReturnValues: "ALL_NEW",
  });

  try {
    const response = await docClient.send(command);
    return response.Attributes;
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};

exports.deleteTask = async (taskId) => {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { taskId: taskId },
  });
  await docClient.send(command);
  return true;
};
