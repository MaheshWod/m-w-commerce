import React from 'react'
import NavLayout from './NavLayout'
import { useState } from "react"
import firebaseAppConfig from "../util/firebase-config"
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
// import { FiEye } from "react-icons/fi";


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
                <div className='grid md:grid-cols-2  overflow-hidden  md:my-4 my-6 shadow-2xl md:w-11/12  w-11/12 mx-auto border rounded-lg'>
                    <img src='/images/login.jpg' className='md:w-10/12 md:h-10/12 mt-0 h-4/12 w-9/12 md:p-4 p-2 mx-auto ' alt='' />


                    <div className='flex flex-col md:px-8 md:mt-[95px] mt-0 px-2'>
                        <h2 className='md:text-4xl text-xl md:font-bold font-semibold'>Log-In</h2>
                        <p className='md:text-lg text-grey-600'> Enter the signed-up your Email</p>
                        <form onSubmit={login}
                            className='md:mt-8 md:space-y-6 space-y-2'>

                            <div className='flex flex-col'>
                                <label className='md:font-semibold md:text-lg mb-1'>Email</label>
                                <input required
                                    onChange={handleChange}
                                    name='email'
                                    type='email'
                                    placeholder='Enter the your Email'
                                    className='md:p-3 p-1 border border-grey-600 rounded' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='md:font-semibold md:text-lg mb-1'>Password</label>
                                <input required
                                    onChange={handleChange}
                                    name='password'
                                    type={passwordType}
                                    placeholder='**********************'
                                    className='md:p-3 p-1 border border-grey-600 rounded' />

                                <button onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")} type="button" className="absolute top-11 right-4 w-8 h-8 rounded-full hover:bg-blue-200 hover:text-blue-600">
                                    {
                                        passwordType === "password" ?
                                            <i className="ri-eye-line"></i>
                                            :
                                            <i className="ri-eye-off-line"></i>
                                    }
                                </button>

                            </div>


                            <button className='md:py-2 py-1 md:px-6 px-2 rounded bg-rose-400 mt-4 hover:bg-green-400 hover:text-white text-white'>Log In</button>
                        </form>
                        {/* <div className='mt-2'>
                            Don't have any account ? <Link to = '/signup' className='font-semibold p-1 text-blue-600'>Register...</Link>
                        </div> */}


                        <div className="mt-2">
                            Don`t have an account ? <Link to="/signup" className="text-blue-600 font-semibold">Register now</Link>
                        </div>

                        {
                            error &&
                            <div className="flex justify-between items-center md:mt-2 mt-1 bg-rose-600 md:p-3 p-1 rounded shadow text-white font-semibold animate__animated animate__pulse">
                                <p>{error}</p>
                                <button onClick={() => setError(null)}>
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                        }
                        {
                            loader && (
              <div className="flex justify-center items-center md:mt-4 mt-2">
                <div className="loader"></div> {/* Add a loader component or animation here */}
              </div>
            )}
                    </div>
                </div>
            </NavLayout>
        </>)
}

export default Login
