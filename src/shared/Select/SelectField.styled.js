import styled from 'styled-components';
import { Select } from 'antd';

const SelectContainer = styled(Select)`
  width: ${props => (props.type === 'small' ? '20%' : '100%')};
  display: inline-block;
  margin-right: 10px;
`;

export default SelectContainer;
