# Furniro E-Commerce | Compass UOL Fellowship Challenge

<div align="center">

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![Zustand](https://img.shields.io/badge/Zustand-%23443E38.svg?style=for-the-badge&logo=react&logoColor=white)
  ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
  ![Zod](https://img.shields.io/badge/zod-%233068B7.svg?style=for-the-badge&logo=zod&logoColor=white)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

  <br/>

  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![TypeORM](https://img.shields.io/badge/TypeORM-%23FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)
  ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
  ![Swagger](https://img.shields.io/badge/Swagger-%2385EA2D.svg?style=for-the-badge&logo=swagger&logoColor=black)

</div>

---

## About The Project

This project was developed as part of the **Challenge 3** for the Compass UOL Fellowship Program. It consists of a pixel-perfect recreation of **Furniro**, a modern e-commerce furniture interface, fully integrated with a custom RESTful API.

The goal was to deliver a robust, scalable, and responsive full-stack application, ensuring high performance and an intuitive user experience while adhering strictly to the provided Figma prototypes and business rules.

---

## Features

- **Dynamic Product Listing:** Server-side pagination, category filtering, search, and price sorting.
- **Single Product Page:** Detailed product views with dynamic pricing calculation based on user selection (size and color variations).
- **User Authentication & Protected Routes:** Secure JWT-based registration and login system with persistent session handling. Protected navigation guards for sensitive routes (`/checkout` and `/contact`).
- **Form Handling & ViaCEP Integration:** Form validation managed with React Hook Form and Zod. Automatic address auto-fill via ViaCEP API upon ZIP code entry.
- **Advanced State Management:** A fully functional Shopping Cart handled globally via Zustand, persisting data in Local Storage with interactive Cart Sidebar.
- **Checkout & Contact Flow:** Interactive checkout process with payment selection and feedback toasts upon order placement (`Place Order`).
- **Custom REST API:** Built from scratch using Node.js, Express, and TypeORM, replacing `json-server` to provide relational data, authentication, and Swagger documentation.
- **Fully Responsive:** Mobile-first approach tailored with Tailwind CSS for seamless navigation across all devices.

---

## Architecture & Technologies

The repository is structured as a monorepo containing two main directories:

### Front-end (`/front-end`)

Built for speed, type safety, and seamless UX.

- React.js (via Vite)
- TypeScript
- Tailwind CSS
- React Router DOM
- Zustand
- React Hook Form
- Zod
- React Hot Toast
- Splide.js

### Back-end (`/back-end`)

A scalable RESTful API handling authentication, real relational data, and interactive documentation.

- Node.js & Express.js
- TypeScript
- TypeORM & SQLite
- JSON Web Token (JWT)
- Bcrypt.js
- Swagger UI (OpenAPI 3.0)

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have **Node.js (v18 or higher)** and **npm** installed on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/alanaagne/furniro-all.git

```

### 2. Running the Back-end (API)

The backend utilizes an SQLite database. When starting the server in development mode, it will automatically parse the `db.json` file and seed the database with the initial products.

Run the following commands:

```bash
cd back-end
npm install
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

### 3. Running the Front-end

Open a new terminal window in the project root and run:

```bash
cd front-end
npm install
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

Open this URL in your browser to explore **Furniro**.

---

API Documentation: The backend API is documented using Swagger UI, which can be accessed interactively at
```text
http://localhost:3000/docs
```

---

📁 Project Structure

To ensure long-term maintainability, the project follows a strict architectural pattern:

```
📦 back-end
┣ 📂 public # Images used on products
┣ 📂 src
┣ 📂 controllers # Request handlers 
┣ 📂 database # Database configuration and seeding scripts 
┣ 📂 docs # Swagger API documentation configuration 
┣ 📂 dtos # Data Transfer Objects for request validation and response typing
┣ 📂 entities # TypeORM database models 
┣ 📂 routes # API route definitions 
┣ 📂 services # Business logic and database interactions 
┣ 📂 shared # Shared resources, middlewares, and utility functions
┣ 🗄️ furniro.sqlite # Local SQLite database file
┗ 📜 server.ts # Main server entry point and application setup
┗ 📜 db.json # Products info used on db seeding

📦 front-end
┣ 📂 src
┣ 📂 api # API integration and HTTP client configuration
┣ 📂 assets # Static design images and visual assets from the frontend design
┣ 📂 components # Reusable UI sections (Header, Footer, ProductCard, etc.)
┣ 📂 pages # Page-level components (Cart, Home, ProductDetail, Shop, etc.)
┣ 📂 store # Global state management
┣ 📂 types # Type definitions and interfaces
┣ 📂 utils # Helper functions and formatters
┣ 📜 App.tsx # Main application routing and layout
┣ 📜 index.css # Global styles
┗ 📜 main.tsx # Main React application entry point
```

---

## The Team

This project until the phase 2 was brought to life by a dedicated group:

- Alana Ágne Brandão Rocha
- Brunno Felipe Bezerra
- Gustavo Siqueira De Lima
- Lucas Folharini
- Pedro Lucas Galdino Leite

The phase 3 was developed by:

- Alana Ágne Brandão Rocha

---

## Acknowledgements

Developed with dedication for the **Compass UOL Fellowship Program**.
