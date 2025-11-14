import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - Commit Operations', () => {
	let forgejoNode: Forgejo;

	const mockCommitData = {
		sha: 'abc123def456',
		commit: {
			message: 'Test commit',
			author: {
				name: 'Test User',
				email: 'test@example.com',
			},
		},
		author: {
			login: 'testuser',
		},
	};

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('Commit Get Operation', () => {
		test('should get commit by SHA', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockCommitData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'commit',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
						sha: 'abc123def456',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/git/commits/abc123def456',
					json: true,
				})
			);
		});

		test('should get latest commit when SHA is empty', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockCommitData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'commit',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
						sha: '',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/commits',
					json: true,
					qs: {
						page: 1,
						limit: 1,
					},
				})
			);
		});
	});

	describe('Commit List Operation', () => {
		test('should list commits with pagination', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockCommitData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'commit',
						operation: 'list',
						owner: 'testuser',
						repository: 'test-repo',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/commits',
					json: true,
					qs: {
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});

	describe('Commit Status Operations', () => {
		test('should get commit status', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ state: 'success' });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'commit',
						operation: 'getStatus',
						owner: 'testuser',
						repository: 'test-repo',
						sha: 'abc123def456',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/statuses/abc123def456',
					json: true,
				})
			);
		});

		test('should create commit status with all fields', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ state: 'success' });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'commit',
						operation: 'createStatus',
						owner: 'testuser',
						repository: 'test-repo',
						sha: 'abc123def456',
						statusState: 'success',
						context: 'ci/test',
						description: 'Tests passed',
						targetUrl: 'https://ci.example.com/build/123',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/statuses/abc123def456',
					json: true,
					body: {
						state: 'success',
						context: 'ci/test',
						description: 'Tests passed',
						target_url: 'https://ci.example.com/build/123',
					},
				})
			);
		});

		test('should create commit status with only required fields', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ state: 'pending' });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'commit',
						operation: 'createStatus',
						owner: 'testuser',
						repository: 'test-repo',
						sha: 'abc123def456',
						statusState: 'pending',
						context: '',
						description: '',
						targetUrl: '',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/statuses/abc123def456',
					json: true,
					body: {
						state: 'pending',
					},
				})
			);
		});

		test('should list commit statuses', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ state: 'success' }]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'commit',
						operation: 'listStatuses',
						owner: 'testuser',
						repository: 'test-repo',
						sha: 'abc123def456',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/commits/abc123def456/statuses',
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
