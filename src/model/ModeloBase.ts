export abstract class ModeloBase
{
    // Forma base para traer crear un objeto desde el JSON
    static fromJSON<T extends object>(this: new () => T, obj: Partial<T>): T
    {
        return Object.assign(new this(), obj) as T;
    }
}