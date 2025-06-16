import {BaseError} from "./BaseError.ts";


export class NotFoundError extends BaseError {
    constructor(resource = 'Resource') {
        super({
            name:'NotFoundError',
            statusCode:404,
            description: `${resource} not found`,
            errorCode: 'RESOURCE_NOT_FOUND'
        });
    }
}
