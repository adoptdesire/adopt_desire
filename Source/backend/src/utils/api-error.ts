export class ApiError extends Error {
  statusCode: number;

  /**
   * Filteration of API error with required fields
   * @param {number} statusCode - Status code send to API Response.
   * @param {string} message - Appropriate messages send to API Response.
   * @param {string} stack - Showing the case of error description and send to API Response.
   */
  constructor(statusCode: number, message: string, stack: string = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
