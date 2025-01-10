class ValidationError extends Error {
  message: string;
  field: string;

  constructor(message: string, field: string) {
    super();
    this.message = message;
    this.field = field;
  }
}

export { ValidationError };
