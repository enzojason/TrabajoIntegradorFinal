import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const doFetch = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    doFetch();
  }, [url]); // Ejecuta la solicitud cuando el URL cambia

  return [{ data, isLoading, isError }, doFetch];
};

export default useFetch;
