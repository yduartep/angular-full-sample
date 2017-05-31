import {ApiConfig} from '../models/api-config';
import {Credentials} from '../models/credentials';
import {Process} from '../../process/shared/process';
import {Activity} from '../../process/shared/activity';
import {Task} from '../../process/shared/task';
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
      {id: 'PROCESSES_SERVICE_URL', url: 'http://127.0.0.1:3000/api/process'},
      {id: 'OAUTH_SERVICE_URL', url: 'http://localhost:3000/api/oauth/token'}
    ];
    apiConfig.errorHandler = 'SIMPLE';
    apiConfig.loggerService = 'CONSOLE';
    apiConfig.authService = 'OAUTH';

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
   * Create a mocked list of processes
   * @returns {Process[]}
   */
  static createMockedProcess(): Process[] {
    const result: Process[] = [];
    for (let i = 1; i <= 3; i++) {
      const activity = new Activity('idTask' + i, 'name' + i, new Date());
      const tasks = Array<Task>();
      const processVariables = new Map<string, any>();
      const data = new Process('executionId' + i, 'processInstanceId' + i, 'processKey' + i, 'processDefinitionId' + i,
        'diagramURL' + i, 'tenantId' + i, activity, tasks, processVariables);
      result.push(data);
    }
    return result;
  }
}
