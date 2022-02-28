import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, InputNumber } from 'antd';
import { CardContainer, CardItem } from './CartItems.styled';
import SelectField from '../Select/SelectField';

const units = [
  {
    label: 'unit',
    value: 'unit',
  },
];
const CartItems = ({ productData, numberOfItems }) => {
  const [changeUnit, setChangeUnit] = useState([]);
  const [items, setItems] = useState('');
  const handleChangeItems = value => {
    setItems(value);
    numberOfItems(value);
  };
  const handleChangeUnit = value => {
    setChangeUnit(value);
  };
  return productData?.map((item, index) => (
    <CardContainer key={index} hoverable>
      <CardItem key={index} type="type">
        {item?.type}
      </CardItem>
      <CardItem key={index} type="name">
        {item?.label}
      </CardItem>
      <CardItem key={index} type="price">
        {item?.price}
      </CardItem>
      <CardItem key={index} type="unit">
        <SelectField
          type="small"
          onChange={() => handleChangeUnit()}
          data={units}
          allowClear
          placeholder="Units"
        />
        <InputNumber key={index} onChange={handleChangeItems} />
      </CardItem>
    </CardContainer>
  ));
};

CartItems.propTypes = {
  productData: PropTypes.objectOf(PropTypes.string).isRequired,
  numberOfItems: PropTypes.func.isRequired,
};

export default CartItems;
