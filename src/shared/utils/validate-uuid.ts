import { ValidationError } from '../errors/validation-error';

export function validateUUID(id: string) {
  if (id.length !== 36) {
    throw new ValidationError('UUID must have 36 characters.');
  }

  const barsPosition = [8, 13, 18, 23];
  const validChars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ];

  for (let i = 0; i < id.length; i++) {
    if (barsPosition.includes(i)) {
      if (id[i] !== '-') {
        throw new ValidationError('Invalid UUID format.');
      }
    } else {
      if (!validChars.includes(id[i])) {
        throw new ValidationError('Invalid UUID format.');
      }
    }
  }
}
