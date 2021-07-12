import React, { FC } from 'react';
import {
  Switch,
  Route,
  Redirect,
  RouteProps,
  BrowserRouter as Router,
} from 'react-router-dom';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import styles from './App.module.scss';

type ProtectedRouteProps = {
  isAuthenticated: boolean;
} & RouteProps;

export const ProtectedRoute = ({
  isAuthenticated,
  ...routeProps
}: ProtectedRouteProps) => {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
};

type ContextProps = {
  logout: () => void;
};

export const AppContext = React.createContext<Partial<ContextProps>>({});

const App: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

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
      }, 1000);
    });
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <AppContext.Provider value={{ logout }}>
      <Router>
        <div className={styles.container}>
          <Switch>
            <Route exact path="/login">
              <Login login={login} />
            </Route>
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/">
              <Dashboard />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
