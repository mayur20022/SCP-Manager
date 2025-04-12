To set up the SCP Manager project, begin by cloning the repository and configuring your environment. You’ll need to install dependencies for both the backend and frontend, and make sure your environment variables are properly set. Once configured, you can run the backend server and launch the frontend development environment.

### 🔧 Setup Steps:

- **Clone the repository**
  ```bash
  git clone https://github.com/mayur20022/SCP-Manager.git
  cd SCP-Manager
  ```

- **Create a `.env` file** in the root of the project with the following contents:
  ```
  PORT=3000
  MONGO_URL=mongodb+srv://scp-manager:RH2oB3GpaOVfWnAW@cluster0.yvbvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  SECRET_KEY=Assecement@123
  ```

- **Backend setup:**
  ```bash
  cd Backend
  npm install
  npx nodemon server.js
  ```

- **Frontend setup (in a new terminal window):**
  ```bash
  cd Frontend
  npm install
  npm run dev
  ```
