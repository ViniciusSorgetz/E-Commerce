export class DatabaseError extends Error {
  name: 'DatabaseError';

  constructor({ message, cause }: { message: string; cause?: unknown }) {
    super(message);
    this.cause = cause;
  }
}
