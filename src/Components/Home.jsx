import { useEffect, useState } from 'react'
import React from 'react'
import NavLayout from './NavLayout'
import Swal from 'sweetalert2'
import firebaseAppConfig from '../util/firebase-config'
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
// import { Carousel } from 'react-responsive-carousel'
// import { IoIosArrowBack } from "react-icons/io";
import { Carousel } from "flowbite-react";
// import Slider from "react-slick";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'

const db = getFirestore(firebaseAppConfig)
const auth = getAuth(firebaseAppConfig)

const Home = () => {






  const [product, setProduct] = useState([])
  const [session, setSession] = useState(null)

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

  useEffect(() => {
    const req = async () => {
      const snapshot = await getDocs(collection(db, "products"))
      const temp = []
      snapshot.forEach((doc) => {
        const allProducts = doc.data()
        allProducts.id = doc.id
        // console.log(allProducts)
        temp.push(allProducts)
      })
      setProduct(temp)
    }
    req()
  })

  const addToCart = async (item) => {
    try {
      item.userId = session.uid
      await addDoc(collection(db, "carts"), item)
      new Swal({
        icon: 'success',
        title: 'Product Added !'
      })
    }
    catch (err) {
      new Swal({
        icon: 'error',
        title: 'Failed !',
        text: err.message
      })
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
    <>
      <NavLayout>

         <div className='relative z-100 '>
          <Carousel>

            <div className="md:h-96 h-48 md:w-full max-h-full relative   bg-cover bg-center rounded-none" style={{ backgroundImage: 'url("/nature1.jpg") '}}>
              <div className="absolute inset-0 bg-slate-700 md:bg-opacity-70 bg-opacity-50 md:mx-80  md:my-32 flex items-center justify-center rounded-md">
                <div className="text-center text-white  ">
                  <h3 className="md:text-xl md:font-bold font-semibold ">Nature Of Stars</h3>
                  <p className='px-10 text-slate-200'>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,...`.slice(0, 100)}</p>
                  <Link to="https://www.britannica.com/science/mountain-landform" target="_blank">
                    <button className="mt-4 bg-slate-500 text-white md:px-4 px-2 py-[2px] md:py-2 rounded hover:bg-neutral-400 my-3 md:font-semibold ">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:h-96 h-48 md:w-full max-h-full relative   bg-cover bg-center rounded-none" style={{ backgroundImage: 'url("/snow.jpg") '}}>
              <div className="absolute inset-0 bg-slate-700 md:bg-opacity-70 bg-opacity-50 md:mx-80  md:my-32 flex items-center justify-center rounded-md">
                <div className="text-center text-white  ">
                  <h3 className="md:text-xl md:font-bold font-semibold ">Nature Of Stars</h3>
                  <p className='px-10 text-slate-200'>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,...`.slice(0, 100)}</p>
                  <Link to="https://www.britannica.com/science/mountain-landform" target="_blank">
                    <button className="mt-4 bg-slate-500 text-white md:px-4 px-2 py-[2px] md:py-2 rounded hover:bg-neutral-400 my-3 md:font-semibold ">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:h-96 h-48 md:w-full max-h-full relative   bg-cover bg-center rounded-none" style={{ backgroundImage: 'url("/sweet.jpg") '}}>
              <div className="absolute inset-0 bg-slate-700 md:bg-opacity-70 bg-opacity-50 md:mx-80  md:my-32 flex items-center justify-center rounded-md">
                <div className="text-center text-white  ">
                  <h3 className="md:text-xl md:font-bold font-semibold ">Nature Of Stars</h3>
                  <p className='px-10 text-slate-200'>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,...`.slice(0, 100)}</p>
                  <Link to="https://www.britannica.com/science/mountain-landform" target="_blank">
                    <button className="mt-4 bg-slate-500 text-white md:px-4 px-2 py-[2px] md:py-2 rounded hover:bg-neutral-400 my-3 md:font-semibold ">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:h-96 h-48 md:w-full max-h-full relative   bg-cover bg-center rounded-none" style={{ backgroundImage: 'url("/sky.jpg") '}}>
              <div className="absolute inset-0 bg-slate-700 md:bg-opacity-70 bg-opacity-50 md:mx-80  md:my-32 flex items-center justify-center rounded-md">
                <div className="text-center text-white  ">
                  <h3 className="md:text-xl md:font-bold font-semibold ">Nature Of Stars</h3>
                  <p className='px-10 text-slate-200'>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,...`.slice(0, 100)}</p>
                  <Link to="https://www.britannica.com/science/mountain-landform" target="_blank">
                    <button className="mt-4 bg-slate-500 text-white md:px-4 px-2 py-[2px] md:py-2 rounded hover:bg-neutral-400 my-3 md:font-semibold ">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:h-96 h-48 md:w-full max-h-full relative   bg-cover bg-center rounded-none" style={{ backgroundImage: 'url("/waves.jpg") '}}>
              <div className="absolute inset-0 bg-slate-700 md:bg-opacity-70 bg-opacity-50 md:mx-80  md:my-32 flex items-center justify-center rounded-md">
                <div className="text-center text-white  ">
                  <h3 className="md:text-xl md:font-bold font-semibold ">Nature Of Stars</h3>
                  <p className='px-10 text-slate-200'>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,...`.slice(0, 100)}</p>
                  <Link to="https://www.britannica.com/science/mountain-landform" target="_blank">
                    <button className="mt-4 bg-slate-500 text-white md:px-4 px-2 py-[2px] md:py-2 rounded hover:bg-neutral-400 my-3 md:font-semibold ">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
           
          
           

          </Carousel>
        </div> 

        {/* 
  




        {/* Yasma Product section */}
        <div className="md:p-4 p-4">
          <h1 className="md:text-3xl md:font-bold font-semibold text-[14px] text-center md:mb-6 my-1">Latest Products</h1>
          <p className="text-grey-600 text-center md:w-7/12 mx-auto text-[10px] md:text-xl md:my-2 ">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
          </p>
          <div className="md:w-11/12  grid md:grid-cols-4 grid-cols-1 gap-4 md:gap-12 mx-auto ">
            {
              product.map((items, index) => (
                <div key={index} className="bg-white rounded-md shadow-lg overflow-hidden px-2 py-2 border">
                  <img src={items.imageUrl} className="rounded-t-md h-[280px] md:h-[400px] w-full object-cover  " alt={items.title} />
                  <div className="p-4">
                    <h1 className="font-semibold text-md">{items.title}</h1>
                    <p className="text-grey-600">{items.description.slice(0, 20)}...</p>
                    <div className="flex gap-3 mt-2">
                      <label className='font-bold'>${items.price - (items.price * items.discount) / 100}</label>
                      <del className="font-semibold text-red-400">${items.price}</del>
                      <label className="text-grey-600">({items.discount}% off)</label>
                    </div>
                    <button onClick={handleBuyNow}
                      className="w-full bg-green-500 rounded p-2 my-2 hover:bg-green-900 hover:text-white">Buy Now</button>
                    <button onClick={() => addToCart(items)}
                      className="w-full bg-orange-500 rounded p-2 mt-2 hover:bg-orange-900 hover:text-white">Add to Cart</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </NavLayout>
    </>
  )
}

export default Home
