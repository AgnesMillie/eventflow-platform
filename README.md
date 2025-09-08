# [![CI Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

EventFlow is a robust, full-stack event management platform designed to demonstrate modern software architecture principles. It provides a complete solution for organizers to create events and for users to browse and book tickets, built on a scalable, containerized stack.

## 🚀 Core Features

* **Authentication:** Secure JWT (JSON Web Token) authentication for user registration and login.
* **Role-Based Access Control (RBAC):** Distinct permissions for Users (browsing/booking) and Organizers (event creation/management).
* **Event Management:** Full CRUD operations for event creation, scheduling, and descriptions.
* **Transactional Bookings:** ACID-compliant booking system (powered by MySQL) to ensure data integrity and prevent double-booking.
* **Containerized Environment:** Fully orchestrated development environment using Docker Compose.

---

## 🏗️ Tech Stack & Architecture

This project is a **Monorepo** managed with Docker. The system is architected with a decoupled frontend and a modular backend API.

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend** | **NestJS (Node.js/TypeScript)** | Modular API design, Dependency Injection, JWT Auth |
| **Frontend** | **React (TypeScript)** | Dynamic user dashboards and event browsing (built with Vite) |
| **Database** | **MySQL 8.0** | Relational data persistence and transactional integrity |
| **Infrastructure**| **Docker / Docker Compose** | Containerization and orchestration of all services (DB, API, Web) |

### System Architecture Diagram
![Architecture Diagram](https://your-link-to-diagram.com/architecture.png) 
---

## 🚦 Getting Started: Running Locally

This entire project is designed to run with one command using Docker.

### Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
* [Git](https://git-scm.com/)

### Installation & Launch

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/[YOUR_REPO].git
    cd [YOUR_REPO]
    ```

2.  **Create your environment file:**
    Duplicate the `.env.example` file (you must create this file) and rename it `.env`. Populate it with the necessary variables (like database passwords).

3.  **Build and Run with Docker Compose:**
    This single command will build the images for the API and the Web client, start the MySQL database, and run the entire stack.

    ```bash
    docker-compose up --build
    ```

4.  **Access the application:**
    * **Frontend (React):** `http://localhost:5173`
    * **Backend (NestJS API):** `http://localhost:3000`
    * **Database (MySQL):** Accessible on port `3306` (for tools like DBeaver/TablePlus)

---

## 📚 API Documentation

For detailed API endpoint descriptions, request/response models, and testing, please refer to the Postman Collection located in the `/docs` folder or via the live API specification.

* **Live Swagger Docs:** `http://localhost:3000/api`

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.