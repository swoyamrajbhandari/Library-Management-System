# Library Management System

## Description
A comprehensive, micro-services based Library Management System designed to handle various aspects of library operations. This includes authentication, API route authorization, book meta and copy management, etc.

## Features
*   **User Authentication & Authorization:** Provides a secure way of user account registration, login, and role-based access control(RBAC) using Casbin.
*   **User Management:** Helps manage user profile and related info.
*   **Library Cataloging:** Helps Manage books and their meta data.
*   **Copy Management:** Tracks individual copies of books and their status/availability/condition.
*   **API Gateway/Route Management:** Dynamically manages routes and authorizes access to API endpoints accross services.
*   **Scalable Architecture:** Built with microservices for independent deployment and scaling.

## Technology
*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **Authorization:** Casbin
*   **Containerization:** Docker
*   **Logging:** Winston logging 