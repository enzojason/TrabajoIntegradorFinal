import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [errorUpdating, setErrorUpdating] = useState(false);
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
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/${
                userData.user__id
            }/`,
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
        <div>
            {userData ? (
                <>
                    <div>
                        <img
                            src={userData.image || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fdf706ba-1ba7-47ce-8ef6-bd6931b7cb15/d4dk13v-3b45d0f7-abaa-4851-81b2-2ca5f2bf99fb.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZkZjcwNmJhLTFiYTctNDdjZS04ZWY2LWJkNjkzMWI3Y2IxNVwvZDRkazEzdi0zYjQ1ZDBmNy1hYmFhLTQ4NTEtODFiMi0yY2E1ZjJiZjk5ZmIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._c9vRNczdzWfYopvLgm7tQG2fUFtRjXbFQf5gp6q0NU"}
                            alt="Profile image"
                            style={{ borderRadius: "50%" }}
                        />
                        <p>{userData.first_name} {userData.last_name}</p>
                        <img src={`${import.meta.env.VITE_API_BASE_URL}${userData.state}`}
                                alt="State icon"
                                style={{
                                    height: "20px",
                                    marginRight: "5px",
                                    borderRadius: "50%",
                                        }}
                        />
                        <p>{userData.email}</p>
                        <p>{userData.dob || "No disponible"}</p>
                        <p>{userData.bio || "No disponible"}</p>
                        <button onClick={handleEditMode}>
                            {editMode ? "Salir de modo Edicion" : "Editar"}
                        </button>

                    </div>
                    
                {editMode && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={userData.email}
                                disabled={true} //{!editMode}
                            />
                        </div>
                        <div>
                            <label>Fecha de Nacimiento:</label>
                            <input
                                type="text"
                                id="dob"
                                name="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                disabled={!editMode}
                            />
                        </div>
                        <div>
                            <label>Biografía:</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                disabled={!editMode}
                            />
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
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
    BOTON MODO EDICION.
    {editMode && (<button onClick={handleEditMode}>
            {!editMode ? "Editar" : "Salir de Modo Edicion"}
            </button>
    )}

    return (
        <div className="card">
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