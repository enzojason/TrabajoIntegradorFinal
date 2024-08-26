function ArtistCard({ artist }) {
    return (
        <div className={`card has-background-dark`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        {artist.image && (
                            <figure className="image is-64x64">
                                <img src={artist.image} alt="Imagen del artista" />
                            </figure>
                        )}
                    </div>
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {artist.name}
                        </p>
                    </div>
                </div>
                <div className="content">
                    {artist.bio && (
                        <p className="has-text-white">
                            <strong>Biografía:</strong> {artist.bio}
                        </p>
                    )}
                    {artist.website && (
                        <p className="has-text-white">
                            <strong>Website:</strong> <a href={artist.website} target="_blank" rel="noopener noreferrer">{artist.website}</a>
                        </p>
                    )}
                    <p className="has-text-white">
                        <strong>Canciones:</strong> {artist.songs ? artist.songs.length : 0}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ArtistCard;
