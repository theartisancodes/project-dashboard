import { useCallback, useMemo } from 'react';
import orderData from '../mockdata/orders.json';
import { jsonParser } from '../utils/utils';

const useGetOrders = () => {
  const orders = useMemo(() => orderData, []);
  const updateOrder = useCallback(() => {
    if (Object.keys(jsonParser(localStorage.getItem('orders')))?.length) {
      const data = jsonParser(localStorage.getItem('orders'));
      orders.push(data);
    }
  }, [orders]);

  return { orders };
};

export default useGetOrders;
