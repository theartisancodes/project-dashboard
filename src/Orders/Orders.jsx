import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FunnelPlotFilled, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popover, Table } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import '../Layout/Dashbaord.css';
import {
  itemRender,
  onFilterOptions,
  PAGINATION_DIRECTION,
  renderSelectOptions,
} from '../utils/utils';
import { Wrappers, ButtonContainers, ButtonWrapper } from './Orders.styled';
import CreateOrder from './CreateOrder';
import useGetCustomers from '../data/useGetCustomers';
import useGetOrders from '../data/useGetOrders';
import SearchBox from '../shared/SearchBox/SearchBox';

const Orders = () => {
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerData, setCustomerData] = useState([]);
  const [paginationDirection, setPaginationDirection] = useState(PAGINATION_DIRECTION.firstPage);
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
      render: () => {
        return (
          <MoreOutlined
            onClick={() => {
              <Popover />;
            }}
          />
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
      <Table
        dataSource={orderData}
        rowKey="id"
        columns={columns}
        loading={loadingOrders}
        pagination={{
          pageSize: 10,
          size: 'small',
          showSizeChanger: false,
        }}
      />
      <CreateOrder onClose={value => handleCreateOrderDrawer(value)} visible={createOrderVisible} />
    </>
  );
};

Orders.propTypes = {};

export default Orders;
