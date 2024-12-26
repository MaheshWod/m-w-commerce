// import React, { useState,useEffect } from 'react'

// import { IoCartOutline } from "react-icons/io5";
// import { MdDelete } from "react-icons/md";
// import firebaseAppConfig from '../util/firebase-config'
// import { getFirestore,getDocs,collection,where,query,deleteDoc,doc } from 'firebase/firestore'
// import { onAuthStateChanged,getAuth } from 'firebase/auth'
// import NavLayout from './NavLayout'


// const db = getFirestore(firebaseAppConfig)
// const auth = getAuth(firebaseAppConfig)

// const Cart = () => {
//     const [products, setProducts] = useState([
    
//     ])
//     const [session,setSession] = useState(null)



//     useEffect(()=>{
//         onAuthStateChanged(auth, (user)=>{
//             if(user)
//             {
//                 setSession(user)
//             }
//             else {
//                 setSession(null)
//             }
//         })
//     },[])
//     useEffect(()=>{
//         const req = async ()=>{
//             if(session)
//             {
//                 const col = collection(db, "carts")
//                 const q = query(col, where("userId", "==", session.uid))
//                 const snapshot = await getDocs(q)
//                 const tmp = []
//                 snapshot.forEach((doc)=>{
//                     const document = doc.data()
//                     tmp.push(document)
//                 })
//                 setProducts(tmp)
//             }
//         }
//         req()
//     },[session])

//     const [totalAmount,setTotalAmount] = useState(0)
//     useEffect(() => {
//         const total = products.reduce((sum, item) => {
//           const discountedPrice = item.price - (item.price * item.discount) / 100;
//           return sum + discountedPrice;
//         }, 0);
//         setTotalAmount(total.toFixed(2)); // Set total amount with two decimal places
//       }, [products]);

//       const deleteProducts =async(id)=>{
//         try{
//         const ref = doc(db, 'products', id)
//         await deleteDoc(ref)
//         setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id)); // Update the state
//         }catch(err){
//             console.log("Error")
//         }
//     }
//     return (
//         <>
//             <NavLayout>
//                 <div className='md:my-16 mx-auto md:w-7/12 bg-white shadow-lg border rounded-md p-8'>
//                     <div className='flex items-center gap-3'>
//                         <IoCartOutline className='text-3xl' />
//                         <h1 className='tex-5xl font-semibold'>Cart</h1>
//                     </div>

//                     <div>
//                         <hr className='my-6'></hr>
//                         <div className='space-y-12'>
//                             {
//                                 products.map((items, index) => (
//                                     <div key={index} className='md:flex gap-4'>
//                                         <img src={items.imageUrl} className='w-[100px]  border border-2 border-white shadow rounded'alt='' />
//                                         <div>
//                                             <h1 className='font-semibold capitalize text-lg'>{items.title}</h1>
//                                             <div className='flex flex-col gap-4'>
//                                                 <div className='space-x-3'>
//                                                     <label className='text-lg font-semibold'>${items.price - ((items.price * items.discount) / 100)}
//                                                     </label>
//                                                     <del className='text-red-600'>${items.price}</del>
//                                                     <label className='text-grey-400'>{items.discount} %Discount</label>
//                                                 </div>

//                                                 <button onClick={()=>deleteProducts(items.id)}
//                                                 className='flex justify-center items-center w-fit bg-rose-600 text-white md:px-4 px-2 md:py-2 py-1 rounded gap-1 hover:bg-green-900'>
//                                                     <MdDelete className='' />
//                                                     <h1>Remove</h1>
//                                                 </button>
//                                             </div>
//                                         </div>

//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     </div>

//                     <hr className='md:my-6 my-2'></hr>
//                     <div className='flex justify-between items-center'>
//                         <h1 className='md:text-2xl font-semibold'>Totol Ammount: ${totalAmount}</h1>
//                         <button className='flex justify-center items-center  bg-green-600 text-white md:px-7 md:py-3 px-2 py-1 rounded gap-1 hover:bg-yellow-500 hover:text-black'>
//                             <MdDelete className='text-1xl'/>
//                             <h1>BuyNow</h1>
//                         </button>
//                     </div>
//                 </div>
//             </NavLayout>
//         </>)
// }

// export default Cart

import React, { useState, useEffect } from 'react';
import { IoCartOutline } from "react-icons/io5";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import firebaseAppConfig from '../util/firebase-config';
import { getFirestore, getDocs, collection, where, query, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import NavLayout from './NavLayout';

const db = getFirestore(firebaseAppConfig);
const auth = getAuth(firebaseAppConfig);

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [session, setSession] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    // Monitor user authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user);
            } else {
                setSession(null);
            }
        });

        return () => unsubscribe(); // Cleanup the listener
    }, []);

    // Fetch user's cart items from Firestore
    useEffect(() => {
        const fetchCartItems = async () => {
            if (session) {
                try {
                    const col = collection(db, "carts");
                    const q = query(col, where("userId", "==", session.uid));
                    const snapshot = await getDocs(q);

                    const tmp = [];
                    snapshot.forEach((doc) => {
                        tmp.push({ ...doc.data(), id: doc.id }); // Include the Firestore document ID
                    });

                    setProducts(tmp);
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            }
        };

        fetchCartItems();
    }, [session]);

    // Calculate total amount
    useEffect(() => {
        const total = products.reduce((sum, item) => {
            const discountedPrice = item.price - (item.price * item.discount) / 100;
            return sum + discountedPrice;
        }, 0);

        setTotalAmount(total.toFixed(2)); // Format total amount to two decimal places
    }, [products]);

    // Delete a product from Firestore and update local state
    const deleteProduct = async (id) => {
        try {
            const ref = doc(db, 'carts', id); // Reference the correct collection
            await deleteDoc(ref);

            // Remove the product from the local state
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };



    const handleBuyNow = async () => {
        try {
            if (session) {
                const col = collection(db, "carts");
                const q = query(col, where("userId", "==", session.uid));
                const snapshot = await getDocs(q);
    
                const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
                await Promise.all(deletePromises);
    
                setProducts([]); // Clear local state
    
                Swal.fire({
                    title: 'Success!',
                    text: 'Your payment was processed successfully, and your cart has been cleared.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'No active session found. Please log in to proceed.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while processing your payment.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };
    
    return (
        <>
            <NavLayout>
                <div className='md:my-16 mx-auto md:w-7/12 bg-white shadow-lg border rounded-md p-6 '>
                    <div className='flex items-center md:gap-3 gap-1'>
                        <IoCartOutline className='md:text-3xl text-2xl' />
                        <h1 className='md:text-5xl text-xl font-semibold'>Cart</h1>
                    </div>

                    <div>
                        <hr className='my-6'></hr>
                        <div className='space-y-12'>
                            {products.map((item) => (
                                <div key={item.id} className='md:flex gap-4'>
                                    <img src={item.imageUrl} className='w-[100px] border  border-white shadow rounded' alt='' />
                                    <div>
                                        <h1 className='font-semibold capitalize md:text-lg text-[16px]'>{item.title}</h1>
                                        <div className='flex flex-col gap-4'>
                                            <div className='space-x-3'>
                                                <label className='text-lg font-semibold'>
                                                    ${item.price - ((item.price * item.discount) / 100)}
                                                </label>
                                                <del className='text-red-600'>${item.price}</del>
                                                <label className='text-gray-400'>{item.discount}% Discount</label>
                                            </div>

                                            <button
                                                onClick={() => deleteProduct(item.id)}
                                                className='flex justify-center items-center w-fit bg-rose-600 text-white md:px-4 px-2 md:py-2 py-1 rounded gap-1 hover:bg-green-900'
                                            >
                                                <MdDelete />
                                                <h1>Remove</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className='md:my-6 my-2'></hr>
                    <div className='flex justify-between items-center gap-1'>
                        <h1 className='md:text-2xl font-semibold'>Total Amount: ${totalAmount}</h1>
                        <button onClick={handleBuyNow}
                        className='flex justify-center items-center bg-green-600 text-white md:px-6 md:py-3 px-1 py-1 rounded md:gap-1  hover:bg-yellow-500 hover:text-black'>
                            <MdDelete className='md:text-xl text-[13px]' />
                            <h1 className='text-[14px]'>Buy Now</h1>
                            

                        </button>
                    </div>
                </div>
            </NavLayout>
        </>
    );
};

export default Cart;
