# n8n-nodes-forgejo

This is an n8n community node that lets you use Forgejo in your n8n workflows.

[Forgejo](https://forgejo.org/) is a self-hosted lightweight software forge. It is a fork of Gitea and provides Git repository hosting, issue tracking, pull requests, wikis, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

For npm:
```bash
npm install n8n-nodes-forgejo
```

For Docker:
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e N8N_CUSTOM_EXTENSIONS="/home/node/.n8n/nodes" \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n \
  npm install n8n-nodes-forgejo
```

## Operations

This node supports comprehensive Forgejo API operations across 10 resources:

### Repository
- Create, Get, Update, Delete, List, Search
- Get Contents, Create File, Update File, Delete File

### Issue
- Create, Get, Update, Delete, List, Search
- Add Comment, List Comments, Edit Labels
- Close, Reopen

### Pull Request
- Create, Get, Update, Delete, List
- Merge, Close, Reopen
- List Commits, List Files

### User
- Get, Get Authenticated User, List, Search
- Get Repositories, Get Organizations

### Organization
- Create, Get, Update, Delete, List
- List Members, List Repositories, List Teams

### Release
- Create, Get, Update, Delete, List
- List Assets, Upload Asset

### Webhook
- Create, Get, Update, Delete, List, Test

### Branch
- Create, Get, Delete, List
- Get Protection, Update Protection

### Tag
- Create, Get, Delete, List

### Commit
- Get, List
- Get Status, Create Status, List Statuses

## Credentials

To use this node, you need to set up Forgejo API credentials in n8n:

1. **Forgejo Server URL**: The URL of your Forgejo instance (e.g., `https://code.squarecows.com`)
2. **Access Token**: Generate an API token from your Forgejo settings:
   - Go to Settings → Applications
   - Click "Generate New Token"
   - Give it a descriptive name and select appropriate scopes
   - Copy the generated token

## Compatibility

- Tested with Forgejo v1.19+
- Compatible with n8n v1.0.0+
- Works with self-hosted Forgejo instances
- Also compatible with Gitea API (as Forgejo is a Gitea fork)

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Forgejo API documentation](https://forgejo.org/docs/latest/user/api-usage/)
- [Forgejo website](https://forgejo.org/)

## Development

If you want to contribute or modify this node:

```bash
# Clone the repository
git clone https://github.com/yourusername/n8n-nodes-forgejo.git
cd n8n-nodes-forgejo

# Install dependencies
npm install

# Build the node
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## License

[MIT](LICENSE.md)

## Support

For bugs or feature requests, please open an issue on the [GitHub repository](https://github.com/yourusername/n8n-nodes-forgejo/issues).
