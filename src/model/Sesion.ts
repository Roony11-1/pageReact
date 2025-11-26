import { ModeloBase } from "./ModeloBase";

export class Sesion extends ModeloBase
{
    private idUsuarioActivo: number | null;
    private token: string | null;

    constructor()
    {
        super();
        this.idUsuarioActivo = null;
        this.token = null;
    }

    setIdUsuarioActivo(idUsuarioActivo: number | null) { this.idUsuarioActivo = idUsuarioActivo; return this; }
    getIdUsuarioActivo() { return this.idUsuarioActivo; }

    setToken(token: string | null) { this.token = token; return this;}
    getToken(): string | null { return this.token; }
}