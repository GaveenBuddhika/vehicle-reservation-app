# Vehicle Reservation App - Frontend

This is the frontend part of the Vehicle Reservation App, built with React. It provides the user interface for managing reservations, including form submission, reservation viewing, and deletion.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests to the backend.
- **Auth0**: Authentication and authorization service for user login and secure API access.

## Installation

### Clone the repository

```bash
git clone https://github.com/GaveenBuddhika/vehicle-reservation-app.git
```

### Navigate to the FrontEnd directory

```bash
cd vehicle-reservation-app/FrontEnd
```

### Install the dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the root directory and add the following:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AUTH0_DOMAIN=your_auth0_domain
REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
REACT_APP_AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

- `REACT_APP_API_URL`: The base URL of the backend API.
- `REACT_APP_AUTH0_DOMAIN`: Your Auth0 domain.
- `REACT_APP_AUTH0_CLIENT_ID`: Your Auth0 client ID.
- `REACT_APP_AUTH0_CLIENT_SECRET`: Your Auth0 client secret.

## Running the Application

After setting up the environment variables, start the frontend development server by running the following command:

```bash
npm start
```

The application will be available at `http://localhost:3000` in your browser.
