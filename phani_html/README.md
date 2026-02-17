# TripShare Backend

This is the backend API for the TripShare ride-sharing application. It provides endpoints for user registration, trip management, passenger requests, payments, and vehicle tracking.

## Features

- User registration (drivers and passengers)
- Trip creation and management
- Passenger ride requests
- Search functionality with destination filtering
- Payment processing (simulated)
- Vehicle tracking (simulated)

## Technologies

- Node.js
- Express.js
- SQLite3
- CORS

## Installation

1. Clone or download the project files.
2. Navigate to the project directory.
3. Install dependencies:

   ```
   npm install
   ```

## Running the Server

Start the server with:

```
npm start
```

Or for development with auto-restart:

```
npm run dev
```

The server will run on `http://localhost:5000`.

## API Endpoints

### User Registration
- `POST /api/register` - Register a new user
  - Body: `{ username, role, license?, carModel?, aadhar? }`

### Trips
- `POST /api/trips` - Create a new trip
  - Body: `{ driverName, driverGender, origin, destination, date, seats, cost, vehicleNumber, vehicleType, contactNumber }`
- `GET /api/trips?destination=<dest>` - Get all trips (optional destination filter)
- `PUT /api/trips/:id` - Update trip seats
  - Body: `{ seats }`

### Requests
- `POST /api/requests` - Create a passenger request
  - Body: `{ passengerName, passengerGender, origin, destination, date, numPassengers, contact }`
- `GET /api/requests?destination=<dest>` - Get all requests (optional destination filter)

### Payments
- `POST /api/payments` - Process payment
  - Body: `{ tripId, amount, method, txnId }`

### Tracking
- `GET /api/track/:vehicleNumber` - Track vehicle location (simulated)

## Database

The application uses SQLite with the following tables:
- `users` - User registrations
- `trips` - Driver trips
- `requests` - Passenger requests
- `payments` - Payment records

The database file `tripshare.db` is created automatically on first run.

## Frontend Integration

To integrate with the provided HTML frontend, update the JavaScript to use fetch API calls to these endpoints instead of localStorage.

For example:
- Replace `localStorage.setItem('trips', JSON.stringify(trips))` with `fetch('/api/trips', { method: 'POST', body: JSON.stringify(tripData) })`

## Notes

- This is a basic implementation without authentication or advanced security.
- Payments and tracking are simulated.
- For production, consider adding authentication, input validation, and error handling.
