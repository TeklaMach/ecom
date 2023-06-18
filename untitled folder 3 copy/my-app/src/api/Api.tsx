import axios from 'axios';

export const getProducts = (pageSize: number, currentPage: number,  brand: string | null) => {
  return axios.post('http://localhost:8080/products', {
    keyword: '',
    page_size: pageSize,
    page_number: currentPage,
    brand: brand || ''
  });
};

export const getProduct = (id: string) => {
    return axios.get(`http://localhost:8080/product/${id}`);
  };
  export const searchBrands = (brands: string) => {
    return axios.get(`http://localhost:8080/brands/${brands}`);
  };


