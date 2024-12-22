import { useEffect, useState } from 'react'
import React from 'react'
import NavLayout from './NavLayout'
import Swal from 'sweetalert2'
import firebaseAppConfig from '../util/firebase-config'
import { getFirestore,addDoc,collection,getDocs } from 'firebase/firestore'
import { onAuthStateChanged,getAuth } from 'firebase/auth'

const db = getFirestore(firebaseAppConfig)
const auth = getAuth(firebaseAppConfig)

const Home = () => {
  const [product, setProduct] = useState([])
  const [session, setSession] = useState(null)

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
      const req = async()=>{
 const snapshot = await getDocs(collection(db,"products"))
 const temp = []
snapshot.forEach((doc)=>{
  const allProducts= doc.data()
  allProducts.id = doc.id
  // console.log(allProducts)
  temp.push(allProducts)
})
 setProduct(temp)
      }
      req()
    })

    const addToCart = async (item)=>{
      try {
          item.userId = session.uid
          await addDoc(collection(db, "carts"), item)
          new Swal({
              icon: 'success',
              title: 'Product Added !'
          })
      }
      catch(err)
      {
          new Swal({
              icon: 'error',
              title: 'Failed !',
              text: err.message
          })
      }
  }

  return (
    <>
      <NavLayout>
        <div className="overflow-x-hidden">
          <img className="md:h-[500px] md:w-full object-cover " src='/potrait.jpg' alt='home' />
        </div>

        {/* Yasma Product section */}
        <div className="md:p-12 p-4">
          <h1 className="md:text-5xl md:text-bold text-2xl text-center md:mb-6">Latest Products</h1>
          <p className="text-grey-600 text-center md:w-7/12 mx-auto mt-1 md:mb-12 mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
          </p>
          <div className="md:w-11/12  grid md:grid-cols-4 grid-cols-1 gap-6 md:gap-12 mx-auto">
            {
              product.map((items, index) => (
                <div key={index} className="bg-white rounded-md shadow-lg overflow-hidden">
                  <img src={items.imageUrl} className="rounded-t-md h-[300px] md:h-[400px] w-full object-cover px-2" alt={items.title} />
                  <div className="p-4">
                    <h1 className="font-semibold text-md">{items.title}</h1>
                    <p className="text-grey-600">{items.description.slice(0, 20)}...</p>
                    <div className="flex gap-2 mt-2">
                      <label className='font-bold'>${items.price - (items.price * items.discount) / 100}</label>
                      <del className="font-semibold text-red-400">${items.price}</del>
                      <label className="text-grey-600">({items.discount}% off)</label>
                    </div>
                    <button className="w-full bg-green-500 rounded p-2 my-2 hover:bg-green-900 hover:text-white">Buy Now</button>
                    <button onClick={()=>addToCart(items)}
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
