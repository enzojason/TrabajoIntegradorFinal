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

    headers: { Authorization: `Token ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};




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

//PARA PLAYLIST

export const createPlaylist = async (playlistData) => {
  const url = 'https://sandbox.academiadevelopers.com/harmonyhub/playlists/';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${state.userData.token}` // Asegúrate de incluir el token de autenticación si es necesario
      },
      body: JSON.stringify(playlistData)
    });

    if (!response.ok) {
      throw new Error('Error al crear la playlist');
    }

    const data = await response.json();
    console.log('Playlist creada:', data);
    // Aquí puedes manejar la respuesta, como cerrar el modal o actualizar la lista de playlists
  } catch (error) {
    console.error('Error:', error);
  }
};

export const createPlaylistEntry = async (playlistId, songId, order) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_URL}/playlist-entries/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${state.userData.token}`
    },
    body: JSON.stringify({
      playlist: playlistId,
      song: songId,
      order: order
    })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};


////////// FIN PLAYLIST//////////////////////////////


// Crear un nuevo componente, a partir de Data(objeto) y la ruta de la API 
export const createComponent = async (Data,ruta) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/${ruta}/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`
    },
    body: Data
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// Actualizar un componente, a partir de datos, ruta y id
export const updateComponent = async (datos,ruta,id) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/${ruta}/${id}`, {
    method: 'PUT',
    headers: { 
               'Authorization': `Token ${token}`
     },
    body: datos
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// Eliminar un componente, a partir de la ruta y el id
export const deleteComponent = async (ruta,id) => {
  console.log("id song delete ",id);
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/${ruta}/${id}/`, {
    method: 'DELETE',
    headers: { 
               'Authorization': `Token ${token}`
     }
  });
  if (!response.ok) throw new Error(response.message);
  return response;
};