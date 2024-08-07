const API_URL = 'https://sandbox.academiadevelopers.com/harmonyhub';
// Para login
export const loginUser = async (username, password) => {
  const response = await fetch(`https://sandbox.academiadevelopers.com/api-auth/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  data.user = username; //Me
  if (!response.ok) throw new Error(data.message);
  return data;
};

// Para El perfil
export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/users/profiles/profile_data/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

/*
export const fetchMusic = async () => {
  const response = await fetch(`${API_URL}/music/`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
*/

// Para canciones-Songs (Crear,Leer, Modificar, Eliminar)
export const createSong = async (songData) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_URL}/songs/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`
    },
    body: songData // Directamente se pasa FormData aquí
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
/*
export const createSong = async (songData) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/songs/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
               'Authorization': `Token ${token}`
    },
    body: JSON.stringify(songData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
*/

// Trae Todas las canciones
export const fetchSongs = async () => {
  const response = await fetch(`${API_URL}/songs/?page_size=100`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
// Trae la cancion correspondiente a un ID especifico.
export const fetchSongDetail = async (id) => {
  const response = await fetch(`${API_URL}/songs/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
///////////////////////////////////
export const updateSong = async (id, songData) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_URL}/songs/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Token ${token}`
    },
    body: songData // Directamente se pasa FormData aquí
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
/*
export const updateSong = async (id, songData) => {
  const response = await fetch(`${API_URL}/songs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
    },
    body: JSON.stringify(songData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
*/
export const deleteSong = async (id) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_URL}/songs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`
    }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return { message: "Song deleted successfully" };
};





// Para Generos (Crear,Leer, Modificar, Eliminar)

export const fetchGenres = async () => {
  const response = await fetch(`${API_URL}/genres/?page_size=20`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};


export const fetchArtists  = async () => {
  const response = await fetch(`${API_URL}/artists/?page_size=20`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

