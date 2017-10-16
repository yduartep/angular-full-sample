/**
 * Created by yduartep on 3/2/2017.
 */
module.exports = function () {
  var faker = require("faker");

  return {
    heroes: [
      {id: 1, name: 'Spider-Man', editorial: {key: 1, text: 'Marvel'}, image: 'spider-man.PNG'},
      {id: 2, name: 'Iron Man', editorial: {key: 1, text: 'Marvel'}, image: 'iron-man.PNG'},
      {id: 3, name: 'Captain America', editorial: {key: 1, text: 'Marvel'}, image: 'captain-america.PNG'},
      {id: 4, name: 'Deadpool', editorial: {key: 1, text: 'Marvel'}, image: 'deadpool.PNG'},
      {id: 5, name: 'Hulk', editorial: {key: 1, text: 'Marvel'}, image: 'hulk.PNG'},
      {id: 6, name: 'Thor', editorial: {key: 1, text: 'Marvel'}, image: 'thor.PNG'},
      {id: 7, name: 'Flash', editorial: {key: 2, text: 'DC'}, image: 'flash.PNG'},
      {id: 8, name: 'Batman', editorial: {key: 2, text: 'DC'}, image: 'batman.PNG'},
      {id: 9, name: 'Wonder Woman', editorial: {key: 2, text: 'DC'}, image: 'wonder-woman.PNG'},
      {id: 10, name: 'Superman', editorial: {key: 2, text: 'DC'}, image: 'superman.PNG'},
      {id: 11, name: 'Cyborg', editorial: {key: 2, text: 'DC'}, image: 'cyborg.PNG'}
    ],
    villains: [
      {id: 1, name: 'Magneto', editorial: {key: 1, text: 'Marvel'}, image: 'magneto.PNG'},
      {id: 2, name: 'Venon', editorial: {key: 1, text: 'Marvel'}, image: 'venon.PNG'},
      {id: 3, name: 'Ultron', editorial: {key: 1, text: 'Marvel'}, image: 'ultron.PNG'},
      {id: 4, name: 'Joker', editorial: {key: 2, text: 'DC'}, image: 'joker.PNG'},
      {id: 5, name: 'R\'as Al Ghul', editorial: {key: 2, text: 'DC'}, image: 'rasalghul.PNG'},
      {id: 6, name: 'Mr. Freeze', editorial: {key: 2, text: 'DC'}, image: 'freeze.PNG'},
      {id: 7, name: 'Scarecrow', editorial: {key: 2, text: 'DC'}, image: 'scarecrow.PNG'}
    ],
    editorials: [
      {id: 1, text: 'Marvel'},
      {id: 2, text: 'DC'}
    ],
    token: [{
      "id": "a61afd98-8e9e-4f16-9366-31abcc0bb522",
      "access_token": "a61afd98-8e9e-4f16-9366-31abcc0bb522",
      "token_type": "bearer",
      "refresh_token": faker.random.uuid(),
      "expires_in": 43199,
      "scope": "openid"
    }]
  }
}
