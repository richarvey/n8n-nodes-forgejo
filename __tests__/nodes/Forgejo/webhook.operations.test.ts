import { Forgejo } from '../../../nodes/Forgejo/Forgejo.node';
import { createMockExecuteFunctions, mockCredentials } from '../../mocks/mockFunctions';
import type { IExecuteFunctions } from 'n8n-workflow';

describe('Forgejo Node - Webhook Operations', () => {
	let forgejoNode: Forgejo;

	const mockWebhookData = {
		id: 1,
		type: 'forgejo',
		config: {
			url: 'https://webhook.example.com/hook',
			content_type: 'json',
		},
		events: ['push'],
		active: true,
	};

	beforeEach(() => {
		forgejoNode = new Forgejo();
	});

	describe('Webhook Create Operation', () => {
		test('should create webhook with single event', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockWebhookData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'webhook',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						webhookUrl: 'https://webhook.example.com/hook',
						events: ['push'],
						active: true,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/hooks',
					json: true,
					body: {
						type: 'forgejo',
						config: {
							url: 'https://webhook.example.com/hook',
							content_type: 'json',
						},
						events: ['push'],
						active: true,
					},
				})
			);
		});

		test('should create webhook with multiple events', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockWebhookData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'webhook',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						webhookUrl: 'https://webhook.example.com/hook',
						events: ['push', 'issues', 'pull_request'],
						active: true,
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
						events: ['push', 'issues', 'pull_request'],
					}),
				})
			);
		});

		test('should create inactive webhook', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ ...mockWebhookData, active: false });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'webhook',
						operation: 'create',
						owner: 'testuser',
						repository: 'test-repo',
						webhookUrl: 'https://webhook.example.com/hook',
						events: ['push'],
						active: false,
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
						active: false,
					}),
				})
			);
		});
	});

	describe('Webhook Get Operation', () => {
		test('should get webhook by ID', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockWebhookData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'webhook',
						operation: 'get',
						owner: 'testuser',
						repository: 'test-repo',
						webhookId: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/hooks/1',
					json: true,
				})
			);
		});
	});

	describe('Webhook Update Operation', () => {
		test('should update webhook URL and events', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(mockWebhookData);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'webhook',
						operation: 'update',
						owner: 'testuser',
						repository: 'test-repo',
						webhookId: 1,
						webhookUrl: 'https://newhook.example.com/webhook',
						events: ['push', 'release'],
						active: true,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/hooks/1',
					json: true,
					body: {
						config: {
							url: 'https://newhook.example.com/webhook',
							content_type: 'json',
						},
						events: ['push', 'release'],
						active: true,
					},
				})
			);
		});

		test('should disable webhook', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue({ ...mockWebhookData, active: false });

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'webhook',
						operation: 'update',
						owner: 'testuser',
						repository: 'test-repo',
						webhookId: 1,
						webhookUrl: 'https://webhook.example.com/hook',
						events: ['push'],
						active: false,
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
						active: false,
					}),
				})
			);
		});
	});

	describe('Webhook Delete Operation', () => {
		test('should delete webhook', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'webhook',
						operation: 'delete',
						owner: 'testuser',
						repository: 'test-repo',
						webhookId: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/hooks/1',
					json: true,
				})
			);
		});
	});

	describe('Webhook List Operation', () => {
		test('should list webhooks with pagination', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue([mockWebhookData]);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'webhook',
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/hooks',
					json: true,
					qs: {
						page: 1,
						limit: 50,
					},
				})
			);
		});
	});

	describe('Webhook Test Operation', () => {
		test('should test webhook', async () => {
			const mockHttpRequest = jest.fn().mockResolvedValue(null);

			const mockFunctions = {
				...createMockExecuteFunctions(
					{
						resource: 'webhook',
						operation: 'test',
						owner: 'testuser',
						repository: 'test-repo',
						webhookId: 1,
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
					url: 'https://code.squarecows.com/api/v1/repos/testuser/test-repo/hooks/1/tests',
					json: true,
				})
			);
		});
	});
});
