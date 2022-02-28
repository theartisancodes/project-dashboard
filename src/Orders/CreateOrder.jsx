import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Drawer, Form, message } from 'antd';
import SelectField from '../shared/Select/SelectField';
import { FormItem, SubmitOrder } from './Orders.styled';
import useGetCustomers from '../data/useGetCustomers';
import useGetProducts from '../data/useGetProducts';
import CartItems from '../shared/CartItems/CartItems';
import { setRules } from '../utils/utils';

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
const CreateOrder = ({ onClose, visible }) => {
  const [form] = Form.useForm();
  const [selectedCustomers, setSelectedCustomers] = useState('');
  const [customerValue, setCustomerValue] = useState({});
  const [itemData, setItemData] = useState([]);
  const [fieldValue, setFieldvalue] = useState(undefined);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { customers } = useGetCustomers();
  const { products } = useGetProducts();

  const customerData = useMemo(
    () =>
      customers.map(option => ({
        label: option?.companyName,
        value: option.id,
      })),
    [customers]
  );
  const productData = useMemo(
    () =>
      products.map(option => ({
        label: option?.productName,
        value: option.id,
        type: option.type,
        price: option.price,
        stock: option.stock,
      })),
    [products]
  );

  const handleCustomerChange = value => {
    setSelectedCustomers(value);
  };
  const handleProductChange = value => {
    setSelectedProducts(value);
  };
  const filterSelectedItems = useCallback(() => {
    const cart = [];
    selectedProducts?.forEach((item, index) => {
      return cart.push(productData.filter(product => product.label === item)[0]);
    });
    const data = customers.filter(customer => customer.companyName === selectedCustomers)?.[0];
    setCustomerValue(data);
    setCartItems(cart);
  }, [customers, setCartItems, selectedProducts, productData, setCustomerValue, selectedCustomers]);
  useEffect(() => {
    filterSelectedItems();
  }, [filterSelectedItems]);
  const onValuesChange = ({ fieldName }) => {
    if (!fieldValue && fieldName) {
      setFieldvalue(fieldName);
    }
  };
  const handleSubmit = () => {
    const lastItem = cartItems.pop();
    const totalPriceValue = itemData * lastItem?.price;
    const newOrder = {
      id: uuidv4(),
      companyName: customerValue?.companyName,
      totalPrice: totalPriceValue,
      paymentStatus: 'pending',
      status: 'pending',
    };
    localStorage.setItem('orders', JSON.stringify(newOrder));
    message.success('Order Created Successfully');
    onClose(!visible);
  };
  return (
    <Drawer
      title="Create Order"
      placement="right"
      closable
      maskClosable={false}
      onClose={() => onClose(false)}
      visible={visible}
      width="50%"
      height="100%"
      destroyOnClose
    >
      <Form
        {...layout}
        form={form}
        name="customer"
        className="form-styling"
        layout="horizontal"
        requiredMark={false}
        validateMessages={validateMessages}
        onValuesChange={onValuesChange}
      >
        <FormItem
          label="Customer"
          className="ant-row ant-form-item"
          name="customer"
          rules={setRules('customer')}
        >
          <SelectField
            loading={false}
            placeholder="Select Customer"
            allowClear
            onChange={handleCustomerChange}
            data={customerData}
          />
        </FormItem>
        <FormItem label="Product" className="ant-row ant-form-item" name="product">
          <SelectField
            loading={false}
            placeholder="Select Product"
            allowClear
            onChange={handleProductChange}
            data={productData}
            mode="multiple"
          />
        </FormItem>
      </Form>
      <div>
        {cartItems?.length > 0 && (
          <CartItems productData={cartItems} numberOfItems={value => setItemData(value)} />
        )}
      </div>
      <SubmitOrder
        type="primary"
        onClick={() => {
          handleSubmit();
          onClose(false);
        }}
        disabled={!cartItems?.length && !itemData?.length && !selectedCustomers}
      >
        View Cart
      </SubmitOrder>
    </Drawer>
  );
};

CreateOrder.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

CreateOrder.defaultProps = {
  visible: false,
};
export default CreateOrder;
