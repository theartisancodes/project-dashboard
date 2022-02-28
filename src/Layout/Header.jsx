import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Layout, Popover } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const Header = ({ collapsed, toggle, menu }) => {
  return (
    <AntHeader
      style={
        collapsed
          ? { width: 'calc(100vw - 30px)', background: '#fff' }
          : { width: 'calc(100vw - 100px)', background: '#fff' }
      }
    >
      <MenuFoldOutlined
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggle}
        style={{ position: 'relative', right: '50%' }}
        height="1.5em"
        width="1.5em"
      />

      <span className="user-profile" style={{ position: 'relative', left: '42%' }}>
        <Popover placement="bottomRight" title="Admin" content={menu} trigger="hover">
          <Avatar
            style={{
              backgroundColor: '#AED6F1',
              verticalAlign: 'middle',
            }}
          >
            A
          </Avatar>
        </Popover>
      </span>
    </AntHeader>
  );
};

Header.propTypes = {
  toggle: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
  menu: PropTypes.func.isRequired,
};

Header.defaultProps = {
  collapsed: false,
};

export default Header;
