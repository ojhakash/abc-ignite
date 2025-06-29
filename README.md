# ABC Ignite API

This is a Node.js and Express-based REST API for managing workout club classes and bookings. Data is stored in-memory (no database required).

## Features
- Create classes for clubs (one per day, with name, dates, time, duration, capacity)
- Book a class for a member (with capacity and date validation)
- Search bookings by member and/or date range
- Swagger API docs at `/docs`
- Docker and .env support

## Setup

### With Docker
1. Build and run:
   ```bash
   docker-compose up --build
   ```
2. The server runs on port 3000 by default.

### With npm
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

## Environment
Create a `.env` file:
```
PORT=3000
```

## API Documentation
- Visit [http://localhost:3000/docs](http://localhost:3000/docs) for Swagger UI.

## API Endpoints

### Create Classes
- **POST** `/api/classes`
- **Body:**
  ```json
  {
    "name": "Pilates",
    "startDate": "2024-06-01",
    "endDate": "2024-06-20",
    "startTime": "14:00",
    "duration": 60,
    "capacity": 10
  }
  ```
- **Response:** `{ message, count }`

### Book a Class
- **POST** `/api/bookings`
- **Body:**
  ```json
  {
    "memberName": "Alice",
    "className": "Pilates",
    "participationDate": "2024-06-05"
  }
  ```
- **Response:** `{ message, booking }`

### Search Bookings
- **GET** `/api/bookings?member=Alice&startDate=2024-06-01&endDate=2024-06-10`
- **Query Params:**
  - `member` (optional): filter by member name
  - `startDate`, `endDate` (optional): filter by participation date range
- **Response:**
  ```json
  [
    {
      "className": "Pilates",
      "classStartTime": "14:00",
      "bookingDate": "2024-06-05",
      "member": "Alice"
    }
  ]
  ```

## Running Tests

This project uses [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest) for testing. All tests are located in the `tests/` directory:

- `tests/api/` — API endpoint tests (integration)
- `tests/utils/` — Utility function tests (unit)

### Run all tests
```bash
npm test
```

### Debug tests
```bash
npm run test:debug
```

Jest is configured for ES modules. If you add new test files, place them in the appropriate subdirectory under `tests/`.

## Running Tests in Docker

1. Start the test Postgres database:
   ```bash
   docker-compose up -d postgres_test
   ```
2. Run the tests from your project root:
   ```bash
   npm test
   ```
   This will use the test database (`abcignite_test`) on port 5433 as configured in your `package.json` scripts.

3. (Optional) To stop and remove the test database container:
   ```bash
   docker-compose down
   ```

## Notes
- No authentication required
- Data is not persisted between server restarts
- Follows RESTful standards 