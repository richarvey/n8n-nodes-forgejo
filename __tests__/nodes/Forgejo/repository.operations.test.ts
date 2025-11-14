import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials, mockRepositoryData } from '../../mocks/mockFunctions';
import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

describe('Forgejo Node - Repository Operations', () => {
	let forgejoNode: Forgejo;

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('Node Description', () => {
		test('should have correct node properties', () => {
			expect(forgejoNode.description.displayName).toBe('Forgejo');
			expect(forgejoNode.description.name).toBe('forgejo');
			expect(forgejoNode.description.group).toContain('transform');
		});

		test('should have repository resource option', () => {
			const resourceProperty = forgejoNode.description.properties.find(
				p => p.name === 'resource'
			);
			expect(resourceProperty).toBeDefined();
			expect(resourceProperty?.type).toBe('options');

			const options = (resourceProperty as any)?.options || [];
			const repositoryOption = options.find((o: any) => o.value === 'repository');
			expect(repositoryOption).toBeDefined();
		});
	});

	describe('Repository Create Operation', () => {
		test('should construct correct endpoint for repository creation', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockRepositoryData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'create',
						name: 'test-repo',
						description: 'A test repository',
						private: false,
						autoInit: true,
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
					url: 'https://code.squarecows.com/api/v1/user/repos',
					json: true,
					body: {
						name: 'test-repo',
						description: 'A test repository',
						private: false,
						auto_init: true,
					},
				})
			);
		});
	});

	describe('Repository Get Operation', () => {
		test('should construct correct endpoint for getting a repository', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockRepositoryData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo',
					json: true,
				})
			);
		});
	});

	describe('Repository Update Operation', () => {
		test('should construct correct endpoint for updating a repository', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockRepositoryData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'update',
						owner: 'testuser',
						repository: 'test-repo',
						updateFields: {
							description: 'Updated description',
							private: true,
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
					method: 'PATCH',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo',
					json: true,
					body: {
						description: 'Updated description',
						private: true,
					},
				})
			);
		});
	});

	describe('Repository Delete Operation', () => {
		test('should construct correct endpoint for deleting a repository', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'delete',
						owner: 'testuser',
						repository: 'test-repo',
					},
					mockCredentials
				),
				helpers: {
					httpRequestWithAuthentication: mockHttpRequest,
				},
				continueOnFail: jest.fn(() => false),
			} as unknown as IExecuteFunctions;

			const result = await forgejoNode.execute.call(mockFunctions);

			expect(mockHttpRequest).toHaveBeenCalledWith(
				'forgejoApi',
				expect.objectContaining({
					method: 'DELETE',
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo',
					json: true,
				})
			);

			// Should return success for operations that don't return data
			expect(result[0][0].json).toEqual({ success: true });
		});
	});

	describe('Repository List Operation', () => {
		test('should construct correct endpoint with pagination parameters', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockRepositoryData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'list',
						owner: 'testuser',
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

			await forgejoNode.execute.call(mockFunctions);

			expect(mockHttpRequest).toHaveBeenCalledWith(
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/users/testuser/repos',
					json: true,
					qs: {
						page: 1,
						limit: 10,
					},
				})
			);
		});
	});

	describe('Repository Search Operation', () => {
		test('should construct correct endpoint with search query', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockRepositoryData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'search',
						query: 'test',
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

			await forgejoNode.execute.call(mockFunctions);

			expect(mockHttpRequest).toHaveBeenCalledWith(
				'forgejoApi',
				expect.objectContaining({
					method: 'GET',
					url: 'https://code.squarecows.com/api/v1/repos/search',
					json: true,
					qs: {
						q: 'test',
						page: 1,
						limit: 10,
					},
				})
			);
		});
	});

	describe('Repository File Operations', () => {
		test('should get file contents with correct encoding', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({
				content: Buffer.from('test content').toString('base64'),
				path: 'README.md',
			});

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'getContents',
						owner: 'testuser',
						repository: 'test-repo',
						filePath: 'README.md',
						ref: 'main',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/contents/README.md',
					json: true,
					qs: {
						ref: 'main',
					},
				})
			);
		});

		test('should create file with base64 encoded content', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ path: 'test.txt' });
			const testContent = 'Hello, World!';
			const base64Content = Buffer.from(testContent).toString('base64');

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'createFile',
						owner: 'testuser',
						repository: 'test-repo',
						filePath: 'test.txt',
						content: testContent,
						message: 'Create test file',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/contents/test.txt',
					json: true,
					body: {
						content: base64Content,
						message: 'Create test file',
					},
				})
			);
		});

		test('should update file with base64 encoded content and SHA', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ path: 'test.txt' });
			const testContent = 'Updated content';
			const base64Content = Buffer.from(testContent).toString('base64');

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'updateFile',
						owner: 'testuser',
						repository: 'test-repo',
						filePath: 'test.txt',
						content: testContent,
						message: 'Update test file',
						sha: 'abc123',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/contents/test.txt',
					json: true,
					body: {
						content: base64Content,
						message: 'Update test file',
						sha: 'abc123',
					},
				})
			);
		});

		test('should delete file with commit message and SHA', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'deleteFile',
						owner: 'testuser',
						repository: 'test-repo',
						filePath: 'test.txt',
						message: 'Delete test file',
						sha: 'abc123',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/contents/test.txt',
					json: true,
					body: {
						message: 'Delete test file',
						sha: 'abc123',
					},
				})
			);
		});
	});

	describe('Error Handling', () => {
		test('should handle errors when continueOnFail is false', async () => {
			const mockError = new Error('API Error');
			const mockHttpRequest = jest.fn().mockRejectedValue(mockError);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
					},
					mockCredentials
				),
				helpers: {
					httpRequestWithAuthentication: mockHttpRequest,
				},
				continueOnFail: jest.fn(() => false),
			} as unknown as IExecuteFunctions;

			await expect(forgejoNode.execute.call(mockFunctions)).rejects.toThrow('API Error');
		});

		test('should continue on fail when continueOnFail is true', async () => {
			const mockError = new Error('API Error');
			const mockHttpRequest = jest.fn().mockRejectedValue(mockError);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'repository',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
					},
					mockCredentials
				),
				helpers: {
					httpRequestWithAuthentication: mockHttpRequest,
				},
				continueOnFail: jest.fn(() => true),
			} as unknown as IExecuteFunctions;

			const result = await forgejoNode.execute.call(mockFunctions);

			expect(result[0][0].json).toEqual({ error: 'API Error' });
		});
	});
});
