export class ValidacionesFormulario
{
    public static obligatorio(valor: any): string | null 
    {
        if (valor === undefined || valor === null || String(valor).trim() === "")
            return "Este campo es obligatorio";
        return null;
    }

    public static validarEmail(email:string): string | null
    {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
            return "El correo electrónico no es válido";
        return null;
    }

    public static numeroPorcentaje(porcentaje: number): string | null
    {
        if (( 0 > porcentaje) || (porcentaje > 100))
            return "Debes ingresar un valor entre 0 y 100";
        return null;
    }
}