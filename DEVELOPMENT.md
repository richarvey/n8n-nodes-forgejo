# Development Guide

## Project Structure

```
n8n-nodes-forgejo/
├── credentials/
│   └── ForgejoApi.credentials.ts    # Credential definition for API authentication
├── nodes/
│   └── Forgejo/
│       ├── Forgejo.node.ts          # Main node implementation (2,448 lines)
│       └── forgejo.svg              # Node icon
├── .eslintrc.js                     # ESLint configuration
├── .gitignore                       # Git ignore rules
├── .prettierrc.json                 # Prettier formatting rules
├── gulpfile.js                      # Build tasks for icons
├── LICENSE.md                       # MIT License
├── package.json                     # NPM package configuration
├── README.md                        # User documentation
├── tsconfig.json                    # TypeScript configuration
└── DEVELOPMENT.md                   # This file
```

## Building the Node

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the node:**
   ```bash
   npm run build
   ```
   This will:
   - Compile TypeScript files to JavaScript in the `dist/` directory
   - Copy icon files to the dist directory

3. **Development mode (watch for changes):**
   ```bash
   npm run dev
   ```

## Testing Locally

To test the node in your local n8n instance:

1. Build the node (see above)
2. Link the package:
   ```bash
   npm link
   ```
3. In your n8n installation directory:
   ```bash
   npm link n8n-nodes-forgejo
   ```
4. Restart n8n

Alternatively, you can copy the built files directly to n8n's custom nodes directory:
```bash
cp -r dist/* ~/.n8n/custom/
```

## Code Quality

### Linting
```bash
npm run lint        # Check for issues
npm run lintfix     # Fix auto-fixable issues
```

### Formatting
```bash
npm run format      # Format code with Prettier
```

## Node Implementation Details

### Resources (10 total)

1. **Repository** - 10 operations
   - create, get, update, delete, list, search
   - getContents, createFile, updateFile, deleteFile

2. **Issue** - 11 operations
   - create, get, update, delete, list, search
   - addComment, listComments, editLabels, close, reopen

3. **Pull Request** - 10 operations
   - create, get, update, delete, list
   - merge, close, reopen, listCommits, listFiles

4. **User** - 6 operations
   - get, getAuthenticatedUser, list, search
   - getRepositories, getOrganizations

5. **Organization** - 8 operations
   - create, get, update, delete, list
   - listMembers, listRepositories, listTeams

6. **Release** - 7 operations
   - create, get, update, delete, list
   - listAssets, uploadAsset

7. **Webhook** - 6 operations
   - create, get, update, delete, list, test

8. **Branch** - 6 operations
   - create, get, delete, list
   - getProtection, updateProtection

9. **Tag** - 4 operations
   - create, get, delete, list

10. **Commit** - 5 operations
    - get, list, getStatus, createStatus, listStatuses

**Total: 73 operations across all resources**

### Authentication

The node uses the `ForgejoApi` credential which requires:
- **Server URL**: The base URL of the Forgejo instance
- **Access Token**: API token generated from Forgejo settings

The authentication is handled automatically by n8n's `httpRequestWithAuthentication` helper, which adds the `Authorization: token <token>` header to all requests.

### API Endpoints

All API calls go to: `{serverUrl}/api/v1/{endpoint}`

The node follows Forgejo's API structure:
- `/repos/{owner}/{repo}/*` for repository operations
- `/repos/{owner}/{repo}/issues/*` for issue operations
- `/repos/{owner}/{repo}/pulls/*` for pull request operations
- `/users/{username}` for user operations
- `/orgs/{org}/*` for organization operations
- etc.

### Error Handling

The node supports n8n's `continueOnFail` option:
- If enabled, errors are returned as data: `{ error: "message" }`
- If disabled, errors are thrown and stop workflow execution

## Publishing

Before publishing to npm:

1. Update version in `package.json`
2. Update author information and repository URLs
3. Run tests and linting:
   ```bash
   npm run lint
   npm run build
   ```
4. Publish:
   ```bash
   npm publish
   ```

## Contributing

When adding new operations:

1. Add the operation to the appropriate resource's operation options
2. Add any required fields with proper `displayOptions`
3. Implement the operation logic in the `execute()` method
4. Test the operation with a real Forgejo instance
5. Update documentation

## Resources

- [n8n Node Development](https://docs.n8n.io/integrations/creating-nodes/)
- [Forgejo API Documentation](https://forgejo.org/docs/latest/user/api-usage/)
- [Forgejo Swagger API](https://code.squarecows.com/api/swagger) (or any Forgejo instance at `/api/swagger`)
