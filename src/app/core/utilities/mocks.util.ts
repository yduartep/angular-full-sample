import {ApiConfig} from '../models/api-config';
import {Credentials} from '../models/credentials';
import {Villain} from '../../villains/shared/villain';
import {Hero} from '../../heroes/shared/hero';
import {ApiUrl} from '../models/api-url';
import {KeyText} from '../models/key-text';

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
      new ApiUrl('HEROES_SERVICE_URL', 'http://localhost:3000/api/heroes'),
      new ApiUrl('VILLAINS_SERVICE_URL', 'http://localhost:3000/api/villains'),
      new ApiUrl('OAUTH_SERVICE_URL', 'http://localhost:3000/oauth/token', false)
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
   * Create a mocked list of heroes
   */
  static createMockedHeroes(): Hero[] {
    const data: Hero[] = [
      {'id': 1, 'name': 'Spider-Man', 'editorial': 1, 'image': 'spider-man.PNG', creationDate: new Date()},
      {'id': 2, 'name': 'Iron Man', 'editorial': 1, 'image': 'iron-man.PNG', creationDate: new Date()},
      {'id': 3, 'name': 'Captain America', 'editorial': 1, 'image': 'captain-america.PNG', creationDate: new Date()},
      {'id': 4, 'name': 'Deadpool', 'editorial': 1, 'image': 'deadpool.PNG', creationDate: new Date()},
      {'id': 5, 'name': 'Hulk', 'editorial': 1, 'image': 'hulk.PNG', creationDate: new Date()},
      {'id': 6, 'name': 'Thor', 'editorial': 1, 'image': 'thor.PNG', creationDate: new Date()},
      {'id': 7, 'name': 'Flash', 'editorial': 2, 'image': 'flash.PNG', creationDate: new Date()},
      {'id': 8, 'name': 'Batman', 'editorial': 2, 'image': 'batman.PNG', creationDate: new Date()},
      {'id': 9, 'name': 'Wonder Woman', 'editorial': 2, 'image': 'wonder-woman.PNG', creationDate: new Date()},
      {'id': 10, 'name': 'Superman', 'editorial': 2, 'image': 'superman.PNG', creationDate: new Date()},
      {'id': 11, 'name': 'Cyborg', 'editorial': 2, 'image': 'cyborg.PNG', creationDate: new Date()}
    ];
    return data;
  }

  /**
   * Create a mocked list of villains
   */
  static createMockedVillains(): Villain[] {
    const data: Villain[] = [
      {'id': 1, 'name': 'Magneto', 'editorial': 1, 'image': 'magneto.PNG'},
      {'id': 2, 'name': 'Venon', 'editorial': 1, 'image': 'venon.PNG'},
      {'id': 3, 'name': 'Ultron', 'editorial': 1, 'image': 'ultron.PNG'},
      {'id': 4, 'name': 'Joker', 'editorial': 2, 'image': 'joker.PNG'},
      {'id': 5, 'name': 'Ras Al Ghul', 'editorial': 2, 'image': 'rasalghul.PNG'},
      {'id': 6, 'name': 'Mr. Freeze', 'editorial': 2, 'image': 'freeze.PNG'},
      {'id': 7, 'name': 'Scarecrow', 'editorial': 2, 'image': 'scarecrow.PNG'}
    ];
    return data;
  }

}
