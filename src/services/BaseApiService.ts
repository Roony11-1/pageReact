import axios from "axios";
import { type ServiceApiInterface } from "./ServiceApiInterface";

export abstract class BaseApiService<T> implements ServiceApiInterface<T> 
{
  protected endpoint: string;
  protected modelClass: { fromJSON(json: any): T };
  protected baseUrl: string = "http://localhost:8001/api";
  protected token?: string;

  constructor(endpoint: string, modelClass: { fromJSON(json: any): T }, token?: string) 
  {
    this.endpoint = endpoint;
    this.modelClass = modelClass;
    this.token = token;
  }

  getModelClass()
  {
    return this.modelClass;
  }

  protected get url(): string 
  {
    return `${this.baseUrl}/${this.endpoint}`;
  }

  protected get header()
  {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async fetchAll(): Promise<T[]> 
  {
    const res = await axios.get(this.url, { headers: this.header });
    return res.data.map((d: any) => this.modelClass.fromJSON(d));
  }

  async fetchById(id: number): Promise<T | null> 
  {
    try 
    {
      const res = await axios.get(`${this.url}/id/${id}`, { headers: this.header });
      return this.modelClass.fromJSON(res.data);
    } 
    catch (err: any) 
    {
      if (err.response?.status === 404) 
        return null;
      throw err;
    }
  }

  async save(entity: T): Promise<{ success: boolean; message: string }> {
    try 
    {
      const res = await axios.post(this.url, entity, {headers: this.header});

      return {
        success: true,
        message: res.data?.message ?? "Creado correctamente"
      };
    } 
    catch (err: any) 
    {
      return {
        success: false,
        message: err.response?.data?.message ?? "Error al crear - Error: " +err
      };
    }
  }

  async update(id: number, entity: T): Promise<{ success: boolean; message: string }> 
  {
    try 
    {
      const res = await axios.put(`${this.url}/${id}`, entity, {headers: this.header});
      return {
        success: true,
        message: res.data?.message ?? "Actualizado correctamente",
      };
    } 
    catch (err: any) 
    {
      return {
        success: false,
        message: err.response?.data?.message ?? "Error al actualizar",
      };
    }
  }

  async deleteById(id: number): Promise<{ success: boolean; message: string }> {
    try 
    {
      const res = await axios.delete(`${this.url}/${id}`, {headers: this.header});
      return {
        success: true,
        message: res.data?.message ?? "Eliminado correctamente",
      };
    } 
    catch (err: any) 
    {
      return {
        success: false,
        message: err.response?.data?.message ?? "Error al eliminar",
      };
    }
  }
}