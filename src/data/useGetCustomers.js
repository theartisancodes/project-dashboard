import { useMemo } from 'react';
import customerData from '../mockdata/customers.json';

const useGetCustomers = () => {
  const customers = useMemo(() => customerData, []);

  return { customers };
};

useGetCustomers.propTypes = {};

export default useGetCustomers;
