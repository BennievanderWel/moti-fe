import React, { FC } from 'react';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import styles from './App.module.scss';

const App: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (email === 'bennie@test.nl' ||
            email === 'daan@test.nl' ||
            email === 'nik@test.nl') &&
          password === 'test'
        ) {
          setIsAuthenticated(true);
          resolve();
        } else {
          reject();
        }
      }, 1500);
    });
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <div className={styles.container}>
      {isAuthenticated && <Dashboard logout={logout} />}
      {!isAuthenticated && <Login login={login} />}
    </div>
  );
};

export default App;
