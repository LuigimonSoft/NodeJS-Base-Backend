import { body, validateRequest } from '../middleware/validationMiddleware';
import { ErrorCode } from '../utils/errorCodes';

export const createBaseValidator = validateRequest([
]);

