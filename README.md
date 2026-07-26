Framework Architecture: Real-Time Implementation Guide
Milestone Checklist
[x] Step 1: Project Initialization & Configuration

[x] Step 2: Service Layer (API Object Model)

[x] Step 3: Base Client & Logging Mechanics

[x] Step 4: Test Data Generators (Factories with Faker)

[x] Step 5: Full CRUD Operations & Assertions

[x] Step 6: JSON Schema Validation (AJV)

Step 1: Project Initialization & Configuration
What We Did:

We set up the core Node.js environment, installed Playwright, and established global defaults inside playwright.config.js.

Key Tasks:

Initialized Node.js project (npm init -y).

Installed @playwright/test and required dependencies.

Configured playwright.config.js with:

Base URL ([https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)).

Default HTTP request headers (Content-Type: application/json).

Execution timeouts and HTML reporter settings.

# Why: Gives every test execution a shared global base URL and headers without repeating configuration code in every test file.

Step 2: Service Layer (API Object Model)
What We Did:

We created src/api/services/UserService.js to decouple API endpoints and HTTP methods from actual test blocks using the API Object Model design pattern.

Key Tasks:

Created class UserService receiving Playwright's request context in its constructor.

Abstracted HTTP endpoints into reusable service methods:

getAllUsers() → GET /users

getUserById(id) → GET /users/:id

createUser(payload) → POST /users

patchupdateUser(id, payload) → PATCH /users/:id

deleteUser(id) → DELETE /users/:id

# Why: If an API endpoint changes, we only update it in UserService.js instead of updating hundreds of test files.

Step 3: Base Client & Logging Mechanics
What We Did:

We wired up request logging and response parsing directly into the service layer so that HTTP status codes, payloads, and execution logs are transparently handled.

Key Tasks:

Structured service methods to handle response parsing (response.json()) cleanly.

Formatted console outputs to display key response details (e.g., The total number of users: 10 or The user fetched by id: Leanne Graham).

Ensured status checks like expect(response.status()).toBe(200) utilize synchronous return values from Playwright's response context.

# Why: Speeds up debugging during test failures by surfacing immediate request/response metadata without cluttering the main assertion blocks.

Step 4: Test Data Generators (Factories with Faker)
What We Did:

We eliminated static, hardcoded payload files by building a dynamic payload generator using @faker-js/faker.

Key Tasks:

Installed @faker-js/faker.

Created src/data/factories/UserFactory.js.

Mapped JSON payload fields to synthetic Faker generators (faker.person.fullName(), faker.internet.email(), etc.).

Implemented the Spread Override pattern (...customData) to allow passing custom overrides on demand while defaulting to dynamic fake data.

# Why: Prevents test data collisions, keeps tests isolated, and allows seamless edge-case testing by overriding specific keys.

Step 5: Full CRUD Operations & Assertions
What We Did:

We built the complete End-to-End API lifecycle inside tests/getUser.spec.js using test.describe() and test.beforeEach().

Key Tasks:

Instantiated UserService inside test.beforeEach() for fresh execution state per test.

Implemented the 5 key lifecycle tests:

GET (List): Validates total users array length.

POST (Create): Generates dynamic factory payload, asserts 201 Created, and verifies payload match.

GET (Single): Fetches record by ID and verifies property presence (email, id).

PATCH (Update): Performs partial update with a targeted payload and asserts modification.

DELETE (Remove): Sends deletion request and verifies 200 OK status.

# Why: Validates full state transitions across the whole API resource lifecycle rather than testing endpoints in isolation.

Step 6: JSON Schema Validation (AJV)
What We Did:

We implemented contract testing with AJV (Another JSON Schema Validator) to validate the entire structure of the JSON payload automatically.

Key Tasks:

Installed ajv.

Created schema definition src/data/schemas/userSchema.js (defining required fields like id, name, email and their data types).

Built utility validator src/utils/schemaValidator.js.

Embedded automatic validation directly inside getUserById(id, schema) in UserService.js:

Automatically executes validateSchema(schema, body) whenever a schema is passed.

Returns { response, body } object directly to the test block.

Why: Replaces tedious line-by-line manual field assertions with a single, bulletproof contract check that catches backend data shape drift instantly.
