
# Vehicle Reservation App - Backend

## Overview

This is the backend of the **Vehicle Reservation App**, built with **Node.js**, **Express**, and **MySQL**. The app allows users to book vehicles, view their reservations, and manage them. The backend handles authentication, user management, reservation creation, and deletion.

## Technologies Used

- **Node.js**: JavaScript runtime to build the backend server.
- **Express.js**: Web framework for building APIs.
- **MySQL**: Relational database used for storing user and reservation data.
- **Sequelize**: ORM (Object-Relational Mapping) library for MySQL.
- **Auth0**: Authentication service to secure the backend and manage users.
- **Axios**: For making HTTP requests in some parts of the application.

## Features

- User Authentication with **Auth0**.
- Users can create reservations for vehicles.
- Users can view, update, or delete their reservations.
- Secure API routes with JWT authorization.
- RESTful API structure.

## Requirements

- Node.js (v14.x or higher)
- MySQL (Local setup or Cloud instance like AWS RDS)
- Auth0 Account for authentication.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/GaveenBuddhika/vehicle-reservation-app.git
cd vehicle-reservation-app/BackEnd
```

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### 3. Configuration

You will need to set up environment variables to configure the backend. Create a `.env` file in the root of the `BackEnd` folder with the following details:

```env
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=vehicle_reservation
JWT_SECRET=your_jwt_secret_key
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
```

- **MYSQL_HOST**: The host where your MySQL server is running (e.g., `localhost` or the IP of a remote server).
- **MYSQL_USER**: The MySQL user to connect to the database (e.g., `root`).
- **MYSQL_PASSWORD**: The password of the MySQL user.
- **MYSQL_DATABASE**: The name of your MySQL database where reservations will be stored.
- **jwksUri**: https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json"=
- **audience**: Replace with your audience in auth0 api
- **issuer**: https://YOUR_AUTH0_DOMAIN/
  
### 4. Set Up MySQL Database

Before running the app, you need to create the necessary MySQL database and tables. 

1. Access your MySQL database:

```bash
mysql -u root -p
```

2. Create the database:

```sql
CREATE DATABASE vehicle_reservation;
```

3. Run the provided SQL scripts to set up your tables (`reservations`, `users`, etc.). You can either write them yourself or look for existing migrations or models (e.g., with Sequelize).

### 5. Run the Server

After setting up the environment variables and database, you can start the backend server with:

```bash
npm start
```

The server will start running on port `5000` .




