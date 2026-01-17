
import { Product, User, Order, UserRole } from '../types';

const STORAGE_KEY_PRODUCTS = 'azurestore_products';
const STORAGE_KEY_USERS = 'azurestore_users';
const STORAGE_KEY_ORDERS = 'azurestore_orders';
const STORAGE_KEY_AUTH = 'azurestore_auth';

// Sample data to seed the DB
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ocean Blue Minimalist Chair',
    price: 129.99,
    description: 'Ergonomic design with high-quality azure fabric. Perfect for modern living spaces.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
    category: 'Furniture',
    stock: 15
  },
  {
    id: '2',
    name: 'Sapphire Ceramic Vase',
    price: 45.00,
    description: 'Handcrafted ceramic vase with a deep sapphire glaze. Adds elegance to any room.',
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=800',
    category: 'Decor',
    stock: 30
  },
  {
    id: '3',
    name: 'Cloud Watch Pro',
    price: 299.99,
    description: 'Sleek smartwatch with a sky-blue strap. Features advanced health tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    stock: 10
  },
  {
    id: '4',
    name: 'Cobalt Linen Bedding',
    price: 89.99,
    description: 'Ultra-soft cobalt blue linen sheets for a restful night’s sleep.',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    category: 'Home',
    stock: 20
  },
  {
    id: '5',
    name: 'Minimalist Blue Notebook',
    price: 18.50,
    description: 'Hardcover A5 notebook with premium paper and a signature blue bookmark.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    category: 'Stationery',
    stock: 50
  },
  {
    id: '6',
    name: 'Electric Blue Headphones',
    price: 159.00,
    description: 'Noise-canceling wireless headphones with studio-quality audio performance.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    stock: 8
  }
];

export const db = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  },
  saveProducts: (products: Product[]) => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  },
  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEY_USERS);
    return data ? JSON.parse(data) : [];
  },
  saveUsers: (users: User[]) => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  },
  getOrders: (): Order[] => {
    const data = localStorage.getItem(STORAGE_KEY_ORDERS);
    return data ? JSON.parse(data) : [];
  },
  saveOrders: (orders: Order[]) => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  },
  getAuth: () => {
    const data = localStorage.getItem(STORAGE_KEY_AUTH);
    return data ? JSON.parse(data) : { user: null, token: null };
  },
  saveAuth: (auth: { user: User | null; token: string | null }) => {
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(auth));
  }
};
