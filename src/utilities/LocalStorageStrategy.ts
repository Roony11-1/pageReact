import { StorageStrategy } from "./StorageStrategy";

export class LocalStorageStrategy extends StorageStrategy 
{
    private key: string;

    constructor(key: string) 
    {
        super();
        this.key = key;
    }

    public guardar(data: any) 
    {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    protected cargar(): any[]
    {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    public limpiar() 
    {
        localStorage.removeItem(this.key);
    }

    public findAll(): any[]
    {
        return this.cargar();
    }

    public findById(id: any): any | null
    {
        const items = this.cargar();
        return items.find((item: any) => item.id === id) || null;
    }
}