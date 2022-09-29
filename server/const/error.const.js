class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) return 400;
    if (this instanceof Unauthorized) return 401;
    if (this instanceof Forbidden) return 403;
    if (this instanceof NotFound) return 404;

    return 500;
  }
}

module.exports = GeneralError;
