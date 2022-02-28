import React from 'react';
import { Button, Select } from 'antd';
import orderData from '../mockdata/orders.json';
import customerData from '../mockdata/customers.json';
import './utils.css';

const { Option } = Select;

export const handleOnChange = (value, setState, setUpdate = () => {}, update = false) => {
  if (update) {
    setUpdate(true);
    setState(value);
  } else {
    setState(value);
  }
};
export const handleOnChangeEvent = (event, setState, setUpdate = () => {}, update = false) => {
  if (update) {
    setUpdate(true);
    setState(event.target.value);
  } else {
    setState(event.target.value);
  }
};

export const PAGINATION_DIRECTION = {
  firstPage: 'firstPage',
  nextPage: 'nextPage',
  prevPage: 'prevPage',
};

export const itemRender = (current, type, originalElement, setPaginationDirection) => {
  if (type === 'prev') {
    return (
      <Button onClick={() => setPaginationDirection(PAGINATION_DIRECTION.prevPage)}>
        Previous
      </Button>
    );
  }

  if (type === 'next') {
    return (
      <Button onClick={() => setPaginationDirection(PAGINATION_DIRECTION.nextPage)}>Next</Button>
    );
  }

  setPaginationDirection(PAGINATION_DIRECTION.firstPage);
  return originalElement;
};

export const handlePaginationChange = ({ stateSetter, pageInfo, paginationDirection }) => {
  if (paginationDirection === PAGINATION_DIRECTION.firstPage) {
    stateSetter(() => ({ first: 10 }));
  }

  if (paginationDirection === PAGINATION_DIRECTION.nextPage) {
    stateSetter(() => ({ after: pageInfo?.endCursor || '', first: 10 }));
  }

  if (paginationDirection === PAGINATION_DIRECTION.prevPage) {
    stateSetter(() => ({ before: pageInfo?.startCursor || '', last: 10 }));
  }
};

export const onFilterOptions = (input, option) =>
  option.props.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;

export const rules = [
  {
    key: 'customer',
    rules: [{ required: true, message: 'Please Select Client' }],
  },

  {
    key: 'product',
    rules: [{ required: true, message: 'Please Select Product' }],
  },
];

export const setRules = inputName => {
  const found = rules.filter(rule => rule.key === inputName);
  return found.length ? found[0].rules : '';
};

export const renderSelectOptions = (option, index) => (
  <Option key={index} value={option.id} label={option?.companyName}>
    {option.label}
  </Option>
);
