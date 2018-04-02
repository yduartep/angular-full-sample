Feature: login - We want to test the login process

  Scenario Outline: SC01.Check the user can login into the application
  Verify that the user can enter in the application using correct credentials and the cookies are created successfully.
    Given the user is in the Login page
    And the user set the username '<userId>'
    And the user set the password '<password>'
    When the user logs in the application
    Then the user is redirected to the Heroes page
    And a cookie with name 'user' is created with the value '<userId>'
    And a cookie with name 'token' is created with the value '<token>'

    Examples:
      | userId | password | token                                 |
      | guest  | guest123 | a61afd98-8e9e-4f16-9366-31abcc0bb522  |
