export default class ApiError {
  constructor(statusCode, errorMessage) {
    this.status = statusCode;
    this.message = errorMessage;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static notFound() {
    return new ApiError(404, 'Not Found');
  }

  static internal(msg) {
    return new ApiError(500, msg);
  }
}
