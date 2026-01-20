export class EnvironmentError extends Error {
  name: 'EnvironmentError';

  constructor(message: string) {
    super(message);
  }
}
