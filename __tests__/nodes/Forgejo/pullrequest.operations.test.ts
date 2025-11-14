import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials, mockPullRequestData } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - Pull Request Operations', () => {
	let forgejoNode: Forgejo;

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('Pull Request Create Operation', () => {
		test('should create pull request with required fields', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockPullRequestData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						title: 'Test PR',
						head: 'feature-branch',
						base: 'main',
						body: 'This is a test PR',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls',
					json: true,
					body: {
						title: 'Test PR',
						head: 'feature-branch',
						base: 'main',
						body: 'This is a test PR',
					},
				})
			);
		});

		test('should create pull request with assignees', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockPullRequestData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						title: 'Test PR',
						head: 'feature-branch',
						base: 'main',
						body: 'This is a test PR',
						assignees: 'reviewer1, reviewer2',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls',
					json: true,
					body: {
						title: 'Test PR',
						head: 'feature-branch',
						base: 'main',
						body: 'This is a test PR',
						assignees: ['reviewer1', 'reviewer2'],
					},
				})
			);
		});
	});

	describe('Pull Request Get Operation', () => {
		test('should get pull request by number', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockPullRequestData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
						pullRequestNumber: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls/1',
					json: true,
				})
			);
		});
	});

	describe('Pull Request Update Operation', () => {
		test('should update pull request body', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockPullRequestData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'update',
						owner: 'testuser',
						repository: 'test-repo',
						pullRequestNumber: 1,
						body: 'Updated PR description',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls/1',
					json: true,
					body: {
						body: 'Updated PR description',
					},
				})
			);
		});

		test('should update pull request assignees', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockPullRequestData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'update',
						owner: 'testuser',
						repository: 'test-repo',
						pullRequestNumber: 1,
						body: '',
						assignees: 'newreviewer',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls/1',
					json: true,
					body: {
						assignees: ['newreviewer'],
					},
				})
			);
		});
	});

	describe('Pull Request Delete Operation', () => {
		test('should delete pull request', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'delete',
						owner: 'testuser',
						repository: 'test-repo',
						pullRequestNumber: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls/1',
					json: true,
				})
			);
		});
	});

	describe('Pull Request List Operation', () => {
		test('should list pull requests with state filter', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockPullRequestData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls',
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

	describe('Pull Request Merge Operation', () => {
		test('should merge pull request with merge method', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ merged: true });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'merge',
						owner: 'testuser',
						repository: 'test-repo',
						pullRequestNumber: 1,
						mergeMethod: 'squash',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls/1/merge',
					json: true,
					body: {
						Do: 'squash',
					},
				})
			);
		});
	});

	describe('Pull Request State Operations', () => {
		test('should close pull request', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ ...mockPullRequestData, state: 'closed' });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'close',
						owner: 'testuser',
						repository: 'test-repo',
						pullRequestNumber: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls/1',
					json: true,
					body: {
						state: 'closed',
					},
				})
			);
		});

		test('should reopen pull request', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ ...mockPullRequestData, state: 'open' });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'reopen',
						owner: 'testuser',
						repository: 'test-repo',
						pullRequestNumber: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls/1',
					json: true,
					body: {
						state: 'open',
					},
				})
			);
		});
	});

	describe('Pull Request Commits and Files', () => {
		test('should list pull request commits', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ sha: 'abc123' }]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'listCommits',
						owner: 'testuser',
						repository: 'test-repo',
						pullRequestNumber: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls/1/commits',
					json: true,
					qs: {
						page: 1,
						limit: 50,
					},
				})
			);
		});

		test('should list pull request files', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ filename: 'test.txt' }]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'pullRequest',
						operation: 'listFiles',
						owner: 'testuser',
						repository: 'test-repo',
						pullRequestNumber: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/pulls/1/files',
					json: true,
					qs: {
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});
});
