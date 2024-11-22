This project is a web application designed to support an electronics store. It includes a Spring Boot backend and a React frontend.

# Prerequisites

Before starting, ensure you have the following installed:

Java Development Kit (JDK) 21

Maven

Node.js and npm

A database server (PostgreSQL)

# 1. Backend Setup

Navigate to the Web_application_to_support_an_electronics_store directory.

Open the file application.properties located in src/main/resources and ensure the following property is set:

spring.jpa.hibernate.ddl-auto=create

This will initialize the database schema.

Run the backend application: Open the WebApplicationToSupportElectronicsStoreApplication class located at:

Web_application_to_support_an_electronics_store/src/main/java/com/example

Start the application from your IDE or command line.

Import initial data into the database:

Import category.csv into the category table.

Import product.csv into the product table. You can use tools like MySQL Workbench or a similar database client to perform the import.

Test the backend application: Run the test class WebApplicationToSupportElectronicsStoreApplicationApplicationTests located at:

Web_application_to_support_an_electronics_store/src/test/java/com/example

# 2. Frontend Setup
   
Navigate to the frontend directory:

cd Web_application_to_support_an_electronics_store/app

Install the required dependencies:

npm install

npm install @stripe/react-stripe-js @stripe/stripe-js

npm install react-router-dom

npm install axios

npm install @mui/material @emotion/react @emotion/styled

npm install @mui/icons-material

npm install react-bootstrap bootstrap

npm install react-slick slick-carousel

Start the frontend development server:

npm start

## Access the Application

Backend API: By default, the backend runs on http://localhost:8081.

Frontend: The React application runs on http://localhost:3000.

## Notes

Database Initialization: The spring.jpa.hibernate.ddl-auto=create property resets the database each time the application is restarted. After the initial setup, change it back to update to preserve data between sessions.

Ensure the backend is running before starting the frontend.
