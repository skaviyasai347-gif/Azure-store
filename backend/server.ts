
/**
 * BACKEND REFERENCE IMPLEMENTATION (Node.js + Express + Mongoose)
 * This file contains the architecture for a real backend.
 */

/*
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. Database Connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// 2. Mongoose Schemas (simplified for reference)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  cart: [{ productId: String, quantity: Number }],
  wishlist: [String]
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  category: String,
  stock: Number
});

const OrderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  totalAmount: Number,
  paymentStatus: String,
  shippingAddress: String,
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', UserSchema);
const ProductModel = mongoose.model('Product', ProductSchema);
const OrderModel = mongoose.model('Order', OrderSchema);

// 3. Middlewares
const auth = (req: any, res: any, next: any) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

// 4. API Routes
// Auth
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ name, email, password: hashedPassword });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
  res.json({ token, user });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
  res.json({ token, user });
});

// Products
app.get('/api/products', async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

// Cart & Wishlist (Protected)
app.put('/api/user/cart', auth, async (req: any, res) => {
  const user = await UserModel.findByIdAndUpdate(req.user.id, { cart: req.body.cart }, { new: true });
  res.json(user);
});

// Orders
app.post('/api/orders', auth, async (req: any, res) => {
  const order = new OrderModel({ ...req.body, userId: req.user.id });
  await order.save();
  res.json(order);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/
