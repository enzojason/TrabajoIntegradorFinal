function AlbumCard({ album }) {
    return (
        <div className={`card has-background-dark`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        {album.cover && (
                            <figure className="image is-64x64">
                                <img src={album.cover} alt="Portada del álbum" />
                            </figure>
                        )}
                    </div>
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {album.title}
                        </p>
                        <p className="subtitle is-6 has-text-grey-light">
                            {album.artist && album.artist.name} - {album.year}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <p className="has-text-white">
                        <strong>Creador:</strong> {album.owner}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AlbumCard;
