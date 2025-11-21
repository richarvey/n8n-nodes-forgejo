import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - Branch Operations', () => {
	let forgejoNode: Forgejo;

	const mockBranchData = {
		name: 'main',
		commit: {
			sha: 'abc123',
			message: 'Initial commit',
		},
		protected: false,
	};

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('Branch Create Operation', () => {
		test('should create branch from source branch', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockBranchData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'branch',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						branchName: 'feature-branch',
						sourceBranch: 'main',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/branches',
					json: true,
					body: {
						new_branch_name: 'feature-branch',
						old_branch_name: 'main',
					},
				})
			);
		});
	});

	describe('Branch Get Operation', () => {
		test('should get branch by name', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockBranchData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'branch',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
						branchName: 'main',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/branches/main',
					json: true,
				})
			);
		});
	});

	describe('Branch Delete Operation', () => {
		test('should delete branch', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'branch',
						operation: 'delete',
						owner: 'testuser',
						repository: 'test-repo',
						branchName: 'feature-branch',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/branches/feature-branch',
					json: true,
				})
			);
		});
	});

	describe('Branch List Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ ...mockBranchData, name: `branch${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ ...mockBranchData, name: `branch${i + 51}` }));
			const page3Data = Array(32).fill(null).map((_, i) => ({ ...mockBranchData, name: `branch${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'branch',
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

			const result = await forgejoNode.execute.call(mockFunctions);

			// Should make 3 requests (page 1, 2, and 3)
			expect(mockHttpRequest).toHaveBeenCalledTimes(3);

			// Check first page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				1,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/branches',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/branches',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/branches',
					json: true,
					qs: {
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 132 items
			expect(result[0]).toHaveLength(132);
		});
	});

	describe('Branch Protection Operations', () => {
		test('should get branch protection', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({
				enable_push: false,
				enable_push_whitelist: true,
				required_approvals: 2,
			});

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'branch',
						operation: 'getProtection',
						owner: 'testuser',
						repository: 'test-repo',
						branchName: 'main',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/branch_protections/main',
					json: true,
				})
			);
		});

		test('should update branch protection settings', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({
				enable_push: false,
				enable_push_whitelist: true,
				required_approvals: 2,
			});

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'branch',
						operation: 'updateProtection',
						owner: 'testuser',
						repository: 'test-repo',
						branchName: 'main',
						protectionSettings: {
							enable_push: false,
							enable_push_whitelist: true,
							required_approvals: 2,
						},
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/branch_protections',
					json: true,
					body: {
						branch_name: 'main',
						enable_push: false,
						enable_push_whitelist: true,
						required_approvals: 2,
					},
				})
			);
		});

		test('should update branch protection with minimal settings', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({});

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'branch',
						operation: 'updateProtection',
						owner: 'testuser',
						repository: 'test-repo',
						branchName: 'develop',
						protectionSettings: {},
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/branch_protections',
					json: true,
					body: {
						branch_name: 'develop',
					},
				})
			);
		});
	});
});
