# Notes Dashboard

This project is a simple Notes Dashboard built using React for the frontend and Node.js with Express for the backend. It allows users to log in, add, delete, and manage notes, while also displaying their profile information fetched from the backend.

## Prerequisites

Ensure you have the following installed:
- Node.js (>= 14.x)
- npm or yarn

## Backend Setup

1. Clone the repository.
2. Navigate to the backend directory and install dependencies:
   ```sh
   cd backend
   npm install
   ```
3. Configure environment variables by creating a `.env` file in the backend directory with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The server should now be running on `http://localhost:5000`

## Frontend Setup

1. Clone this repository and navigate to the project directory:
   ```sh
   cd frontend
   ```
2. Install frontend dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The frontend should now be running on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Logs in a user and returns a JWT token.
- `GET /api/auth/me` - Fetches the logged-in user's profile (requires token).

### Notes Management
- `GET /api/notes` - Fetch all notes for the authenticated user.
- `POST /api/notes` - Create a new note.
- `DELETE /api/notes/:id` - Delete a note.

## Usage
- Navigate to `http://localhost:3000`
- Log in with your credentials.
- Add, view, and delete notes.
- View your profile details (name and email) on the dashboard.

## Deployment
To build the project for production, run:
```sh
npm run build
```
This will generate optimized static files in the `build/` directory.


