import React, { useState,useEffect } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import firebaseAppConfig from '../util/firebase-config'
import { getFirestore,getDocs,collection,where,query,deleteDoc,doc } from 'firebase/firestore'
import { onAuthStateChanged,getAuth } from 'firebase/auth'
import NavLayout from './NavLayout'


const db = getFirestore(firebaseAppConfig)
const auth = getAuth(firebaseAppConfig)

const Cart = () => {
    const [products, setProducts] = useState([
    
    ])
    const [session,setSession] = useState(null)



    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user)
            {
                setSession(user)
            }
            else {
                setSession(null)
            }
        })
    },[])
    useEffect(()=>{
        const req = async ()=>{
            if(session)
            {
                const col = collection(db, "carts")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                const tmp = []
                snapshot.forEach((doc)=>{
                    const document = doc.data()
                    tmp.push(document)
                })
                setProducts(tmp)
            }
        }
        req()
    },[session])

    const [totalAmount,setTotalAmount] = useState(0)
    useEffect(() => {
        const total = products.reduce((sum, item) => {
          const discountedPrice = item.price - (item.price * item.discount) / 100;
          return sum + discountedPrice;
        }, 0);
        setTotalAmount(total.toFixed(2)); // Set total amount with two decimal places
      }, [products]);

      const deleteProducts =async(id)=>{
        try{
        const ref = doc(db, 'products', id)
        await deleteDoc(ref)
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id)); // Update the state
        }catch(err){
            console.log("Error")
        }
    }
    return (
        <>
            <NavLayout>
                <div className='md:my-16 mx-auto md:w-7/12 bg-white shadow-lg border rounded-md p-8'>
                    <div className='flex items-center gap-3'>
                        <IoCartOutline className='text-3xl' />
                        <h1 className='tex-5xl font-semibold'>Cart</h1>
                    </div>

                    <div>
                        <hr className='my-6'></hr>
                        <div className='space-y-12'>
                            {
                                products.map((items, index) => (
                                    <div key={index} className='md:flex gap-4'>
                                        <img src={items.imageUrl} className='w-[100px]  border border-2 border-white shadow rounded'alt='' />
                                        <div>
                                            <h1 className='font-semibold capitalize text-lg'>{items.title}</h1>
                                            <div className='flex flex-col gap-4'>
                                                <div className='space-x-3'>
                                                    <label className='text-lg font-semibold'>${items.price - ((items.price * items.discount) / 100)}
                                                    </label>
                                                    <del className='text-red-600'>${items.price}</del>
                                                    <label className='text-grey-400'>{items.discount} %Discount</label>
                                                </div>

                                                <button onClick={()=>deleteProducts(items.id)}
                                                className='flex justify-center items-center w-fit bg-rose-600 text-white md:px-4 px-2 md:py-2 py-1 rounded gap-1 hover:bg-green-900'>
                                                    <MdDelete className='' />
                                                    <h1>Remove</h1>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <hr className='md:my-6 my-2'></hr>
                    <div className='flex justify-between items-center'>
                        <h1 className='md:text-2xl font-semibold'>Totol Ammount: ${totalAmount}</h1>
                        <button className='flex justify-center items-center  bg-green-600 text-white md:px-7 md:py-3 px-2 py-1 rounded gap-1 hover:bg-yellow-500 hover:text-black'>
                            <MdDelete className='text-1xl'/>
                            <h1>BuyNow</h1>
                        </button>
                    </div>
                </div>
            </NavLayout>
        </>)
}

export default Cart