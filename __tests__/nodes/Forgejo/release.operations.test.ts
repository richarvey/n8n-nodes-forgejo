import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - Release Operations', () => {
	let forgejoNode: Forgejo;

	const mockReleaseData = {
		id: 1,
		tag_name: 'v1.0.0',
		name: 'Version 1.0.0',
		body: 'Release notes',
		draft: false,
		prerelease: false,
	};

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('Release Create Operation', () => {
		test('should create release with all fields', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockReleaseData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'release',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						tagName: 'v1.0.0',
						name: 'Version 1.0.0',
						body: 'Release notes',
						draft: false,
						prerelease: false,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/releases',
					json: true,
					body: {
						tag_name: 'v1.0.0',
						name: 'Version 1.0.0',
						body: 'Release notes',
						draft: false,
						prerelease: false,
					},
				})
			);
		});

		test('should create draft prerelease', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ ...mockReleaseData, draft: true, prerelease: true });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'release',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						tagName: 'v2.0.0-beta',
						name: 'Version 2.0.0 Beta',
						body: 'Beta release',
						draft: true,
						prerelease: true,
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
					body: expect.objectContaining({
						draft: true,
						prerelease: true,
					}),
				})
			);
		});
	});

	describe('Release Get Operation', () => {
		test('should get release by ID', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockReleaseData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'release',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
						releaseId: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/releases/1',
					json: true,
				})
			);
		});
	});

	describe('Release Update Operation', () => {
		test('should update release with new name and body', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockReleaseData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'release',
						operation: 'update',
						owner: 'testuser',
						repository: 'test-repo',
						releaseId: 1,
						name: 'Updated Version 1.0.0',
						body: 'Updated release notes',
						draft: false,
						prerelease: false,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/releases/1',
					json: true,
					body: {
						name: 'Updated Version 1.0.0',
						body: 'Updated release notes',
						draft: false,
						prerelease: false,
					},
				})
			);
		});

		test('should update release draft status', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockReleaseData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'release',
						operation: 'update',
						owner: 'testuser',
						repository: 'test-repo',
						releaseId: 1,
						name: '',
						body: '',
						draft: true,
						prerelease: false,
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
					body: expect.objectContaining({
						draft: true,
						prerelease: false,
					}),
				})
			);
		});
	});

	describe('Release Delete Operation', () => {
		test('should delete release', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'release',
						operation: 'delete',
						owner: 'testuser',
						repository: 'test-repo',
						releaseId: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/releases/1',
					json: true,
				})
			);
		});
	});

	describe('Release List Operation', () => {
		test('should list releases with pagination', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockReleaseData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'release',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/releases',
					json: true,
					qs: {
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});

	describe('Release Assets Operations', () => {
		test('should list release assets', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([{ name: 'asset.zip' }]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'release',
						operation: 'listAssets',
						owner: 'testuser',
						repository: 'test-repo',
						releaseId: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/releases/1/assets',
					json: true,
					qs: {
						page: 1,
						limit: 50,
					},
				})
			);
		});

		test('should upload asset to release', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ name: 'binary.zip' });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'release',
						operation: 'uploadAsset',
						owner: 'testuser',
						repository: 'test-repo',
						releaseId: 1,
						assetName: 'binary.zip',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/releases/1/assets',
					json: true,
					qs: {
						name: 'binary.zip',
					},
				})
			);
		});
	});
});
