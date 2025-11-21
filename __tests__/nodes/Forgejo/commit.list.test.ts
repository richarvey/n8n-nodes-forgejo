import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - Commit List Operations', () => {
	let forgejoNode: Forgejo;

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe('Commit List Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages - using simpler objects to avoid memory issues
			const page1Data = Array(10).fill(null).map((_, i) => ({ sha: `abc${i + 1}` }));
			const page2Data = Array(10).fill(null).map((_, i) => ({ sha: `abc${i + 11}` }));
			const page3Data = Array(5).fill(null).map((_, i) => ({ sha: `abc${i + 21}` }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'commit',
						operation: 'list',
						owner: 'testuser',
						repository: 'test-repo',
						page: 1,
						limit: 10,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/commits',
					json: true,
					qs: {
						page: 1,
						limit: 10,
					},
				})
			);

			// Check second page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				2,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/commits',
					json: true,
					qs: {
						page: 2,
						limit: 10,
					},
				})
			);

			// Check third page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				3,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/commits',
					json: true,
					qs: {
						page: 3,
						limit: 10,
					},
				})
			);

			// Should return all 25 items
			expect(result[0]).toHaveLength(25);
		});
	});

	describe('Commit Status List Operation', () => {
		test('should fetch all pages automatically', async () => {
			// Mock responses for multiple pages - using simpler objects to avoid memory issues
			const page1Data = Array(10).fill(null).map((_, i) => ({ id: i + 1, state: 'success' }));
			const page2Data = Array(10).fill(null).map((_, i) => ({ id: i + 11, state: 'success' }));
			const page3Data = Array(7).fill(null).map((_, i) => ({ id: i + 21, state: 'success' }));

			const mockHttpRequest = jest.fn()
				.mockResolvedValueOnce(page1Data)
				.mockResolvedValueOnce(page2Data)
				.mockResolvedValueOnce(page3Data);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'commit',
						operation: 'listStatuses',
						owner: 'testuser',
						repository: 'test-repo',
						sha: 'abc123def456',
						page: 1,
						limit: 10,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/commits/abc123def456/statuses',
					json: true,
					qs: {
						page: 1,
						limit: 10,
					},
				})
			);

			// Check second page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				2,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/commits/abc123def456/statuses',
					json: true,
					qs: {
						page: 2,
						limit: 10,
					},
				})
			);

			// Check third page request
			expect(mockHttpRequest).toHaveBeenNthCalledWith(
				3,
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/commits/abc123def456/statuses',
					json: true,
					qs: {
						page: 3,
						limit: 10,
					},
				})
			);

			// Should return all 27 items
			expect(result[0]).toHaveLength(27);
		});
	});
});
