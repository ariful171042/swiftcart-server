# SwiftCart E-commerce API

SwiftCart is a Node.js-based e-commerce platform API built with Express, MongoDB, and Stripe for payment processing.

## Features

- User authentication and management
- Product management
- Order management
- Payment processing using Stripe
- Real-time dashboard stats
- Caching with NodeCache
- Logging with Morgan

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/)
- [Stripe Account](https://stripe.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/swiftcart.git
Navigate to the project directory:
Copy code
```bash
cd swiftcart
```
Install the dependencies:


```bash
npm install
```
#Create a .env file in the root directory and add the following environment variables:

```bash
PORT=4000
MONGO_DB_URI=your_mongo_db_uri
STRIPE_KEY=your_stripe_api_key
```
Running the Application
Start the server with the following command:

```bash
npm run start
```
#The server will be running at http://localhost:4000.

## API Endpoints
User Routes
POST /api/user/register - Register a new user
POST /api/user/login - Login a user
GET /api/user/me - Get current user's profile
Product Routes
GET /api/product - Fetch all products
POST /api/product - Add a new product (Admin)
PUT /api/product/:id - Update product details (Admin)
DELETE /api/product/:id - Delete a product (Admin)
Order Routes
POST /api/order - Create a new order
GET /api/order/:id - Get details of a specific order
GET /api/order/user/:userId - Get all orders for a user
Payment Routes
POST /api/payment/checkout - Process payment using Stripe
Dashboard Routes
GET /api/dashboard/stats - Fetch platform statistics (Admin)


## Uploads
Static files (e.g., product images) are served from the /uploads directory.

## Middleware
Error handling middleware to catch errors globally
CORS middleware to handle cross-origin requests
Morgan for request logging


