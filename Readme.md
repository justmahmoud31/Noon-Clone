# Noon E-Commerce Clone

This project is a clone of the Noon e-commerce platform built using Node.js, Express, Mongoose, and MongoDB. The project is structured to manage products, categories, subcategories, user authentication, and more, following best practices for RESTful APIs.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project replicates key features of the Noon e-commerce platform, including product management, category and subcategory filtering, user authentication, and cart management,wishist and payment. The backend is built using Node.js with Express, and MongoDB is used for the database. Mongoose is used as the ODM to interact with MongoDB.

## Features

- User authentication (sign-up, login, JWT-based authentication)
- CRUD operations for products, categories,Brand,and subcategories
- Cart management
- Product filtering by category and subcategory

## Technologies Used

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Development Tools:** Nodemon, Postman
- **Others:** Bcrypt for password hashing, dotenv for environment variable management

## Installation

### Prerequisites

- Node.js installed (version 14.x or higher)
- MongoDB installed and running locally or via a cloud service (e.g., MongoDB Atlas)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/justmahmoud31/Noon-Clone.git
   cd Noon-Clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
3. Run the project:
   ```bash
   npm run dev
   ```
   The project will start on `http://localhost:3000`.

## Running the Project

The project is set up to run using Nodemon, which automatically restarts the server on file changes. To run the project, simply execute:

```bash
npm run dev
```

This will start the development server and watch for changes.

## API Documentation

The API provides various endpoints for managing users, products, categories, and subcategories. Below are some key endpoints:
[postman Documentation](https://documenter.getpostman.com/view/34323218/2sA3s9Co2G)

## Project Structure

The project follows a Domain-driven structure:

- `controllers`: Handles the logic for each route.
- `models`: Defines the Mongoose schemas.
- `routes`: Defines the API endpoints.
- `middlewares`: Custom middleware (e.g., error handling, authentication).
- `utils`: Utility functions (e.g., AppError, JWT handling).
- `modules`: Contains route ,controllers 

## Contributing

Contributions are welcome! Please create an issue or submit a pull request for any feature requests or bug fixes.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```

Feel free to copy this Markdown text and use it as needed.