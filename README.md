
# Test Case & Bug Tracking Web App

A QA Management Web Application for managing test cases, test executions, bug reports, and software release reports.

## Project Overview

This application is designed to help QA Engineers organize software testing activities in one place.

It also serves as a QA Engineering portfolio project, with selected information and demo data available for public viewing.

## Main Features

- Dashboard with testing statistics
- Module Management
- Test Case Management
- Test Execution Management
- Bug Tracking with Kanban Board
- Bug Evidence Upload
- Excel Export
- Release Management
- Release Report Generator (DOCX/PDF)
- Public Demo Workspace
- Admin Authentication

## Technology Stack

| Category | Technology |
|---|---|
| Frontend | React + Vite |
| Language | JavaScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Routing | React Router |
| Backend & Database | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Storage | Supabase Storage |
| Excel Export | xlsx / exceljs |
| Deployment | Vercel |
| Version Control | Git & GitHub |

## User Roles

### Guest
- View the public landing page and dashboard.
- View data explicitly published by the Admin.
- View published Test Cases and Bug Reports.
- View published Release Reports.

### Admin
- Manage Modules and Test Cases.
- Manage Test Executions.
- Manage Bug Reports and evidence.
- Manage Releases and Release Reports.
- Publish or unpublish selected data.
- Export internal testing data.

## Project Documentation

- [Product Requirements Document](docs/PRD.md)
- [Development Roadmap](docs/DEVELOPMENT-ROADMAP.md)
- [Development Log](docs/DEVELOPMENT-LOG.md)

## Local Development

Clone the repository:

```bash
git clone https://github.com/Kautsaral/test-case-bug-tracking.git
cd test-case-bug-tracking
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Project Status

Currently in development.

## Cost

Development target: **Rp0 (Free)**.

The project will prioritize free-tier services and tools.

## Repository

https://github.com/Kautsaral/test-case-bug-tracking
