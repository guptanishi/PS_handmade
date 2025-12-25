# PS HANDPAPER - Inventory & Invoice Management System

This is a modern Vue 3 + Tailwind CSS version of the PS HANDPAPER application.

## Features

- Product Management (Create, Read, Update, Delete)
- Customer Management
- Invoice Generation
- Tax Invoice Support
- Modern UI with Tailwind CSS
- MongoDB Database Integration
- Express.js Backend API

## Prerequisites

- Node.js (v20.19.0 or higher)
- MongoDB Atlas Account (or local MongoDB)

## Installation

Dependencies are already installed. If needed:
```bash
npm install
```

## Running the Application

### Step 1: Start the Backend Server

Open a terminal and run:
```bash
npm run server
```

The API server will start on `http://localhost:3001`

### Step 2: Start the Frontend Development Server

Open another terminal and run:
```bash
npm run dev
```

The Vue app will start on `http://localhost:5173`

## Default Login Credentials

- **Username:** admin
- **Password:** 1234

## Database Configuration

The application uses the same MongoDB database as the original JKFirm project:
- Database: `PS_handPaper`
- Connection string is located in `server/config/db.config.js`

## Project Structure

```
jkfirm-vue3/
├── server/              # Backend Express server
│   ├── config/         # Database configuration
│   ├── controllers/    # API controllers
│   ├── models/         # Mongoose models
│   └── routes/         # API routes
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Vue components
│   ├── router/         # Vue Router configuration
│   ├── services/       # API service layer
│   ├── views/          # Page components
│   └── App.vue         # Root component
└── public/             # Public assets
```

## API Endpoints

### Products
- GET `/api/products/` - Get all products
- POST `/api/products/create` - Create product
- POST `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

### Customers
- GET `/api/customers/` - Get all customers
- POST `/api/customers/create` - Create customer
- POST `/api/customers/:id` - Update customer
- DELETE `/api/customers/:id` - Delete customer

### Invoices
- GET `/api/invoices/` - Get all invoices
- POST `/api/invoices/create` - Create invoice
- POST `/api/invoices/:id` - Update invoice
- DELETE `/api/invoices/:id` - Delete invoice

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Technology Stack

- **Frontend:** Vue 3 (Composition API), Vue Router, Pinia, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Build Tool:** Vite

## Notes

- The application uses the same MongoDB database as the original JKFirm project
- All data is shared between both versions
- Login credentials are hardcoded (admin/1234) - update for production use
