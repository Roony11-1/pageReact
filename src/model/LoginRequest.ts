export class LoginRequest
{
    private email: string;
    private contraseña: string;

    constructor(email: string, contraseña: string)
    {
        this.email = email;
        this.contraseña = contraseña;
    }

    getEmail(): string { return this.email; }
    getContraseña(): string { return this.contraseña; }
}