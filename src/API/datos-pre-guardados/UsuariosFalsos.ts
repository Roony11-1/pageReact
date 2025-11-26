import { Usuario } from "../../model/Usuario";

export function UsuariosFalsos() 
{
    return [
                new Usuario()
                    .setId(1)
                    .setNombreUsuario("Admin")
                    .setEmail("admin@levelup.com")
                    .setContraseña("123456")
                    .setTipo("admin")
                    .setProfilePhoto("/profilePhotos/adminfoto.png"),
                new Usuario()
                    .setId(2)
                    .setNombreUsuario("User")
                    .setEmail("user@levelup.com")
                    .setContraseña("123456")
                    .setTipo("usuario")
                    .setComuna("Santiago")
                    .setRegion("Metropolitana")
                    .setTelefono("987654321"),
                new Usuario()
                    .setId(3)
                    .setNombreUsuario("User")
                    .setEmail("user2@levelup.com")
                    .setContraseña("123456")
                    .setTipo("usuario")
                    .setComuna("Santiago")
                    .setRegion("Metropolitana")
                    .setTelefono("985645321")];
}