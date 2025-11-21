import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - Organization Operations', () => {
	let forgejoNode: Forgejo;

	const mockOrganizationData = {
		id: 1,
		username: 'testorg',
		full_name: 'Test Organization',
		description: 'A test organization',
		avatar_url: 'https://code.squarecows.com/avatar/testorg',
	};

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('Organization Create Operation', () => {
		test('should create organization with all fields', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockOrganizationData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
						operation: 'create',
						username: 'testorg',
						fullName: 'Test Organization',
						description: 'A test organization',
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
					url: 'https://code.squarecows.com/api/v1/orgs',
					json: true,
					body: {
						username: 'testorg',
						full_name: 'Test Organization',
						description: 'A test organization',
					},
				})
			);
		});
	});

	describe('Organization Get Operation', () => {
		test('should get organization by name', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockOrganizationData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
						operation: 'get',
						organization: 'testorg',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg',
					json: true,
				})
			);
		});
	});

	describe('Organization Update Operation', () => {
		test('should update organization with full name', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockOrganizationData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
						operation: 'update',
						organization: 'testorg',
						fullName: 'Updated Organization Name',
						description: '',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg',
					json: true,
					body: {
						full_name: 'Updated Organization Name',
					},
				})
			);
		});

		test('should update organization with description', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockOrganizationData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
						operation: 'update',
						organization: 'testorg',
						fullName: '',
						description: 'Updated description',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg',
					json: true,
					body: {
						description: 'Updated description',
					},
				})
			);
		});

		test('should update organization with both fields', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockOrganizationData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
						operation: 'update',
						organization: 'testorg',
						fullName: 'Updated Name',
						description: 'Updated description',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg',
					json: true,
					body: {
						full_name: 'Updated Name',
						description: 'Updated description',
					},
				})
			);
		});
	});

	describe('Organization Delete Operation', () => {
		test('should delete organization', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
						operation: 'delete',
						organization: 'testorg',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg',
					json: true,
				})
			);
		});
	});

	describe('Organization List Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ ...mockOrganizationData, id: i + 1, username: `org${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ ...mockOrganizationData, id: i + 51, username: `org${i + 51}` }));
			const page3Data = Array(35).fill(null).map((_, i) => ({ ...mockOrganizationData, id: i + 101, username: `org${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
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
					url: 'https://code.squarecows.com/api/v1/orgs',
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
					url: 'https://code.squarecows.com/api/v1/orgs',
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
					url: 'https://code.squarecows.com/api/v1/orgs',
					json: true,
					qs: {
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 135 items
			expect(result[0]).toHaveLength(135);
		});
	});

	describe('Organization List Members Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ id: i + 1, login: `member${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ id: i + 51, login: `member${i + 51}` }));
			const page3Data = Array(40).fill(null).map((_, i) => ({ id: i + 101, login: `member${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
						operation: 'listMembers',
						organization: 'testorg',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg/members',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg/members',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg/members',
					json: true,
					qs: {
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 140 items
			expect(result[0]).toHaveLength(140);
		});
	});

	describe('Organization List Repositories Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ id: i + 1, name: `repo${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ id: i + 51, name: `repo${i + 51}` }));
			const page3Data = Array(28).fill(null).map((_, i) => ({ id: i + 101, name: `repo${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
						operation: 'listRepositories',
						organization: 'testorg',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg/repos',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg/repos',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg/repos',
					json: true,
					qs: {
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 128 items
			expect(result[0]).toHaveLength(128);
		});
	});

	describe('Organization List Teams Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ id: i + 1, name: `team${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ id: i + 51, name: `team${i + 51}` }));
			const page3Data = Array(22).fill(null).map((_, i) => ({ id: i + 101, name: `team${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'organization',
						operation: 'listTeams',
						organization: 'testorg',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg/teams',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg/teams',
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
					url: 'https://code.squarecows.com/api/v1/orgs/testorg/teams',
					json: true,
					qs: {
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 122 items
			expect(result[0]).toHaveLength(122);
		});
	});
});
