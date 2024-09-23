# ReavLinks Backend

ReavLinks Backend is a robust and scalable URL shortening service built with Node.js and Express.js. It enables users to create custom short URLs with features such as password protection, expiration dates, and click analytics.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Custom Short URLs**: Create custom slugs or let the system generate random ones.
- **Password Protection**: Optionally add passwords to restrict access to short URLs.
- **Link Expiration**: Set expiration dates for short URLs.
- **Click Analytics**: Track the number of clicks on each short URL.
- **Scalable Architecture**: Designed to handle high traffic with efficient database queries.

---

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: Passport.js with JWT strategy
- **Validation**: Joi
- **Error Handling**: Centralized error handling with custom error classes
- **Utilities**: Bcrypt for password hashing, Validator.js for input validation

---

## Getting Started

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **Yarn**
- **MongoDB** (local instance or a cloud service like MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/reavlinks-backend.git
   cd reavlinks-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

Start the application using the following command:

```bash
npm start
# or
yarn start
```

The server should now be running on `http://localhost:4400`.

### Running in Development Mode

For automatic server restarts during development, use:

```bash
npm run dev
# or
yarn dev
```

---

## Folder Structure

```
reavlinks-backend/
├── src/
│   ├── config/             # Configuration files (e.g., passport.js, database config)
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # Express route definitions
│   │   ├── v1/             # Version 1 API routes
│   │   └── redirect.route.js  # Route for handling URL redirection
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions (e.g., error handling, catchAsync)
│   ├── validations/        # Joi schemas for request validation
│   ├── middlewares/        # Custom Express middlewares
│   └── app.js              # Express app initialization
├── .gitignore
├── package.json
└── README.md
```

---

## License

This project is licensed under the **MIT License**.

---
