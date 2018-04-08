
/**
 * Error thrown when a certain property does not pass
 * a validation at the schema level.
 */
export let ValidationError: string = Object.freeze("ValidationError");

/**
 * Error thrown when a record is already present in the database.
 */
export let DuplicatedKey: number = Object.freeze(11000);