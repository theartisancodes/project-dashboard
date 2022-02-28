import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined, SettingOutlined } from '@ant-design/icons';
import './Dashbaord.css';
import Orders from '../Orders/Orders';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const menu = (
    <Menu visible>
      <Menu.Item key="1">
        <TeamOutlined />
        <span>Admin</span>
      </Menu.Item>
      <Menu.Item key="2">
        <SettingOutlined />
        <span>My Settings</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <Header toggle={() => {}} menu={menu} collapsed={collapsed} />
        <Orders />
      </Layout>
    </Layout>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
