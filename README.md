# Enterprise Construction Management System (CMS)

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

A scalable, full-stack Content Management System (CMS) and interactive client portal engineered specifically for the construction, engineering, and contracting sectors. This system acts as a digital bridge, providing a highly responsive public interface for clients alongside a secure, centralized administrative workspace for business operations.

---

## Architectural Overview

The core engineering focus of this architecture is **scalability and statelessness**. Built with strict adherence to the separation of concerns, the platform is designed to effortlessly accommodate future module integrations without accumulating technical debt.

### Engineering Highlights
* **Stateless Architecture:** Media and file uploads bypass the local server and are routed directly to **Supabase Object Storage**. This guarantees the application remains entirely stateless, making it perfectly suited for horizontal scaling and ephemeral containerized environments.
* **Production-Ready Containerization:** Deployed using a highly optimized, multi-stage `Dockerfile`. It compiles Node.js/React assets independently before injecting them into a lightweight PHP/Nginx production image, drastically reducing the deployment footprint.
* **SPA Performance with Monolith Simplicity:** Utilizing Inertia.js to tightly couple React components with Laravel controllers, delivering the speed of a Single Page Application without the complexity of building and maintaining a standalone RESTful API.

---

## 1. Corporate Public Portal

A fast, SEO-optimized, and responsive frontend designed to showcase operational capabilities and capture client inquiries.

### Corporate Profile & Home
Clear communication of company identity, structural achievements, and core values.
![Home Page](./docs/images/Home%20Page.png)
![About Us](./docs/images/About%20Us%20Page.png)

### Operational Capabilities (Services & Portfolio)
Dynamic grids rendering construction capabilities and cataloging completed engineering projects.
![Services](./docs/images/Services%20Page.png)
![Portfolio](./docs/images/Portfolio%20Page.png)

### Lead Generation (Contact)
Direct pipeline for client inquiries and consultation requests.
![Contact Us](./docs/images/Contact%20Page.png)

---

## 2. Administrative Workspace (CMS)

A secure, role-based backend hub designed to streamline operational workflows and content updates.

### System Dashboard
A centralized command center providing immediate analytics on active projects, service statuses, and unread client communications.
![Admin Dashboard](./docs/images/Admin%20Dashboard%20Page.png)

### Portfolio & Services Management
Full CRUD operations to maintain an up-to-date catalog of active construction projects and corporate services.
![Project Management](./docs/images/Admin%20Project%20Management%20Page.png)
![Service Management](./docs/images/Admin%20Service%20Management%20Page.png)

### Client Communications
Centralized inbox tracking all inquiries generated from the public portal, ensuring organized client relations.
![Messages](./docs/images/Admin%20Message%20Management%20Page.png)

### Dynamic Global Settings
A dedicated control module for managing corporate contact information, headquarters coordinates, and social links. Updates are instantly synchronized across the public portal.
![Settings](./docs/images/Admin%20setting%20Management%20Page.png)

---

## Local Development Setup

The system is fully containerized for a seamless, consistent local development experience. Ensure you have **Docker** and **Docker Compose** installed on your machine.

**1. Clone the repository:**
```bash
git clone https://github.com/alaa2980/construction-cms.git
cd construction-cms
```

**2. Configure Environment:**
```bash
cp .env.example .env
```
Configure your Supabase storage credentials and database variables in the .env file.

**3. Build and initialize containers:**
```bash
docker-compose up --build -d
```

**4. Run Migrations & Setup:**
Access the PHP container to finalize the Laravel setup:

```bash
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate --seed
```

## Developer

Architected and developed by Alaa Moh. Al-Waseai — A Full-Stack Software Engineer & Web/Mobile Developer. Driven by structured logic, clean code principles, and the translation of complex business requirements into scalable technical solutions.