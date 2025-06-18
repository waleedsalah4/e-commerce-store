import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Categories
export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get(`${BASE_URL}/products/categories`);
  return data;
};

// Products
export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const { data } = await axios.get(`${BASE_URL}/products/category/${category}`);
  return data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await axios.get(`${BASE_URL}/products/${id}`);
  return data;
};

export const fetchRecentProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(`${BASE_URL}/products?limit=4`);
  return data;
};
