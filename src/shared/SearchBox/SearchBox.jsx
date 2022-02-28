import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Spin } from 'antd';
import { OptionContainer, OptionType } from './SearchBox.styled';
import useGetCustomers from '../../data/useGetCustomers';

const { Option } = Select;
const SearchBox = ({ onSelect }) => {
  const { customers } = useGetCustomers();
  const customerData = useMemo(
    () =>
      customers.map(option => ({
        label: option?.companyName,
        value: option.id,
        type: 'customer',
      })),
    [customers]
  );
  const handleChange = value => {
    onSelect(value);
  };

  return (
    <Select
      showSearch
      placeholder="Please Enter Search term ..."
      loading={!customerData?.length && <Spin size="small" />}
      notFoundContent={!customerData?.length}
      filterOption={(input, option) =>
        option?.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
      }
      onChange={value => handleChange(value)}
      optionLabelProp="label"
      allowClear
      style={{
        marginLeft: '10px',
        width: '30%',
      }}
    >
      {customerData?.map(option => {
        return (
          <Option
            id={option.id}
            value={option?.label}
            key={option.id}
            label={option?.label}
            type={option.type}
          >
            <OptionContainer>
              {option.label}
              <OptionType>{option.type}</OptionType>
            </OptionContainer>
          </Option>
        );
      })}
    </Select>
  );
};

SearchBox.propTypes = {
  // dataSource: PropTypes.arrayOf(
  //   PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  // ).isRequired,
  // onChange: PropTypes.func.isRequired,
  // // value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SearchBox;
