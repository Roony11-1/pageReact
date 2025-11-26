export interface ServiceApiInterface<T> 
{
  fetchAll(): Promise<T[]>;
  fetchById(id: number): Promise<T | null>;
  save(entity: T): Promise<{ success: boolean; message: string }> ;
  update(id: number, entity: T): Promise<{ success: boolean; message: string }>
  deleteById(id: number): Promise<{ success: boolean; message: string } >;
}