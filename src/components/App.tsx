import React, { FC } from 'react';
import {
  Switch,
  Route,
  Redirect,
  RouteProps,
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  loginUser,
  logoutUser,
  startListeningToLoggedInUserChanges,
} from '../api';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import styles from './App.module.scss';

type ProtectedRouteProps = {
  isAuthenticated: boolean;
} & RouteProps;

type AppContextProps = {
  logout: () => void;
  currentUser: User | null;
};

export type User = {
  uid: string;
  firstName: string;
  lastName: string;
};

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

export const AppContext = React.createContext<Partial<AppContextProps>>({});

const App: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isCheckingUser, setIsCheckingUser] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    startListeningToLoggedInUserChanges((user: User) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
      setIsCheckingUser(false);
    });
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const user = await loginUser(email, password);
      setCurrentUser(user as User);
      setIsAuthenticated(true);
    } catch (err) {
      throw Error(err);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (isCheckingUser) return null;

  return (
    <AppContext.Provider value={{ logout }}>
      <Router>
        <div className={styles.container}>
          <Switch>
            <Route exact path="/login">
              <Login login={login} />
            </Route>
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/">
              {currentUser && <Dashboard currentUser={currentUser} />}
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
