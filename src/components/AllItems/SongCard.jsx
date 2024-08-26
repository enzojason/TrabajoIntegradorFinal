function SongCard({ song }) {
    return (
        <div className={`card has-background-dark`} style={{width: "300px", height: "100%",}}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-6 has-text-white`}>
                            {song.title}
                        </p>
                    </div>
                </div>
                <div className="media-content">
                    <audio controls style={{  width: '100%', maxWidth: '200px' }}>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
        </div>
    );
}

export default SongCard;
