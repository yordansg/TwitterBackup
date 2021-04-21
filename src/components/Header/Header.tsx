import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';

const Header = () => {
  useStyles(s);
  return (
    <header className={s.root}>
      <div className={s.container}>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
