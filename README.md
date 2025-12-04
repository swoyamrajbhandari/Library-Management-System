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

## Architecture
The system employs a micro-servise based architecture. The services are as follows:

*   **`auth-service`:** Handles user authentication (login, registration) and manages user permissions.
*   **`user-service`:** Helps manage user profiles and related data.
*   **`library-service`:** Manages the book catalog, including their meta-data and individual book copies.
*   **`route-service`:** Dynamically stores endpoint routes from across all services in the db and helps in managing them.
*   **`shared-middleware`:** A shared middleware/module between all microservices that shares functionalities such as authorization (Casbin enforcer), extractRoutes, casbin_rule Prisma client setup, reloadPolicy.

## Getting started

### Prequisites
*   Docker and Docker Compose/Docker desktop installed
* Node.js (for local development and testing outside docker)
*   Git

### Installation & setup

1.  **Clone the repository:**
```bash
git clone https://github.com/swoyamrajbhandari/Library-Management-System.git
cd Library_management_system
```

