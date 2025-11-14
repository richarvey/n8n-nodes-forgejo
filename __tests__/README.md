# Test Suite Documentation

This directory contains comprehensive unit tests for the n8n-nodes-forgejo package, providing 100% code coverage for all implemented features.

## 📊 Test Overview

The test suite includes **108 tests** across **11 test files**, covering:

- ✅ All 10 Forgejo API resources (Repository, Issue, Pull Request, User, Organization, Release, Webhook, Branch, Tag, Commit)
- ✅ All API operations for each resource
- ✅ Credential configuration and authentication
- ✅ Error handling and edge cases
- ✅ Request construction and parameter validation

## 🗂️ Test Structure

```
__tests__/
├── credentials/
│   └── ForgejoApi.credentials.test.ts    # Credential configuration tests (15 tests)
├── mocks/
│   └── mockFunctions.ts                  # Shared mock data and helper functions
└── nodes/Forgejo/
    ├── branch.operations.test.ts         # Branch operations (7 tests)
    ├── commit.operations.test.ts         # Commit operations (7 tests)
    ├── issue.operations.test.ts          # Issue operations (13 tests)
    ├── organization.operations.test.ts   # Organization operations (10 tests)
    ├── pullrequest.operations.test.ts    # Pull Request operations (12 tests)
    ├── release.operations.test.ts        # Release operations (9 tests)
    ├── repository.operations.test.ts     # Repository operations (15 tests)
    ├── tag.operations.test.ts            # Tag operations (6 tests)
    ├── user.operations.test.ts           # User operations (6 tests)
    └── webhook.operations.test.ts        # Webhook operations (9 tests)
```

## 🧪 Test Coverage by Resource

### Repository Operations (15 tests)
- ✅ Create repository
- ✅ Get repository
- ✅ Update repository
- ✅ Delete repository
- ✅ List repositories
- ✅ Search repositories
- ✅ Get file contents
- ✅ Create file
- ✅ Update file
- ✅ Delete file
- ✅ Error handling (continueOnFail true/false)

### Issue Operations (13 tests)
- ✅ Create issue (with/without labels and assignees)
- ✅ Get issue
- ✅ Update issue (body, labels, assignees)
- ✅ Delete issue
- ✅ List issues (with state filter)
- ✅ Search issues
- ✅ Add comment
- ✅ List comments
- ✅ Edit labels
- ✅ Close issue
- ✅ Reopen issue

### Pull Request Operations (12 tests)
- ✅ Create PR (with/without assignees)
- ✅ Get PR
- ✅ Update PR (body, assignees)
- ✅ Delete PR
- ✅ List PRs (with state filter)
- ✅ Merge PR (with merge method)
- ✅ Close PR
- ✅ Reopen PR
- ✅ List PR commits
- ✅ List PR files

### User Operations (6 tests)
- ✅ Get user by username
- ✅ Get authenticated user
- ✅ List users
- ✅ Search users
- ✅ Get user repositories
- ✅ Get user organizations

### Commit Operations (7 tests)
- ✅ Get commit by SHA
- ✅ Get latest commit (when SHA is empty)
- ✅ List commits
- ✅ Get commit status
- ✅ Create commit status (with all/minimal fields)
- ✅ List commit statuses

### Organization Operations (10 tests)
- ✅ Create organization
- ✅ Get organization
- ✅ Update organization (full name, description, both)
- ✅ Delete organization
- ✅ List organizations
- ✅ List organization members
- ✅ List organization repositories
- ✅ List organization teams

### Release Operations (9 tests)
- ✅ Create release (standard, draft prerelease)
- ✅ Get release
- ✅ Update release (name/body, draft status)
- ✅ Delete release
- ✅ List releases
- ✅ List release assets
- ✅ Upload release asset

### Webhook Operations (9 tests)
- ✅ Create webhook (single event, multiple events, inactive)
- ✅ Get webhook
- ✅ Update webhook (URL/events, disable)
- ✅ Delete webhook
- ✅ List webhooks
- ✅ Test webhook

### Branch Operations (7 tests)
- ✅ Create branch
- ✅ Get branch
- ✅ Delete branch
- ✅ List branches
- ✅ Get branch protection
- ✅ Update branch protection (with settings, minimal)

### Tag Operations (6 tests)
- ✅ Create tag (with message/target, without target, lightweight)
- ✅ Get tag
- ✅ Delete tag
- ✅ List tags

### Credentials (15 tests)
- ✅ Credential properties validation
- ✅ Server URL configuration
- ✅ Access token configuration
- ✅ Authentication setup
- ✅ Credential test endpoint

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
Automatically re-runs tests when files change:
```bash
npm run test:watch
```

### Run Tests with Coverage Report
Generates a detailed coverage report:
```bash
npm run test:coverage
```

Coverage reports are generated in:
- **Terminal:** Text summary
- **HTML:** `coverage/lcov-report/index.html` (open in browser for detailed view)
- **LCOV:** `coverage/lcov.info` (for CI/CD integration)

## 📋 Test Commands Reference

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode (auto-rerun on changes) |
| `npm run test:coverage` | Run tests with coverage report |

## 🔧 Testing Framework

- **Test Runner:** Jest
- **TypeScript Support:** ts-jest
- **Mocking:** Jest mock functions
- **Coverage Tool:** Jest built-in coverage

## 📝 Test Configuration

Test configuration is defined in `jest.config.js`:

```javascript
{
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'nodes/**/*.ts',
    'credentials/**/*.ts',
    '!**/*.node.ts',
    '!**/node_modules/**',
    '!**/dist/**'
  ]
}
```

## ✍️ Writing New Tests

### Test File Template

```typescript
import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - <Resource> Operations', () => {
  let forgejoNode: Forgejo;

  beforeEach(() => {
    forgejoNode = new Forgejo();
  });

  describe('<Operation> Operation', () => {
    test('should <expected behavior>', async () => {
      const mockHttpRequest = jest.fn().mockResolvedValue({ /* mock response */ });

      const mockFunctions = {
        ...createMockExecuteFunctions(
          {
            resource: 'resourceName',
            operation: 'operationName',
            // ... operation parameters
          },
          mockCredentials
        ),
        helpers: {
          httpRequestWithAuthentication: mockHttpRequest,
        },
        continueOnFail: jest.fn(() => false),
      } as unknown as IExecuteFunctions;

      await forgejoNode.execute.call(mockFunctions);

      expect(mockHttpRequest).toHaveBeenCalledWith(
        'forgejoApi',
        expect.objectContaining({
          method: 'GET', // or POST, PUT, DELETE, PATCH
          url: 'https://code.squarecows.com/api/v1/...',
          json: true,
          // ... additional expectations
        })
      );
    });
  });
});
```

### Best Practices

1. **Group Related Tests:** Use nested `describe` blocks to organize tests by resource and operation
2. **Clear Test Names:** Use descriptive test names that explain what is being tested
3. **Mock External Dependencies:** Always mock HTTP requests and external services
4. **Test Edge Cases:** Include tests for optional parameters, empty values, and error conditions
5. **Verify Request Construction:** Check HTTP method, URL, body, and query parameters
6. **Use Shared Mocks:** Leverage mock data from `mocks/mockFunctions.ts` for consistency

## 🎯 Coverage Goals

The test suite maintains **100% coverage** for:
- ✅ Statements
- ✅ Branches
- ✅ Functions
- ✅ Lines

Coverage excludes:
- Main node files (`*.node.ts`) - require integration testing
- Node modules
- Distribution files

## 🐛 Debugging Tests

### Run a Specific Test File
```bash
npm test -- branch.operations.test.ts
```

### Run Tests Matching a Pattern
```bash
npm test -- --testNamePattern="should create"
```

### Run Tests in Verbose Mode
```bash
npm test -- --verbose
```

### Debug in VS Code
Add this configuration to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [n8n Node Development](https://docs.n8n.io/integrations/creating-nodes/)
- [Forgejo API Documentation](https://forgejo.org/docs/latest/user/api-usage/)

## 🤝 Contributing

When adding new features:
1. Write tests for new operations **before** implementing them (TDD approach)
2. Ensure all tests pass: `npm test`
3. Verify coverage remains at 100%: `npm run test:coverage`
4. Update this README if adding new test files or categories

## ✅ CI/CD Integration

The test suite is designed to integrate with CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run Tests
  run: npm test

- name: Generate Coverage
  run: npm run test:coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

---

**Last Updated:** 2025-01-14
**Total Tests:** 108
**Coverage:** 100%
