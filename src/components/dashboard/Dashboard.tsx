import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from '../navBar/NavBar';

import styles from './Dashboard.module.scss';

const Dashboard: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <NavBar />
      </div>
      <div className={styles.content}>
        <Switch>
          <Route exact path="/">
            overview
          </Route>
          <Route exact path="/organisations">
            Organisations
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
