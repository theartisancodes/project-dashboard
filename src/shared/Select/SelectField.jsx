import React from 'react';
import PropTypes from 'prop-types';
import SelectContainer from './SelectField.styled';
import { onFilterOptions } from '../../utils/utils';

const SelectField = ({
  loading,
  placeholder,
  allowClear,
  onChange,
  initialValue,
  data,
  renderFields,
  mode,
}) => {
  return (
    <SelectContainer
      showSearch
      loading={loading}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      filterOption={onFilterOptions}
      defaultValue={initialValue}
      mode={mode}
    >
      {data?.map((option, index) => renderFields(option, index))}
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
  renderFields: PropTypes.func.isRequired,
};
SelectField.defaultProps = {
  loading: false,
  allowClear: false,
  initialValue: '',
  mode: undefined,
};

export default SelectField;
