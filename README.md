
# Your Ticket Check

This is a full-stack web application built with Django (backend) and React (frontend) to manage and track support tickets. Users can create, update, view, and filter tickets based on priority and status. It also includes user authentication and role-based access control (Admin, User).

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Backend (Django)](#backend-django-setup)
  - [Frontend (React)](#frontend-react-setup)
- [Running the Application](#running-the-application)


## Features
- User authentication (login/logout).
- Create, edit, and delete tickets.
- Filter tickets by priority and status.
- Role-based access for Admin and Users.
- Responsive design for mobile and desktop views.

## Tech Stack
- **Backend**: Django, Django REST Framework
- **Frontend**: React.js, Axios
- **Database**: PostgreSQL (or any other database supported by Django)
- **Deployment**: AWS, Nginx, Gunicorn

## Prerequisites
Before setting up the project, make sure you have the following installed:
- [Python 3.x](https://www.python.org/downloads/)
- [Node.js (v14+)](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/) (or any other database supported by Django)
- [Git](https://git-scm.com/)

## Project Setup

### Backend (Django) Setup (In first Terminal)

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhinandav/TicketManagement.git
   cd TicketManagement
   ```

2. **Create a virtual environment** (optional but recommended)
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database**

   - Apply migrations:
     ```bash
     python manage.py migrate
     ```

5. **Create a superuser** (for accessing Django admin panel)
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the backend server**
   ```bash
   python manage.py runserver
   ```

### Frontend (React) Setup (in second Terminal)

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up Axios for API calls**
   Update the `axiosConfig.js` with the base URL of your backend Django API (e.g., `http://localhost:8000`).

4. **Run the frontend development server**
   ```bash
   npm start
   ```



## Running the Application

1. **Start the backend server**
   ```bash
   python manage.py runserver
   ```

2. **Start the frontend server**
   ```bash
   npm start
   ```

3. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend (Admin): [http://localhost:8000/admin](http://localhost:8000/admin)

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.


### Key Sections:
- **Features**: Highlight the core functionality of the project.
- **Tech Stack**: List the major technologies used.
- **Prerequisites**: List what should be installed before setup.
- **Project Setup**: Provide step-by-step instructions to set up both backend and frontend.
- **Environment Variables**: Mention the variables required to run the project locally.
- **Running the Application**: How to start the app after setup.
- **Contributing & License**: Encourage collaboration and provide license info.

