import React, { useState,useEffect } from 'react';
import { IoMdMenu, IoMdLogOut } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaBorderStyle } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { Link } from 'react-router-dom';

// import { IoCloseCircleOutline } from "react-icons/io5";
import {  signOut,getAuth,onAuthStateChanged } from 'firebase/auth'; // Corrected import
import firebaseAppConfig from '../util/firebase-config';
// import { EmailAuthCredential } from 'firebase/auth/web-extension';
const auth = getAuth(firebaseAppConfig)
// import {  useNavigate } from 'react-router-dom';





const Layout = ({ children }) => {
    const [size, setSize] = useState(230);
    const [accountMenu, setAccountMenu] = useState(false);
    // const navigate = useNavigate()
    

    const menus = [
        {
            label: 'Home',
            icons: <MdDashboard />,
            Link: '/'
        },
        {
            label: 'Product',
            icons: <AiOutlineShoppingCart />,
            Link: '/product'
        },
        {
            label: 'Order',
            icons: <FaBorderStyle />,
            Link: '/order'
        },
        {
            label: 'Category',
            icons: <FaBorderStyle />,
            Link: '/category'
        },
      
        {
            label: 'Payment',
            icons: <MdOutlinePayment />,
            Link: '/payment'
        },
        {
            label: 'Setting',
            icons: <IoSettings />,
            Link: '/setting'
        },
        {
            label: 'LogOut',
            icons: <IoMdLogOut />, // Icon only
            onClick: () => signOut(auth), // Event handler
            Link: '/', // Redirect location
        },
    ];
  
    const [userName, setUserName] = useState('');
    const [emailid,setEmailId] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName || 'User'); // Use displayName or fallback
                setEmailId(user.email)
            } else {
                setUserName('');
                setEmailId('')
            }
        });

        return () => unsubscribe();
    }, []);
    
    return (
        <>
            {/* Desktop ko lagi, md : ma block hunxa but sano hune bittikai hidden hunxa */}
            {/* <div className='md:block hidden'> */}
              
                <aside
                    style={{
                        width: size ,
                        transition: '0.4s'
                    }}
                    
                    className=' h-full fixed top-0 left-0 bg-indigo-500 overflow-hidden '>
                    <div className='flex flex-col py-4'>
                    
                        {menus.map((item, index) => (
                            <Link
                                className='flex items-center space-x-3 px-4 py-3 text-gray-50 text-[17px] hover:bg-rose-600 hover:text-white transition-colors duration-300'
                                key={index}
                                to={item.Link}
                                onClick={item.onClick} // Attach onClick handler here

                            >
                                <span className='text-xl'>{item.icons}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </aside>
                
                {/* Right-side section for login and logout */}
                <section className='bg-grey-400 min-h-screen ' 
                style={{
                        marginLeft:size,
                        transition: '0.4s'
                    }}
                >
                    <nav className='bg-white p-6 shadow flex items-center justify-between' >
                        <div className='flex gap-4 items-center' >
                            <button 
                                onClick={() => setSize(size === 230 ? 0 :230)}
                                className='bg-grey-60 hover:bg-indigo-500 hover:rounded hover:text-white'>
                                <IoMdMenu className='text-xl' />
                            </button>
                            <h1 className='text-md font-bold'>M-W</h1>
                        </div>

                        <div >
                            <button className='relative'>
                                <img
                                    src='/images/avat1.jpg' alt='avatar'
                                    className='w-11 h-11 border-2 rounded-full'
                                    onClick={() => setAccountMenu(!accountMenu)}
                                />
                                {accountMenu && (
                                    <div className='absolute top-20 right-0 bg-white w-[240px] shadow-lg rounded p-6 z-50'>
                                        <div className='text-black'>
                                            <h1 className='text-lg font-semibold'>{userName}</h1>
                                            <p className='text-grey-500'> {emailid}</p>
                                            <hr />
                                            <button   className=' mt-2'>
                                                
                                                <div className='flex gap-2 m-2 hover:bg-gray-500 px-2 hover:text-white rounded'>
                                                <IoMdLogOut className='mt-1' />
                                                <Link to="/" onClick={()=>signOut(auth)} className='text-black'>
                                                    <span className='hover:text-white '>LogOut</span>          </Link>
                                            </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </button>
                        </div>
                    </nav>

                    <div className='p-2 m-1'>{children}</div>
                </section>
            {/* </div> */}


            {/* mobile device ko lagi */}
        
        </>
    );
};

export default Layout;
// import { IoMdMenu } from "react-icons/io";
// import { useState } from 'react';
// import { IoMdLogOut } from "react-icons/io";


// const Layout = ({ children }) => {

//     const [size, setSize] = useState(250)
//     const [accountMenu, setAccountMenu] = useState(false)

//     return (
//         <>
//             <aside
//                 style={{
//                     width: size,
//                     transition: '0.4s'
//                 }}
//                 className='w-[280px] h-full fixed top-0 left-0 bg-indigo-400 '>Aside</aside>

//             {/* rightside wala part */}
//             <section className='bg-grey-500 h-screen'
//                 style={{
//                     marginLeft: size,
//                     transition: '0.4s'
//                 }}>
//                 <nav className='bg-white p-6 shadow flex items-center justify-between'>
//                     <div className='flex gap-4 items-center'>

//                         <button
//                             onClick={() => setSize(size === 250 ? 0 : 250)}
//                             className='bg-grey-60 hover:bg-indigo-500 hover:ronded hover:text-white'>
//                             <IoMdMenu className='text-xl' />

//                         </button>

//                         <h1 className='text-md font-bold'>M-W</h1>
//                     </div>

//                     <div >
//                         <button className='relative'>
//                             <img
//                                 src='/images/avat1.jpg' alt='avat'
//                                 className='w-10 h-10 border-2 rounded-full'
//                                 onClick={() => setAccountMenu(!accountMenu)}
//                             />

//                             {
//                                 accountMenu && <div className='absolute top-20 right-0 bg-white w-[240px] shadow-lg rounded p-6'>
//                                     <div className='text-black'>
//                                         <h1 className='text-lg font-semibold'>Er.Mahesh</h1>
//                                         <p className='text-grey-500 '>maheshwod1234@gmail.com</p>
//                                         <hr></hr>
//                                         <button className='flex mt-2'>
//                                             <IoMdLogOut className='text-black m-2' /><span className='text-black mt-1'>LogOut</span>
//                                         </button>
//                                     </div></div>
//                             }


//                         </button>
//                     </div>
//                 </nav>

//                 {/* Product lai yata rakheko ca */}
//                 <div className='p-4 m-10'>
//                     {children}</div>

//             </section>
//         </>
//     )
// }

// export default Layout
