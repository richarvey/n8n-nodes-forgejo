# Quick Start Guide

## What is This?

This is a complete n8n community node package for Forgejo API integration. It allows you to interact with your Forgejo instance directly from n8n workflows.

## Installation

### Option 1: Install from npm (after publishing)
```bash
npm install n8n-nodes-forgejo
```

### Option 2: Local Development
```bash
# Install dependencies
npm install

# Build the node
npm run build

# Link for local testing
npm link
cd /path/to/your/n8n/installation
npm link n8n-nodes-forgejo
```

### Option 3: Manual Installation in n8n
1. Build the package: `npm run build`
2. Copy the `dist` folder contents to `~/.n8n/custom/`
3. Restart n8n

## Setting Up Credentials

1. In n8n, go to **Credentials** → **New**
2. Search for "Forgejo API"
3. Fill in:
   - **Forgejo Server URL**: Your instance URL (e.g., `https://code.squarecows.com`)
   - **Access Token**: Generate from Forgejo → Settings → Applications → Generate New Token
4. Test and save

## Your First Workflow

### Example: Create a Repository
1. Add a **Forgejo** node to your workflow
2. Select credentials
3. Choose:
   - Resource: **Repository**
   - Operation: **Create**
4. Fill in:
   - Name: `my-new-repo`
   - Description: `Created via n8n`
5. Execute!

### Example: List Issues
1. Add a **Forgejo** node
2. Select:
   - Resource: **Issue**
   - Operation: **List**
3. Fill in:
   - Owner: `your-username`
   - Repository: `repo-name`
4. Execute to get all issues!

### Example: Create an Issue
1. Add a **Forgejo** node
2. Select:
   - Resource: **Issue**
   - Operation: **Create**
3. Fill in:
   - Owner: `your-username`
   - Repository: `repo-name`
   - Title: `Bug found`
   - Body: `Description of the bug`
4. Execute!

## Available Resources

- ✅ **Repository** (10 operations)
- ✅ **Issue** (11 operations)
- ✅ **Pull Request** (10 operations)
- ✅ **User** (6 operations)
- ✅ **Organization** (8 operations)
- ✅ **Release** (7 operations)
- ✅ **Webhook** (6 operations)
- ✅ **Branch** (6 operations)
- ✅ **Tag** (4 operations)
- ✅ **Commit** (5 operations)

**Total: 73 operations**

## Common Use Cases

### 1. Automated Issue Management
- Trigger: On Schedule
- Forgejo: List Issues (state: open)
- Filter old issues
- Forgejo: Add Comment "Closing due to inactivity"
- Forgejo: Close Issue

### 2. Release Automation
- Trigger: Webhook
- Forgejo: Create Tag
- Forgejo: Create Release
- Forgejo: Upload Asset

### 3. Repository Sync
- Trigger: On Schedule
- Forgejo: List Repositories (org)
- Loop through repos
- Forgejo: Get Repository details
- Send notification if criteria met

### 4. PR Notifications
- Trigger: On Schedule
- Forgejo: Pull Request → List (state: open)
- Filter by criteria
- Slack/Email: Send notifications

## Troubleshooting

### "Authentication failed"
- Check your access token is correct
- Ensure token has required permissions
- Verify server URL is correct (no trailing slash)

### "404 Not Found"
- Verify owner/repo names are correct
- Check the resource exists on your Forgejo instance
- Ensure your token has access to the resource

### "Connection refused"
- Verify server URL is accessible
- Check firewall/network settings
- Ensure Forgejo API is enabled

## Support

- Documentation: See README.md and DEVELOPMENT.md
- API Reference: `https://your-forgejo-instance/api/swagger`
- Forgejo Docs: https://forgejo.org/docs/latest/user/api-usage/

## Next Steps

1. ✅ Update `package.json` with your author information
2. ✅ Update repository URLs in `package.json`
3. ✅ Test all operations with your Forgejo instance
4. ✅ Publish to npm
5. ✅ Submit to n8n community nodes registry
