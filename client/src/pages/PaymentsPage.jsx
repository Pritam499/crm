import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CRMLayout from '../components/Shared/CRMLayout';

const PaymentsPage = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const loadRazorpay = () =>
    new Promise((res) => {
      if (window.Razorpay) return res(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => res(true);
      script.onerror = () => res(false);
      document.body.appendChild(script);
    });

  const payNow = async () => {
    if (!amount || isNaN(amount)) return alert('Enter valid amount');
    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) return alert('Razorpay SDK failed to load.');

    const orderRes = await fetch('http://localhost:5000/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(amount) * 100,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
      }),
    });
    if (!orderRes.ok) return alert('Order creation failed.');
    const order = await orderRes.json();

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, 
      amount: order.amount,
      currency: order.currency,
      name: 'SoftQubic CRM',
      description: 'CRM Payment',
      order_id: order.id,
      handler: async (resp) => {
        const verifyRes = await fetch(
          'http://localhost:5000/verify-payment',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resp),
          }
        );
        const verify = await verifyRes.json();
        if (verify.success) return navigate('/payment-success');
        navigate('/payment-failed');
      },
      prefill: { name: '', email: '', contact: '' },
      theme: { color: '#111111' },
    };

    const rz = new window.Razorpay(options);
    rz.open();
    rz.on('payment.failed', () => navigate('/payment-failed'));
  };

  return (
    <CRMLayout title="Payments">
      <div className="max-w-sm mx-auto bg-glass-white backdrop-blur-xs p-6 rounded-xl shadow-lg">
        <label className="block text-gray-200 mb-2">Amount (₹):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded border border-gray-600 mb-4 bg-transparent text-white"
          placeholder="Enter amount"
        />
        <button
          onClick={payNow}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </div>
    </CRMLayout>
  );
};

export default PaymentsPage;
