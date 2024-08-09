const API_URL = 'https://sandbox.academiadevelopers.com/harmonyhub';

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




export const fetchSongs = async () => {
  const response = await fetch(`${API_URL}/songs/`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  if(response.ok) console.log("CORRECTO");
  return data;
};

export const fetchSongDetail = async (id) => {
  const response = await fetch(`${API_URL}/songs/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// Para usarla en songForm 
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
