export interface RepositoryInterface<T>
{
    findAll(): T[];
    findById(id: number): T | null;
    save(entity: T): boolean;
    update(id: number, entity: T): boolean
    deleteById(id: number): boolean;
}