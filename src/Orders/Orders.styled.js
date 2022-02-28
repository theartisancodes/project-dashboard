import styled from 'styled-components';
import { Button, Form } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const { Item } = Form;
export const Wrappers = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10%;
`;

export const ButtonContainers = styled.div`
  display: flex;
  margin-left: 10px;
`;

export const ButtonWrapper = styled(Button)`
  left: ${props => (props.isPrimary ? '40vw' : '1vw')};
  color: ${props => (props.isPrimary ? 'white' : '#08A8FF')};
  border-color: ${props => (props.isPrimary ? 'initial' : '#08A8FF')};
  border-radius: 5px;
`;

export const FormItem = styled(Item)`
  display: inline-block;
  width: 100%;
`;

export const SubmitOrder = styled(Button)`
  width: 100%;
  top: 70%;
`;
