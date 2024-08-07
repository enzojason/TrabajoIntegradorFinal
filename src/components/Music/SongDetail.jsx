import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSongDetail } from '../../services/api';

const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    fetchSongDetail(id).then(data => setSong(data));
  }, [id]);

  if (!song) return <div>Loading...</div>;

  return (
    <div>
      <h1>{song.title}</h1>
      <p>{song.artist}</p>
      <p>{song.album}</p>
    </div>
  );
};

export default SongDetail;
