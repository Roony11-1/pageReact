import React, { useEffect, useState } from "react";
import { Boton } from "../Boton/Boton";
import { FormInput } from "../Formularios/FormInput/FormInput";
import { FormSelect } from "../Formularios/FormSelect/FormSelect";
import { UbicacionService } from "../../utilities/RegionComuna";

export interface FieldConfig 
{
  name: string;
  label: string;
  type?: "text" | "number" | "password" | "checkbox" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
  validate?: (value: any, formData: Record<string, any>) => string | null;
}

export interface EditItemConfig<T> 
{
  getInitialData: (item: T) => Record<string, any>;
  buildEntity: (formData: Record<string, any>, item: T) => T;
  fields: FieldConfig[];
}

interface EditItemProps<T> 
{
  item: T;
  config: EditItemConfig<T>;
  service: { update: (id: any, entity: T) => Promise<{ success: boolean; message: string }> };
  onCloseEdit?: () => void;
}

export function EditItem<T>({ item, config, service, onCloseEdit }: EditItemProps<T>) 
{
    const [formData, setFormData] = useState(config.getInitialData(item));

    const [regiones, setRegiones] = useState<{value:string,label:string}[]>([]);
    const [comunas, setComunas] = useState<{value:string,label:string}[]>([]);

    useEffect(() => 
    {
        setRegiones(UbicacionService.getRegiones().map(r => ({ value: r, label: r })));
    }, []);

    useEffect(() => 
    {
        if (formData.region) 
            setComunas(UbicacionService.getComunas(formData.region).map(c => ({ value: c, label: c })));
        else
            setComunas([]);
    }, [formData.region]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
    {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const validar = (): string[] => 
    {
        const errores: string[] = [];
        config.fields.forEach(field => 
        {
            if (field.validate) 
            {
                const msg = field.validate(formData[field.name], formData);
                if (msg) 
                    errores.push(`${field.label}: ${msg}`);
            }
        });
        return errores;
    };

    const handleSubmit = async (e: React.FormEvent) => 
    {
        e.preventDefault();

        const errores = validar();
        if (errores.length > 0) 
        {
            alert("Errores:\n" + errores.join("\n"));
            return;
        }

        const entity = config.buildEntity(formData, item);
        const resultado = await service.update((item as any).getId(), entity);

        alert(resultado.message);
        if (resultado.success) 
            onCloseEdit?.();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-edit">
                {config.fields.map(field => {
                    switch (field.type) 
                    {
                        case "select":
                            const options = field.name === "region" ? regiones : field.name === "comuna" ? comunas : field.options || [];
                        return (
                            <FormSelect
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                options={options}
                                value={formData[field.name]}
                                onChange={handleChange}
                            />
                        );
                        case "checkbox":
                            return (
                                <label key={field.name} className="checkbox-field">
                                <input
                                    type="checkbox"
                                    name={field.name}
                                    checked={formData[field.name]}
                                    onChange={handleChange} />
                                        {field.label}
                                </label>
                            );
                        default:
                            return (
                                <FormInput
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    type={field.type || "text"}
                                    value={formData[field.name]}
                                    onChange={handleChange} />
                            );
                    }
                })}

                <div className="panel-admin-btns-edit">
                    <Boton 
                        className="formulario" 
                        type="submit">
                            Guardar Cambios
                    </Boton>
                    <Boton 
                        className="formulario"
                        type="button"
                        onClick={onCloseEdit}>
                            Cancelar
                    </Boton>
                </div>
            </div>
        </form>
    );
}
