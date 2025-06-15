class AppError extends Error {
  constructor(message, status = 500, errors = null) {
    super(message);
    this.status = status;
    if (errors) {
      this.errors = errors; // Attach field-specific errors
    }
  }
}
module.exports = AppError;
