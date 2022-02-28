import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const Sidebar = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo-small" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
          Orders
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Products
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
Sidebar.defaultProps = {
  collapsed: false,
};

export default Sidebar;
