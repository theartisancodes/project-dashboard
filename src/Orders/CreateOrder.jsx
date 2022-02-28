import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Form } from 'antd';
import SelectField from '../shared/Select/SelectField';
import { renderSelectOptions, setRules } from '../utils/utils';
import { FormItem, SubmitOrder } from './Orders.styled';
import useGetCustomers from '../data/useGetCustomers';

const { Item } = Form;
const validateMessages = {
  required: 'Input is required!',
};

const layout = {
  labelCol: {
    span: 14,
  },
  wrapperCol: {
    span: 24,
  },
};
const CreateOrder = ({ onClose, visible, handleSubmit }) => {
  const [formRef] = Form.useForm();
  const [selectCustomers, setSelectedCustomers] = useState('');
  const [selectedProducts, setSelectedProducts] = useState('');
  const { customers } = useGetCustomers();

  const customerData = useMemo(
    () =>
      customers.map(option => ({
        label: option?.companyName,
        value: option.id,
      })),
    [customers]
  );

  const handleCustomerChange = value => {
    setSelectedCustomers(value);
  };
  const handleProductChange = value => {
    setSelectedProducts(value);
  };
  return (
    <Drawer
      title="Create Order"
      placement="right"
      closable
      onClose={onClose}
      visible={visible}
      width="50%"
      height="100%"
    >
      <Form
        {...layout}
        form={formRef}
        name="customer"
        className="form-styling"
        layout="horizontal"
        requiredMark={false}
        validateMessages={validateMessages}
      >
        <FormItem label="Customer" className="ant-row ant-form-item">
          <SelectField
            loading={false}
            placeholder="Select Customer"
            allowClear
            onChange={handleCustomerChange}
            data={customerData}
            renderFields={renderSelectOptions}
          />
        </FormItem>
        <FormItem label="Product" className="ant-row ant-form-item">
          <SelectField
            loading={false}
            placeholder="Select Product"
            allowClear
            onChange={handleProductChange}
            data={[]}
            renderFields={renderSelectOptions}
            mode="multiple"
          />
        </FormItem>
      </Form>
      <SubmitOrder type="primary" onClick={handleSubmit}>
        View Cart
      </SubmitOrder>
    </Drawer>
  );
};

CreateOrder.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};

CreateOrder.defaultProps = {
  visible: false,
};
export default CreateOrder;
