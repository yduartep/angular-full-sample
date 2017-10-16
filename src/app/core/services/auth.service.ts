export interface AuthService {
  /**
   * Log-in into the app using user and password
   * @param username a valid user id
   * @param password a valid password
   */
  login(username: string, password: string);

  /**
   * Logout from the app
   */
  logout();
}
