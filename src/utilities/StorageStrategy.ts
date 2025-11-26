export abstract class StorageStrategy 
{
    public guardar(_data: any) 
    {
        throw new Error("Método 'guardar' no implementado");
    }

    protected cargar(): any[] 
    {
        throw new Error("Método 'cargar' no implementado");
    }

    public limpiar() 
    {
        throw new Error("Método 'limpiar' no implementado");
    }

    public findAll(): any[]
    {
        throw new Error("Método 'findAll' no implementado");
    }

    public findById(_id: any): any | null
    {
        throw new Error("Método 'findById' no implementado");
    }
}