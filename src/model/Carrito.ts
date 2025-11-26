export interface itemsType
{
    productoId: number;
    cantidad: number;
}

export class Carrito
{
    id: number;
    items: itemsType[];
    constructor()
    {
        this.id = 1;
        this.items = [];
    }

    getId(): number { return this.id; }
    getItems(): itemsType[] { return this.items; }

    getCantidadItems(): number 
    {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    setid(id: number) { this.id = id; return this; }
    setItems(items: itemsType[]) { this.items = items; return this; }

    /**
     * Metodo booleando que me dira si existe o no en el carrito
     */
    existeEnElCarrito(productoId: number): boolean
    {
        const items = this.getItems();

        const existente = items.find(i => i.productoId === productoId);

        if (existente)
            return true;
        else
            return false;
    }
}