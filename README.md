# 🛒 E-Commerce RESTful API with Role-Based Access Control (RBAC)

A comprehensive, production-ready E-Commerce Backend API built with Node.js, Express, and MongoDB Atlas. Features complete JWT Authentication, Password Hashing, and Role-Based Authorization ensuring only Admins can create or modify products while providing public product endpoints.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas with Mongoose ODM
* **Security:** JSON Web Tokens (`jsonwebtoken`), Password Encryption (`bcryptjs`), CORS
* **Architecture:** MVC (Model-View-Controller)

---

## ✨ Key Features

* **JWT Authentication:** Secure user registration and login workflows.
* **Role-Based Authorization (RBAC):** Middleware restrictions allowing only users with the `admin` role to publish products.
* **Data Population:** Dynamic referencing between `Product` and `User` models using Mongoose `populate`.
* **Clean & Modular Codebase:** Separated routes, controllers, models, and middlewares.

---

## 🔗 API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register user/admin with JWT token response |
| `POST` | `/api/auth/login` | Public | Authenticate user & return token |
| `GET` | `/api/products` | Public | Fetch all available products with creator info |
| `POST` | `/api/products` | Private / Admin | Create a new product (Requires Admin Bearer Token) |

---

## ⚙️ Local Setup

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/OmarAhmed2772004/ecommerce-backend-api.git](https://github.com/OmarAhmed2772004/Ecommerce-Backend-API.git)
   cd ecommerce-backend-api# Ecommerce-Backend-API
