import React from 'react';
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bulma/css/bulma.min.css';
//node_modules/bulma/css/bulma.min.css';

function Login() {
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    login(responseData.token);
                })
                .catch((error) => {
                    console.error("Error error al iniciar sesión", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <section className="section">
            <div className="columns is-centered">
                <div className="column is-5">
                    <div className="card">
                        <div className="card-content">
                                <form onSubmit={handleSubmit}>

                                    <div className="field">
                                        <label className="label" htmlFor="username">Nombre de usuario:</label>
                                        <div className="control has-icons-left">
                                            <input
                                                className="input is-info"
                                                type="text"
                                                placeholder="Ingrese Usuario"
                                                id="username"
                                                name="username"
                                                ref={usernameRef}
                                            />
                                            <span clasName="icon is-small is-left">
                                                <FontAwesomeIcon icon={faUser} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label"  htmlFor="password">Contraseña:</label>
                                        <div className="control has-icons-left">
                                            <input
                                                className="input"
                                                type="password"
                                                placeholder="Contraseña"
                                                id="password"
                                                name="password"
                                                ref={passwordRef}
                                            />
                                            <span className="icon is-small is-left">
                                                <FontAwesomeIcon icon={faLock} />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-primary is-fullwidth"
                                            > 
                                            <span className="icon is-small is-left">  
                                                <FontAwesomeIcon icon={faPaperPlane} /> 
                                                Enviar
                                            </span>
                                        
                                                
                                            </button>
                                            {isLoading && <p>Cargando...</p>}
                                            {isError && <p>Error al cargar los datos.</p>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
