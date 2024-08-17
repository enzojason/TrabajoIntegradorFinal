import React, { useState } from 'react';
import Modal from './Modal';

function PlaylistCard({ playlist, user }) {
    const [isModalActive, setIsModalActive] = useState(false);

    const handleEditClick = () => {
        setIsModalActive(true);
    };

    const closeModal = () => {
        setIsModalActive(false);
    };

    return (
        <>
            <div className="card has-background-dark">
                {/* ... resto del contenido de la tarjeta */}
                <button className="button is-small is-warning" onClick={handleEditClick}>Editar</button>
                {/* ... resto del contenido de la tarjeta */}
            </div>

            <Modal isActive={isModalActive} closeModal={closeModal}>
                {/* Formulario de edición o creación */}
                <form>
                    {/* Campos del formulario */}
                    <button type="submit" className="button is-success">Guardar</button>
                </form>
            </Modal>
        </>
    );
}

export default PlaylistCard;