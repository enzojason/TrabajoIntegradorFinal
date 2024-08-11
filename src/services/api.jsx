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

// Obtener todos los componentes de una ruta, sin paginación
export const fetchAll = async (ruta) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${API_URL}/${ruta}?page_size=1000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data; // Devuelve la respuesta como un objeto Response

  } catch (error) {
    console.error('Error in fetchAll:', error);
    throw error; // Re-lanza el error para manejarlo en otro lugar
  }
};



//Conseguir el perfil del usuario
export const getProfile = async () => {
  const token = localStorage.getItem("authToken");

  try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
          }
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
      }

      const data = await response.json();
      return data;

  } catch (error) {
      console.error('Error in getProfile:', error);
      throw error;
  }
};
