import React from 'react'
import Layout from './Layout'

const Setting = () => {
  return (
<>
    <Layout>
        <div className=' md:w-10/12  mx-auto my-11 grid md:grid-cols-2 grid-cols-1 shadow-2xl'>
        <div className='w-full full rounded '><img src='./images/setting.jpg' alt='' className='object-cover'/>
</div>
            <div className='mx-12 text-black my-12 '><h1 className='text-2xl'>This is the setting box which is based on the backend... </h1></div>
        </div>
    </Layout>
</>  )
}

export default Setting