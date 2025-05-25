// src/services/subscription/subscriptionService.js
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Subscription } from '../../models/subscriptions.js';
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1) Create a Razorpay Order & save
export const createOrder = async (userId, amount, currency = 'INR') => {
  const options = { amount, currency, receipt: `rcpt_${Date.now()}` };
  const order = await razorpay.orders.create(options);

  await Subscription.create({
    user_id: userId,
    razorpay_order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    status: 'created',
  });

  return order;
};

// 2) Verify payment signature from frontend
export const verifySignature = (order_id, payment_id, signature) => {
  const generated = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest('hex');
  if (generated !== signature) throw new Error('Invalid signature');
  // update subscription record
  return Subscription.update(
    { razorpay_payment_id: payment_id, status: 'paid' },
    { where: { razorpay_order_id: order_id } }
  );
};

// 3) Handle webhook events (raw body + header)
export const processWebhook = async (req) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const body = req.body; // raw buffer

  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  if (signature !== expected) throw new Error('Invalid webhook signature');

  const event = JSON.parse(body);
  const payload = event.payload.payment?.entity;
  if (!payload) return;

  const orderId = payload.order_id;
  const paymentId = payload.id;
  let status = 'unknown';
  if (event.event === 'payment.captured') status = 'captured';
  if (event.event === 'payment.failed') status = 'failed';

  await Subscription.update(
    { status, razorpay_payment_id: paymentId },
    { where: { razorpay_order_id: orderId } }
  );
};

// 4) Get current subscription for a user
export const getActive = async (userId) => {
  const sub = await Subscription.findOne({
    where: { user_id: userId },
    order: [['created_at', 'DESC']],
  });
  return sub;
};

// 5) Cancel subscription (you may refund or mark in DB)
export const cancel = async (userId) => {
  const sub = await Subscription.findOne({
    where: { user_id: userId },
    order: [['created_at', 'DESC']],
  });
  if (!sub) throw new Error('No subscription found');
  // you can also call razorpay.subscriptions.cancel if using actual subscription API
  await sub.update({ status: 'canceled' });
};
