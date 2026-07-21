# Enterprise Construction Management System

A scalable, full-stack Content Management System (CMS) and client portal tailored for construction and contracting firms. Built with a focus on clean architecture, maintainability, and seamless cloud deployment.

## Overview

This system serves as a bridge between the company and its clients. It provides a polished, public-facing portal for showcasing portfolios and services, coupled with a robust, secure Administrative Dashboard to manage leads, projects, and dynamic site content. 

The core engineering focus of this project was designing a **highly scalable foundation**. The architecture allows for effortless future expansion without accumulating technical debt.

## Tech Stack & Architecture

*   **Backend:** Laravel (PHP 8.2)
*   **Frontend:** React.js (via Inertia.js)
*   **Database:** PostgreSQL
*   **Cloud Storage:** Supabase (Object Storage for media)
*   **Deployment:** Docker (Multi-stage build)

### Engineering Highlights
*   **Stateless Architecture:** Media and file uploads are routed directly to **Supabase**, ensuring the application remains stateless and perfectly suited for horizontal scaling or ephemeral container environments.
*   **Production-Ready Containerization:** Utilized a multi-stage `Dockerfile` to compile Node.js/React assets efficiently before injecting them into a streamlined PHP/Nginx production image, reducing footprint and maximizing performance.
*   **Scalable Foundation:** Developed with strict adherence to separation of concerns and modular design principles, making future feature integration seamless.

## Core Modules

### 1. Client Portal (Public)
A fast, responsive, and SEO-friendly interface featuring:
*   **Home & About Us:** Corporate identity and overview.
*   **Services:** Detailed breakdown of construction capabilities.
*   **Portfolio:** Dynamic gallery of completed projects.
*   **Contact Us:** Lead generation and quotation request forms.

### 2. Administrative Dashboard (Private)
A secure central hub for managing business operations:
*   **Services Management:** Full CRUD operations for company offerings.
*   **Project Portfolio:** Categorized management of past and ongoing projects.
*   **Messages & Leads:** Centralized inbox to track customer inquiries and quote requests generated from the public site.
*   **Dynamic Settings:** A dedicated module restricted specifically to managing contact information, company physical location, and social media links, instantly reflecting across the public portal.

## Local Development Setup

To run this project locally, ensure you have Docker installed.

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/construction-cms.git](https://github.com/your-username/construction-cms.git)

# 2. Navigate to the directory
cd construction-cms

# 3. Build and spin up the containers
docker-compose up --build