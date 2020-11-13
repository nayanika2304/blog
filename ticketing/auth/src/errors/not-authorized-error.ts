import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype); // extending a built in class so this is required
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
