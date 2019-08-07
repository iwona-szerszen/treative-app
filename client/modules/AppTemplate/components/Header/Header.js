import React from 'react';
import { IndexLink } from 'react-router';
import styles from './Header.css';

const Header = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navigation}>
        <IndexLink 
          to='/'
          activeClassName={styles.active}
          className={styles.link}
        >
          Home
        </IndexLink>
        <IndexLink 
          to='/tourists'
          activeClassName={styles.active}
          className={styles.link}
        >
          Tourists
        </IndexLink>
        <IndexLink
          to='/flights'
          activeClassName={styles.active}
          className={styles.link}
        >
          Flights
        </IndexLink>
      </div>
    </nav>
  );
};

export default Header;
