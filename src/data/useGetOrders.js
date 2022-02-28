import { useMemo } from 'react';
import orderData from '../mockdata/orders.json';

const useGetOrders = () => {
  const orders = useMemo(() => orderData, []);

  return { orders };
};

export default useGetOrders;
