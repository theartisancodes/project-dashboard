import { Card } from 'antd';
import styled from 'styled-components';

export const CardContainer = styled(Card)`
  height: 15%;
  width: 100%;
  margin: 10px 10px;
  .ant-card-body {
    padding: 10px 24px;
  }
`;
export const CardItem = styled.span`
  display: ${props => (props.type === 'unit' ? 'flex' : 'block')};
  font-size: ${props => (props.item === 'type' || props.item === 'price' ? '0.75em' : '0.8em')};
  font-weight: ${props => (props.type === 'name' ? 700 : 600)};
  color: ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.type === 'price' ? 'lightgreen' : props.type === 'type' ? 'gray' : 'black'};
  margin-right: ${props => (props.type === 'unit' ? '20px' : 'auto')};
`;
