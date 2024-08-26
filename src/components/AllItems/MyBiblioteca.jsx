import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import SongCard from "../Songs/SongCard";
import ArtistCard from "../Artist/ArtistCard"
import AlbumCard from "../Album/AlbumCard"
import PlaylistCard from "../Playlist/PlaylistCard"
import GenreCard from "../Genre/GenreCard";


const MiBilblioteca = () => {
    const { profileData} = useContext(DataContext);
    const {songData,albumData,playlistData,genreData,artistData} = useContext(DataContext);

    
    const [itemType, setItemType] = useState("songs");

    return (
        <div style={{ margin: '20px' }}>
            <div className="my-5">
            <div className="hero-body">
                <div className='column .is-offset-x'></div>
                <div className='column .is-offset-x'></div>

                <p className="title has-text-centered is-size-1">Mi Bilblioteca</p>
                <br />
                </div>
                <div className="field">
                    <label className="label">Selecciona el tipo de elemento</label>
                    <div className="control">
                        <div className="select">
                            <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                                <option value="songs">Canciones</option>
                                <option value="playlists">Playlists</option>
                                
                                <option value="genres">Géneros</option>
                                <option value="artists">Artistas</option>
                                <option value="albums">Álbumes</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {itemType==="songs" && 
                    <div  style={{ margin: '20px 0' }}>
                                             
                        <div >
                            <h1>Canciones</h1>
                            {songData.map((song) => (song.owner === profileData.user__id && (
                                <div key={song.id}>
                                    <SongCard item={song} />
                                </div>
                            )))}
                        </div>    
                    </div>
                }

                {itemType === "playlists" &&
                    <div  style={{ margin: '20px 0' }}>
                                             
                    <div >
                        {playlistData.map((playlist) => (playlist.owner === profileData.user__id && (
                            <div key={playlist.id}>
                                <PlaylistCard item={playlist} />
                            </div>
                        )))}
                    </div>    
                </div>
                }
                
                {itemType === "artists" &&
    <div style={{ margin: '20px 0' }}>
        <div>
            {artistData
                .filter((artist) => artist.owner === profileData.user__id)
                .map((artist) => (
                    <div key={artist.id}>
                        <ArtistCard item={artist} />
                    </div>
                ))
            }
        </div>
    </div>
}

                {itemType === "albums" &&
                <div  style={{ margin: '20px 0' }}>                                             
                    <div >
                    {albumData.map((album) => (album.owner === profileData.user__id && (
                        <div key={album.id}>
                            <AlbumCard item={album} />
                        </div>
                    )))}
                    </div>    
                </div>
                }

                {itemType === "genres" &&
                <div  style={{ margin: '20px 0' }}>                                             
                    <div >
                    {genreData.map((genre) => (genre.owner === profileData.user__id && (
                        <div key={genre.id}>
                            <GenreCard item={genre} />
                        </div>
                    )))}
                    </div>    
                </div>
                }


                    
                </div>
                
            </div>
           
    );
}

export default MiBilblioteca;




