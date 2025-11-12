import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ForgejoApi implements ICredentialType {
	name = 'forgejoApi';
	displayName = 'Forgejo API';
	documentationUrl = 'https://forgejo.org/docs/latest/user/api-usage/';
	properties: INodeProperties[] = [
		{
			displayName: 'Forgejo Server URL',
			name: 'serverUrl',
			type: 'string',
			default: 'https://code.squarecows.com',
			placeholder: 'https://your-forgejo-instance.com',
			description: 'The URL of your Forgejo server',
			required: true,
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API token for authentication. You can generate one in your Forgejo settings under Applications → Generate New Token.',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=token {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.serverUrl}}/api/v1',
			url: '/user',
			method: 'GET',
		},
	};
}
