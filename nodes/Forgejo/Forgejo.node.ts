import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class Forgejo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Forgejo',
		name: 'forgejo',
		icon: 'file:forgejo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with Forgejo API',
		defaults: {
			name: 'Forgejo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'forgejoApi',
				required: true,
			},
		],
		properties: [
			// Resource Selection
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Repository',
						value: 'repository',
					},
					{
						name: 'Issue',
						value: 'issue',
					},
					{
						name: 'Pull Request',
						value: 'pullRequest',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Release',
						value: 'release',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
					{
						name: 'Branch',
						value: 'branch',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Commit',
						value: 'commit',
					},
				],
				default: 'repository',
			},

			// Repository Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['repository'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new repository',
						action: 'Create a repository',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a repository',
						action: 'Get a repository',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a repository',
						action: 'Update a repository',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a repository',
						action: 'Delete a repository',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List repositories',
						action: 'List repositories',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search repositories',
						action: 'Search repositories',
					},
					{
						name: 'Get Contents',
						value: 'getContents',
						description: 'Get repository contents',
						action: 'Get repository contents',
					},
					{
						name: 'Create File',
						value: 'createFile',
						description: 'Create a file in repository',
						action: 'Create a file',
					},
					{
						name: 'Update File',
						value: 'updateFile',
						description: 'Update a file in repository',
						action: 'Update a file',
					},
					{
						name: 'Delete File',
						value: 'deleteFile',
						description: 'Delete a file from repository',
						action: 'Delete a file',
					},
				],
				default: 'get',
			},

			// Issue Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['issue'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new issue',
						action: 'Create an issue',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an issue',
						action: 'Get an issue',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an issue',
						action: 'Update an issue',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an issue',
						action: 'Delete an issue',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List issues',
						action: 'List issues',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search issues',
						action: 'Search issues',
					},
					{
						name: 'Add Comment',
						value: 'addComment',
						description: 'Add a comment to an issue',
						action: 'Add comment to issue',
					},
					{
						name: 'List Comments',
						value: 'listComments',
						description: 'List comments on an issue',
						action: 'List issue comments',
					},
					{
						name: 'Edit Labels',
						value: 'editLabels',
						description: 'Edit labels on an issue',
						action: 'Edit issue labels',
					},
					{
						name: 'Close',
						value: 'close',
						description: 'Close an issue',
						action: 'Close an issue',
					},
					{
						name: 'Reopen',
						value: 'reopen',
						description: 'Reopen an issue',
						action: 'Reopen an issue',
					},
				],
				default: 'list',
			},

			// Pull Request Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['pullRequest'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new pull request',
						action: 'Create a pull request',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a pull request',
						action: 'Get a pull request',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a pull request',
						action: 'Update a pull request',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a pull request',
						action: 'Delete a pull request',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List pull requests',
						action: 'List pull requests',
					},
					{
						name: 'Merge',
						value: 'merge',
						description: 'Merge a pull request',
						action: 'Merge a pull request',
					},
					{
						name: 'Close',
						value: 'close',
						description: 'Close a pull request',
						action: 'Close a pull request',
					},
					{
						name: 'Reopen',
						value: 'reopen',
						description: 'Reopen a pull request',
						action: 'Reopen a pull request',
					},
					{
						name: 'List Commits',
						value: 'listCommits',
						description: 'List commits in a pull request',
						action: 'List pull request commits',
					},
					{
						name: 'List Files',
						value: 'listFiles',
						description: 'List files in a pull request',
						action: 'List pull request files',
					},
				],
				default: 'list',
			},

			// User Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a user',
						action: 'Get a user',
					},
					{
						name: 'Get Authenticated User',
						value: 'getAuthenticatedUser',
						description: 'Get authenticated user information',
						action: 'Get authenticated user',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List users',
						action: 'List users',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search users',
						action: 'Search users',
					},
					{
						name: 'Get Repositories',
						value: 'getRepositories',
						description: 'Get user repositories',
						action: 'Get user repositories',
					},
					{
						name: 'Get Organizations',
						value: 'getOrganizations',
						description: 'Get user organizations',
						action: 'Get user organizations',
					},
				],
				default: 'getAuthenticatedUser',
			},

			// Organization Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['organization'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new organization',
						action: 'Create an organization',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an organization',
						action: 'Get an organization',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an organization',
						action: 'Update an organization',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an organization',
						action: 'Delete an organization',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List organizations',
						action: 'List organizations',
					},
					{
						name: 'List Members',
						value: 'listMembers',
						description: 'List organization members',
						action: 'List organization members',
					},
					{
						name: 'List Repositories',
						value: 'listRepositories',
						description: 'List organization repositories',
						action: 'List organization repositories',
					},
					{
						name: 'List Teams',
						value: 'listTeams',
						description: 'List organization teams',
						action: 'List organization teams',
					},
				],
				default: 'list',
			},

			// Release Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['release'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new release',
						action: 'Create a release',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a release',
						action: 'Get a release',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a release',
						action: 'Update a release',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a release',
						action: 'Delete a release',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List releases',
						action: 'List releases',
					},
					{
						name: 'List Assets',
						value: 'listAssets',
						description: 'List release assets',
						action: 'List release assets',
					},
					{
						name: 'Upload Asset',
						value: 'uploadAsset',
						description: 'Upload a release asset',
						action: 'Upload release asset',
					},
				],
				default: 'list',
			},

			// Webhook Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new webhook',
						action: 'Create a webhook',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a webhook',
						action: 'Get a webhook',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a webhook',
						action: 'Update a webhook',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a webhook',
						action: 'Delete a webhook',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List webhooks',
						action: 'List webhooks',
					},
					{
						name: 'Test',
						value: 'test',
						description: 'Test a webhook',
						action: 'Test a webhook',
					},
				],
				default: 'list',
			},

			// Branch Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['branch'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new branch',
						action: 'Create a branch',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a branch',
						action: 'Get a branch',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a branch',
						action: 'Delete a branch',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List branches',
						action: 'List branches',
					},
					{
						name: 'Get Protection',
						value: 'getProtection',
						description: 'Get branch protection',
						action: 'Get branch protection',
					},
					{
						name: 'Update Protection',
						value: 'updateProtection',
						description: 'Update branch protection',
						action: 'Update branch protection',
					},
				],
				default: 'list',
			},

			// Tag Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tag'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new tag',
						action: 'Create a tag',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a tag',
						action: 'Get a tag',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a tag',
						action: 'Delete a tag',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List tags',
						action: 'List tags',
					},
				],
				default: 'list',
			},

			// Commit Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['commit'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a commit',
						action: 'Get a commit',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List commits',
						action: 'List commits',
					},
					{
						name: 'Get Status',
						value: 'getStatus',
						description: 'Get commit status',
						action: 'Get commit status',
					},
					{
						name: 'Create Status',
						value: 'createStatus',
						description: 'Create commit status',
						action: 'Create commit status',
					},
					{
						name: 'List Statuses',
						value: 'listStatuses',
						description: 'List commit statuses',
						action: 'List commit statuses',
					},
				],
				default: 'list',
			},

			// ===============================================
			// Repository Fields
			// ===============================================

			// Owner field (used by most operations)
			{
				displayName: 'Owner',
				name: 'owner',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['repository', 'issue', 'pullRequest', 'release', 'webhook', 'branch', 'tag', 'commit'],
						operation: [
							'get',
							'update',
							'delete',
							'getContents',
							'createFile',
							'updateFile',
							'deleteFile',
							'list',
							'create',
							'addComment',
							'listComments',
							'editLabels',
							'close',
							'reopen',
							'merge',
							'listCommits',
							'listFiles',
							'listAssets',
							'uploadAsset',
							'getProtection',
							'updateProtection',
							'createStatus',
							'getStatus',
							'listStatuses',
						],
					},
				},
				description: 'Repository owner (username or organization)',
			},

			// Repository name field
			{
				displayName: 'Repository',
				name: 'repository',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['repository', 'issue', 'pullRequest', 'release', 'webhook', 'branch', 'tag', 'commit'],
						operation: [
							'get',
							'update',
							'delete',
							'getContents',
							'createFile',
							'updateFile',
							'deleteFile',
							'create',
							'addComment',
							'listComments',
							'editLabels',
							'close',
							'reopen',
							'merge',
							'listCommits',
							'listFiles',
							'listAssets',
							'uploadAsset',
							'getProtection',
							'updateProtection',
							'createStatus',
							'getStatus',
							'listStatuses',
						],
					},
				},
				description: 'Repository name',
			},

			// Repository Create fields
			{
				displayName: 'Repository Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['create'],
					},
				},
				description: 'Name of the repository to create',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['repository', 'organization'],
						operation: ['create', 'update'],
					},
				},
				description: 'Description of the repository or organization',
			},
			{
				displayName: 'Private',
				name: 'private',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['create', 'update'],
					},
				},
				description: 'Whether the repository should be private',
			},
			{
				displayName: 'Auto Init',
				name: 'autoInit',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['create'],
					},
				},
				description: 'Whether to initialize the repository with a README',
			},

			// Repository Update fields
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'New name for the repository',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'New description for the repository',
					},
					{
						displayName: 'Private',
						name: 'private',
						type: 'boolean',
						default: false,
						description: 'Whether the repository should be private',
					},
					{
						displayName: 'Website',
						name: 'website',
						type: 'string',
						default: '',
						description: 'Repository website URL',
					},
					{
						displayName: 'Default Branch',
						name: 'default_branch',
						type: 'string',
						default: '',
						description: 'Default branch name',
					},
				],
			},

			// Repository Search
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['repository', 'issue', 'user'],
						operation: ['search'],
					},
				},
				description: 'Search query',
			},

			// File path
			{
				displayName: 'File Path',
				name: 'filePath',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['getContents', 'createFile', 'updateFile', 'deleteFile'],
					},
				},
				description: 'Path to the file in the repository',
			},

			// File content
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['createFile', 'updateFile'],
					},
				},
				description: 'File content (will be base64 encoded automatically)',
			},

			// Commit message
			{
				displayName: 'Commit Message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['createFile', 'updateFile', 'deleteFile'],
					},
				},
				description: 'Commit message',
			},

			// SHA (for file updates/deletes)
			{
				displayName: 'SHA',
				name: 'sha',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['repository', 'commit'],
						operation: ['updateFile', 'deleteFile', 'getStatus', 'createStatus', 'listStatuses'],
					},
				},
				description: 'SHA hash of the file/commit',
			},

			// SHA (optional, for commit get)
			{
				displayName: 'SHA',
				name: 'sha',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['commit'],
						operation: ['get'],
					},
				},
				description: 'SHA hash of the commit. Leave empty to fetch the latest commit from the default branch.',
			},

			// ===============================================
			// Issue Fields
			// ===============================================

			// Issue number
			{
				displayName: 'Issue Number',
				name: 'issueNumber',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['issue'],
						operation: ['get', 'update', 'delete', 'addComment', 'listComments', 'editLabels', 'close', 'reopen'],
					},
				},
				description: 'Issue number',
			},

			// Issue title
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['issue', 'pullRequest'],
						operation: ['create'],
					},
				},
				description: 'Issue or pull request title',
			},

			// Issue body
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				displayOptions: {
					show: {
						resource: ['issue', 'pullRequest'],
						operation: ['create', 'update', 'addComment'],
					},
				},
				description: 'Issue, pull request, or comment body',
			},

			// Issue labels
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['issue'],
						operation: ['create', 'update', 'editLabels'],
					},
				},
				description: 'Comma-separated list of label names',
			},

			// Issue assignees
			{
				displayName: 'Assignees',
				name: 'assignees',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['issue', 'pullRequest'],
						operation: ['create', 'update'],
					},
				},
				description: 'Comma-separated list of usernames to assign',
			},

			// Issue state filter
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{
						name: 'Open',
						value: 'open',
					},
					{
						name: 'Closed',
						value: 'closed',
					},
					{
						name: 'All',
						value: 'all',
					},
				],
				default: 'open',
				displayOptions: {
					show: {
						resource: ['issue', 'pullRequest'],
						operation: ['list'],
					},
				},
				description: 'Filter by state',
			},

			// ===============================================
			// Pull Request Fields
			// ===============================================

			// Pull request number
			{
				displayName: 'Pull Request Number',
				name: 'pullRequestNumber',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['get', 'update', 'delete', 'merge', 'close', 'reopen', 'listCommits', 'listFiles'],
					},
				},
				description: 'Pull request number',
			},

			// PR head branch
			{
				displayName: 'Head Branch',
				name: 'head',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['create'],
					},
				},
				description: 'The name of the branch where your changes are implemented',
			},

			// PR base branch
			{
				displayName: 'Base Branch',
				name: 'base',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['create'],
					},
				},
				description: 'The name of the branch you want the changes pulled into',
			},

			// PR merge method
			{
				displayName: 'Merge Method',
				name: 'mergeMethod',
				type: 'options',
				options: [
					{
						name: 'Merge',
						value: 'merge',
					},
					{
						name: 'Rebase',
						value: 'rebase',
					},
					{
						name: 'Squash',
						value: 'squash',
					},
				],
				default: 'merge',
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['merge'],
					},
				},
				description: 'Merge method to use',
			},

			// ===============================================
			// User Fields
			// ===============================================

			// Username
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['get', 'getRepositories', 'getOrganizations'],
					},
				},
				description: 'Username',
			},

			// ===============================================
			// Organization Fields
			// ===============================================

			// Organization name
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['get', 'update', 'delete', 'listMembers', 'listRepositories', 'listTeams'],
					},
				},
				description: 'Organization name',
			},

			// Organization username (for create)
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['create'],
					},
				},
				description: 'Organization username',
			},

			// Organization full name
			{
				displayName: 'Full Name',
				name: 'fullName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['create', 'update'],
					},
				},
				description: 'Full name of the organization',
			},

			// ===============================================
			// Release Fields
			// ===============================================

			// Release ID
			{
				displayName: 'Release ID',
				name: 'releaseId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['release'],
						operation: ['get', 'update', 'delete', 'listAssets', 'uploadAsset'],
					},
				},
				description: 'Release ID',
			},

			// Tag name
			{
				displayName: 'Tag Name',
				name: 'tagName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['release', 'tag'],
						operation: ['create', 'get', 'delete'],
					},
				},
				description: 'Tag name',
			},

			// Release name
			{
				displayName: 'Release Name',
				name: 'name',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['release'],
						operation: ['create', 'update'],
					},
				},
				description: 'Release name',
			},

			// Release body
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				displayOptions: {
					show: {
						resource: ['release'],
						operation: ['create', 'update'],
					},
				},
				description: 'Release notes',
			},

			// Release draft
			{
				displayName: 'Draft',
				name: 'draft',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['release'],
						operation: ['create', 'update'],
					},
				},
				description: 'Whether this is a draft release',
			},

			// Release prerelease
			{
				displayName: 'Prerelease',
				name: 'prerelease',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['release'],
						operation: ['create', 'update'],
					},
				},
				description: 'Whether this is a prerelease',
			},

			// Asset name
			{
				displayName: 'Asset Name',
				name: 'assetName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['release'],
						operation: ['uploadAsset'],
					},
				},
				description: 'Name of the asset file',
			},

			// Asset file path
			{
				displayName: 'Asset File Path',
				name: 'assetFilePath',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['release'],
						operation: ['uploadAsset'],
					},
				},
				description: 'Path to the asset file to upload',
			},

			// ===============================================
			// Webhook Fields
			// ===============================================

			// Webhook ID
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['get', 'update', 'delete', 'test'],
					},
				},
				description: 'Webhook ID',
			},

			// Webhook URL
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create', 'update'],
					},
				},
				description: 'URL to send webhook payloads to',
			},

			// Webhook events
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Push',
						value: 'push',
					},
					{
						name: 'Create',
						value: 'create',
					},
					{
						name: 'Delete',
						value: 'delete',
					},
					{
						name: 'Issues',
						value: 'issues',
					},
					{
						name: 'Issue Comment',
						value: 'issue_comment',
					},
					{
						name: 'Pull Request',
						value: 'pull_request',
					},
					{
						name: 'Release',
						value: 'release',
					},
				],
				default: ['push'],
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create', 'update'],
					},
				},
				description: 'Events that trigger the webhook',
			},

			// Webhook active
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create', 'update'],
					},
				},
				description: 'Whether the webhook is active',
			},

			// ===============================================
			// Branch Fields
			// ===============================================

			// Branch name
			{
				displayName: 'Branch Name',
				name: 'branchName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['branch'],
						operation: ['create', 'get', 'delete', 'getProtection', 'updateProtection'],
					},
				},
				description: 'Branch name',
			},

			// Source branch (for create)
			{
				displayName: 'Source Branch',
				name: 'sourceBranch',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['branch'],
						operation: ['create'],
					},
				},
				description: 'Branch to create from',
			},

			// Branch protection
			{
				displayName: 'Protection Settings',
				name: 'protectionSettings',
				type: 'collection',
				placeholder: 'Add Setting',
				default: {},
				displayOptions: {
					show: {
						resource: ['branch'],
						operation: ['updateProtection'],
					},
				},
				options: [
					{
						displayName: 'Enable Push',
						name: 'enable_push',
						type: 'boolean',
						default: false,
						description: 'Whether to enable push protection',
					},
					{
						displayName: 'Enable Push Whitelist',
						name: 'enable_push_whitelist',
						type: 'boolean',
						default: false,
						description: 'Whether to enable push whitelist',
					},
					{
						displayName: 'Required Approvals',
						name: 'required_approvals',
						type: 'number',
						default: 1,
						description: 'Number of required approvals',
					},
				],
			},

			// ===============================================
			// Tag Fields (additional)
			// ===============================================

			// Tag message
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				description: 'Tag message',
			},

			// Tag target
			{
				displayName: 'Target',
				name: 'target',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				description: 'Target commit SHA (defaults to the repository default branch)',
			},

			// ===============================================
			// Commit Status Fields
			// ===============================================

			// Commit status state
			{
				displayName: 'Status State',
				name: 'statusState',
				type: 'options',
				options: [
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Success',
						value: 'success',
					},
					{
						name: 'Error',
						value: 'error',
					},
					{
						name: 'Failure',
						value: 'failure',
					},
				],
				default: 'pending',
				required: true,
				displayOptions: {
					show: {
						resource: ['commit'],
						operation: ['createStatus'],
					},
				},
				description: 'Status state',
			},

			// Commit status context
			{
				displayName: 'Context',
				name: 'context',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['commit'],
						operation: ['createStatus'],
					},
				},
				description: 'Status context identifier',
			},

			// Commit status description
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['commit'],
						operation: ['createStatus'],
					},
				},
				description: 'Status description',
			},

			// Commit status target URL
			{
				displayName: 'Target URL',
				name: 'targetUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['commit'],
						operation: ['createStatus'],
					},
				},
				description: 'Target URL for more information',
			},

			// ===============================================
			// Pagination Fields
			// ===============================================

			// Page
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				displayOptions: {
					show: {
						operation: ['list', 'search', 'listComments', 'listCommits', 'listFiles', 'listAssets', 'listMembers', 'listRepositories', 'listTeams', 'listStatuses'],
					},
				},
				description: 'Page number',
			},

			// Limit
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				displayOptions: {
					show: {
						operation: ['list', 'search', 'listComments', 'listCommits', 'listFiles', 'listAssets', 'listMembers', 'listRepositories', 'listTeams', 'listStatuses'],
					},
				},
				description: 'Maximum number of results to return',
			},

			// Reference (for contents)
			{
				displayName: 'Reference',
				name: 'ref',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['getContents'],
					},
				},
				description: 'Branch, tag, or commit to get contents from',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const credentials = await this.getCredentials('forgejoApi');
		const baseUrl = `${credentials.serverUrl}/api/v1`;

		for (let i = 0; i < items.length; i++) {
			try {
				let method: IHttpRequestMethods = 'GET';
				let endpoint = '';
				let body: IDataObject = {};
				let qs: IDataObject = {};

				// ===============================================
				// Repository Operations
				// ===============================================
				if (resource === 'repository') {
					if (operation === 'create') {
						method = 'POST';
						endpoint = '/user/repos';
						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const isPrivate = this.getNodeParameter('private', i) as boolean;
						const autoInit = this.getNodeParameter('autoInit', i) as boolean;

						body = {
							name,
							description,
							private: isPrivate,
							auto_init: autoInit,
						};
					} else if (operation === 'get') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						endpoint = `/repos/${owner}/${repo}`;
					} else if (operation === 'update') {
						method = 'PATCH';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						endpoint = `/repos/${owner}/${repo}`;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						body = updateFields;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						endpoint = `/repos/${owner}/${repo}`;
					} else if (operation === 'list') {
						const owner = this.getNodeParameter('owner', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/users/${owner}/repos`;
						qs = { page, limit };
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = '/repos/search';
						qs = { q: query, page, limit };
					} else if (operation === 'getContents') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const filePath = this.getNodeParameter('filePath', i) as string;
						const ref = this.getNodeParameter('ref', i) as string;
						endpoint = `/repos/${owner}/${repo}/contents/${filePath}`;
						if (ref) {
							qs = { ref };
						}
					} else if (operation === 'createFile') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const filePath = this.getNodeParameter('filePath', i) as string;
						const content = this.getNodeParameter('content', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						endpoint = `/repos/${owner}/${repo}/contents/${filePath}`;
						body = {
							content: Buffer.from(content).toString('base64'),
							message,
						};
					} else if (operation === 'updateFile') {
						method = 'PUT';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const filePath = this.getNodeParameter('filePath', i) as string;
						const content = this.getNodeParameter('content', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const sha = this.getNodeParameter('sha', i) as string;
						endpoint = `/repos/${owner}/${repo}/contents/${filePath}`;
						body = {
							content: Buffer.from(content).toString('base64'),
							message,
							sha,
						};
					} else if (operation === 'deleteFile') {
						method = 'DELETE';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const filePath = this.getNodeParameter('filePath', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const sha = this.getNodeParameter('sha', i) as string;
						endpoint = `/repos/${owner}/${repo}/contents/${filePath}`;
						body = {
							message,
							sha,
						};
					}
				}

				// ===============================================
				// Issue Operations
				// ===============================================
				else if (resource === 'issue') {
					if (operation === 'create') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const bodyContent = this.getNodeParameter('body', i) as string;
						const labels = this.getNodeParameter('labels', i) as string;
						const assignees = this.getNodeParameter('assignees', i) as string;
						endpoint = `/repos/${owner}/${repo}/issues`;
						body = {
							title,
							body: bodyContent,
						};
						if (labels) {
							body.labels = labels.split(',').map((l) => l.trim());
						}
						if (assignees) {
							body.assignees = assignees.split(',').map((a) => a.trim());
						}
					} else if (operation === 'get') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const issueNumber = this.getNodeParameter('issueNumber', i) as number;
						endpoint = `/repos/${owner}/${repo}/issues/${issueNumber}`;
					} else if (operation === 'update') {
						method = 'PATCH';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const issueNumber = this.getNodeParameter('issueNumber', i) as number;
						const bodyContent = this.getNodeParameter('body', i) as string;
						const labels = this.getNodeParameter('labels', i) as string;
						const assignees = this.getNodeParameter('assignees', i) as string;
						endpoint = `/repos/${owner}/${repo}/issues/${issueNumber}`;
						body = {};
						if (bodyContent) {
							body.body = bodyContent;
						}
						if (labels) {
							body.labels = labels.split(',').map((l) => l.trim());
						}
						if (assignees) {
							body.assignees = assignees.split(',').map((a) => a.trim());
						}
					} else if (operation === 'delete') {
						method = 'DELETE';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const issueNumber = this.getNodeParameter('issueNumber', i) as number;
						endpoint = `/repos/${owner}/${repo}/issues/${issueNumber}`;
					} else if (operation === 'list') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const state = this.getNodeParameter('state', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/issues`;
						qs = { state, page, limit };
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = '/repos/issues/search';
						qs = { q: query, page, limit };
					} else if (operation === 'addComment') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const issueNumber = this.getNodeParameter('issueNumber', i) as number;
						const bodyContent = this.getNodeParameter('body', i) as string;
						endpoint = `/repos/${owner}/${repo}/issues/${issueNumber}/comments`;
						body = { body: bodyContent };
					} else if (operation === 'listComments') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const issueNumber = this.getNodeParameter('issueNumber', i) as number;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/issues/${issueNumber}/comments`;
						qs = { page, limit };
					} else if (operation === 'editLabels') {
						method = 'PUT';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const issueNumber = this.getNodeParameter('issueNumber', i) as number;
						const labels = this.getNodeParameter('labels', i) as string;
						endpoint = `/repos/${owner}/${repo}/issues/${issueNumber}/labels`;
						body = {
							labels: labels.split(',').map((l) => l.trim()),
						};
					} else if (operation === 'close') {
						method = 'PATCH';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const issueNumber = this.getNodeParameter('issueNumber', i) as number;
						endpoint = `/repos/${owner}/${repo}/issues/${issueNumber}`;
						body = { state: 'closed' };
					} else if (operation === 'reopen') {
						method = 'PATCH';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const issueNumber = this.getNodeParameter('issueNumber', i) as number;
						endpoint = `/repos/${owner}/${repo}/issues/${issueNumber}`;
						body = { state: 'open' };
					}
				}

				// ===============================================
				// Pull Request Operations
				// ===============================================
				else if (resource === 'pullRequest') {
					if (operation === 'create') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const head = this.getNodeParameter('head', i) as string;
						const base = this.getNodeParameter('base', i) as string;
						const bodyContent = this.getNodeParameter('body', i) as string;
						const assignees = this.getNodeParameter('assignees', i) as string;
						endpoint = `/repos/${owner}/${repo}/pulls`;
						body = {
							title,
							head,
							base,
							body: bodyContent,
						};
						if (assignees) {
							body.assignees = assignees.split(',').map((a) => a.trim());
						}
					} else if (operation === 'get') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const prNumber = this.getNodeParameter('pullRequestNumber', i) as number;
						endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}`;
					} else if (operation === 'update') {
						method = 'PATCH';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const prNumber = this.getNodeParameter('pullRequestNumber', i) as number;
						const bodyContent = this.getNodeParameter('body', i) as string;
						const assignees = this.getNodeParameter('assignees', i) as string;
						endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}`;
						body = {};
						if (bodyContent) {
							body.body = bodyContent;
						}
						if (assignees) {
							body.assignees = assignees.split(',').map((a) => a.trim());
						}
					} else if (operation === 'delete') {
						method = 'DELETE';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const prNumber = this.getNodeParameter('pullRequestNumber', i) as number;
						endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}`;
					} else if (operation === 'list') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const state = this.getNodeParameter('state', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/pulls`;
						qs = { state, page, limit };
					} else if (operation === 'merge') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const prNumber = this.getNodeParameter('pullRequestNumber', i) as number;
						const mergeMethod = this.getNodeParameter('mergeMethod', i) as string;
						endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}/merge`;
						body = { Do: mergeMethod };
					} else if (operation === 'close') {
						method = 'PATCH';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const prNumber = this.getNodeParameter('pullRequestNumber', i) as number;
						endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}`;
						body = { state: 'closed' };
					} else if (operation === 'reopen') {
						method = 'PATCH';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const prNumber = this.getNodeParameter('pullRequestNumber', i) as number;
						endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}`;
						body = { state: 'open' };
					} else if (operation === 'listCommits') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const prNumber = this.getNodeParameter('pullRequestNumber', i) as number;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}/commits`;
						qs = { page, limit };
					} else if (operation === 'listFiles') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const prNumber = this.getNodeParameter('pullRequestNumber', i) as number;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}/files`;
						qs = { page, limit };
					}
				}

				// ===============================================
				// User Operations
				// ===============================================
				else if (resource === 'user') {
					if (operation === 'get') {
						const username = this.getNodeParameter('username', i) as string;
						endpoint = `/users/${username}`;
					} else if (operation === 'getAuthenticatedUser') {
						endpoint = '/user';
					} else if (operation === 'list') {
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = '/users';
						qs = { page, limit };
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = '/users/search';
						qs = { q: query, page, limit };
					} else if (operation === 'getRepositories') {
						const username = this.getNodeParameter('username', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/users/${username}/repos`;
						qs = { page, limit };
					} else if (operation === 'getOrganizations') {
						const username = this.getNodeParameter('username', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/users/${username}/orgs`;
						qs = { page, limit };
					}
				}

				// ===============================================
				// Organization Operations
				// ===============================================
				else if (resource === 'organization') {
					if (operation === 'create') {
						method = 'POST';
						const username = this.getNodeParameter('username', i) as string;
						const fullName = this.getNodeParameter('fullName', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						endpoint = '/orgs';
						body = {
							username,
							full_name: fullName,
							description,
						};
					} else if (operation === 'get') {
						const org = this.getNodeParameter('organization', i) as string;
						endpoint = `/orgs/${org}`;
					} else if (operation === 'update') {
						method = 'PATCH';
						const org = this.getNodeParameter('organization', i) as string;
						const fullName = this.getNodeParameter('fullName', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						endpoint = `/orgs/${org}`;
						body = {};
						if (fullName) {
							body.full_name = fullName;
						}
						if (description) {
							body.description = description;
						}
					} else if (operation === 'delete') {
						method = 'DELETE';
						const org = this.getNodeParameter('organization', i) as string;
						endpoint = `/orgs/${org}`;
					} else if (operation === 'list') {
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = '/orgs';
						qs = { page, limit };
					} else if (operation === 'listMembers') {
						const org = this.getNodeParameter('organization', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/orgs/${org}/members`;
						qs = { page, limit };
					} else if (operation === 'listRepositories') {
						const org = this.getNodeParameter('organization', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/orgs/${org}/repos`;
						qs = { page, limit };
					} else if (operation === 'listTeams') {
						const org = this.getNodeParameter('organization', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/orgs/${org}/teams`;
						qs = { page, limit };
					}
				}

				// ===============================================
				// Release Operations
				// ===============================================
				else if (resource === 'release') {
					if (operation === 'create') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const tagName = this.getNodeParameter('tagName', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const bodyContent = this.getNodeParameter('body', i) as string;
						const draft = this.getNodeParameter('draft', i) as boolean;
						const prerelease = this.getNodeParameter('prerelease', i) as boolean;
						endpoint = `/repos/${owner}/${repo}/releases`;
						body = {
							tag_name: tagName,
							name,
							body: bodyContent,
							draft,
							prerelease,
						};
					} else if (operation === 'get') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const releaseId = this.getNodeParameter('releaseId', i) as number;
						endpoint = `/repos/${owner}/${repo}/releases/${releaseId}`;
					} else if (operation === 'update') {
						method = 'PATCH';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const releaseId = this.getNodeParameter('releaseId', i) as number;
						const name = this.getNodeParameter('name', i) as string;
						const bodyContent = this.getNodeParameter('body', i) as string;
						const draft = this.getNodeParameter('draft', i) as boolean;
						const prerelease = this.getNodeParameter('prerelease', i) as boolean;
						endpoint = `/repos/${owner}/${repo}/releases/${releaseId}`;
						body = {};
						if (name) {
							body.name = name;
						}
						if (bodyContent) {
							body.body = bodyContent;
						}
						body.draft = draft;
						body.prerelease = prerelease;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const releaseId = this.getNodeParameter('releaseId', i) as number;
						endpoint = `/repos/${owner}/${repo}/releases/${releaseId}`;
					} else if (operation === 'list') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/releases`;
						qs = { page, limit };
					} else if (operation === 'listAssets') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const releaseId = this.getNodeParameter('releaseId', i) as number;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/releases/${releaseId}/assets`;
						qs = { page, limit };
					} else if (operation === 'uploadAsset') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const releaseId = this.getNodeParameter('releaseId', i) as number;
						const assetName = this.getNodeParameter('assetName', i) as string;
						endpoint = `/repos/${owner}/${repo}/releases/${releaseId}/assets`;
						qs = { name: assetName };
						// Note: File upload would require binary data handling
						// This is a simplified version
					}
				}

				// ===============================================
				// Webhook Operations
				// ===============================================
				else if (resource === 'webhook') {
					if (operation === 'create') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
						const events = this.getNodeParameter('events', i) as string[];
						const active = this.getNodeParameter('active', i) as boolean;
						endpoint = `/repos/${owner}/${repo}/hooks`;
						body = {
							type: 'forgejo',
							config: {
								url: webhookUrl,
								content_type: 'json',
							},
							events,
							active,
						};
					} else if (operation === 'get') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const webhookId = this.getNodeParameter('webhookId', i) as number;
						endpoint = `/repos/${owner}/${repo}/hooks/${webhookId}`;
					} else if (operation === 'update') {
						method = 'PATCH';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const webhookId = this.getNodeParameter('webhookId', i) as number;
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
						const events = this.getNodeParameter('events', i) as string[];
						const active = this.getNodeParameter('active', i) as boolean;
						endpoint = `/repos/${owner}/${repo}/hooks/${webhookId}`;
						body = {
							config: {
								url: webhookUrl,
								content_type: 'json',
							},
							events,
							active,
						};
					} else if (operation === 'delete') {
						method = 'DELETE';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const webhookId = this.getNodeParameter('webhookId', i) as number;
						endpoint = `/repos/${owner}/${repo}/hooks/${webhookId}`;
					} else if (operation === 'list') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/hooks`;
						qs = { page, limit };
					} else if (operation === 'test') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const webhookId = this.getNodeParameter('webhookId', i) as number;
						endpoint = `/repos/${owner}/${repo}/hooks/${webhookId}/tests`;
					}
				}

				// ===============================================
				// Branch Operations
				// ===============================================
				else if (resource === 'branch') {
					if (operation === 'create') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const branchName = this.getNodeParameter('branchName', i) as string;
						const sourceBranch = this.getNodeParameter('sourceBranch', i) as string;
						endpoint = `/repos/${owner}/${repo}/branches`;
						body = {
							new_branch_name: branchName,
							old_branch_name: sourceBranch,
						};
					} else if (operation === 'get') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const branchName = this.getNodeParameter('branchName', i) as string;
						endpoint = `/repos/${owner}/${repo}/branches/${branchName}`;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const branchName = this.getNodeParameter('branchName', i) as string;
						endpoint = `/repos/${owner}/${repo}/branches/${branchName}`;
					} else if (operation === 'list') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/branches`;
						qs = { page, limit };
					} else if (operation === 'getProtection') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const branchName = this.getNodeParameter('branchName', i) as string;
						endpoint = `/repos/${owner}/${repo}/branch_protections/${branchName}`;
					} else if (operation === 'updateProtection') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const branchName = this.getNodeParameter('branchName', i) as string;
						const protectionSettings = this.getNodeParameter(
							'protectionSettings',
							i,
						) as IDataObject;
						endpoint = `/repos/${owner}/${repo}/branch_protections`;
						body = {
							branch_name: branchName,
							...protectionSettings,
						};
					}
				}

				// ===============================================
				// Tag Operations
				// ===============================================
				else if (resource === 'tag') {
					if (operation === 'create') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const tagName = this.getNodeParameter('tagName', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const target = this.getNodeParameter('target', i) as string;
						endpoint = `/repos/${owner}/${repo}/tags`;
						body = {
							tag_name: tagName,
							message,
						};
						if (target) {
							body.target = target;
						}
					} else if (operation === 'get') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const tagName = this.getNodeParameter('tagName', i) as string;
						endpoint = `/repos/${owner}/${repo}/tags/${tagName}`;
					} else if (operation === 'delete') {
						method = 'DELETE';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const tagName = this.getNodeParameter('tagName', i) as string;
						endpoint = `/repos/${owner}/${repo}/tags/${tagName}`;
					} else if (operation === 'list') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/tags`;
						qs = { page, limit };
					}
				}

				// ===============================================
				// Commit Operations
				// ===============================================
				else if (resource === 'commit') {
					if (operation === 'get') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const sha = this.getNodeParameter('sha', i) as string;

						// If SHA is not provided, fetch the latest commit
						if (!sha || sha.trim() === '') {
							endpoint = `/repos/${owner}/${repo}/commits`;
							qs = { page: 1, limit: 1 };
						} else {
							endpoint = `/repos/${owner}/${repo}/git/commits/${sha}`;
						}
					} else if (operation === 'list') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/commits`;
						qs = { page, limit };
					} else if (operation === 'getStatus') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const sha = this.getNodeParameter('sha', i) as string;
						endpoint = `/repos/${owner}/${repo}/statuses/${sha}`;
					} else if (operation === 'createStatus') {
						method = 'POST';
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const sha = this.getNodeParameter('sha', i) as string;
						const statusState = this.getNodeParameter('statusState', i) as string;
						const context = this.getNodeParameter('context', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const targetUrl = this.getNodeParameter('targetUrl', i) as string;
						endpoint = `/repos/${owner}/${repo}/statuses/${sha}`;
						body = {
							state: statusState,
						};
						if (context) {
							body.context = context;
						}
						if (description) {
							body.description = description;
						}
						if (targetUrl) {
							body.target_url = targetUrl;
						}
					} else if (operation === 'listStatuses') {
						const owner = this.getNodeParameter('owner', i) as string;
						const repo = this.getNodeParameter('repository', i) as string;
						const sha = this.getNodeParameter('sha', i) as string;
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						endpoint = `/repos/${owner}/${repo}/commits/${sha}/statuses`;
						qs = { page, limit };
					}
				}

				// Make the HTTP request
				const requestOptions: IHttpRequestOptions = {
					method,
					url: `${baseUrl}${endpoint}`,
					json: true,
				};

				if (Object.keys(qs).length > 0) {
					requestOptions.qs = qs;
				}

				if (Object.keys(body).length > 0) {
					requestOptions.body = body;
				}

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'forgejoApi',
					requestOptions,
				);

				// Handle the response
				if (Array.isArray(response)) {
					response.forEach((item) => {
						returnData.push({ json: item });
					});
				} else if (response) {
					returnData.push({ json: response });
				} else {
					// For operations that don't return data (like delete)
					returnData.push({
						json: { success: true },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : String(error),
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
