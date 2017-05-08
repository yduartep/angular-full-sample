/**
 * Created by yduartep on 3/2/2017.
 */
module.exports = function () {
  var faker = require("faker");

  return {
    heroes: Array(8).fill(0).map((i, index) => {
      var id = index + 1;
      var editorials = [1, 2];
      var images = ['batman.PNG', 'captain-america.PNG', 'cyborg.PNG', 'deadpool.PNG', 'flash.PNG'];
      return {
        "id": id,
        "name": faker.name.findName(),
        "editorial": editorials[Math.floor(Math.random() * editorials.length)],
        "image": images[Math.floor(Math.random() * images.length)]
      }
    }),
    villains: Array(15).fill(0).map((i, index) => {
      var id = index + 1;
      var editorials = [1, 2];
      var images = ['magneto.PNG', 'rasalghul.PNG', 'scarecrow.PNG', 'ultron.PNG', 'venon.PNG'];
      return {
        "id": id,
        "name": faker.name.findName(),
        "editorial": editorials[Math.floor(Math.random() * editorials.length)],
        "image": images[Math.floor(Math.random() * images.length)]
      }
    }),
    token: [{
      "access_token": "a61afd98-8e9e-4f16-9366-31abcc0bb522",
      "token_type": "bearer",
      "refresh_token": "2df39865-27c2-41f3-b676-69c9839b9d50",
      "expires_in": 43199,
      "scope": "openid"
    }]
  }
}
