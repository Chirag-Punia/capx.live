# Portfolio Tracker

A full-stack application for tracking stock portfolios with real-time price updates.

## Features

- User authentication (login/register)
- Add, edit, and delete stock holdings
- Real-time portfolio tracking
- Interactive dashboard with charts
- Responsive design

## Tech Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- Charts: Recharts

## Project Structure

```
├── backend/
│   ├── middleware/     # Auth middleware
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   └── server.js       # Express server
├── src/
│   ├── components/     # React components
│   ├── context/        # React context
│   ├── pages/          # Page components
│   ├── services/       # API services
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Stocks
- GET `/api/stocks` - Get all stocks
- POST `/api/stocks` - Add new stock
- PUT `/api/stocks/:id` - Update stock
- DELETE `/api/stocks/:id` - Delete stock

### Portfolio
- GET `/api/portfolio/summary` - Get portfolio summary

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Environment Setup

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STOCK_API_URL=your_stock_api_url
```

4. Start the application
```bash
# Start backend server
cd backend
npm run dev

# Start frontend (in another terminal)
npm run dev
```

## API Documentation

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Stocks

#### Get All Stocks
```http
GET /api/stocks
Authorization: Bearer {token}
```

#### Add Stock
```http
POST /api/stocks
Authorization: Bearer {token}
Content-Type: application/json

{
  "symbol": "AAPL",
  "companyName": "Apple Inc.",
  "quantity": 10,
  "purchasePrice": 150.50
}
```

#### Update Stock
```http
PUT /api/stocks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 15,
  "purchasePrice": 155.75
}
```

#### Delete Stock
```http
DELETE /api/stocks/:id
Authorization: Bearer {token}
```

### Portfolio

#### Get Portfolio Summary
```http
GET /api/portfolio/summary
Authorization: Bearer {token}
```
