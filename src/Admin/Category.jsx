import React, { useState } from 'react'
import Layout from './Layout';
import { FcElectronics } from "react-icons/fc";


const Category = () => {
    const [category] = useState(
        [
            {
                title: "Electronics"
            },
            {
                title: "SmartPhone"
            },
            {
                title: "Fashion"
            },
            {
                title: "Furniture"
            },
            {
                title: "BeautyProduct"
            },
            {
                title: "SkinCare"
            },
            {
                title: "Baby's Fashion"
            },
            
            {
                title: "Men's Fashion"
            },
        ]
    )

    return (
        <>
            <Layout>
                <div className='md:p-16 p-6'>
                    <div className='md:w-10/12  md:mx-auto grid md:grid-cols-4 grid-cols-1 md:gap-4 gap-2 mx-0'>
                        {category.map((items, index) => (
                            <div  key={index} className='hover:bg-slate-500 hover:text-white flex justify-center items-center  shadow-lg md:p-8 p-6  border rounded flex-col'>
                            <FcElectronics className='md:text-4xl text-2xl'/>
                                <h1 className='text-2xl font-bold'>{items.title}</h1>
                            </div>
                        ))
                        }
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default Category