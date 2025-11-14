import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export const createMockExecuteFunctions = (
	parameters: Record<string, any> = {},
	credentials: Record<string, any> = {},
	inputData: INodeExecutionData[] = [{ json: {} }]
): Partial<IExecuteFunctions> => {
	return {
		getInputData: jest.fn(() => inputData),
		getNodeParameter: jest.fn((parameterName: string, itemIndex: number) => {
			return parameters[parameterName];
		}),
		getCredentials: jest.fn(async () => credentials),
		helpers: {
			httpRequest: jest.fn(),
		} as any,
	};
};

export const mockCredentials = {
	serverUrl: 'https://code.squarecows.com',
	accessToken: 'test-token-123',
};

export const mockRepositoryData = {
	id: 1,
	name: 'test-repo',
	full_name: 'testuser/test-repo',
	description: 'A test repository',
	private: false,
	fork: false,
	html_url: 'https://code.squarecows.com/testuser/test-repo',
	clone_url: 'https://code.squarecows.com/testuser/test-repo.git',
	created_at: '2024-01-01T00:00:00Z',
	updated_at: '2024-01-01T00:00:00Z',
};

export const mockIssueData = {
	id: 1,
	number: 1,
	title: 'Test Issue',
	body: 'This is a test issue',
	state: 'open',
	user: {
		login: 'testuser',
	},
	created_at: '2024-01-01T00:00:00Z',
	updated_at: '2024-01-01T00:00:00Z',
};

export const mockPullRequestData = {
	id: 1,
	number: 1,
	title: 'Test PR',
	body: 'This is a test pull request',
	state: 'open',
	head: {
		ref: 'feature-branch',
	},
	base: {
		ref: 'main',
	},
	created_at: '2024-01-01T00:00:00Z',
	updated_at: '2024-01-01T00:00:00Z',
};
