interface RegionData 
{
  region: string;
  comunas: string[];
}

interface ChileData 
{
  regiones: RegionData[];
}

import regionesDataJson from "./comunas-regiones.json";

const regionesData: ChileData = regionesDataJson as ChileData;

export class UbicacionService 
{
    static getRegiones(): string[] 
    {
        return regionesData.regiones.map((r) => r.region);
    }

    static getComunas(region: string): string[] 
    {
        const regionObj = regionesData.regiones.find((r) => r.region === region);
        return regionObj ? regionObj.comunas : [];
    }
}
