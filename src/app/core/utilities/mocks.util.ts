import { ApiConfig } from '../models/api-config';
import { ApiUrl } from '../models/api-url';
import { Credentials } from '../models/credentials';
import { Hero } from '../../heroes/shared/hero';
import { Villain } from '../../villains/shared/villain';
const faker = require('faker');

export class MocksUtil {
    // TODO create mock data using external json files

    /**
     * Create a mocked instance of the ApiConfig object to be used in tests
     * @param apiUrls the list of ApiUrls with which must be created.
     */
    static createMockedApiConfig(): ApiConfig {
        const apiConfig: ApiConfig = new ApiConfig();
        apiConfig.credentials = new Credentials(faker.internet.userName(), faker.internet.password());
        apiConfig.timeExpired = 5;
        apiConfig.apiUrls = [
            { id: 'HEROES_SERVICE_URL', url: 'http://127.0.0.1:3000/api/heroes' },
            { id: 'VILLAINS_SERVICE_URL', url: 'http://127.0.0.1:3000/api/villains' },
            { id: 'OAUTH_SERVICE_URL', url: 'http://localhost:3000/api/oauth/token' }
        ];

        return apiConfig;
    }

    /**
     * Create a mocked instance of the oath token returned by the authentication service
     */
    static createMockedOauthToken() {
        return {
            'access_token': 'a1b2c3d4-4g67-5t5t-6j6j-5f4fg4',
            'token_type': 'bearer',
            'refresh_token': '12345678-8888-9999-b676',
            'expires_in': 43199,
            'scope': 'openid'
        };
    }

    /**
     * Create a mocked list of heroes
     */
    static createMockedHeroes(): Hero[] {
        const result: Hero[] = [];
        for (let i = 1; i <= 3; i++) {
            const data = new Hero(i, 'Hero ' + i, 1, 'image ' + i + '.png');
            result.push(data);
        }
        return result;
    }

    /**
     * Create a mocked list of villains
     */
    static createMockedVillains(): Villain[] {
        const result: Villain[] = [];
        for (let i = 1; i <= 3; i++) {
            const data = new Villain(i, 'Villain ' + i, 1, 'image ' + i + '.png');
            result.push(data);
        }
        return result;
    }
}
