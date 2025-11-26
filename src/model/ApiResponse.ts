export class ApiResponse<T>
{
    private success: boolean;
    private message: string;
    private entity?: T;

    constructor(success: boolean, message: string, entity?: T)
    {
        this.success = success;
        this.message = message;
        this.entity = entity;
    }

    public static ok<T>(message: string, entity?: T)
    {
        return new ApiResponse(true, message, entity);
    }

    public static fail(message: string)
    {
        return new ApiResponse(false, message);
    }

    public isSuccess(): boolean { return this.success; }
    public getMessage(): string { return this.message }
    public getEntity(): T | undefined { return this.entity; }
}