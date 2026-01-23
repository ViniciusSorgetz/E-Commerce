import { DatabaseError } from '../errors/database.error';

export function compareLengthOnSave(
  rawLength: number,
  savedLength: number,
  objectName: string,
) {
  if (rawLength != savedLength) {
    throw new DatabaseError({
      message: `Couldn't save ${objectName} into the database.`,
    });
  }
}
