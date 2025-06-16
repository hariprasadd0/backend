
export class BaseError extends Error {
    public  readonly statusCode :number
    public readonly isOperational : boolean
    public readonly errorCode :string

    /**
     * @param name - The name of the error class (eg: "ValidationError")
     * @param statusCode - The http Status Code
     * @param description - The error message to display
     * @param isOperational - Marks this is an expected error
     * @param errorCode - Frontend or logging friendly error
     */
    constructor({
        name,
        statusCode,
        description,
        isOperational = true,
        errorCode = 'INTERNAL_SERVER_ERROR',
                }:{name: string, statusCode: number, description: string, isOperational?: boolean, errorCode?: string}) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name=name;
        this.statusCode=statusCode;
        this.isOperational=isOperational;
        this.errorCode=errorCode;

        Error.captureStackTrace(this)
    }
}