PRODUCT REQUIREMENTS DOCUMENT (PRD)
TEST CASE & BUG TRACKING WEB APP
Document Version: 1.2
Document Status: Final – Development Reference
Product Type: QA Management Tool & Portfolio Showcase
Frontend: React.js (Vite) + JavaScript
Backend: Supabase
Database: PostgreSQL
Deployment: Vercel
Testing: Playwright

1. PROJECT OVERVIEW
1.1 Executive Summary
Test Case & Bug Tracking Web App merupakan aplikasi web untuk mengelola proses Software Testing dan Bug Tracking secara terpusat.
Aplikasi memungkinkan QA Engineer mengelola test case, menjalankan pengujian, mencatat hasil eksekusi, melaporkan defect, memantau testing progress, dan menghasilkan laporan pengujian sebelum aplikasi dirilis.
Aplikasi juga memiliki fitur Public Demo Workspace yang memungkinkan pengunjung melihat sebagian data testing yang telah dipublikasikan sebagai showcase portfolio QA Engineer.
Aplikasi memiliki dua jenis akses:
Guest: Pengunjung tanpa autentikasi yang hanya memiliki akses read-only terhadap data publik.
QA/Admin: Pengguna terautentikasi yang memiliki akses untuk mengelola data dan menggunakan seluruh fitur aplikasi.
1.2 Project Objectives
Tujuan pengembangan aplikasi:
Menyediakan sistem manajemen Test Case.
Menyimpan riwayat Test Execution.
Mengelola Bug dan Defect.
Menyediakan dashboard untuk memantau hasil testing.
Menyediakan sistem pengelolaan Module.
Mempermudah proses dokumentasi testing.
Menyediakan fitur Export Excel.
Menghasilkan Release Report dalam format DOCX dan PDF.
Menjadi portfolio project yang dapat didemonstrasikan kepada recruiter atau perusahaan.
1.3 Product Scope
Versi pertama aplikasi menggunakan pendekatan single-project workspace.
Artinya, aplikasi berfokus pada satu project aplikasi utama terlebih dahulu, tetapi mendukung beberapa release/version dari aplikasi tersebut.
Fitur utama V1:
Landing Page.
Public Dashboard.
Authentication.
Module Management.
Test Case Management.
Test Execution Management.
Bug Tracking.
Bug Evidence Upload.
Excel Export.
Release Management.
Release Report Generator.
Public Data Publishing.

2. TECH STACK & ARCHITECTURE
2.1 Frontend
Technology
Purpose
React.js
UI development
Vite
Development server & build tool
JavaScript
Programming language
Tailwind CSS
Styling
Shadcn UI
UI components
React Router DOM
Routing
Recharts
Dashboard charts
React Hook Form
Form management
Zod
Form validation

2.2 Backend & Database
Technology
Purpose
Supabase
Backend as a Service
PostgreSQL
Relational database
Supabase Auth
Authentication
Supabase Storage
File storage
Row Level Security
Database access control
PostgreSQL Functions
Database operations
PostgreSQL Triggers
Automatic database processes

2.3 Additional Libraries
Library
Purpose
xlsx / ExcelJS
Excel export
@hello-pangea/dnd
Kanban drag-and-drop
DOCX generation library
Word document generation
PDF generation library
PDF generation
date-fns
Date formatting and calculation
Playwright
End-to-end testing

Library implementation can be adjusted when development begins, provided the functional requirements remain unchanged.
2.4 Deployment
GitHub: Source code repository.
Vercel: Application hosting.
Supabase: Backend infrastructure.
CI/CD: Automatic deployment through GitHub integration.
2.5 Application Architecture
The application uses the following architecture:
Frontend (React + Vite)
→ Supabase Client
→ Supabase Authentication
→ PostgreSQL Database
→ Supabase Storage
Database access is controlled through RLS policies.
Public and private data must be separated at the database access layer.

3. USER ROLES & ACCESS CONTROL
3.1 Guest
Guest is an unauthenticated visitor.
Guest can:
Access Landing Page.
Access Public Dashboard.
View published Module.
View published Test Cases.
View published Test Case Details.
View published Test Execution History.
View published Bug Reports.
View published Release Reports.
Use search and filters.
View testing statistics.
Guest cannot:
Create data.
Update data.
Delete data.
Upload attachments.
Access private evidence.
Access Admin Dashboard.
Access private records.
Change publication status.
Generate or export internal reports.
Guest access is strictly read-only.
3.2 QA/Admin
QA/Admin is an authenticated user.
QA/Admin can:
Login and logout.
Access Admin Dashboard.
Manage Module.
Manage Test Case.
Manage Test Execution.
Manage Bug Reports.
Manage Bug Evidence.
Manage Release.
Generate Release Report.
Export Excel.
Export DOCX and PDF.
Publish and unpublish showcase data.
3.3 Permission Matrix
Feature
Guest
QA/Admin
Landing Page
View
View
Public Dashboard
View
View
Module
Published Read
CRUD
Test Case
Published Read
CRUD
Test Execution
Published Read
CRUD
Bug Reports
Published Read
CRUD
Bug Attachments
No Access
Manage
Release Management
Published Read
CRUD
Excel Export
No Access
Export
DOCX/PDF Export
No Access
Generate
Publishing
No Access
Manage
Admin Dashboard
No Access
Access

3.4 Public Demo Workspace
Public Demo Workspace is a dedicated concept for showcasing testing data.
Rules:
Public data must be explicitly marked as published.
Private working data must remain inaccessible to Guest.
Publishing a Test Case does not automatically publish every related execution.
Publishing a Bug Report does not automatically expose private evidence.
Guest can only see executions that are explicitly published and associated with a published Test Case.
Guest can only see a published Bug Report.
Guest can only see a Release Report that has been published.
Unpublishing data must immediately revoke public read access through the database access layer.
For the first version, published records are selected manually by QA/Admin.

4. APPLICATION NAVIGATION & PAGE REQUIREMENTS
4.1 Public Navigation
Guest navigation:
Home
Dashboard
Test Cases
Test Executions
Bug Reports
Release Reports
Login
4.2 Admin Navigation
QA/Admin navigation:
Dashboard
Modules
Test Cases
Test Executions
Bug Tracking
Release Management
Settings
Logout
4.3 Page List
Page
Access
Landing Page
Public
Public Dashboard
Public
Public Test Cases
Public
Public Test Case Detail
Public
Public Execution History
Public
Public Bug Reports
Public
Public Release Reports
Public
Login
Public
Admin Dashboard
Protected
Module Management
Protected
Test Case Management
Protected
Test Case Form
Protected
Test Execution Management
Protected
Execution Form
Protected
Bug Management
Protected
Bug Form
Protected
Release Management
Protected
Release Detail
Protected
Release Report Preview
Protected
Settings
Protected


5. LANDING PAGE & PUBLIC DASHBOARD
5.1 Landing Page
Landing Page is the main entry point of the application.
Content:
Hero Section
Application name.
Short application description.
CTA to Explore Dashboard.
CTA to View Test Cases.
Feature Overview
Test Case Management.
Test Execution.
Bug Tracking.
Release Reporting.
Project Information
Application purpose.
Technology stack.
Brief project introduction.
Footer
Portfolio information.
Project information.
Relevant links.
5.2 Public Dashboard
Public Dashboard displays published testing information.
Dashboard Metrics
Total Published Test Cases.
Total Published Test Executions.
Passed.
Failed.
Blocked.
Untested.
Pass Rate.
Total Published Bugs.
Open Bugs.
Closed Bugs.
Charts
Test Execution Status Distribution.
Test Execution Trend.
Bug Status Distribution.
Bug Severity Distribution.
Recent Activity
Display recent published testing activities.
Only published data may be used for public statistics.
5.3 Admin Dashboard
Admin Dashboard displays the overall testing activities accessible to QA/Admin.
Metrics:
Total Test Cases.
Total Executions.
Passed.
Failed.
Blocked.
Untested.
Pass Rate.
Total Bugs.
Open Bugs.
In Progress Bugs.
Closed Bugs.
Active Releases.
Dashboard provides shortcuts to:
Create Test Case.
Create Test Execution.
Report Bug.
Create Release.
Generate Release Report.

6. MODULE MANAGEMENT
6.1 Purpose
Module Management is used to group Test Cases according to application features or components.
Examples:
Authentication.
User Management.
Dashboard.
Payment.
Reporting.
6.2 Module Fields
Field
Type
Required
ID
UUID
Yes
Name
Text
Yes
Description
Text
No
Is Published
Boolean
Yes
Created At
Timestamp
Yes
Updated At
Timestamp
Yes

6.3 Features
Create Module.
View Module.
Update Module.
Delete Module.
Search Module.
Publish / Unpublish Module.
6.4 Business Rules
Module name must not be empty.
Module name should be unique.
A Module can contain multiple Test Cases.
A Module that is referenced by Test Cases cannot be deleted without handling its dependent records.
Unpublished Module must not appear in Guest views.
A Module must be published before its Test Cases can be publicly displayed.

7. TEST CASE MANAGEMENT
7.1 Purpose
Test Case Management is used to create and maintain software testing scenarios.
7.2 Test Case Fields
Field
Type
Required
ID
UUID
Yes
Test Case Code
VARCHAR
Yes
Title
VARCHAR
Yes
Description
TEXT
No
Module ID
UUID
Yes
Priority
VARCHAR
Yes
Pre-conditions
TEXT
No
Steps
TEXT
Yes
Expected Result
TEXT
Yes
User ID
UUID
Yes
Is Published
BOOLEAN
Yes
Created At
TIMESTAMP
Yes
Updated At
TIMESTAMP
Yes

7.3 Priority
Available priorities:
Low.
Medium.
High.
Critical.
7.4 Test Case ID
Test Case ID is generated automatically by the database.
Example:
TC-000001.
TC-000002.
TC-000003.
Requirements:
ID must be unique.
ID cannot be manually duplicated.
ID generation must be safe for concurrent requests.
Deleted IDs must not be reused.
7.5 Features
Create Test Case.
View Test Case.
Update Test Case.
Delete Test Case.
Search Test Case.
Filter by Module.
Filter by Priority.
Sort Test Cases.
View Test Case Details.
Publish / Unpublish Test Case.
7.6 Business Rules
Title is mandatory.
Module is mandatory.
Priority is mandatory.
Test Steps are mandatory.
Expected Result is mandatory.
Test Case must have a valid Module.
Deletion must consider Execution and Bug relationships.
A Test Case with historical executions should preferably be archived rather than physically deleted.
Updating a Test Case must not modify historical execution results.
Unpublished Test Cases are not accessible to Guest.
7.7 Test Case Status
Test Case itself does not store Passed, Failed, Blocked, or Untested as a permanent status.
Testing results are stored in Test Execution.
Untested means the Test Case has no applicable execution for the selected release.

8. TEST EXECUTION MANAGEMENT
8.1 Purpose
Test Execution records the actual result of running a Test Case.
One Test Case can have multiple executions.
8.2 Execution Fields
Field
Type
Required
ID
UUID
Yes
Test Case ID
UUID
Yes
Release ID
UUID
Yes
Status
VARCHAR
Yes
Actual Result
TEXT
Yes
Execution Notes
TEXT
No
Executed By
UUID
Yes
Executed At
TIMESTAMP
Yes
Created At
TIMESTAMP
Yes

8.3 Execution Status
Passed.
Failed.
Blocked.
Untested is a derived state, not a manually submitted execution status.
8.4 Features
Create Execution.
View Execution.
Update Execution.
View Execution History.
Filter by Status.
Filter by Release.
Filter by Test Case.
Filter by Execution Date.
Search Execution.
8.5 Execution Workflow
QA selects a Release.
QA selects a Test Case included in that Release.
QA executes the test scenario.
QA records the Actual Result.
QA selects the execution status.
QA saves the execution.
System records the execution date and user.
System updates dashboard statistics.
8.6 Business Rules
Every execution must reference an existing Test Case.
Every execution must belong to a Release.
The Test Case must be included in the selected Release scope.
Execution history must be preserved.
Updating an execution must not delete other execution history.
Execution must not automatically create a Bug Report.
A Failed execution may provide a shortcut to create a linked Bug Report.
A Test Case can be executed multiple times within one Release.
The latest execution is used for the current result summary.
All executions remain available in history.

9. BUG / DEFECT TRACKING
9.1 Purpose
Bug Tracking manages defects discovered during software testing.
9.2 Bug Fields
Field
Type
Required
ID
UUID
Yes
Bug Code
VARCHAR
Yes
Title
VARCHAR
Yes
Description
TEXT
Yes
Test Case ID
UUID
No
Environment
VARCHAR
Yes
Steps to Reproduce
TEXT
Yes
Expected Result
TEXT
Yes
Actual Result
TEXT
Yes
Severity
VARCHAR
Yes
Status
VARCHAR
Yes
Reporter ID
UUID
Yes
Assigned To
UUID
No
Resolution
TEXT
No
Is Published
BOOLEAN
Yes
Created At
TIMESTAMP
Yes
Updated At
TIMESTAMP
Yes

9.3 Bug ID
Automatically generated by the database.
Example:
BUG-000001.
BUG-000002.
BUG-000003.
Bug ID must be unique and cannot be reused.
9.4 Severity
Blocker.
Critical.
Major.
Minor.
9.5 Bug Status
Open.
In Progress.
Ready for Retest.
Closed.
9.6 Bug Features
Create Bug Report.
View Bug Report.
Update Bug Report.
Delete Bug Report.
Search Bug.
Filter by Severity.
Filter by Status.
Filter by Environment.
Link Bug to Test Case.
Upload Evidence.
Publish / Unpublish Bug.
Kanban Board.
9.7 Kanban Board
Columns:
Open.
In Progress.
Ready for Retest.
Closed.
Drag-and-drop updates the bug status.
The update must be persisted to the database.
9.8 Business Rules
Bug Title is mandatory.
Description is mandatory.
Environment is mandatory.
Steps to Reproduce are mandatory.
Expected and Actual Result are mandatory.
Severity is mandatory.
Initial status is Open.
Linked Test Case is optional.
Linked Test Case must exist if provided.
Closing a Bug should include resolution information.
Changing Bug status must update Updated At.
Guest cannot modify Bug status.
Guest cannot access private evidence.
9.9 Bug Evidence & Attachments
Supported file types:
PNG.
JPG.
JPEG.
WEBP.
MP4.
File restrictions:
Maximum file size must be configurable.
MIME type must be validated.
File path is stored in PostgreSQL.
Actual file is stored in Supabase Storage.
Storage bucket must be private.
File access requires authentication and authorization.
Signed URLs may be used for authorized file access.
Guest must never receive access to private attachments.

10. RELEASE MANAGEMENT
10.1 Purpose
Release Management groups testing activities according to application release/version.
This feature ensures that testing metrics are not mixed between different releases.
10.2 Release Fields
Field
Type
Required
ID
UUID
Yes
Application Name
VARCHAR
Yes
Version
VARCHAR
Yes
Release Date
DATE
Yes
Environment
VARCHAR
Yes
Testing Start Date
DATE
Yes
Testing End Date
DATE
Yes
Prepared By
UUID
Yes
Conclusion
TEXT
No
Recommendation
VARCHAR
No
Is Published
BOOLEAN
Yes
Created At
TIMESTAMP
Yes
Updated At
TIMESTAMP
Yes

10.3 Release Features
Create Release.
View Release.
Update Release.
Delete Release.
View Release Details.
Manage Test Case Scope.
View Testing Metrics.
Generate Release Report.
Publish / Unpublish Release.
10.4 Release Scope
Every Release must have a list of Test Cases included in its testing scope.
Example:
Release 1.0:
TC-000001.
TC-000002.
TC-000003.
Release 1.1:
TC-000001.
TC-000003.
TC-000004.
The relationship is managed through the release_test_cases table.
Business rules:
One Release can contain multiple Test Cases.
One Test Case can belong to multiple Releases.
A Test Case cannot be executed in a Release unless it is included in that Release scope.
Removing a Test Case from scope must not delete historical executions.
Release metrics must be based on the selected Release scope.
10.5 Release Lifecycle
Proposed release lifecycle:
Draft.
Testing.
Completed.
Published.
Archived.
Status changes must follow the defined release workflow.
A published Release Report should retain its generated document and historical snapshot even if source Test Cases are subsequently updated.

11. RELEASE REPORT GENERATOR
11.1 Purpose
Release Report Generator creates professional testing documentation.
Generation uses a hybrid method:
Automatic Metrics + Manual QA Input.
11.2 Manual Inputs
QA provides:
Application Name.
Release Version.
Release Date.
Environment.
Testing Period.
Prepared By.
Testing Conclusion.
Release Recommendation.
Known Issues.
Additional Notes.
11.3 Automatic Metrics
System retrieves:
Total Test Cases in Release Scope.
Total Executed Test Cases.
Passed.
Failed.
Blocked.
Untested.
Pass Rate.
Total Bugs.
Open Bugs.
In Progress Bugs.
Ready for Retest Bugs.
Closed Bugs.
Bugs by Severity.
11.4 Metric Calculation Rules
For the selected Release:
Total Test Cases = Number of Test Cases in Release Scope.
Latest Execution = The most recent execution of a Test Case within that Release.
Executed Test Cases = Test Cases with at least one execution.
Passed = Test Cases whose latest execution is Passed.
Failed = Test Cases whose latest execution is Failed.
Blocked = Test Cases whose latest execution is Blocked.
Untested = Test Cases without any execution.
Pass Rate = Passed / Executed Test Cases × 100%.
If no Test Cases have been executed, Pass Rate is displayed as 0% or N/A, according to the report presentation rule.
Important:
Historical executions must not be counted as separate test cases.
The latest execution determines the current result summary.
Full execution history remains accessible.
Bug metrics must be scoped to the selected Release, using explicit release association or the linked Test Case's membership in the release scope.
Bugs must not be double-counted when multiple relationships exist.
11.5 Release Recommendation
Available values:
Ready
Testing meets the release acceptance criteria.
No unresolved release-blocking issues remain.
QA recommends release.
Not Ready
Critical issues or unacceptable testing risks remain.
Release is not recommended.
Conditional
Release may proceed subject to documented risks, limitations, or approvals.
The system may display warnings based on metrics, but QA is responsible for entering the final recommendation.
The system must not automatically claim that software is safe to release merely because its Pass Rate is high.
11.6 Report Structure
Cover Page.
Release Information.
Executive Summary.
Testing Scope.
Test Execution Summary.
Test Result Statistics.
Bug Summary.
Bug Severity Distribution.
Known Issues.
Testing Conclusion.
Release Recommendation.
QA Sign-off.
11.7 Document Preview
Before export, QA can:
Preview the document.
Verify release information.
Verify metrics.
Edit manual conclusions.
Review known issues.
Generate DOCX.
Generate PDF.
11.8 Export Format
DOCX:
Editable Word document.
Professional report layout.
Structured headings and tables.
PDF:
Fixed layout.
Suitable for final documentation.
Consistent formatting.
11.9 Historical Snapshot
Generated reports must preserve the metrics and conclusions used at the time of generation.
Changes to Test Cases, Executions, or Bugs after report generation must not silently alter an existing report.
A new report generation creates a new report record.
11.10 Publishing
Only QA/Admin can publish a Release Report.
Guest can view and download only reports that have been explicitly published.
Private release reports remain inaccessible to Guest.

12. EXCEL EXPORT
12.1 Purpose
Allow QA/Admin to export testing data into Excel format.
12.2 Export All
The generated workbook contains two sheets.
Sheet 1: Test Cases
Columns:
Test Case ID.
Title.
Module.
Priority.
Pre-conditions.
Steps.
Expected Result.
Created At.
Sheet 2: Bug Reports
Columns:
Bug ID.
Title.
Linked Test Case.
Environment.
Severity.
Status.
Steps to Reproduce.
Expected Result.
Actual Result.
Created At.
12.3 Export Rules
Export is available to authenticated QA/Admin.
Export includes all authorized records.
Guest cannot export internal data.
Export must respect filters when the user chooses filtered export.
Default Export All includes all records accessible to the user.
File name should include export type and generation date.
Excel columns should have readable headers.
Date values must use consistent formatting.

13. DATABASE DESIGN
13.1 General Database Rules
Primary keys use UUID.
Foreign keys enforce relationships.
Created At and Updated At are maintained consistently.
Unique constraints prevent duplicate identifiers.
Check constraints validate enumerated statuses.
Indexes are added for frequently filtered fields.
Delete behavior must preserve historical data.
Database operations must be safe under concurrent requests.
13.2 Database Tables
A. profiles
Column
Type
Constraint
id
UUID
PK, FK auth.users
full_name
VARCHAR
NOT NULL
role
VARCHAR
NOT NULL
created_at
TIMESTAMP
DEFAULT NOW()
updated_at
TIMESTAMP
DEFAULT NOW()

V1 role: Admin.
B. modules
Column
Type
Constraint
id
UUID
PK
name
VARCHAR
NOT NULL
description
TEXT
NULL
is_published
BOOLEAN
DEFAULT FALSE
created_at
TIMESTAMP
DEFAULT NOW()
updated_at
TIMESTAMP
DEFAULT NOW()

C. test_cases
Column
Type
Constraint
id
UUID
PK
tc_code
VARCHAR
UNIQUE, NOT NULL
title
VARCHAR
NOT NULL
description
TEXT
NULL
module_id
UUID
FK modules.id
priority
VARCHAR
CHECK constraint
pre_conditions
TEXT
NULL
steps
TEXT
NOT NULL
expected_result
TEXT
NOT NULL
user_id
UUID
FK auth.users
is_published
BOOLEAN
DEFAULT FALSE
created_at
TIMESTAMP
DEFAULT NOW()
updated_at
TIMESTAMP
DEFAULT NOW()

D. releases
Column
Type
Constraint
id
UUID
PK
application_name
VARCHAR
NOT NULL
version
VARCHAR
NOT NULL
release_date
DATE
NOT NULL
environment
VARCHAR
NOT NULL
testing_start_date
DATE
NOT NULL
testing_end_date
DATE
NOT NULL
prepared_by
UUID
FK auth.users
conclusion
TEXT
NULL
recommendation
VARCHAR
NULL
status
VARCHAR
NOT NULL
is_published
BOOLEAN
DEFAULT FALSE
created_at
TIMESTAMP
DEFAULT NOW()
updated_at
TIMESTAMP
DEFAULT NOW()

E. release_test_cases
Junction table for Release and Test Case relationships.
Column
Type
Constraint
id
UUID
PK
release_id
UUID
FK releases.id
test_case_id
UUID
FK test_cases.id
created_at
TIMESTAMP
DEFAULT NOW()

Unique constraint:
release_id + test_case_id.
F. test_executions
Column
Type
Constraint
id
UUID
PK
test_case_id
UUID
FK test_cases.id
release_id
UUID
FK releases.id
status
VARCHAR
CHECK constraint
actual_result
TEXT
NOT NULL
execution_notes
TEXT
NULL
executed_by
UUID
FK auth.users
executed_at
TIMESTAMP
DEFAULT NOW()
created_at
TIMESTAMP
DEFAULT NOW()
updated_at
TIMESTAMP
DEFAULT NOW()

G. bugs
Column
Type
Constraint
id
UUID
PK
bug_code
VARCHAR
UNIQUE, NOT NULL
title
VARCHAR
NOT NULL
description
TEXT
NOT NULL
test_case_id
UUID
FK test_cases.id, NULL
release_id
UUID
FK releases.id, NULL
environment
VARCHAR
NOT NULL
steps_to_reproduce
TEXT
NOT NULL
expected_result
TEXT
NOT NULL
actual_result
TEXT
NOT NULL
severity
VARCHAR
CHECK constraint
status
VARCHAR
CHECK constraint
reporter_id
UUID
FK auth.users
assigned_to
UUID
FK profiles.id, NULL
resolution
TEXT
NULL
is_published
BOOLEAN
DEFAULT FALSE
created_at
TIMESTAMP
DEFAULT NOW()
updated_at
TIMESTAMP
DEFAULT NOW()

H. bug_attachments
Column
Type
Constraint
id
UUID
PK
bug_id
UUID
FK bugs.id
file_path
TEXT
NOT NULL
original_filename
VARCHAR
NOT NULL
mime_type
VARCHAR
NOT NULL
file_size
BIGINT
NOT NULL
uploaded_by
UUID
FK auth.users
uploaded_at
TIMESTAMP
DEFAULT NOW()

I. release_reports
Column
Type
Constraint
id
UUID
PK
release_id
UUID
FK releases.id
format
VARCHAR
DOCX / PDF
file_path
TEXT
NOT NULL
generated_by
UUID
FK auth.users
metrics_snapshot
JSONB
NOT NULL
report_version
INTEGER
NOT NULL
is_published
BOOLEAN
DEFAULT FALSE
generated_at
TIMESTAMP
DEFAULT NOW()

The snapshot stores the metric values and relevant report data at generation time.
13.3 Database Relationships
One Module has many Test Cases.
One Test Case belongs to one Module.
One Test Case can belong to many Releases.
One Release can contain many Test Cases.
One Test Case can have many Test Executions.
One Release can have many Test Executions.
One Test Case can have many Bug Reports.
One Bug Report can have many Attachments.
One Release can have many Bug Reports.
One Release can have many Release Reports.
One Profile can create many Test Cases.
One Profile can execute many Test Cases.
One Profile can report many Bugs.
13.4 Relationship Diagram
profiles -> test_cases -> modules
test_cases <-> release_test_cases <-> releases
test_cases -> test_executions <- releases
test_cases -> bugs <- releases
bugs -> bug_attachments
releases -> release_reports
13.5 Database Integrity Rules
UUID is used as the primary identifier.
TC Code and Bug Code must be unique.
IDs are generated by database functions or sequences.
Foreign key constraints must be enforced.
Historical executions cannot be deleted accidentally when a Test Case is modified.
Deleting a Module that is still referenced by Test Cases is restricted.
Release records with historical executions should be archived rather than deleted.
Bug deletion must account for attachments and storage objects.
Storage cleanup must be handled safely.
Published status must be checked in public data policies.
Every execution must reference a Test Case included in the selected Release.
Release Report snapshots must preserve historical report values.
Final physical schema, indexes, triggers, functions, and delete policies will be reviewed during the Database Design milestone before SQL migrations are executed.

14. SECURITY & ROW LEVEL SECURITY
14.1 Authentication
Supabase Authentication handles login and session management.
Only authorized users can access protected pages.
14.2 Authorization
The application must distinguish:
Anonymous users.
Authenticated Admin users.
Frontend route protection is required for user experience, but is not a substitute for database authorization.
14.3 RLS Policies
Public access:
SELECT only for explicitly published records.
No INSERT.
No UPDATE.
No DELETE.
No access to private attachments.
Authenticated Admin:
SELECT authorized records.
INSERT authorized records.
UPDATE authorized records.
DELETE authorized records when permitted.
Upload and manage evidence.
Manage publication.
14.4 Storage Security
Evidence bucket must be private.
File upload requires authentication.
File retrieval requires authorization.
Signed URL access must be temporary.
Guest cannot access private bug evidence.
14.5 General Security
Never expose Supabase Service Role Key in frontend.
Validate data before database insertion.
Use database constraints in addition to frontend validation.
Validate file MIME types and sizes.
Prevent unauthorized role escalation.
Protect public views from exposing private fields.
Avoid exposing sensitive user information in public queries.

15. BUSINESS RULES & EDGE CASES
15.1 Test Case
A Test Case can be updated without modifying existing Execution history.
Deletion should be restricted if historical references exist.
An archived Test Case should remain available for historical reporting.
Changing Module must not change historical execution results.
15.2 Test Execution
Multiple executions are allowed.
Latest execution determines current status.
Previous execution records remain available.
Execution must belong to a valid Release.
Execution cannot reference a Test Case outside Release scope.
Editing an old execution must not silently change unrelated records.
15.3 Bug Tracking
Linked Test Case is optional.
Linked Test Case deletion must not accidentally remove Bug history.
Closing a Bug requires a resolution or documented closing reason.
Drag-and-drop must handle failed database updates.
Duplicate bug codes must be prevented.
15.4 Public Data
Unpublished records are invisible to Guest.
Unpublishing must revoke public access.
Related data must not bypass publication rules.
Public charts must not include private records.
Public search must only search published records.
15.5 Release Management
Release scope must be explicitly defined.
Test Executions must reference a Release.
Metrics must use the selected Release scope.
Report snapshots must not change after generation.
Unpublishing a report must remove its public accessibility.
A Release with historical executions should not be physically deleted.
15.6 File Upload
Invalid file type must be rejected.
Oversized files must be rejected.
Failed upload must not leave incorrect attachment metadata.
Deleting attachment metadata must trigger safe storage cleanup.
Private evidence must not become publicly accessible through permanent URLs.

16. NON-FUNCTIONAL REQUIREMENTS
16.1 Performance
Dashboard should load efficiently.
Large tables must support pagination.
Search and filters should not require loading every record into frontend memory.
Database indexes should support common queries.
File uploads should provide loading and error feedback.
16.2 Usability
Forms must have clear labels.
Validation messages must be understandable.
Destructive actions must require confirmation.
Loading, success, and error states must be visible.
Empty states must provide useful guidance.
16.3 Responsiveness
Application must support:
Desktop.
Tablet.
Mobile.
Desktop is the primary development and usage target.
16.4 Maintainability
Components should be reusable.
API and database operations should be separated from UI components.
Code should use consistent naming.
Database changes should be managed through migrations.
Environment variables must be managed securely.
Git commits should be organized by milestone or feature.

17. UI/UX DESIGN SYSTEM
17.1 Design Direction
Modern Minimalist Light Theme.
Design characteristics:
White background.
Light gray surfaces.
Blue accent color.
Clean typography.
Consistent spacing.
Subtle borders.
Rounded components.
Clear status badges.
Professional dashboard.
17.2 Navigation
Sidebar for authenticated users.
Top navigation for public pages.
17.3 Component Standards
Reusable components:
Button.
Input.
Select.
Textarea.
Dialog.
Confirmation Modal.
Data Table.
Pagination.
Search Bar.
Filter Dropdown.
Status Badge.
Priority Badge.
Severity Badge.
KPI Card.
Chart Card.
File Upload.
Empty State.
Loading State.
Toast Notification.
17.4 Status Color Semantics
Use consistent visual indicators for:
Passed.
Failed.
Blocked.
Untested.
Open.
In Progress.
Ready for Retest.
Closed.
Color must always be accompanied by readable text labels.

18. VALIDATION & ACCEPTANCE CRITERIA
Every feature must meet its acceptance criteria before being considered complete.
18.1 Authentication
Guest can access public pages.
Guest cannot access protected pages.
Admin can log in successfully.
Admin can log out.
Expired sessions are handled correctly.
Unauthorized users cannot perform protected database operations.
18.2 Module Management
Admin can create Module.
Admin can view Module.
Admin can update Module.
Admin can delete an unused Module.
Duplicate Module names are rejected.
Guest only sees published Modules.
18.3 Test Case Management
Admin can create Test Case.
Test Case ID is generated automatically.
Required fields are validated.
Admin can update Test Case.
Admin can delete or archive eligible Test Cases.
Search and filters work correctly.
Guest only sees published Test Cases.
18.4 Test Execution
Admin can execute a Test Case.
Execution requires a valid Release.
Test Case must belong to Release scope.
Execution status is saved correctly.
Multiple executions are supported.
History is preserved.
Latest execution determines current result.
Guest only sees published execution records associated with published Test Cases.
18.5 Bug Tracking
Admin can create Bug Report.
Bug ID is generated automatically.
Required fields are validated.
Admin can update Bug Report.
Admin can change Bug status.
Kanban updates persist to the database.
Linked Test Case works correctly.
Guest only sees published Bugs.
18.6 Evidence
Admin can upload supported file types.
Invalid files are rejected.
File size restrictions work.
Uploaded files can be retrieved by authorized users.
Guest cannot access private evidence.
18.7 Dashboard
Metrics match database records.
Private records are excluded from public metrics.
Release filters work correctly.
Charts reflect the selected dataset.
Empty datasets do not cause rendering errors.
18.8 Excel Export
Workbook is generated successfully.
Workbook contains two sheets.
Test Case data is correct.
Bug Report data is correct.
Export respects the selected scope and filters.
Unauthorized users cannot export private data.
18.9 Release Report
QA can create Release.
QA can define Release scope.
Execution metrics are calculated correctly.
Manual information can be entered.
Report preview displays the correct information.
DOCX generation works.
PDF generation works.
Historical snapshot is preserved.
Guest can only access published reports.
18.10 Security
Guest cannot access private data through direct API requests.
Guest cannot perform unauthorized database writes.
RLS policies are verified independently.
Storage access is protected.
Role escalation is prevented.
Public data queries do not expose private fields.

19. TESTING STRATEGY
19.1 Functional Testing
Manual verification of all primary workflows.
19.2 API & Database Testing
Verify:
CRUD operations.
Relationships.
Database constraints.
Generated identifiers.
Data validation.
Error handling.
19.3 Authorization Testing
Verify:
Guest permissions.
Admin permissions.
RLS enforcement.
Private data isolation.
Storage access restrictions.
19.4 End-to-End Testing
Playwright will be used for:
Authentication.
Navigation.
Module CRUD.
Test Case CRUD.
Test Execution.
Bug Tracking.
File Upload.
Excel Export.
Release Report Generation.
Public Data Access.
19.5 Regression Testing
After changes to an existing feature, related workflows must be retested.

20. IMPLEMENTATION ROADMAP
Development will follow milestone-based implementation.
Each milestone must pass its checkpoint before the next milestone begins.
MILESTONE 1 — Requirement & Database Design
Tasks:
Finalize PRD.
Design ERD.
Define database columns.
Define relationships.
Define constraints.
Define indexes.
Define PostgreSQL functions.
Define RLS policies.
Define public/private data handling.
Checkpoint:
ERD approved.
Schema approved.
RLS design approved.
MILESTONE 2 — Project Setup
Tasks:
Initialize Vite.
Configure React.
Install Tailwind CSS.
Configure Shadcn UI.
Configure React Router.
Setup Supabase.
Setup GitHub.
Checkpoint:
Application runs locally.
Supabase connection works.
Initial UI structure is ready.
MILESTONE 3 — Authentication & Authorization
Tasks:
Login.
Logout.
Session handling.
Protected routes.
Public routes.
RLS implementation.
Checkpoint:
Guest and Admin permissions work correctly.
MILESTONE 4 — Module Management
Tasks:
Module CRUD.
Search.
Validation.
Publication control.
Checkpoint:
Module management works correctly.
MILESTONE 5 — Test Case Management
Tasks:
Test Case CRUD.
Auto-generated TC ID.
Search.
Filters.
Detail page.
Publication control.
Checkpoint:
Test Case management works correctly.
MILESTONE 6 — Test Execution
Tasks:
Execution form.
Execution CRUD.
Release association.
Execution history.
Latest result calculation.
Checkpoint:
Multiple executions work correctly.
History is preserved.
MILESTONE 7 — Bug Tracking
Tasks:
Bug CRUD.
Auto-generated Bug ID.
Kanban Board.
Status updates.
Linked Test Case.
Evidence upload.
Storage security.
Checkpoint:
Bug workflow works correctly.
Evidence access is protected.
MILESTONE 8 — Dashboard & Excel Export
Tasks:
Admin Dashboard.
Public Dashboard.
KPI metrics.
Charts.
Search and filters.
Excel Export.
Checkpoint:
Dashboard metrics match database calculations.
Excel contains correct data.
MILESTONE 9 — Release Management
Tasks:
Create Release.
Manage Release Scope.
Release detail.
Automatic metrics.
Manual QA inputs.
Release preview.
DOCX export.
PDF export.
Report snapshot.
Publishing.
Checkpoint:
Report metrics are correct.
DOCX/PDF files are valid.
Published reports are publicly accessible only when authorized.
MILESTONE 10 — Final Testing & Deployment
Tasks:
Full regression testing.
Playwright automation.
RLS testing.
Responsive testing.
Bug fixing.
Production configuration.
Vercel deployment.
Final smoke testing.
Checkpoint:
All critical acceptance criteria pass.
Application is deployed.
Public and private access behave correctly.

21. DEFINITION OF DONE
A feature is considered complete only when:
UI is implemented.
Functional requirements are satisfied.
Form validation works.
Database integration works.
Authorization is verified.
Error handling is implemented.
Loading and empty states are implemented.
Related regression tests pass.
No known critical defect remains.
Changes are committed to Git.
A milestone is complete only after its checkpoint is approved.

22. OUT OF SCOPE — FUTURE ENHANCEMENTS
The following features are excluded from V1:
Multi-project management.
Test Suite Management.
Test Plan Management.
Multiple QA roles and permission levels.
Team collaboration.
Comments.
Audit Logs.
Notifications.
Email integration.
Automated test result imports.
CI/CD integration.
API integrations.
Advanced analytics.
Scheduled release reports.
These features may be considered for future versions.

23. FINAL PROJECT DECISIONS
The following decisions are established for V1:
Topic
Final Decision
Product
Test Case & Bug Tracking Web App
Product Scope
Single-project workspace
Frontend
React + Vite + JavaScript
Styling
Tailwind + Shadcn UI
Backend
Supabase
Database
PostgreSQL
Authentication
Supabase Auth
Storage
Supabase Storage
Deployment
Vercel
Guest
Public read-only showcase
Admin
Full management access
Public Data
Explicitly published records
Test Case Status
Derived from Test Execution
Execution History
Preserved
Release Scope
Explicit Test Case selection
Bug Tracking
Kanban Board
Evidence
Private Storage
Excel Export
Two-sheet workbook
Release Generator
Hybrid Automatic + Manual
Release Formats
DOCX + PDF
Report Snapshot
Preserved
Automated Testing
Playwright
Development Style
Milestone and checkpoint-based


24. DEVELOPMENT PRINCIPLES
The following principles must be followed throughout development:
PRD is the primary functional reference.
Do not add major features outside the agreed scope without discussing them first.
Complete one milestone before moving to the next.
Database design must be approved before implementation.
Security must be implemented at the database level.
Do not sacrifice data integrity for simpler frontend implementation.
Preserve historical testing records.
Use reusable and maintainable components.
Every important workflow must be tested.
Changes to existing architecture must be evaluated before implementation.
When a requirement is unclear, clarify it before coding rather than making assumptions that could affect existing architecture.

25. PROJECT STATUS
Document: PRD V1.2
Status: Final Development Reference
Current Milestone: Milestone 1 – Requirement & Database Design
Next Deliverable: Final Entity Relationship Diagram (ERD) and Database Schema Specification.
PROJECT GOAL:
Build a lightweight, professional QA Management Tool that supports Test Case Management, Test Execution, Bug Tracking, and Release Reporting while simultaneously serving as a public portfolio showcase for QA Engineering experience.
END OF DOCUMENT

