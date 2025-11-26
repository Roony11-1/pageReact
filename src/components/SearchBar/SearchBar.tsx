import React, { useState } from "react";
import "../../assets/css/SearchBar/searchbar.css"
import { Boton } from "../Boton/Boton";
import { useNavigate } from "react-router-dom";

export function SearchBar()
{
    const [texto, setTexto] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        
        if (!texto)
        {
            alert("Debes ingresar algo que buscar!")
            return;
        }
        else
        {
            navigate(`/catalogo/search?filtro=${texto}`);
            setTexto("");
        }
    }

    return(
        <div className="searchbar-container">
            <form className="searchbar" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="searchbar-text" 
                    value={texto} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTexto(e.target.value)}
                    placeholder="Buscar productos" />

                <Boton>
                    Buscar
                </Boton>
            </form>
        </div>
    );
}