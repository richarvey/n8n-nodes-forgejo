"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgejoApi = void 0;
class ForgejoApi {
    constructor() {
        this.name = 'forgejoApi';
        this.displayName = 'Forgejo API';
        this.documentationUrl = 'https://forgejo.org/docs/latest/user/api-usage/';
        this.icon = 'file:forgejo.svg';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=token {{$credentials.accessToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.serverUrl}}/api/v1',
                url: '/user',
                method: 'GET',
            },
        };
    }
}
exports.ForgejoApi = ForgejoApi;
