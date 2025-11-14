import { ForgejoApi } from '../../credentials/ForgejoApi.credentials';

describe('ForgejoApi Credentials', () => {
	let credentials: ForgejoApi;

	beforeEach(() => {
		credentials = new ForgejoApi();
	});

	describe('Credential Properties', () => {
		test('should have correct name', () => {
			expect(credentials.name).toBe('forgejoApi');
		});

		test('should have correct display name', () => {
			expect(credentials.displayName).toBe('Forgejo API');
		});

		test('should have documentation URL', () => {
			expect(credentials.documentationUrl).toBe('https://forgejo.org/docs/latest/user/api-usage/');
		});

		test('should have two properties (serverUrl and accessToken)', () => {
			expect(credentials.properties).toHaveLength(2);
		});
	});

	describe('Server URL Property', () => {
		test('should have server URL property', () => {
			const serverUrlProp = credentials.properties.find(p => p.name === 'serverUrl');
			expect(serverUrlProp).toBeDefined();
			expect(serverUrlProp?.displayName).toBe('Forgejo Server URL');
			expect(serverUrlProp?.type).toBe('string');
			expect(serverUrlProp?.required).toBe(true);
		});

		test('should have default value for server URL', () => {
			const serverUrlProp = credentials.properties.find(p => p.name === 'serverUrl');
			expect(serverUrlProp?.default).toBe('https://code.squarecows.com');
		});

		test('should have placeholder for server URL', () => {
			const serverUrlProp = credentials.properties.find(p => p.name === 'serverUrl');
			expect(serverUrlProp?.placeholder).toBe('https://your-forgejo-instance.com');
		});
	});

	describe('Access Token Property', () => {
		test('should have access token property', () => {
			const tokenProp = credentials.properties.find(p => p.name === 'accessToken');
			expect(tokenProp).toBeDefined();
			expect(tokenProp?.displayName).toBe('Access Token');
			expect(tokenProp?.type).toBe('string');
			expect(tokenProp?.required).toBe(true);
		});

		test('should be password type', () => {
			const tokenProp = credentials.properties.find(p => p.name === 'accessToken');
			expect(tokenProp?.typeOptions).toEqual({ password: true });
		});

		test('should have empty default value', () => {
			const tokenProp = credentials.properties.find(p => p.name === 'accessToken');
			expect(tokenProp?.default).toBe('');
		});
	});

	describe('Authentication', () => {
		test('should use generic authentication type', () => {
			expect(credentials.authenticate.type).toBe('generic');
		});

		test('should set Authorization header with token prefix', () => {
			expect(credentials.authenticate.properties?.headers).toBeDefined();
			expect(credentials.authenticate.properties?.headers?.Authorization).toBe('=token {{$credentials.accessToken}}');
		});
	});

	describe('Credential Test', () => {
		test('should have test configuration', () => {
			expect(credentials.test).toBeDefined();
			expect(credentials.test.request).toBeDefined();
		});

		test('should test against /user endpoint', () => {
			expect(credentials.test.request?.url).toBe('/user');
			expect(credentials.test.request?.method).toBe('GET');
		});

		test('should use baseURL with /api/v1', () => {
			expect(credentials.test.request?.baseURL).toBe('={{$credentials.serverUrl}}/api/v1');
		});
	});
});
