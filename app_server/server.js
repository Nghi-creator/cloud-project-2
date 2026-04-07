// server.js (LOCAL USE)
const express = require("express");
const cors = require("cors");

const getTasks = require("./getTasks");
const createTask = require("./createTask");
const updateTask = require("./updateTask");
const deleteTask = require("./deleteTask");

const app = express();
app.use(cors());
app.use(express.json());

const createEvent = (req) => ({
  body: JSON.stringify(req.body),
  pathParameters: req.params,
});

// Map routes to the specific file's handler
app.get("/tasks", async (req, res) => {
  const event = createEvent(req);
  const result = await getTasks.handler(event);
  res.status(result.statusCode).set(result.headers).send(result.body);
});

app.post("/tasks", async (req, res) => {
  const event = createEvent(req);
  const result = await createTask.handler(event);
  res.status(result.statusCode).set(result.headers).send(result.body);
});

app.put("/tasks/:id", async (req, res) => {
  const event = createEvent(req);
  const result = await updateTask.handler(event);
  res.status(result.statusCode).set(result.headers).send(result.body);
});

app.delete("/tasks/:id", async (req, res) => {
  const event = createEvent(req);
  const result = await deleteTask.handler(event);
  res.status(result.statusCode).set(result.headers).send(result.body);
});

app.listen(3000, () => {
  console.log("Local API Gateway running cloud architecture on port 3000");
});
