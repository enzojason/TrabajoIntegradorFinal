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
                        <p>Username {userData.username}</p>
                        <p>Correo Electronico: {userData.email}</p>
                        <p> {userData.state}</p>
                        <img
                            src={userData.image}
                            alt="Profile image"
                            style={{ borderRadius: "50%" }}
                        />
                        <p>Nombre: {userData.first_name} </p>
                        <p>Apellido: {userData.last_name}</p>

                        <img src={`${import.meta.env.VITE_API_BASE_URL}${userData.state}`}
                                alt="State icon"
                                style={{
                                    height: "20px",
                                    marginRight: "5px",
                                    borderRadius: "50%",
                                        }}
                        />
                        <p>{<p>fecha de nacimiento: {userData.dob}</p> || "No disponible"}</p>
                        <p>Bio: {userData.bio || "No disponible"}</p>

                        <div className="Modo editar">
                            {editMode && (
                            <form onSubmit={handleSubmit}>
                            <div>
                                <label>Correo electronico: </label>
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
                                    value={userData.dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    disabled={!editMode}
                                />
                            </div>
                            <div>
                                <label>Biografía:</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    disabled={!editMode}
                                />
                            </div>
                            <button type="submit">Enviar</button>
                            </form>
                            )}

                    </div>
                    <button onClick={handleEditMode}>
                        {editMode ? "Salir de modo Edicion" : "Editar"}
                    </button>

                    </div>
                    
                
                </>
            ) : (
                <p>No se encontraron datos del usuario.</p>
            )}
        </div>
    );
}

export default Profile;

