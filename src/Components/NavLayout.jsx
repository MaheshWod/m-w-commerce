import React, { useState } from 'react'
import { useEffect } from 'react';

import { ImProfile } from "react-icons/im";
import { FaCartArrowDown } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

import { IoMdMenu } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Corrected import
import firebaseAppConfig from '../util/firebase-config';
const auth = getAuth(firebaseAppConfig)


const NavLayout = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [accountMenu, setAccountMenu] = useState(false)
    const navigate = useNavigate()
    const [session, setSession] = useState(null)
    const menus = [
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/category' },
        { label: 'Product', href: '/product' },
        { label: 'Contact Us', href: '/contact' },
     

    ]
    const asidemenus = [
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/category' },
        { label: 'Product', href: '/product' },
        { label: 'Payment', href: '/payment' },
        { label: 'Contact Us', href: '/contact' },
        {label:'Profile', href:'/profile'},
        {label:'Cart',href:'/cart'},
        // {label:'Login',href:'/login'},
        // {label:'SignUp' ,href:'/signup'},

    ]


    const mobileLink = (href) => {
        navigate(href)
        setOpen(false)
       
    }
// yati alredy signin xa vane yo conditon use gareko ho for user ko lagi
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                setSession(false)
            }
        })
    })
    // const signOut = ()=>{
    //     navigate('/')
    // }


    // mobile ko lagi profile ko Full Name and email dekhauna ko lagi

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

    // Loader lai dekhauna yasto gareko and dirrect download gareko from twailwind loader bata
    if (session === null)
        return (
            <div className="text-center mt-52">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )

    return (
        <>
            <nav className='shadow-lg bg-slate-300 sticky top-0 left-0'>
                <div className='w-10/12 mx-auto flex  items-center justify-between'>
                    <div className="md:w-[100px] md:h-[100px] w-[50px] h[50px] rounded-full border-2 border-gray-300 m-1">
                        <img
                            src="/images/avat1.jpg"
                            alt="Avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    <button onClick={()=>setOpen(!open)}>
                        <IoMdMenu className='text-xl md:hidden' />
                    </button>

                    <ul className='md:flex gap-8 items-center hidden'>
                        {menus.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className='block py-2 text-center hover:bg-rose-400 hover:text-white w-[100px]  my-2 rounded-md'
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        {
                            !session && <>
                                <Link to={'/login'}
                                    className='block py-2 rounded-md text-center hover:bg-rose-400 hover:text-white w-[100px] my-2'
                                >Login</Link>
                                <Link to={'/signup'}
                                    className='bg-blue-300 px-8 py-2 font-bold rounded-md block text-center hover:bg-rose-400 hover:text-white my-2'
                                >SignUp</Link>
                            </>
                        }
                        {
                            session && (
                                <button className="relative" onClick={() => setAccountMenu(!accountMenu)}>
                                    <img src="/images/avat1.jpg" className="w-10 h-10 rounded-full" alt=''/>
                                    {accountMenu && (
                                        <div className=" flex flex-col w-[120px]  bg-slate-200 fixed top-23 right-24 shadow-1xl z-50">
                                        {/* LogOUt Box */}
                                            <div className='flex gap-2 m-2'>
                                                <ImProfile className='mt-1' />
                                                <Link to="/profile" className='text-black hover:bg-gray-500'>
                                                    Profile          </Link>
                                            </div>

                                            <div className='flex gap-2 m-2 hover:bg-gray-500'>
                                                <FaCartArrowDown className='mt-1' />
                                                <Link to="/Cart" className='text-black'>
                                                    Cart          </Link>
                                            </div>
                                            <div className='flex gap-2 m-2 hover:bg-gray-500'>
                                                <IoMdLogOut className='mt-1' />
                                                <Link to="#" onClick={()=>signOut(auth)} className='text-black'>
                                                    Logout          </Link>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            )
                        }


                    </ul>
                </div>
            </nav>

            <div className='w-full'>
                {children}
            </div>

{/* footer ko lagi */}

{/* Desktop ko footer responsive/// */}
<footer className='bg-slate-300 md:py-16 py-8  hidden md:block'>
                <div className='md:w-10/12 md:mx-auto grid md:grid-cols-4 grid-cols-1 text-black md:gap-4 gap-3 mx-3'>
                    <div>
                        <h1 className='text-black font-semibold md:text-2xl text-[14px] md:mb-3 mb-2'>Brand Details</h1>
                        <p className='text-grey-100 mb-6'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <div className="md:w-[100px] md:h-[100px] h-[60px] w-[60px] rounded-full border-2 border-gray-300 m-1 mx-auto ">
                            <img
                                src="/images/avat1.jpg"
                                alt="Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>

                    <div className='flex flex-col '>
                        <h1 className='text-black font-semibold md:text-2xl text-[14px] mb-2'>Website Links</h1>
                        <ul className=' gap-y-2 flex flex-col items-start   '>
                            {menus.map((item, index) => (
                                <li key={index} className="inline-block hover:bg-stone-500  rounded py-1 hover:px-2 hover:text-white">
                                    <Link 
                                    to={item.href}>{item.label}</Link>
                                </li>
                            ))}
                           <div className='space-y-4 mt-1'>
                           <li className='hover:bg-stone-500 hover:px-2 rounded hover:text-white ' ><Link to={'/login'}>Login</Link></li>
                           <li className='hover:bg-stone-500 hover:px-2 rounded hover:text-white  '><Link to={'navlayout/signup'}>SignUp</Link></li>
                           </div>
                        </ul>
                    </div>

                    <div >
                        <h1 className='text-black font-semibold md:text-2xl text-[14px] md:mb-3 mb-2 '>Follow Us</h1>
                        <ul className='md:space-y-2 gap-y-2  flex flex-col '>
                            <li className='hover:text-white hover:bg-stone-500  rounded  '><Link to={'/login'}>Facebook</Link></li>
                            <li className='hover:text-white hover:bg-stone-500 rounded'><Link to={'/login'}>Instagram</Link></li>
                            <li className='hover:text-white hover:bg-stone-500 rounded'><Link to={'/login'}>LinkedIn</Link></li>
                            <li className='hover:text-white hover:bg-stone-500 rounded'><Link to={'/login'}>YouTube</Link></li>
                            <li className='hover:text-white hover:bg-stone-500 rounded'><Link to={'/login'}>WhatsApp</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h1 className='font-semibold md:text-2xl text-[14px] md:mb-3 mb-2 text-black'>Contact Us</h1>
                        <div className='text-black'>
                            <form className='md:space-y-4 space-y-2'>
                                <input className='bg-white w-full md:p-3 p-2 rounded'
                                    required
                                    type='text'
                                    placeholder='Enter the Full Name'
                                    name='fullName'
                                />
                                <input className='bg-white w-full md:p-3 p-2 rounded'
                                    required
                                    type='email'
                                    placeholder='Enter Email'
                                    name='email'
                                />
                                <textarea className='bg-white w-full md:p-3 p-2 rounded'
                                    required
                                    placeholder='Enter the message'
                                    name='message'
                                />
                                <button
                                    className='bg-green-500 text-white md:px-3 px-2 md:py-2 py-1 rounded-md hover:bg-rose-500 hover:text-white font-semibold'
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>

{/* mobile lo lagi footer for responsive/// */}
            <footer className='bg-slate-300 md:py-16 py-8 block md:hidden '>
                <div className='md:w-10/12 md:mx-auto grid md:grid-cols-4 grid-cols-1 text-black md:gap-4 gap-3 mx-3'>
                    <div>
                        <h1 className='text-black font-semibold md:text-2xl text-[18px] md:mb-3 mb-2'>Brand Details</h1>
                        <p className='text-grey-100 mb-6'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <div className="md:w-[100px] md:h-[100px] h-[60px] w-[60px] rounded-full border-2 border-gray-300 m-1 mx-auto ">
                            <img
                                src="/images/avat1.jpg"
                                alt="Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                   <div className='grid grid-cols-2 gap-2   '>
                   <div className='flex flex-col'>
                        <h1 className='text-black font-semibold md:text-2xl text-[18px] mb-1'>Website Links</h1>
                        <ul className=' gap-y-[0px] flex flex-col items-start   '>
                            {menus.map((item, index) => (
                                <li key={index} className="inline-block hover:bg-stone-500  rounded py-1 hover:px-2 hover:text-white">
                                    <Link 
                                    to={item.href}>{item.label}</Link>
                                </li>
                            ))}
                           <div className='space-y-2 mt-1'>
                           <li className='hover:bg-stone-500 hover:px-2 rounded hover:text-white ' ><Link to={'/login'}>Login</Link></li>
                           <li className='hover:bg-stone-500 hover:px-2 rounded hover:text-white  '><Link to={'navlayout/signup'}>SignUp</Link></li>
                           </div>
                        </ul>
                    </div>

                    <div>
                        <h1 className='text-black font-semibold md:text-2xl text-[18px] md:mb-3 mb-2 '>Follow Us</h1>
                        <ul className=' gap-y-2  flex flex-col '>
                            <li className='hover:text-white hover:bg-stone-500  rounded  '><Link to={'/login'}>Facebook</Link></li>
                            <li className='hover:text-white hover:bg-stone-500 rounded'><Link to={'/login'}>Instagram</Link></li>
                            <li className='hover:text-white hover:bg-stone-500 rounded'><Link to={'/login'}>LinkedIn</Link></li>
                            <li className='hover:text-white hover:bg-stone-500 rounded'><Link to={'/login'}>YouTube</Link></li>
                            <li className='hover:text-white hover:bg-stone-500 rounded'><Link to={'/login'}>WhatsApp</Link></li>
                        </ul>
                    </div>
                   </div>

                    <div>
                        <h1 className='font-semibold md:text-2xl text-[18px] md:mb-3 mb-2 text-black'>Contact Us</h1>
                        <div className='text-black'>
                            <form className='md:space-y-4 space-y-2'>
                                <input className='bg-white w-full px-2 py-1 rounded'
                                    required
                                    type='text'
                                    placeholder='Enter the Full Name'
                                    name='fullName'
                                />
                                <input className='bg-white w-full px-2 py-1 rounded'
                                    required
                                    type='email'
                                    placeholder='Enter Email'
                                    name='email'
                                />
                                <textarea className='bg-white w-full px-2 py-1 rounded'
                                    required
                                    placeholder='Enter the message'
                                    name='message'
                                />
                                <button
                                    className='bg-green-500 text-white md:px-3 px-2 md:py-2 py-1 rounded-md hover:bg-rose-500 hover:text-white font-semibold'
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
         
{/* mobile ko lagi aside bar */}
{/* { open &&  */}
    <aside
                className='overflow-hidden md:hidden  h-full  fixed top-0 left-0 shadow-lg bg-blue-500 z-50'
                style={{ width: open ? 230 : 0 , transition: '0.3s' }}
            >
                <div className='flex flex-col gap-4 mt-1'>
                
                    {asidemenus.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => mobileLink(item.href)}
                            className=' p-2 text-white hover:bg-red-500'
                        >
                            {item.label}
                            
                        </button>
                        
                    ))}
                 
                   
                           { !session ? <>
                                <Link to={'/login'}
                                    // className='block py-4 rounded-sm text-center hover:bg-rose-400 hover:text-white w-[100px] my-2'
                                ><span className='text-white hover:bg-red-500 ml-[85px] rounded p-2 '>Login</span></Link>
                                <Link to={'/signup'}
                                    // className='bg-blue-300 px-8 py-3 font-bold rounded block text-center hover:bg-rose-400 hover:text-white my-2'
                                ><span className='text-white hover:bg-red-500 ml-[85px] rounded p-2'>SignUp</span></Link>
                                
                            </>
                            : <div className='flex gap-1 hover:bg-red-500 mx-auto p-2 rounded text-white '>
                                                <IoMdLogOut className='mt-1' />
                                                <Link to="#" onClick={()=>signOut(auth)} className='text-black'>
                                                    <span className='text-white'>LogOut</span>          </Link>
                                            </div>


                           
                        } 

                        {/* profile ko name and email, image also dekhauna */}
                    {
                        session && 
                        <div className='mx-auto h-[120px] flex flex-col justify-center items-center border border-xl rounded mt-2'>
                        <h3>LogedIn User's</h3>
                        <hr className='text-white '></hr>
                            {/* <div className='h-[40px] w-[40px] bg-slate-700 rounded-full justify-center items-center'><img src=''alt = ''/></div> */}
                            <h1 className='text-lg font-semibold'>{userName}</h1>
                            <p className='text-grey-500'> {emailid}</p>
                        </div>
                    }
                </div>
                
            </aside>
            {/* } */}
            

        </>
    )
}

export default NavLayout
