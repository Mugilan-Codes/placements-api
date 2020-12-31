export default class ApiError {
  constructor(statusCode, errorMessage) {
    this.status = statusCode;
    this.message = errorMessage;
  }

  // Client Error

  static badRequest(msg = 'Bad Request') {
    return new ApiError(400, msg);
  }

  static unauthorized(msg = 'Unauthorized') {
    return new ApiError(401, msg);
  }

  static forbidden(msg = 'Forbidden') {
    return new ApiError(403, msg);
  }

  static notFound(msg = 'Not Found') {
    return new ApiError(404, msg);
  }

  static conflict(msg = 'Conflict') {
    return new ApiError(409, msg);
  }

  // Server Error

  static internal(msg = 'Internal Server Error') {
    return new ApiError(500, msg);
  }
}
