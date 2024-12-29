// import { increment } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import NavLayout from './NavLayout';
import { FaStar } from "react-icons/fa6";
import Swal from 'sweetalert2';

import firebaseAppConfig from '../util/firebase-config'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
const auth = getAuth(firebaseAppConfig)

const ProductDetail = ({ items }) => {

  const [totalitems, setTotalItems] = useState(0)
  const [session, setSession] = useState(null)
  const location = useLocation();
  const item = location.state || {};

  const increment = () => {
    setTotalItems(totalitems + 1)
  }
  const decrement = () => {
    if (totalitems > 0) {
      setTotalItems(totalitems - 1); // Decrement count by 1
    }
  };

  //   Rating Star ko lagi
  const [rating, setRating] = useState(0)
  const stars = Array.from({ length: 5 });


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user)
      }
      else {
        setSession(null)
      }
    })
  }, [])



  // const[session,setSession]= useState(null)
  const addToCart = () => {
    if (session) {
      Swal.fire({
        title: 'Success!',
        text: 'Your payment was processed successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'No active session found. Please log in to proceed.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  const handleBuyNow = () => {
    if (session) {
      Swal.fire({
        title: 'Success!',
        text: 'Your payment was processed successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'No active session found. Please log in to proceed.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }

  }
  return (
    <NavLayout>
      <div className=' md:my-10 my-4 border shadow-lg md:w-5/6 mx-2 md:mx-auto'>
        <div className=' grid md:grid-cols-3 grid-col-1 md:p-4 p-2 gap-2'>
          <div>
            <img src={item.imageUrl} alt={item.title} className='md:w-[360px] md:h-[400px] w-[300px] h-[280px] p-1 ' />

          </div>
          <div className='flex flex-col px-2  '>
            <h1 className='md:font-bold font-semibold md:text-xl text-[18px]'>{item.title}</h1>
            <hr className='my-2' />


            <div className="flex gap-6 items-center my-2 pr-2">
              <p className=' text-orange-500 md:text-2xl text-xl'>Rating :</p>

              <div className='flex md:gap-5 gap-3'>
                {stars.map((itemsvalue, index) => (
                  <div
                    key={index}
                    onClick={() => setRating(index + 1)}
                    className={`cursor-pointer ${index < rating ? 'text-red-500' : 'text-slate-500'
                      }`}
                  >
                    <FaStar className='md:text-xl' />
                  </div>
                ))}
              </div>

            </div>


            <p className='text-slate-500'>Brand : No Brand || No brand from Company</p>

            <hr className=' text-black md:my-2 my-1' />

            <div className="flex gap-3 mt-2  items-center">
              <p className='md:text-xl text-[14px] text-rose-500 font-semibold md:my-1'>Price:</p>
              <label className='md:text-xl text-[14px]'>${item.price - (item.price * item.discount) / 100}</label>
              <del className="font-semibold text-rose-300 md:text-xl text-[14px]">${item.price}</del>
              <label className="text-slate-600 md:text-xl text-[14px]">({item.discount}% off)</label>
            </div>



            <hr className='md:my-2 my-1' />

            <div className='flex md:gap-4 gap-2 md:my-2 my-1 '>
              <h1 className='md:text-2xl text-xl mt-1'>Quentity:</h1>
              <div className=' flex gap-8 justify-center items-center'>
                <p className='md:text-xl font-bold items-center'>{totalitems}</p>
                <button onClick={increment}
                  className=' border md:px-2 md:py-2 px-1 py-1 hover:bg-slate-400  hover:text-white '>+</button>
                <button onClick={decrement}
                  className=' border md:px-2 px-1 md:py-2 py-1 hover:bg-slate-400  hover:text-white '>-</button>
              </div>
            </div>
            <div className='md:my-3 my-2 flex md:gap-2 gap-1'>
              <h1 className=' md:text-xl text-[18px] '>Delivery:</h1>
              <label className='md:text-xl text-[18px] text-slate-500'> InnerRingRoad-free</label>
            </div>

          </div>

          <div className='flex flex-col gap-1 px-2'>
            <h1 className='md:text-xl  font-semibold'>Product Description</h1>
            <hr className='my-1' />
            <p>{item.description}</p>
          </div>
        </div>
        <div className='md:my-3 my-2  mx-4 flex md:justify-center justify-between items-center md:gap-8 '>
          <button onClick={handleBuyNow}
            className=" bg-green-500 rounded md:px-14 px-7 md:py-2 py-1  hover:bg-green-700 text-white">Buy Now</button>
          <button onClick={() => addToCart()}
            className=" bg-orange-500 rounded md:px-14 px-4 md:py-2 py-1  hover:bg-orange-700 text-white">Add to Cart</button>

        </div>
      </div>
    </NavLayout>)
}

export default ProductDetail