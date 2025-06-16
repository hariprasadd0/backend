import {BaseError} from "./BaseError.ts";


export class AccessDenied extends BaseError {
    constructor(resource = 'Resource') {
        super({
            name:'AccessDenied',
            statusCode:403,
            description: `${resource} Access Denied`,
            errorCode: 'ACCESS_DENIED',
        });
    }
}
