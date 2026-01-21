import { DatabaseError } from '@src/shared';

export function compareLength(
  rawObjectLength: number,
  savedObjectLength: number,
  objectName: string,
) {
  if (rawObjectLength != savedObjectLength) {
    throw new DatabaseError({
      message: `Couldn't save ${objectName} into the database.`,
    });
  }
}
