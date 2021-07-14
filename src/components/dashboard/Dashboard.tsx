import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from '../navBar/NavBar';
import Overview from '../overview/Overview';
import type { User } from '../App';

import styles from './Dashboard.module.scss';

type Props = {
  currentUser: User;
};

type DashboardContextProps = {
  currentUser: User;
};

export const DashboardContext = React.createContext(
  {} as DashboardContextProps
);

const Dashboard: React.FC<Props> = ({ currentUser }) => {
  return (
    <DashboardContext.Provider value={{ currentUser }}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <NavBar />
        </div>
        <div className={styles.content}>
          <Switch>
            <Route exact path="/" component={Overview} />
            <Route exact path="/organisations">
              Organisations
            </Route>
          </Switch>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
