import React from 'react'
import { Link } from 'react-router-dom'

const Failed = () => {
  return (
    <>
      <div className='md:h-screen flex justify-center items-center'>
        <div className='md:w-6/12 text-center space-y-5'>
          <img src='./error.jpg' className='md:w-8/12 mx-auto md:h-90  ' alt=''/>
          <h1 className='text-bold text-black text-2xl'> Not Found</h1>
          <Link to={'/'} className='bg-indigo-600 text-white px-4 py-2 rounded block w-fit mx-auto hover:bg-green-500 hover:text-white'>Go Back!</Link>
        </div>
      </div>
    </>
  )
}

export default Failed