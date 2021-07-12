import React from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  AppstoreAddOutlined,
  ShopOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
  const { logout } = React.useContext(AppContext);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>moti</div>
      <Menu className={styles.menu}>
        <Menu.Item
          icon={<AppstoreAddOutlined />}
          className={styles.menuItem}
          key="overview"
        >
          <Link to="/">Overview</Link>
        </Menu.Item>
        <Menu.Item
          icon={<ShopOutlined />}
          className={styles.menuItem}
          key="organisations"
        >
          <Link to="/organisations">Organisations</Link>
        </Menu.Item>
        <Menu.Item
          icon={<LogoutOutlined className={styles.logoutIcon} />}
          className={styles.menuItem}
          key="logout"
          onClick={logout}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
