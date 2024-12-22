// import React from 'react'
// import Layout from './Layout'
// import { useState } from 'react'
// const Payment = () => {

//   const [customers, setCustomers] = useState([
  //   {
  //     customerName: 'manish',
  //     email: 'madfjljflsfj@gmail.com',
  //     phoneNo: '+977-9383733993',
  //     amount: '54000',

  //     date: '12-12-2024 10:15:23 AM',


  //   },
  //   {
  //     customerName: 'manish',
  //     email: 'madfjljflsfj@gmail.com',
  //     phoneNo: '+977-9383733993',
  //     amount: '54000',

  //     date: '12-12-2024 10:15:23 AM',


  //   },
  //   {
  //     customerName: 'manish',
  //     email: 'madfjljflsfj@gmail.com',
  //     phoneNo: '+977-9383733993',
  //     amount: '54000',

  //     date: '12-12-2024 10:15:23 AM',


  //   },
  //   {
  //     customerName: 'manish',
  //     email: 'madfjljflsfj@gmail.com',
  //     phoneNo: '+977-9383733993',
  //     amount: '54000',

  //     date: '12-12-2024 10:15:23 AM',


  //   },
  //   {
  //     customerName: 'manish',
  //     email: 'madfjljflsfj@gmail.com',
  //     phoneNo: '+977-9383733993',
  //     amount: '54000',

  //     date: '12-12-2024 10:15:23 AM',


  //   },
    
  // ])

//   return (
//     <>
//       <Layout>
//       <h1 className='text-center font-semibold text-blue-700'>All are the domy data</h1>
//         <div className='p-2'>
//           <h1 className='text-2xl font-semibold'>Pyament</h1>

//           <div className='mt-2 overflow-x-auto'>
//             <table className='w-full border-collapse'>
//               <thead>
//                 <tr className='bg-rose-500 text-white'>

//                   <th className='px-2 text-left'>Customer's Name</th>
//                   <th className='px-2 text-left'>Email</th>
//                   <th className='px-2 text-left'>Phone No.</th>
//                   <th className='px-2 text-left'>Amount</th>
//                   <th className='px-2 text-left'>Date</th>

//                 </tr>
//               </thead>
//               <tbody>
//                 {
//                   customers.map((items, index) => (
//                     <tr className='border-b text-left' key={index}
//                       style={{ background: (index + 1) % 2 === 0 ? '#f1f5f9' : 'white' }}>

//                       <td className='px-2 py-2 capitalize'>
//                         <div className='flex gap-2 '>
//                           <img
//                             src='/images/avat1.jpg' alt='avatar'
//                             className='w-10 h-10 border-2 rounded-full' />
                          
//                         <div>
//                         <span className='font-semibold'>{items.customerName}</span>
//                         <div className='text-grey-500'>{items.date}</div>
//                         </div>
//                         </div>
//                         </td>
//                       <td className='px-2 '>{items.email}</td>
//                       <td className='px-2'>{items.phoneNo}</td>
//                       <td className='px-2'>${items.amount.toLocaleString()}</td>

//                       <td className='px-2 '>{items.date}</td>

//                     </tr>
//                   ))
//                 }

//               </tbody>
//             </table>
//           </div>
//         </div>
//       </Layout>
//     </>
//   )
// }

// export default Payment

import React, { useState } from 'react';
import Layout from './Layout';

const Payment = () => {
  const [customers] = useState([
    {
      customerName: 'manish',
      email: 'madfjljflsfj@gmail.com',
      phoneNo: '+977-9383733993',
      amount: '54000',

      date: '12-12-2024 10:15:23 AM',


    },
    {
      customerName: 'manish',
      email: 'madfjljflsfj@gmail.com',
      phoneNo: '+977-9383733993',
      amount: '54000',

      date: '12-12-2024 10:15:23 AM',


    },
    {
      customerName: 'manish',
      email: 'madfjljflsfj@gmail.com',
      phoneNo: '+977-9383733993',
      amount: '54000',

      date: '12-12-2024 10:15:23 AM',


    },
    {
      customerName: 'manish',
      email: 'madfjljflsfj@gmail.com',
      phoneNo: '+977-9383733993',
      amount: '54000',

      date: '12-12-2024 10:15:23 AM',


    },
    {
      customerName: 'manish',
      email: 'madfjljflsfj@gmail.com',
      phoneNo: '+977-9383733993',
      amount: '54000',

      date: '12-12-2024 10:15:23 AM',


    },
    
  ])

  return (
    <>
      <Layout>
        <h1 className="text-center font-semibold text-blue-700">All are dummy data</h1>
        <div className="p-2">
          <h1 className="text-2xl font-semibold">Payment</h1>

          {/* Desktop View Table */}
          <div className="mt-2 overflow-x-auto hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-rose-500 text-white">
                  <th className="px-2 text-left">Customer's Name</th>
                  <th className="px-2 text-left">Email</th>
                  <th className="px-2 text-left">Phone No.</th>
                  <th className="px-2 text-left">Amount</th>
                  <th className="px-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((items, index) => (
                  <tr
                    className="border-b text-left"
                    key={index}
                    style={{ background: (index + 1) % 2 === 0 ? '#f1f5f9' : 'white' }}
                  >
                    <td className="px-2 py-2 capitalize">
                      <div className="flex gap-2">
                        <img
                          src="/images/avat1.jpg"
                          alt="avatar"
                          className="w-10 h-10 border-2 rounded-full"
                        />
                        <div>
                          <span className="font-semibold">{items.customerName}</span>
                          <div className="text-gray-500">{items.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2">{items.email}</td>
                    <td className="px-2">{items.phoneNo}</td>
                    <td className="px-2">${items.amount.toLocaleString()}</td>
                    <td className="px-2">{items.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View Cards */}
          <div className="block md:hidden mt-4 space-y-4">
            {customers.map((items, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mx-auto border"
                style={{ background: (index + 1) % 2 === 0 ? '#f9fafb' : 'white' }}
              >
                <div className="flex gap-2">
                  <img
                    src="/images/avat1.jpg"
                    alt="avatar"
                    className="w-10 h-10 border-2 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{items.customerName}</p>
                    <p className="text-gray-500 text-sm">{items.date}</p>
                  </div>
                </div>
                <p className="mt-2">
                  <span className="text-gray-600">Email:</span> {items.email}
                </p>
                <p className="mt-2">
                  <span className="text-gray-600">Phone No.:</span> {items.phoneNo}
                </p>
                <p className="mt-2">
                  <span className="text-gray-600">Amount:</span> ${items.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Payment;
