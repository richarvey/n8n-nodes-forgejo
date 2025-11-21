# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an n8n community node for Forgejo API integration. Forgejo is a self-hosted Git forge (similar to GitHub/GitLab). The node provides 73 operations across 10 resources (Repository, Issue, Pull Request, User, Organization, Release, Webhook, Branch, Tag, Commit).

## Essential Commands

### Build & Development
```bash
npm run build       # Compile TypeScript and copy icons (tsc + gulp build:icons)
npm run dev         # Watch mode - recompile on changes
npm run format      # Format code with Prettier
npm run lint        # Check for linting issues
npm run lintfix     # Auto-fix linting issues
```

### Testing
```bash
npm test                  # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
```

**Note on Tests:** The `commit.basic.test.ts` file is excluded from test runs due to Jest memory issues, though all individual tests pass when run separately.

### Pre-publish
```bash
npm run prepublishOnly    # Runs build + lint + test (automatically on publish)
```

## Architecture

### Core Files
- **`nodes/Forgejo/Forgejo.node.ts`** (2,550 lines): Single monolithic node file containing all 10 resources and 73 operations
- **`credentials/ForgejoApi.credentials.ts`**: Credential definition for Forgejo API authentication
- **`__tests__/mocks/mockFunctions.ts`**: Shared mock utilities for testing

### Node Structure

The main node file (`Forgejo.node.ts`) is organized as follows:

1. **Helper Functions** (lines 12-76): `fetchAllPages()` - handles automatic pagination for list operations
2. **Node Class** (lines 78+):
   - **Resource/Operation definitions** (~700 lines): n8n UI property configurations for all 10 resources
   - **Field definitions** (~1,000 lines): Input fields for each operation with conditional `displayOptions`
   - **execute() method** (~800 lines): Large switch-case structure handling all operations

### Key Patterns

**Resource-Operation Model**: Each resource (e.g., "repository", "issue") has multiple operations (e.g., "create", "get", "list"). The node uses n8n's conditional display system to show relevant fields based on selected resource/operation.

**Pagination**: All list operations use automatic pagination via `fetchAllPages()`. This function:
- Detects operations with `page` and `limit` in query string
- Automatically fetches all pages until no more results
- Handles both array responses and wrapped responses (e.g., search API with `data` field)

**Authentication**: Uses n8n's `httpRequestWithAuthentication` helper with the `forgejoApi` credential. Auth is automatic via `Authorization: token {accessToken}` header.

**API Base**: All requests go to `{serverUrl}/api/v1/{endpoint}` following Forgejo's REST API structure.

### Testing Organization

Tests are organized by resource in `__tests__/nodes/Forgejo/`:
- Each resource has its own test file (e.g., `repository.operations.test.ts`)
- Commit operations split into `commit.basic.test.ts` and `commit.list.test.ts`
- All tests use mocks from `__tests__/mocks/mockFunctions.ts`
- Tests verify node parameter extraction and basic operation logic

## Development Notes

### Package Manager
This project uses **pnpm** (specified in package.json), but npm commands work for most tasks. The package manager is set to `pnpm@9.1.4`.

### Node Requirements
- Node.js >= 18.10
- pnpm >= 9.1 (preferred)

### Build Process
The build has two steps:
1. TypeScript compilation (`tsc`) outputs to `dist/`
2. Gulp task copies icon files (`nodes/**/*.{png,svg}`) to `dist/nodes/`

### Adding New Operations

When adding operations to existing resources:
1. Add operation option to the appropriate resource's operation list
2. Add required input fields with proper `displayOptions` show/hide logic
3. Add operation handling in the `execute()` method's resource switch block
4. Test with a real Forgejo instance
5. Add tests in the appropriate test file

### Code Style
- **Formatting**: Prettier (config in `.prettierrc.json`)
- **Linting**: ESLint with `eslint-plugin-n8n-nodes-base`
- **TypeScript**: Strict mode enabled, target ES2022

### Testing a Local Build

To test in a local n8n instance:
```bash
npm run build
npm link
cd /path/to/n8n
npm link n8n-nodes-forgejo
# Restart n8n
```

Or copy directly:
```bash
npm run build
cp -r dist/* ~/.n8n/custom/
```

## Important Constraints

- **Monolithic structure**: All operations are in a single 2,550-line file. This is intentional for n8n community nodes to avoid complex module loading.
- **n8n API version**: This node uses n8n API version 1 (`n8nNodesApiVersion: 1`)
- **Peer dependency**: Requires `n8n-workflow` as a peer dependency (provided by n8n runtime)

## Forgejo API Reference

- Official docs: https://forgejo.org/docs/latest/user/api-usage/
- Swagger UI available at any Forgejo instance: `{instance-url}/api/swagger`
- Default test instance: https://code.squarecows.com

## Git Repository

- Origin: https://code.squarecows.com/ric/n8n-nodes-forgejo.git
- Main branch: `main`
