
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  wishlist: string[]; // array of product IDs
  cart: CartItem[];
}

export interface Order {
  id: string;
  userId: string;
  items: (CartItem & { name: string, price: number })[];
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  shippingAddress: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
