import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - Tag Operations', () => {
	let forgejoNode: Forgejo;

	const mockTagData = {
		name: 'v1.0.0',
		message: 'Version 1.0.0',
		commit: {
			sha: 'abc123',
			url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/git/commits/abc123',
		},
	};

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('Tag Create Operation', () => {
		test('should create tag with message and target', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockTagData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'tag',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						tagName: 'v1.0.0',
						message: 'Version 1.0.0',
						target: 'abc123',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/tags',
					json: true,
					body: {
						tag_name: 'v1.0.0',
						message: 'Version 1.0.0',
						target: 'abc123',
					},
				})
			);
		});

		test('should create tag without target (uses default branch)', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockTagData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'tag',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						tagName: 'v1.0.0',
						message: 'Version 1.0.0',
						target: '',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/tags',
					json: true,
					body: {
						tag_name: 'v1.0.0',
						message: 'Version 1.0.0',
					},
				})
			);
		});

		test('should create lightweight tag without message', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockTagData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'tag',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						tagName: 'v1.0.1',
						message: '',
						target: '',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/tags',
					json: true,
					body: {
						tag_name: 'v1.0.1',
						message: '',
					},
				})
			);
		});
	});

	describe('Tag Get Operation', () => {
		test('should get tag by name', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockTagData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'tag',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
						tagName: 'v1.0.0',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/tags/v1.0.0',
					json: true,
				})
			);
		});
	});

	describe('Tag Delete Operation', () => {
		test('should delete tag', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'tag',
						operation: 'delete',
						owner: 'testuser',
						repository: 'test-repo',
						tagName: 'v1.0.0',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/tags/v1.0.0',
					json: true,
				})
			);
		});
	});

	describe('Tag List Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages
			const page1Data = Array(50).fill(null).map((_, i) => ({ ...mockTagData, name: `v1.0.${i + 1}` }));
			const page2Data = Array(50).fill(null).map((_, i) => ({ ...mockTagData, name: `v1.0.${i + 51}` }));
			const page3Data = Array(26).fill(null).map((_, i) => ({ ...mockTagData, name: `v1.0.${i + 101}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'tag',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/tags',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/tags',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/tags',
					json: true,
					qs: {
						page: 3,
						limit: 50,
					},
				})
			);

			// Should return all 126 items
			expect(result[0]).toHaveLength(126);
		});
	});
});
