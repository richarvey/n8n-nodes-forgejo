import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - User Operations', () => {
	let forgejoNode: Forgejo;

	const mockUserData = {
		id: 1,
		login: 'testuser',
		full_name: 'Test User',
		email: 'test@example.com',
		avatar_url: 'https://code.squarecows.com/avatar/testuser',
		created: '2024-01-01T00:00:00Z',
	};

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('User Get Operation', () => {
		test('should get user by username', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockUserData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'user',
						operation: 'get',
						username: 'testuser',
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
					url: 'https://code.squarecows.com/api/v1/users/testuser',
					json: true,
				})
			);
		});
	});

	describe('User Get Authenticated Operation', () => {
		test('should get authenticated user', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockUserData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'user',
						operation: 'getAuthenticatedUser',
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
					url: 'https://code.squarecows.com/api/v1/user',
					json: true,
				})
			);
		});
	});

	describe('User List Operation', () => {
		test('should list users with pagination', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockUserData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'user',
						operation: 'list',
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
					url: 'https://code.squarecows.com/api/v1/users',
					json: true,
					qs: {
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});

	describe('User Search Operation', () => {
		test('should search users with query', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockUserData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'user',
						operation: 'search',
						query: 'test',
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
					url: 'https://code.squarecows.com/api/v1/users/search',
					json: true,
					qs: {
						q: 'test',
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});

	describe('User Get Repositories Operation', () => {
		test('should get user repositories', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ name: 'repo1' }]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'user',
						operation: 'getRepositories',
						username: 'testuser',
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
					url: 'https://code.squarecows.com/api/v1/users/testuser/repos',
					json: true,
					qs: {
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});

	describe('User Get Organizations Operation', () => {
		test('should get user organizations', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ name: 'org1' }]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'user',
						operation: 'getOrganizations',
						username: 'testuser',
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
					url: 'https://code.squarecows.com/api/v1/users/testuser/orgs',
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
