class NotFoundError extends Error {
  message: string;
  entity: string;

  constructor(message: string, entity: string) {
    super();
    this.message = message;
    this.entity = entity;
  }
}

export { NotFoundError };
