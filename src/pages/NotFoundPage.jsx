import React from 'react';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <section className="hero is-fullheight is-danger is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1">Error: 404</h1>
          <p className="subtitle is-3">La página que buscas no existe.</p>
          <div className="button is-light">
            <Link to="/">Volver a Inicio</Link>
          </div>
          
        </div>
      </div>
    </section>
  );
};
export default NotFoundPage;

/*
import React from 'react';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Error: 404</h1>
      <p>La página que buscas no existe.</p>
    </div>
  );
};

export default NotFoundPage;
*/