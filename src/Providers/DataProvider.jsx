/* eslint-disable no-unused-vars */
import react,{useState,useEffect} from "react";
import { DataContext } from "../contexts/DataContext";
import { fetchAll } from "../services/api";
import { getProfile } from "../services/api";

const DataProvider = ({ children }) => {
  //Provider de datos, se encarga de obtener los datos de la api y pasarlos a los componentes
    const [profileData,setProfileData] = useState([]);
    const [songData, setSongData] = useState([]);
    const [artistData, setArtistData] = useState([]);
    const [albumData, setAlbumData] = useState([]);
    const [playlistData,setPlaylistData] = useState([]);
    const [entriesData, setEntriesData] = useState([]);
    const [genreData, setGenreData] = useState([]);
    const [song_genreData, setSong_genreData] = useState([]);
    const [song_artistData, setSong_artistData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setIsError(false);

          if (localStorage.getItem("authToken")){
            const dataprofile = await getProfile();
            setProfileData(dataprofile);
          }
            
          const datasong = await fetchAll('songs');
          setSongData(datasong.results);
          
          const dataalbum = await fetchAll('albums');
          setAlbumData(dataalbum.results);

          const dataart = await fetchAll('artists');
          setArtistData(dataart.results);
          
          const datagenre = await fetchAll('genres');
          setGenreData(datagenre.results);

          const dataentries = await fetchAll('playlist-entries');
          setEntriesData(dataentries.results);
          
          const dataplaylist = await fetchAll('playlists');
          setPlaylistData(dataplaylist.results);
          
          const song_genre = await fetchAll('song-genres');
          setSong_genreData(song_genre.results);
          
          const song_artist = await fetchAll('song-artists');
          setSong_artistData(song_artist.results);
          
          


        } catch (error) {
          setIsError(true);
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;
return (
        <DataContext.Provider value={{ songData, albumData,artistData,genreData, playlistData,entriesData, profileData, song_genreData,song_artistData,isLoading, isError }}>
        {children}
        </DataContext.Provider>
    );
    };

export default DataProvider;   