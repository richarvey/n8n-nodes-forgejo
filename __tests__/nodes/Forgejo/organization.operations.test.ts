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
		test('should list organizations with pagination', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockOrganizationData]);

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

			await forgejoNode.execute.call(mockFunctions);

			expect(mockHttpRequest).toHaveBeenCalledWith(
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
		});
	});

	describe('Organization List Members Operation', () => {
		test('should list organization members', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ login: 'member1' }]);

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

			await forgejoNode.execute.call(mockFunctions);

			expect(mockHttpRequest).toHaveBeenCalledWith(
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
		});
	});

	describe('Organization List Repositories Operation', () => {
		test('should list organization repositories', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ name: 'repo1' }]);

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

			await forgejoNode.execute.call(mockFunctions);

			expect(mockHttpRequest).toHaveBeenCalledWith(
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
		});
	});

	describe('Organization List Teams Operation', () => {
		test('should list organization teams', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ name: 'team1' }]);

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

			await forgejoNode.execute.call(mockFunctions);

			expect(mockHttpRequest).toHaveBeenCalledWith(
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
		});
	});
});
