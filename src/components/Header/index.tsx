import React from 'react';

import logo from '../../assets/images/Logo-Braine.png';

import './styles.css';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <header>
        <img src={logo} alt="Logo Braine" />
        {title}
      </header>
    </>
  );
};

export default Header;
