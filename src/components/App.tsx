import React, { FC } from 'react';

import Login from './login/Login';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
};

export default App;
