# Movie Tracker Application

A web application to keep track of your favorite movies with a beautiful Hollywood-themed interface. Built with React, Node.js, Express, and PostgreSQL.

# Table of Contents

# Prerequisites
Before you begin, ensure you have the following installed:

* Node.js (v14 or higher)
* PostgreSQL (v12 or higher)
* pgAdmin 4 (optional, for database management)
* npm or yarn package manager

# Project Structure

```text
movie-tracker/
│
├── backend/
│   ├── server.js              # Express server with API routes
│   ├── db.js                  # PostgreSQL connection configuration
│   ├── package.json           # Backend dependencies
│   └── node_modules/
│
└── frontend/
    ├── src/
    │   ├── App.jsx            # Main application component
    │   ├── App.css            # Application styles
    │   ├── components/
    │   │   ├── MovieList.jsx  # Display all movies
    │   │   ├── MovieForm.jsx  # Add/Edit movie form
    │   │   └── MovieItem.jsx  # Individual movie card
    │   └── main.jsx           # React entry point
    ├── vite.config.js         # Vite configuration with proxy
    ├── package.json           # Frontend dependencies
    └── node_modules/
```

# 1: Installation & Setup

```text
git clone <your-repository-url>
cd movie-tracker
```

# 2: Database Setup
Using pgAdmin 4

## 1: Open pgAdmin 4
## 2: Connect to PostgreSQL server
## 3: Create Database:
    * Right-click on "Databases"
    * Select "Create" → "Database"
    * Name: movie_tracker
    * Click "Save"
## 4: Create Table:
    * Expand movie_tracker → Schemas → public → Tables
    * Right-click on Tables → Select "Query Tool"
    * Paste and execute:

```text
CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5)
);
```

## 5: Verify Table Creation:
    * Right-click on Tables → Refresh
    * You should see the movies table

# 3: Backend Setup
```text
cd backend
npm install
```

Start the server
```text
node server.js
```