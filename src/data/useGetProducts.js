import { useMemo } from 'react';
import productsData from '../mockdata/products.json';

const useGetProducts = () => {
  const products = useMemo(() => productsData, []);

  return { products };
};

export default useGetProducts;
