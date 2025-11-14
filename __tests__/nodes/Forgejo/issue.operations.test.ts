import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials, mockIssueData } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - Issue Operations', () => {
	let forgejoNode: Forgejo;

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('Issue Create Operation', () => {
		test('should create issue with title and body', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockIssueData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						title: 'Test Issue',
						body: 'This is a test issue',
						labels: '',
						assignees: '',
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
					method: 'POST',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues',
					json: true,
					body: {
						title: 'Test Issue',
						body: 'This is a test issue',
					},
				})
			);
		});

		test('should create issue with labels and assignees', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockIssueData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						title: 'Test Issue',
						body: 'This is a test issue',
						labels: 'bug, enhancement',
						assignees: 'user1, user2',
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
					method: 'POST',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues',
					json: true,
					body: {
						title: 'Test Issue',
						body: 'This is a test issue',
						labels: ['bug', 'enhancement'],
						assignees: ['user1', 'user2'],
					},
				})
			);
		});
	});

	describe('Issue Get Operation', () => {
		test('should get issue by number', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockIssueData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
						issueNumber: 1,
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
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues/1',
					json: true,
				})
			);
		});
	});

	describe('Issue Update Operation', () => {
		test('should update issue with new body', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockIssueData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'update',
						owner: 'testuser',
						repository: 'test-repo',
						issueNumber: 1,
						body: 'Updated issue body',
						labels: '',
						assignees: '',
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
					method: 'PATCH',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues/1',
					json: true,
					body: {
						body: 'Updated issue body',
					},
				})
			);
		});

		test('should update issue labels and assignees', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockIssueData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'update',
						owner: 'testuser',
						repository: 'test-repo',
						issueNumber: 1,
						body: '',
						labels: 'critical',
						assignees: 'admin',
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
					method: 'PATCH',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues/1',
					json: true,
					body: {
						labels: ['critical'],
						assignees: ['admin'],
					},
				})
			);
		});
	});

	describe('Issue Delete Operation', () => {
		test('should delete issue', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'delete',
						owner: 'testuser',
						repository: 'test-repo',
						issueNumber: 1,
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
					method: 'DELETE',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues/1',
					json: true,
				})
			);
		});
	});

	describe('Issue List Operation', () => {
		test('should list issues with state filter', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockIssueData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'list',
						owner: 'testuser',
						repository: 'test-repo',
						state: 'open',
						page: 1,
						limit: 50,
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
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues',
					json: true,
					qs: {
						state: 'open',
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});

	describe('Issue Search Operation', () => {
		test('should search issues with query', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockIssueData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'search',
						query: 'bug',
						page: 1,
						limit: 50,
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
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/issues/search',
					json: true,
					qs: {
						q: 'bug',
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});

	describe('Issue Comment Operations', () => {
		test('should add comment to issue', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ body: 'Test comment' });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'addComment',
						owner: 'testuser',
						repository: 'test-repo',
						issueNumber: 1,
						body: 'Test comment',
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
					method: 'POST',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues/1/comments',
					json: true,
					body: {
						body: 'Test comment',
					},
				})
			);
		});

		test('should list issue comments', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ body: 'Comment 1' }]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'listComments',
						owner: 'testuser',
						repository: 'test-repo',
						issueNumber: 1,
						page: 1,
						limit: 50,
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
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues/1/comments',
					json: true,
					qs: {
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});

	describe('Issue Label Operations', () => {
		test('should edit labels on issue', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ name: 'bug' }]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'editLabels',
						owner: 'testuser',
						repository: 'test-repo',
						issueNumber: 1,
						labels: 'bug, critical',
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
					method: 'PUT',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues/1/labels',
					json: true,
					body: {
						labels: ['bug', 'critical'],
					},
				})
			);
		});
	});

	describe('Issue State Operations', () => {
		test('should close issue', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ ...mockIssueData, state: 'closed' });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'close',
						owner: 'testuser',
						repository: 'test-repo',
						issueNumber: 1,
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
					method: 'PATCH',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues/1',
					json: true,
					body: {
						state: 'closed',
					},
				})
			);
		});

		test('should reopen issue', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ ...mockIssueData, state: 'open' });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'issue',
						operation: 'reopen',
						owner: 'testuser',
						repository: 'test-repo',
						issueNumber: 1,
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
					method: 'PATCH',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/issues/1',
					json: true,
					body: {
						state: 'open',
					},
				})
			);
		});
	});
});
