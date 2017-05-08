import { ApiConfig } from '../models/api-config';
import { ApiUrl } from '../models/api-url';
import { Credentials } from '../models/credentials';
const faker = require('faker');

export class MocksUtil {
    // TODO create mock data using external json files

    /**
     * Create a mocked instance of the ApiConfig object to be used in tests
     * @param apiUrls the list of ApiUrls with which must be created.
     */
    static createMockedApiConfig(apiUrls: ApiUrl[]): ApiConfig {
        const apiConfig: ApiConfig = new ApiConfig();
        apiConfig.credentials = new Credentials(faker.internet.userName(), faker.internet.password());
        apiConfig.timeExpired = 5;
        apiConfig.apiUrls = apiUrls;

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
}
