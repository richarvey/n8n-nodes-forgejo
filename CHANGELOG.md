# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.6] - 2025-11-22

### Fixed
- **Critical fix for n8n verification**: Updated `n8n` section in package.json to point to source TypeScript files in repository instead of compiled dist files
  - Credentials path: `credentials/ForgejoApi.credentials.ts` (was `dist/credentials/ForgejoApi.credentials.js`)
  - Nodes path: `nodes/Forgejo/Forgejo.node.js` (was `dist/nodes/Forgejo/Forgejo.node.js`)
  - This allows n8n verification system to find credential files in the git repository while npm package still contains compiled code

## [0.1.5] - 2025-11-22

### Fixed
- Updated lint scripts to use directory-based format (`eslint nodes credentials --ext .ts`) instead of glob patterns for better compatibility with n8n verification system

## [0.1.4] - 2025-11-22

### Fixed
- Repository URL format in package.json to use `git+https://` prefix for better compatibility with n8n community package verification system

## [0.1.3] - 2025-11-21

### Added
- Credential icon support for n8n community package submission
  - Added `forgejo.svg` icon to credentials folder
  - Configured `icon` property in `ForgejoApi.credentials.ts` to display Forgejo logo in n8n credential UI
  - Updated build process (gulpfile.js) to copy credential icons to dist folder
  - Package now passes all n8n community package scanner checks

## [0.1.2] - 2025-11-21

### Changed
- **Improved UX**: Pagination parameters (`Page` and `Limit`) are now optional and hidden by default
  - These parameters are now under an "Additional Options" section for all list operations
  - Default values (Page: 1, Limit: 50) are automatically applied when not specified
  - Results in a cleaner, less confusing interface for users who don't need custom pagination settings
  - Advanced users can still customize pagination by expanding "Additional Options"
  - Affects all 23 paginated operations across all resources

### Added
- New test cases for pagination with custom limit values
- Test coverage for real-world scenario with 78 repositories across multiple pages
- Documentation for server-enforced limit behavior

## [0.1.1] - 2025-11-21

### Fixed
- npm security vulnerabilities

## [0.1.0] - 2025-11-21

### Changed
- **BREAKING**: List operations now automatically fetch all pages until no more results are returned
  - Previously, list operations returned only the first page of results
  - The `page` parameter is now used internally for pagination (starts from 1)
  - The `limit` parameter is used as the page size for each request
  - This affects all list operations across all resources (repositories, issues, PRs, users, organizations, releases, webhooks, branches, tags, commits)

### Added
- Automatic pagination for all list operations
  - Repository list and search operations
  - Issue list, search, and listComments operations
  - Pull Request list, listCommits, and listFiles operations
  - User list, search, getRepositories, and getOrganizations operations
  - Organization list, listMembers, listRepositories, and listTeams operations
  - Release list and listAssets operations
  - Webhook list operation
  - Branch list operation
  - Tag list operation
  - Commit list and listStatuses operations
- Helper function `fetchAllPages()` to handle pagination logic
- Comprehensive test coverage for pagination functionality (105 tests)
- Documentation for commit tests workaround

### Fixed
- Memory issues with commit tests by splitting into separate test files

## [0.0.4] - 2025-11-14

### Added
- Full test coverage for all operations
- Mock functions and test data for comprehensive testing
- Tests for all resource operations (repositories, issues, PRs, users, organizations, releases, webhooks, branches, tags, commits)

### Changed
- Merged tests branch with full code coverage
- Updated repository URL to squarecows.com

## [0.0.3] - 2025-11-13

### Changed
- Updated repository URL to squarecows.com

## [0.0.2] - 2025-11-13

### Changed
- Removed repository name requirement from LIST operation
  - The LIST operation for repositories now correctly only requires the owner parameter
  - Makes the interface more intuitive as listing repositories should only need the user/organization

### Fixed
- Repository list operation now works without requiring a specific repository name

## [0.0.1] - 2025-11-12

### Added
- Initial release of n8n-nodes-forgejo
- Support for Forgejo API integration
- Repository operations (create, get, update, delete, list, search, file operations)
- Issue operations (create, get, update, delete, list, search, comments, labels, state)
- Pull Request operations (create, get, update, delete, list, merge, close, reopen, commits, files)
- User operations (get, getAuthenticated, list, search, getRepositories, getOrganizations)
- Organization operations (create, get, update, delete, list, listMembers, listRepositories, listTeams)
- Release operations (create, get, update, delete, list, listAssets, uploadAsset)
- Webhook operations (create, get, update, delete, list, test)
- Branch operations (create, get, delete, list, protection)
- Tag operations (create, get, delete, list)
- Commit operations (get, getStatus, createStatus, list, listStatuses)
- Authentication via API token
- Comprehensive node description and parameter definitions

[0.1.6]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.1.5...0.1.6
[0.1.5]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.1.4...0.1.5
[0.1.4]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.1.3...0.1.4
[0.1.3]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.1.2...0.1.3
[0.1.2]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.1.1...0.1.2
[0.1.1]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.1.0...0.1.1
[0.1.0]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.0.4...0.1.0
[0.0.4]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.0.3...0.0.4
[0.0.3]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.0.2...0.0.3
[0.0.2]: https://code.squarecows.com/ric/n8n-nodes-forgejo/compare/0.0.1...0.0.2
[0.0.1]: https://code.squarecows.com/ric/n8n-nodes-forgejo/releases/tag/0.0.1
