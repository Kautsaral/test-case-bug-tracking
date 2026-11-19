# Development Log

Project: Test Case & Bug Tracking Web App

## Day 1 — Project Setup

### Completed

- [x] Node.js and npm environment verified.
- [x] React + Vite project created.
- [x] ESLint selected.
- [x] Tailwind CSS installed and configured.
- [x] React Router installed and configured.
- [x] Home page route created.
- [x] Admin Login placeholder route created.
- [x] Not Found page created.
- [x] Git initialized.
- [x] GitHub repository created.
- [x] Initial source code pushed to GitHub.
- [x] Project documentation prepared (PRD, Development Roadmap, Development Log).
- [x] Supabase JavaScript client installed.
- [x] Environment variables configured in `.env`.
- [x] Supabase client configured in `src/lib/supabase.js`.
- [x] Supabase Auth API connectivity verified (HTTP 200).
- [x] Application successfully runs in development mode.
- [x] Production build completed successfully.
- [x] Day 1 changes committed and pushed to GitHub.

### Repository

https://github.com/Kautsaral/test-case-bug-tracking

### Notes

- Project directory: D:\test-case-bug-tracking
- Framework: React + Vite
- Language: JavaScript
- Styling: Tailwind CSS v4
- Backend: Supabase
- Branch: main
- Development budget target: Rp0

### Git Commit

`5914717` — chore: complete day 1 project setup

---

## Day 2 — Database & Authentication

### Database Setup

- [x] Database tables created.
- [x] Database columns and data types configured.
- [x] Primary keys and foreign keys configured.
- [x] Database relationships configured.
- [x] Check constraints and unique constraints reviewed.
- [x] Database functions reviewed.
- [x] Database triggers reviewed.
- [x] Automatic Test Case and Bug code generation configured.

### Authentication

- [x] Supabase Authentication configured.
- [x] Admin account configured.
- [x] Admin profile created.
- [x] AuthContext implemented.
- [x] Admin session initialization implemented.
- [x] Profile retrieval implemented.
- [x] Admin role verification implemented.
- [x] Protected routes implemented.
- [x] Admin login implemented.
- [x] Admin logout implemented.

### Database Security

- [x] Row Level Security enabled on all public tables.
- [x] Admin RLS policies configured.
- [x] Public read policies configured.
- [x] Profiles access policies configured.
- [x] Function execution privileges reviewed.
- [x] Table GRANT privileges reviewed.
- [x] Additional table privileges revoked where unnecessary.
- [x] Storage bucket configured as private.
- [x] Storage access policies configured.
- [x] Global RLS and policy configuration verified.

### Authentication Testing

- [x] Unauthenticated access redirects to Admin Login.
- [x] Admin login successful.
- [x] Admin dashboard accessible after login.
- [x] Session persists after browser refresh.
- [x] Admin logout successful.
- [x] Protected route redirects after logout.
- [x] Authentication flow verified through browser testing.

### Pending Verification

- [ ] Public data access runtime testing after Public Viewer pages are implemented.
- [ ] Storage upload, download, update, and delete runtime testing after attachment functionality is implemented.

### Notes

- Access model: One Admin account and Public Viewer without login.
- No Guest account.
- Admin account management is handled through Supabase Dashboard.
- RLS configuration has been reviewed, but Public Viewer runtime access has not yet been tested.
- Storage policies have been reviewed, but actual file operations have not yet been tested.

### Git Commits

- `7c071c4` — feat: implement admin session and protected routes
- `52a2efc` — feat: implement admin logout



## Day 3 — Layout & Dashboard

### Structure & Design

- [x] Existing project structure and components reviewed.
- [x] Application layout direction defined.
- [x] Public Viewer layout direction defined.
- [x] Admin layout direction defined.
- [x] Chelsea FC color palette selected:
  - Blue: #034694
  - Red: #EE242C
  - Gold: #DBA111
  - Light Blue: #6A7AB5
  - Gray: #D1D3D4

### Public Viewer Layout

- [x] PublicLayout component created.
- [x] Public navigation bar implemented.
- [x] Public main content layout implemented.
- [x] Public footer implemented.
- [x] HomePage integrated with PublicLayout.
- [x] Overview section implemented.
- [x] Test Cases section placeholder implemented.
- [x] Bug Reports section placeholder implemented.

### Authentication & Layout Testing

- [x] Public homepage displayed successfully.
- [ ] Navigation links tested.
- [x] Admin login successful.
- [x] Admin dashboard accessible after login.
- [x] Admin logout successful.
- [x] Production build completed successfully.
- [x] ESLint passed.

### Pending Verification

- [ ] Public Viewer runtime data access testing after public data functionality is implemented.
- [ ] Mobile navigation responsiveness testing.
- [ ] Admin Layout and Sidebar implementation.
- [ ] Initial Dashboard implementation.

### Git Commits

- `5e928f6` — refactor: separate auth context and add public layout

## Current Progress

- [x] 3.1 Audit structure and components.
- [x] 3.2 Define application layout and design direction.
- [x] 3.3 Create Public Viewer Layout.
- [ ] 3.4 Create Admin Layout and Sidebar.
- [ ] 3.5 Initial Dashboard.
- [ ] 3.6 Testing, Development Log update, commit and push.

## Next Step

Proceed to Day 3 — Checkpoint 3.4: Admin Layout & Sidebar.
