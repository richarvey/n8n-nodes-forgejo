# Forgejo n8n Workflow Examples

This folder contains sample n8n workflow files demonstrating various operations with the Forgejo node.

## Setup

Before using these workflows, make sure you have:

1. **n8n installed** - Visit [n8n.io](https://n8n.io) for installation instructions
2. **Forgejo node installed** - Install the `n8n-nodes-forgejo` package
3. **Forgejo API credentials configured** - Add your Forgejo server URL and API token in n8n credentials

## How to Use These Examples

1. Import any workflow JSON file into n8n
2. Update the Forgejo API credentials to use your configured credential
3. Replace placeholder values (like `your-username`, `your-repo`) with your actual values
4. Click "Execute Workflow" to run the workflow manually

## Available Examples

### Repository Operations

- **01-list-repositories.json** - List all repositories for a user or organization
- **05-create-repository.json** - Create a new repository
- **09-create-file.json** - Create a file in a repository
- **12-search-repositories.json** - Search for repositories by keyword

### Issue Operations

- **02-create-issue.json** - Create a new issue with labels and assignees

### Pull Request Operations

- **03-list-pull-requests.json** - List pull requests in a repository
- **11-create-pull-request.json** - Create a new pull request

### User Operations

- **04-get-authenticated-user.json** - Get information about the authenticated user

### Branch Operations

- **06-list-branches.json** - List all branches in a repository

### Release Operations

- **07-create-release.json** - Create a new release with release notes

### Webhook Operations

- **08-create-webhook.json** - Create a webhook for repository events

### Commit Operations

- **10-list-commits.json** - List commits in a repository

## Customisation

Each workflow can be customised by:

- Adding more nodes to process the Forgejo data
- Combining multiple Forgejo operations in sequence
- Adding conditional logic based on the results
- Integrating with other services via n8n nodes

## Credential Configuration

To configure Forgejo API credentials in n8n:

1. Go to Settings > Credentials
2. Click "New Credential"
3. Search for "Forgejo API"
4. Enter your Forgejo server URL (e.g., `https://your-forgejo-instance.com`)
5. Enter your API token (generate one in Forgejo under Settings > Applications > Access Tokens)
6. Save the credential

## Additional Resources

- [Forgejo API Documentation](https://forgejo.org/docs/latest/api/)
- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community Forum](https://community.n8n.io/)
