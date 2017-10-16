export interface LoggerService {
  /**
   * Log the message
   */
  log(msg: string);

  /**
   * Log an error message
   */
  error(msg: string);

  /**
   * Log a warning message
   */
  warn(msg: string);

  /**
   * Info the message
   */
  info(msg: string);
}
