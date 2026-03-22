# playwright-api-test-automation-framework
Automate API test cases using Test Automation Framework built using Playwright 

## Structure
```
api-test-framework/
│
├── config/
│   ├── env.ts
│   ├── playwright.config.ts
│   └── global-setup.ts
│
├── src/
│   ├── clients/           # HTTP client wrappers
│   ├── services/          # API business logic layer
│   ├── models/            # Request/Response types
│   ├── utils/             # Helpers (logger, data, etc.)
│   ├── auth/              # Token management
│   └── fixtures/          # Custom Playwright fixtures
│
├── tests/
│   ├── smoke/
│   ├── regression/
│   └── integration/
│
├── test-data/
│   ├── static/
│   └── dynamic/
│
├── reports/
├── logs/
├── package.json
└── tsconfig.json
|__ README.md
|__ playwright.config.ts
```
## Key Idea

clients/ → low-level HTTP calls (Playwright request API)
services/ → business-level abstraction (like “createUser”)
tests/ → only assertions, no raw API calls
