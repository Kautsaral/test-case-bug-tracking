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
- `19a67d9` — docs: complete day 2 development log

---

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

### Admin Layout

- [x] AuthContext separated into dedicated context and hook files.
- [x] AdminLayout component created.
- [x] Admin sidebar implemented using Chelsea Blue.
- [x] Admin topbar implemented.
- [x] Dashboard navigation integrated.
- [x] Responsive mobile sidebar drawer implemented.
- [x] Sidebar overlay and close interactions implemented.

### Initial Dashboard

- [x] Dashboard summary cards implemented.
- [x] Total Modules statistic integrated with Supabase.
- [x] Total Test Cases statistic integrated with Supabase.
- [x] Test Executions summary implemented.
- [x] Bug Reports summary implemented.
- [x] Release status summary implemented.
- [x] Recent Test Cases section implemented.
- [x] Recent Bug Reports section implemented.
- [x] Recent Releases section implemented.
- [x] Loading state implemented.
- [x] Error handling and retry action implemented.
- [x] Empty state for tables without records implemented.
- [x] Dashboard refresh action implemented.
- [x] Dashboard statistics use existing database schema and status constraints.

### Testing & Verification

- [x] Public homepage displayed successfully.
- [ ] Public navigation links tested.
- [x] Admin login successful.
- [x] Admin dashboard accessible after login.
- [x] Admin logout successful.
- [x] Admin Layout displayed successfully.
- [x] Admin mobile sidebar open and close interactions tested.
- [x] Initial Dashboard displayed successfully in browser.
- [x] Dashboard data retrieved successfully from Supabase.
- [x] Dashboard empty states displayed correctly.
- [x] Dashboard refresh interaction verified.
- [x] Production build completed successfully.
- [x] ESLint passed.

### Pending Verification

- [ ] Public Viewer runtime data access testing after public data functionality is implemented.
- [ ] Public navigation links testing.
- [ ] Dashboard and other feature-specific testing as their functionality is developed.

### Git Commits

- `5e928f6` — refactor: separate auth context and add public layout
- `61927c7` — feat: implement public and admin layouts
- `de9bce9` — docs: complete day 3 admin layout progress
- `07ca768` — feat: implement initial admin dashboard

## Current Progress

- [x] 3.1 Audit structure and components.
- [x] 3.2 Define application layout and design direction.
- [x] 3.3 Create Public Viewer Layout.
- [x] 3.4 Create Admin Layout and Sidebar.
- [x] 3.5 Initial Dashboard.
- [x] 3.6 Testing, Development Log update, commit and push.


## Day 4 — Module Management

### 4.1 Audit Structure & Requirements

#### Frontend Audit

- [x] Existing source structure reviewed.
- [x] Application routing reviewed.
- [x] AdminLayout and sidebar navigation reviewed.
- [x] Supabase client configuration reviewed.
- [x] Existing dashboard component and styling reviewed.

#### Database Audit

- [x] Modules table columns and data types reviewed.
- [x] Primary key and constraints reviewed.
- [x] Admin CRUD RLS policy reviewed.
- [x] Public read RLS policy reviewed.
- [x] Existing module data reviewed.
- [x] Test Cases foreign key relationship reviewed.
- [x] Modules indexes reviewed.

#### Database Findings

- Module names are case-insensitive unique through `unique_module_name_lower`.
- Published modules are indexed through `idx_modules_published`.
- Modules referenced by Test Cases cannot be deleted because the foreign key uses RESTRICT.
- New modules default to unpublished.
- Public users can only read published modules.
- No database schema or policy changes are required for the initial Module Management implementation.

### 4.1 Audit Result

- [x] Frontend audit completed.
- [x] Database audit completed.
- [x] Module Management implementation requirements identified.

### 4.2 Implement Module Management

#### Implementation

- [x] AdminModulesPage implemented for Module Management.
- [x] Protected `/admin/modules` route added.
- [x] Modules navigation added to the Admin sidebar.
- [x] Admin topbar title updates dynamically for the active page.
- [x] Create, Read, Update, and Delete module operations implemented.
- [x] Publish and Unpublish actions implemented.
- [x] Duplicate module name error (`23505`) handled with a clear message.
- [x] Foreign key restriction error (`23503`) handled with a clear message when deleting a module in use.
- [x] New modules are created as unpublished.
- [x] Database, RLS, Auth, Storage, and dependencies were not changed.

#### Testing & Verification

- [x] `npm run lint` passed.
- [x] `npm run build` passed (bundle size warning: JavaScript bundle exceeds 500 kB).
- [x] Browser access to the Modules page verified.
- [x] Create module verified.
- [x] Edit module verified.
- [x] Duplicate name handling verified.
- [x] Publish action verified.
- [x] Unpublish action verified.
- [x] Delete action verified.
- [x] Refresh and data persistence verified.
- [ ] Foreign Key Restriction verification pending: the RLS Test Module currently has no Test Cases (`total_test_cases = 0`). Testing will continue after Test Case Management is available.

### 4.2 Implementation Result

- [x] Module Management implementation completed.
- [x] Feature verification completed, except Foreign Key Restriction verification pending Test Case Management.

### Next Step

Proceed to Day 5–6: Test Case Management after confirmation.
