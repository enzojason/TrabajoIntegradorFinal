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
    const [entriesData, setEntriesData] = useState([]);

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
          

          const dataentries = await fetchAll('playlist-entries');
          setEntriesData(dataentries.results);
          

          


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
        <DataContext.Provider value={{ songData, albumData,artistData, entriesData, profileData, isLoading, isError }}>
        {children}
        </DataContext.Provider>
    );
    };

export default DataProvider;   