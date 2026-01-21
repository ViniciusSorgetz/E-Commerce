export class FormatationError extends Error {
  name: 'FormatationError';

  constructor({ message, cause }: { message: string; cause?: unknown }) {
    super(message);
    this.cause = cause;
  }
}
