import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import drstrange from '../../src/assets/drstrange.png';



function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [errorUpdating, setErrorUpdating] = useState(false);

    const [image, setImage] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');

    const [dob, setDob] = useState('');
    const [bio, setBio] = useState('');

    const updatedData = {
        dob,
        bio,
    };

    const { token } = useAuth("state");

    const doFetch = async () => {
        setLoadingUpdate(true);
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/${userData.user__id}/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(updatedData),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo actualizar el usuario");
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    setUserData(data);
                }
            })
            .catch(() => {
                setErrorUpdating(true);
            })
            .finally(() => {
                setLoadingUpdate(false);
            });
    };

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function handleEditMode() {
        setEditMode(!editMode);
    }

    function handleSubmit(event) {
        event.preventDefault();
        doFetch();
    }

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container columns">
            {userData ? (
                <>
                <div className="column">

                    <div className="card"
                        style={{width: "700px", 
                                height: "100%",}}
                        >
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img
                                    src={userData.image || drstrange}
                                    alt="Imagen de Perfil"
                                    style={{ borderRadius: "10%" ,
                                        width: "100%", 
                                        height: "100%",
                            
                                    }}
                                />
                            </figure>
                        </div>

                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title is-4">{userData.first_name} {userData.last_name}</p>
                                    <p className="subtitle is-6"> {userData.email} </p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="card-content">
                            <div className="content">
                                <label className="label"> Mi BIO:</label>
                                {userData.bio || "No disponible"}
                            </div>
                                <label className="label"> Fecha de Nacimiento:</label>
                                <time > {userData.dob || "No disponible"} </time>

                                <br />
                                <a>@REACT </a> 
                                <a href="#"> #JS </a>
                                <a href="#">#responsive</a>
                        </div >
                        <div className="card-content">
                            <button className="button is-primary is-responsive" onClick={handleEditMode}>
                                {editMode ? "Salir de modo Edicion" : "Editar"}
                            </button>
                        </div>
                    </div >

                </div>

    
                {editMode && (
                    <div className="column">
                        <div className="card"
                            style={{width: "100%", 
                                    height: "100%",}}
                        >
                            <form onSubmit={handleSubmit}>

                                <div className="card-image">
                                    <label className="label">Iagen de Perfil:</label>
                                    <input class="input is-focused"
                                        type="file"
                                        accept=".jpg"//"image/*"
                                        id="image"
                                        name="image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </div>

                                <div className="card-content">
                                    <label className="label">Nombre:</label>
                                    <input class="input is-focused"
                                        placeholder={userData.first_name}
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={first_name}
                                        onChange={(e) => setFirst_name(e.target.value)}
                                        
                                    />
                                </div>

                                <div className="card-content">
                                    <label className="label">Apellido:</label>
                                    <input class="input is-focused"
                                        placeholder={userData.last_name}
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={last_name}
                                        onChange={(e) => setLast_name(e.target.value)}
                                        
                                    />
                                </div>
                                
                                <div className="card-content">
                                    <label className="label">Email:</label>
                                    <input class="input is-focused"
                                        placeholder={userData.email}
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        disabled={true} //{!editMode}
                                    />
                                </div>

                                <div className="card-content">
                                    <label className="label">Fecha de Nacimiento:</label>
                                    <input class="input is-focused"
                                        placeholder={userData.dob}
                                        type="text"
                                        id="dob"
                                        name="dob"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                    />
                                </div>
                                
                                <div className="card-content">
                                    <label className="label">Biografía:</label>
                                    <textarea class="textarea is-focused"
                                        placeholder={userData.bio}
                                        id="bio"
                                        name="bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div class="field">
                                    <button className="button is-link" type="submit">Enviar</button>
                                </div>
                                
                            </form>
                        </div>
                </div>
                )}
                </>
            ) : (
                <p>No se encontraron datos del usuario.</p>
            )}
        </div>
    );
};

export default Profile;

/*
                        <img src={`${import.meta.env.VITE_API_BASE_URL}${userData.state}`}
                                alt="State icon"
                                style={{
                                    height: "20px",
                                    marginRight: "5px",
                                    borderRadius: "50%",
                                        }}
                        />


    BOTON MODO EDICION.
    {editMode && (<button onClick={handleEditMode}>
            {!editMode ? "Editar" : "Salir de Modo Edicion"}
            </button>
    )}

    return (
        <div classNameName="card">
            {userData ? (
                <>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img
                                        src={userData.image ||"https://bulma.io/assets/images/placeholders/96x96.png"}
                                        alt="Profile image"
                                        style={{ borderRadius: "50%" }}
                                    />
                                </figure>
                            </div>
                            
                            <div className="media-content">
                                <p className="title is-4 pb-2">
                                    {userData.first_name} {userData.last_name}
                                </p>
                                <div
                                    className="subtitle is-6"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}${userData.state}`}
                                        alt="State icon"
                                        style={{
                                            height: "20px",
                                            marginRight: "5px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    {userData.first_name}
                                </div>
                            </div>
                            <button
                                className="button is-primary"
                                onClick={handleEditMode}
                            >
                                {!editMode ? "Editar" : "Salir"}
                            </button>
                        </div>

                        <form className="content" onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Email:</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        disabled={!editMode}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Fecha de Nacimiento:
                                </label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        id="dob"
                                        name="dob"
                                        value={userData.dob}
                                        disabled={!editMode}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Biografía:</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        id="bio"
                                        name="bio"
                                        value={userData.bio || "No disponible"}
                                        disabled={!editMode}
                                    />
                                </div>
                            </div>
                            {editMode ? (
                                <div className="field">
                                    <button
                                        className="button is-primary is-fullwidth"
                                        type="submit"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            ) : null}
                        </form>
                    </div>
                </>
            ) : (
                <p className="subtitle">No se encontraron datos del usuario.</p>
            )}
        </div>
    );
}

export default Profile;



/*

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token } = useAuth("state");

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="card">
            {userData ? (
                <>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img
                                        src={
                                            userData.image ||
                                            "https://bulma.io/assets/images/placeholders/96x96.png"
                                        }
                                        alt="Profile image"
                                        style={{ borderRadius: "50%" }}
                                    />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4 pb-2">
                                    {userData.first_name} {userData.last_name}
                                </p>
                                <div
                                    className="subtitle is-6"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={`${
                                            import.meta.env.VITE_API_BASE_URL
                                        }${userData.state.icon}`}
                                        alt="State icon"
                                        style={{
                                            height: "20px",
                                            marginRight: "5px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    {userData.state.name}
                                </div>
                            </div>
                        </div>

                        <div className="content">
                            Email: {userData.email}
                            <br />
                            Fecha de Nacimiento: {userData.dob}
                            <br />
                            Biografía: {userData.bio || "No disponible"}
                        </div>
                    </div>
                </>
            ) : (
                <p className="subtitle">No se encontraron datos del usuario.</p>
            )}
        </div>
    );
}

export default Profile;



import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  if (!user) return <div>Loading...</div>;

  //<p>Email: {user.email}</p>  Esto despues del Nombre
  return (
    <div>
      <h1>Perfil</h1>
      <p>Nombre: {username}</p>
      
    </div>
  );
};

export default ProfilePage;
*/