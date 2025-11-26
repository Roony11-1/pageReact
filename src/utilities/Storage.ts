export class Storage
{
    private strategy: any;

    constructor(strategy: any) 
    {
        this.strategy = strategy;
    }
    
    guardar(data: any) 
    {
        this.strategy.guardar(data);
    }

    findAll() 
    {
        return this.strategy.findAll();
    }

    findById(id: number)
    {
        return this.strategy.findById(id);
    }

    limpiar() 
    {
        this.strategy.limpiar();
    }
}