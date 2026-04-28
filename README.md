# PROJECT 2 - Building a Serverless Web Application with Zero-Cost & Secure Architecture

## Project structure

```text
.
├── template.yaml       # AWS SAM template defining the cloud infrastructure
├── samconfig.toml      # A helper file that remembers default deployment settings
├── app_server/         # Backend Lambda functions and local server
│   ├── server.js       # Local Express API for testing without deploying
│   ├── dbService.js    # Shared DynamoDB connection and query logic
│   ├── createTask.js   # Lambda handler: Creates a new task
│   ├── getTasks.js     # Lambda handler: Retrieves all tasks
│   ├── updateTask.js   # Lambda handler: Updates task status
│   ├── deleteTask.js   # Lambda handler: Deletes a task
│   └── package.json    # Node.js dependencies for the backend
└── web_server/         # Frontend website files (Hosted on S3)
    ├── list.html       # Main task dashboard UI
    ├── create.html     # Task creation UI
    └── client.js       # Frontend API connection logic
```

---

## How to run locally

You can test the application locally before deploying it to AWS. The project includes a local Express.js server (`server.js`) that simulates AWS API Gateway.

### 1. Start the local backend

1. Open a terminal and navigate into the backend folder:
   ```bash
   cd app_server
   ```
2. Install the necessary dependencies:
   ```bash
   npm install express cors uuid @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
   ```
3. Ensure your AWS credentials are appropriately configured on your machine (`aws configure`), as the local server will communicate with your live DynamoDB `TasksTable`.
4. Start the local Express server:
   ```bash
   node server.js
   ```
   _The server will start running on `http://localhost:3000`._

### 2. Configure the frontend for local testing

By default, the frontend is configured to point to the live AWS API Gateway. To test locally:

1. Open `web_server/client.js`.
2. Temporarily comment out the cloud API URL and point it to your local server:
   ```javascript
   // const API_BASE_URL = "https://heloh3vtld.execute-api.ap-southeast-1.amazonaws.com/prod/tasks";
   const API_BASE_URL = "http://localhost:3000/tasks";
   ```

### 3. Serve the frontend

1. You cannot just double-click the HTML files (due to CORS/fetch API restrictions). You must serve them.
2. If you are using VS Code, install the **Live Server** extension.
3. Right-click `list.html` and select **"Open with Live Server"**.

_Remember to change the `API_BASE_URL` back to the live AWS API Gateway URL before deploying to the cloud!_

---

## How to deploy to AWS

The backend infrastructure is managed via the AWS SAM CLI. Before building, you must connect your terminal to your AWS account.

### 1. Configure AWS CLI with your IAM user credentials

```bash
aws configure
```

_You will be prompted to enter your AWS Access Key ID, Secret Access Key, and default region._

### 2. Build the SAM

Ensure you are in the project root directory (where `template.yaml` is located), then build the SAM application:

```bash
sam build
```

### 3. Deploy the application to AWS

You have to also explicitly grant IAM role creation permissions (required for the Lambda security roles):

```bash
sam deploy --guided --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
```

### 4. Follow the instructions

Follow the prompts (Stack Name, Region, etc.). Once complete, SAM will output your live API Gateway Endpoint URL. Update `client.js` with this new URL if it changed.
