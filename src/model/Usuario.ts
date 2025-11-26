import { ModeloBase } from "./ModeloBase";

export class Usuario extends ModeloBase
{
    private id: number;
    private nombreUsuario: string | null;
    private email: string | null;
    private contraseña: string | null;
    private telefono: string | null;
    private region: string | null;
    private comuna: string | null;
    private tipo: string;
    private profilePhoto: string;

    constructor() 
    {
        super();
        this.id = 0;
        this.nombreUsuario = null;
        this.email = null;
        this.contraseña = null;
        this.telefono = null;
        this.region = null;
        this.comuna = null;
        this.tipo = "usuario";
        this.profilePhoto = "/profilePhotos/nofoto.jpg";
    }

    setId(id: number) { this.id = id; return this; }
    setNombreUsuario(nombre: string | null) { this.nombreUsuario = nombre; return this; }
    setEmail(email: string | null) { this.email = email; return this; }
    setContraseña(pass: string | null) { this.contraseña = pass; return this; }
    setTelefono(tel: string | null) { this.telefono = tel; return this; }
    setRegion(region: string | null) { this.region = region; return this; }
    setComuna(comuna: string | null) { this.comuna = comuna; return this; }
    setTipo(tipo: string) { this.tipo = tipo; return this; }
    setProfilePhoto(photo: string) { this.profilePhoto = photo; return this; }

    getId(): number { return this.id; }
    getNombreUsuario(): string | null { return this.nombreUsuario; }
    getEmail(): string | null { return this.email; }
    getContraseña(): string | null { return this.contraseña; }
    getTelefono(): string | null { return this.telefono; }
    getRegion(): string | null { return this.region; }
    getComuna(): string | null { return this.comuna; }
    getTipo(): string | null { return this.tipo; }
    isAdmin(): boolean { return this.tipo.toLowerCase() === "admin"; }
    getProfilePhoto(): string { return this.profilePhoto; }
}