import React from 'react'
import NavLayout from './NavLayout'
import { useState } from "react"
import firebaseAppConfig from "../util/firebase-config"
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"

const auth = getAuth(firebaseAppConfig)

const Login = () => {

    const navigate = useNavigate()
    const [passwordType, setPasswordType] = useState("password")
    const [error, setError] = useState(null)
    // const [ setLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const login = async (e) => {
        try {
            e.preventDefault()
            setLoader(true)
            await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
            navigate("/")
        }
        catch (err) {
            setError("Invalid credentials provided")
        }
        finally {
            setLoader(false)
        }
    }

    const handleChange = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setFormValue({
            ...formValue,
            [name]: value
        })
        setError(null)
    }


    return (
        <>
            <NavLayout>
                <div className='grid md:grid-cols-2 md:h-screen overflow-hidden  m-3'>
                    <img src='/images/signup.jpg' className='md:w-full md:h-full md:object-cover h-6/12 object-cover ' alt='' />


                    <div className='flex flex-col md:px-8 md:mt-[95px] mt-0 '>
                        <h2 className='md:text-4xl text-2xl md:font-bold font-semibold'>LogIn</h2>
                        <p className='md:text-lg textgrey-600'> Enter the Detail your profile</p>
                        <form onSubmit={login}
                            className='md:mt-8 md:space-y-6 space-y-3'>

                            <div className='flex flex-col'>
                                <label className='font-semibold md:text-lg mb-1'>Email</label>
                                <input required
                                    onChange={handleChange}
                                    name='email'
                                    type='email'
                                    placeholder='Enter the your Email'
                                    className='md:p-3 p-2 border border-grey-600 rounded' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-semibold md:text-lg mb-1'>Password</label>
                                <input required
                                    onChange={handleChange}
                                    name='password'
                                    type={passwordType}
                                    placeholder='**********************'
                                    className='md:p-3 p-2 border border-grey-600 rounded' />

                                <button onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")} type="button" className="absolute top-11 right-4 w-8 h-8 rounded-full hover:bg-blue-200 hover:text-blue-600">
                                    {
                                        passwordType === "password" ?
                                            <i className="ri-eye-line"></i>
                                            :
                                            <i className="ri-eye-off-line"></i>
                                    }
                                </button>

                            </div>


                            <button className='md:py-3 py-1 md:px-8 px-5 rounded bg-red-400 mt-4 hover:bg-blue-500 hover:text-white'>Login</button>
                        </form>
                        {/* <div className='mt-2'>
                            Don't have any account ? <Link to = '/signup' className='font-semibold p-1 text-blue-600'>Register...</Link>
                        </div> */}


                        <div className="mt-2">
                            Don`t have an account ? <Link to="/signup" className="text-blue-600 font-semibold">Register now</Link>
                        </div>

                        {
                            error &&
                            <div className="flex justify-between items-center mt-2 bg-rose-600 p-3 rounded shadow text-white font-semibold animate__animated animate__pulse">
                                <p>{error}</p>
                                <button onClick={() => setError(null)}>
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                        }
                        {
                            loader && (
              <div className="flex justify-center items-center mt-4">
                <div className="loader"></div> {/* Add a loader component or animation here */}
              </div>
            )}
                    </div>
                </div>
            </NavLayout>
        </>)
}

export default Login



// import { useState } from "react"
// import firebaseAppConfig from "../util/firebase-config"
// import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
// import { Link, useNavigate } from "react-router-dom"

// const auth = getAuth(firebaseAppConfig)

// const Login = ()=>{
//     const navigate = useNavigate()
//     const [passwordType, setPasswordType] = useState("password")
//     const [error, setError] = useState(null)
//     const [loader, setLoader] = useState(false)
//     const [formValue, setFormValue] = useState({
//         email: '',
//         password: ''
//     })

//     const login = async (e)=>{
//         try {
//             e.preventDefault()
//             setLoader(true)
//             await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
//             navigate("/")
//         }
//         catch(err)
//         {
//             setError("Invalid credentials provided")
//         }
//         finally {
//             setLoader(false)
//         }
//     }

//     const handleChange = (e)=>{
//         const input = e.target
//         const name = input.name
//         const value = input.value
//         setFormValue({
//             ...formValue,
//             [name]: value
//         })
//         setError(null)
//     }

//     return (
//         <div className="grid md:grid-cols-2 md:h-screen md:overflow-hidden animate__animated animate__fadeIn">
//             <img src="/images/signup.jpg" className="w-full md:h-full h-24 object-cover" />
//             <div className="flex flex-col md:p-16 p-8">
//                 <h1 className="text-4xl font-bold">Signin</h1>
//                 <p className="text-lg text-gray-600">Enter profile details to login</p>
//                 <form className="mt-8 space-y-6" onSubmit={login}>
//                     <div className="flex flex-col">
//                         <label className="font-semibold text-lg mb-1">Email id</label>
//                         <input
//                             onChange={handleChange}
//                             required
//                             type="email"
//                             name="email"
//                             placeholder="example@mail.com"
//                             className="p-3 border border-gray-300 rounded"
//                         />
//                     </div>

//                     <div className="flex flex-col relative">
//                         <label className="font-semibold text-lg mb-1">Password</label>
//                         <input
//                             onChange={handleChange}
//                             required
//                             type={passwordType}
//                             name="password"
//                             placeholder="********"
//                             className="p-3 border border-gray-300 rounded"
//                         />
//                         <button onClick={()=>setPasswordType(passwordType === "password" ? "text" : "password")} type="button" className="absolute top-11 right-4 w-8 h-8 rounded-full hover:bg-blue-200 hover:text-blue-600">
//                             {
//                                 passwordType === "password" ?
//                                 <i className="ri-eye-line"></i>
//                                 :
//                                 <i className="ri-eye-off-line"></i>
//                             }
//                         </button>
//                     </div>
//                     {
//                         loader ?
//                         <h1 className="text-lg font-semibold text-gray-600">Loading...</h1>
//                         :
//                         <button className="py-3 px-8 rounded bg-blue-600 text-white font-semibold hover:bg-rose-600">Login</button>
//                     }
//                 </form>
//                 <div className="mt-2">
//                     Don`t have an account ? <Link to="/signup" className="text-blue-600 font-semibold">Register now</Link>
//                 </div>

//                 {
//                     error &&
//                     <div className="flex justify-between items-center mt-2 bg-rose-600 p-3 rounded shadow text-white font-semibold animate__animated animate__pulse">
//                         <p>{error}</p>
//                         <button onClick={()=>setError(null)}>
//                             <i className="ri-close-line"></i>
//                         </button>
//                     </div>
//                 }
//             </div>
//         </div>
//     )
// }

// export default Login