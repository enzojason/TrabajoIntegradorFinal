function GenreCard({ genre }) {
    return (
        <div className={`card has-background-dark`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {genre.name}
                        </p>
                    </div>
                </div>
                <div className="content">
                    {genre.description && (
                        <p className="has-text-white">
                            <strong>Descripción:</strong> {genre.description}
                        </p>
                    )}
                    <p className="has-text-white">
                        <strong>Creador:</strong> {genre.owner}
                    </p>
                    <p className="has-text-white">
                        <strong>Canciones:</strong> {genre.songs ? genre.songs.length : 0}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default GenreCard;
