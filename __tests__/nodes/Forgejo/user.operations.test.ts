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
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ ...mockUserData, id: i + 1, login: `user${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ ...mockUserData, id: i + 51, login: `user${i + 51}` }));
			const page3Data = Array(25).fill(null).map((_, i) => ({ ...mockUserData, id: i + 101, login: `user${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

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

			const result = await forgejoNode.execute.call(mockFunctions);

			// Should make 3 requests (page 1, 2, and 3)
			expect(mockHttpRequest).toHaveBeenCalledTimes(3);

			// Check first page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				1,
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

			// Check second page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				2,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/users',
					json: true,
					qs: {
						page: 2,
						limit: 50,
					},
				})
			);

			// Check third page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				3,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/users',
					json: true,
					qs: {
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 125 items
			expect(result[0]).toHaveLength(125);
		});
	});

	describe('User Search Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ ...mockUserData, id: i + 1, login: `testuser${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ ...mockUserData, id: i + 51, login: `testuser${i + 51}` }));
			const page3Data = Array(30).fill(null).map((_, i) => ({ ...mockUserData, id: i + 101, login: `testuser${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

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

			const result = await forgejoNode.execute.call(mockFunctions);

			// Should make 3 requests (page 1, 2, and 3)
			expect(mockHttpRequest).toHaveBeenCalledTimes(3);

			// Check first page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				1,
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

			// Check second page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				2,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/users/search',
					json: true,
					qs: {
						q: 'test',
						page: 2,
						limit: 50,
					},
				})
			);

			// Check third page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				3,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/users/search',
					json: true,
					qs: {
						q: 'test',
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 130 items
			expect(result[0]).toHaveLength(130);
		});
	});

	describe('User Get Repositories Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ id: i + 1, name: `repo${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ id: i + 51, name: `repo${i + 51}` }));
			const page3Data = Array(20).fill(null).map((_, i) => ({ id: i + 101, name: `repo${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

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

			const result = await forgejoNode.execute.call(mockFunctions);

			// Should make 3 requests (page 1, 2, and 3)
			expect(mockHttpRequest).toHaveBeenCalledTimes(3);

			// Check first page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				1,
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

			// Check second page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				2,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/users/testuser/repos',
					json: true,
					qs: {
						page: 2,
						limit: 50,
					},
				})
			);

			// Check third page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				3,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/users/testuser/repos',
					json: true,
					qs: {
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 120 items
			expect(result[0]).toHaveLength(120);
		});
	});

	describe('User Get Organizations Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ id: i + 1, name: `org${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ id: i + 51, name: `org${i + 51}` }));
			const page3Data = Array(15).fill(null).map((_, i) => ({ id: i + 101, name: `org${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

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

			const result = await forgejoNode.execute.call(mockFunctions);

			// Should make 3 requests (page 1, 2, and 3)
			expect(mockHttpRequest).toHaveBeenCalledTimes(3);

			// Check first page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				1,
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

			// Check second page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				2,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/users/testuser/orgs',
					json: true,
					qs: {
						page: 2,
						limit: 50,
					},
				})
			);

			// Check third page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				3,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/users/testuser/orgs',
					json: true,
					qs: {
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 115 items
			expect(result[0]).toHaveLength(115);
		});
	});
});
