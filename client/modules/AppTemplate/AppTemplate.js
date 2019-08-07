import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './AppTemplate.css';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header/Header';

const AppTemplate = props => {
  return (
    <div>
      <Helmet
        title='T&FMS'
        meta={[
          { charset: 'utf-8' },
          { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },                 
        ]}
      />
      <Header />
      <main className={styles.container}>
        {props.children}
      </main>
    </div>
  );
};

AppTemplate.propTypes = {
  children: PropTypes.object,
}

export default AppTemplate;
