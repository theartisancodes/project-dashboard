import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  EditOutlined,
  FunnelPlotFilled,
  InfoCircleOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Table, Modal, Menu, Dropdown } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import '../Layout/Dashbaord.css';
import { Wrappers, ButtonContainers, ButtonWrapper, TableWrapper } from './Orders.styled';
import CreateOrder from './CreateOrder';
import useGetOrders from '../data/useGetOrders';
import SearchBox from '../shared/SearchBox/SearchBox';

const { confirm } = Modal;
const Orders = () => {
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [createOrderVisible, setCreateOrderVisible] = useState(false);
  const { orders } = useGetOrders();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [orderData, setOrderData] = useState([]);

  const handleCreateOrderDrawer = value => {
    setCreateOrderVisible(value);
  };
  const handleOnSelect = value => {
    setSelectedCustomer(value);
  };
  const getOrders = useCallback(() => {
    if (orders?.length) {
      if (selectedCustomer) {
        setOrderData(orders?.filter(item => item?.companyName === selectedCustomer));
      } else {
        setOrderData(orders);
      }
    }
  }, [selectedCustomer, orders, setOrderData]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const columns = [
    {
      title: 'NUMBER',
      key: 'id',
      dataIndex: 'id',
      width: 500,
    },
    {
      title: 'NAME',
      key: 'id',
      dataIndex: 'companyName',
    },
    {
      title: 'TOTAL PRICE',
      key: 'id',
      dataIndex: 'totalPrice',
    },
    {
      title: 'PAYMENT STATUS',
      key: 'id',
      dataIndex: 'paymentStatus',
      render: record => {
        if (record === 'pending') {
          return (
            <Button type="text" danger>
              {record?.toUpperCase()}
            </Button>
          );
        }
        return (
          <Button type="text" style={{ color: 'purple' }}>
            {record?.toUpperCase()}
          </Button>
        );
      },
    },
    {
      title: 'STATUS',
      key: 'id',
      dataIndex: 'status',
      render: record => {
        if (record === 'pending') {
          return (
            <Button type="text" style={{ color: 'orange' }}>
              {record?.toUpperCase()}
            </Button>
          );
        }
        return (
          <Button type="text" style={{ color: 'purple' }}>
            {record?.toUpperCase()}
          </Button>
        );
      },
    },
    {
      title: 'ACTIONS',
      key: 'id',
      render: function handleAction(record) {
        const menu = (
          <Menu style={{ alignContent: 'flex-start' }}>
            <Menu.ItemGroup>
              <Menu.Item key="1" onClick={() => {}} icon={<EditOutlined />}>
                Edit Order
              </Menu.Item>
              <Menu.Item key="2" onClick={() => {}} icon={<InfoCircleOutlined />}>
                Delete Order
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        );
        return (
          <Dropdown overlay={menu}>
            <MoreOutlined onClick={() => {}} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <Wrappers>
        <SearchBox onSelect={value => handleOnSelect(value)} />
        <ButtonContainers>
          <ButtonGroup>
            <ButtonWrapper onClick={() => {}}>
              <FunnelPlotFilled />
              Filter
            </ButtonWrapper>
            <ButtonWrapper isPrimary type="primary" onClick={() => handleCreateOrderDrawer(true)}>
              <PlusOutlined /> Create Order
            </ButtonWrapper>
          </ButtonGroup>
        </ButtonContainers>
      </Wrappers>
      <TableWrapper>
        <Table
          dataSource={orderData}
          rowKey="id"
          size="small"
          columns={columns}
          loading={loadingOrders}
          pagination={{
            pageSize: 10,
            size: 'small',
            showSizeChanger: false,
          }}
        />
      </TableWrapper>
      <CreateOrder onClose={value => handleCreateOrderDrawer(value)} visible={createOrderVisible} />
    </>
  );
};

Orders.propTypes = {};

export default Orders;
