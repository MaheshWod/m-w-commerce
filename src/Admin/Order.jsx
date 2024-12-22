
import React, { useState } from 'react';
import Layout from './Layout';

const Order = () => {
    const [orders] = useState([
        { orderId: '001',
         customerName: 'manish',
         email: 'madfjljflsfj@gmail.com',
         phoneNo: '+977-9383733993',
         product: 'apple-15',
         amount: '54000',
         date: '12-12-2024 10:15:23 AM',
         status: 'pending'
 
     },
        { orderId: '001',
         customerName: 'manish',
         email: 'madfjljflsfj@gmail.com',
         phoneNo: '+977-9383733993',
         product: 'apple-15',
         amount: '54000',
         date: '12-12-2024 10:15:23 AM',
         status: 'pending'
 
     },
        { orderId: '001',
         customerName: 'manish',
         email: 'madfjljflsfj@gmail.com',
         phoneNo: '+977-9383733993',
         product: 'apple-15',
         amount: '54000',
         date: '12-12-2024 10:15:23 AM',
         status: 'pending'
 
     },
        { orderId: '001',
         customerName: 'manish',
         email: 'madfjljflsfj@gmail.com',
         phoneNo: '+977-9383733993',
         product: 'apple-15',
         amount: '54000',
         date: '12-12-2024 10:15:23 AM',
         status: 'pending'
 
     },
        { orderId: '001',
         customerName: 'manish',
         email: 'madfjljflsfj@gmail.com',
         phoneNo: '+977-9383733993',
         product: 'apple-15',
         amount: '54000',
         date: '12-12-2024 10:15:23 AM',
         status: 'pending'
 
     },
        { orderId: '001',
         customerName: 'manish',
         email: 'madfjljflsfj@gmail.com',
         phoneNo: '+977-9383733993',
         product: 'apple-15',
         amount: '54000',
         date: '12-12-2024 10:15:23 AM',
         status: 'pending'
 
     },
        { orderId: '001',
         customerName: 'manish',
         email: 'madfjljflsfj@gmail.com',
         phoneNo: '+977-9383733993',
         product: 'apple-15',
         amount: '54000',
         date: '12-12-2024 10:15:23 AM',
         status: 'pending'
 
     },
        { orderId: '001',
         customerName: 'manish',
         email: 'madfjljflsfj@gmail.com',
         phoneNo: '+977-9383733993',
         product: 'apple-15',
         amount: '54000',
         date: '12-12-2024 10:15:23 AM',
         status: 'pending'
 
     },
 ])

    return (
        <Layout>
            <div className="md:p-2">
                <h1 className="md:text-2xl md:font-semibold">Orders</h1>

                {/* Desktop view table */}
                <div className="md:mt-2 overflow-x-auto w-full hidden md:block">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-rose-500 text-white">
                                <th className="py-4 px-2 text-center">Order ID</th>
                                <th className="px-2 text-center">Customer's Name</th>
                                <th className="px-2 text-center">Email</th>
                                <th className="px-2 text-center">Phone No.</th>
                                <th className="px-2 text-center">Product</th>
                                <th className="px-2 text-center">Amount</th>
                                <th className="px-2 text-center">Date</th>
                                <th className="px-2 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((items, index) => (
                                <tr
                                    className="border-b text-center"
                                    key={index}
                                    style={{
                                        background: (index + 1) % 2 === 0 ? '#f1f5f9' : 'white',
                                    }}
                                >
                                    <td className="py-4 px-2">{items.orderId}</td>
                                    <td className="px-2 capitalize">{items.customerName}</td>
                                    <td className="px-2">{items.email}</td>
                                    <td className="px-2">{items.phoneNo}</td>
                                    <td className="px-2 capitalize">{items.product}</td>
                                    <td className="px-2">${items.amount}</td>
                                    <td className="px-2">{items.date}</td>
                                    <td className="px-2 capitalize">
                                        <select className="border p-2 border-gray-200">
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="dispatched">Dispatched</option>
                                            <option value="returned">Returned</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile view cards */}
                <div className="block md:hidden mt-4 space-y-4">
                    {orders.map((items, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mx-auto border"
                            style={{
                                background: (index + 1) % 2 === 0 ? '#f9fafb' : 'white',
                            }}
                        >
                            <p className="font-medium">
                                <span className="text-gray-600">Order ID:</span> {items.orderId}
                            </p>
                            <p className="mt-2">
                                <span className="text-gray-600">Name:</span> {items.customerName}
                            </p>
                            <p className="mt-2">
                                <span className="text-gray-600">Email:</span> {items.email}
                            </p>
                            <p className="mt-2">
                                <span className="text-gray-600">Phone No.:</span> {items.phoneNo}
                            </p>
                            <p className="mt-2">
                                <span className="text-gray-600">Product:</span> {items.product}
                            </p>
                            <p className="mt-2">
                                <span className="text-gray-600">Amount:</span> ${items.amount}
                            </p>
                            <p className="mt-2">
                                <span className="text-gray-600">Date:</span> {items.date}
                            </p>
                            <div className="mt-2">
                                <span className="text-gray-600">Status:</span>
                                <select className="block w-full border p-2 mt-1 border-gray-200 rounded-md">
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="dispatched">Dispatched</option>
                                    <option value="returned">Returned</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Order;
