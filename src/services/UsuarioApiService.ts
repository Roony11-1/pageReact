import { Usuario } from "../model/Usuario";
import { BaseApiService } from "./BaseApiService";
import type { LoginRequest } from "../model/LoginRequest";
import axios from "axios";
import type { ApiResponseDTO } from "../model/dto/ApiResponseDTO";
import type { AuthResponseDTO } from "../model/dto/AuthResponseDTO";

export class UsuarioApiService extends BaseApiService<Usuario> 
{
  constructor(token?: string) 
  {
    super("usuarios", Usuario, token);
  }

  async login(loginRequest: LoginRequest): Promise<ApiResponseDTO<AuthResponseDTO>> 
  {
    try 
    {
      const res = await axios.post(`${this.baseUrl}/auth/authenticate`, loginRequest);

      return {
        message: res.data.message,
        data: {
          id: res.data.data.id,
          token: res.data.data.token
        }
      };
    } 
    catch (err: any) 
    {
      return {
        message: err.response?.data?.message ?? 'Error al autenticarse',
        data: null
      };
    }
  }

  async saveUser(entity: Usuario): Promise<ApiResponseDTO<Usuario>> 
  {
    const res = await axios.post(`${this.baseUrl}/auth/register`, entity);

    return {
      message: res.data.message,
      data: this.modelClass.fromJSON(res.data)
    }
  }

  async fetchByEmail(email: string)
  {
    const res = await axios.get(`${this.url}/email/${email}`, { headers: this.header })

    return res.data; // Usuario
  }

  async findProfile(id: number) 
  {
    const res = await axios.get(`${this.baseUrl}/auth/profile/${id}`, { headers: this.header });

    return this.modelClass.fromJSON(res.data);
  }
}