import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import SelectContainer from './SelectField.styled';
import { onFilterOptions } from '../../utils/utils';
import { OptionContainer, OptionType } from '../SearchBox/SearchBox.styled';

const { Option } = Select;
const SelectField = ({
  loading,
  placeholder,
  allowClear,
  onChange,
  initialValue,
  data,
  mode,
  type,
}) => {
  return (
    <SelectContainer
      showSearch
      type={type}
      loading={loading}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      defaultValue={initialValue}
      mode={mode}
      filterOption={(input, option) =>
        option?.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
      }
    >
      {data?.map(option => {
        return (
          <Option id={option.id} value={option?.label} key={option.id} label={option?.label}>
            <OptionContainer>{option.label}</OptionContainer>
          </Option>
        );
      })}
    </SelectContainer>
  );
};

SelectField.propTypes = {
  loading: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  allowClear: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  mode: PropTypes.string,
  type: PropTypes.string,
};
SelectField.defaultProps = {
  loading: false,
  allowClear: false,
  initialValue: undefined,
  mode: undefined,
  type: undefined,
};

export default SelectField;
