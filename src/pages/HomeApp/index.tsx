import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import './styles.css';

const HomeApp: React.FC = () => {
  return (
    <div id="page-homeapp">
      <div className="container">
        <Header title="Página inicial" />
        <main>
          <Link to="/register">Cadastro</Link>
        </main>
      </div>
    </div>
  );
};

export default HomeApp;
