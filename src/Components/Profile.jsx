import React, { useState } from 'react'
import { useEffect } from 'react';
import NavLayout from './NavLayout'
import { ImProfile } from "react-icons/im";
import firebaseAppConfig from '../util/firebase-config';
import { onAuthStateChanged, getAuth,updateProfile } from 'firebase/auth';
import { getFirestore, addDoc, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Profile = () => {

    const navigate = useNavigate()

    const[session,setSession] = useState(null)
    const [formValue,setFormValue] = useState({
        FullName:'',
        email: '',
        mobile:''
        
    })

    const [addressFormValue,setAddressFormValue] = useState({
        street:'',
        address:'',
        state:'',
        country:'',
        userId:''
    }) 
    const [isAddress,setIsAddress] = useState(false)
    const [docId,setDocId] = useState(null)
    const [isUpdated] = useState(false)
    // const [uploading, setUploading] = useState(false)


    


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                setSession(false)
                navigate('./login')
            }
        })
    },[navigate])

    useEffect(()=>{
        const req = async ()=>{
            if(session)
            {
                setFormValue({
                    ...formValue,
                    fullname: session.displayName,
                    mobile: (session.phoneNumber ? session.phoneNumber : '')
                })
    
                setAddressFormValue({
                    ...addressFormValue,
                    userId: session.uid
                })
    
                // fetch address
                const col = collection(db, "addresses")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                
                setIsAddress(!snapshot.empty)

                snapshot.forEach((doc)=>{
                    setDocId(doc.id)
                    const address = doc.data()
                    setAddressFormValue({
                        ...addressFormValue,
                        ...address
                    })
                })
            }
        }
        req()
    },[addressFormValue,session,isUpdated])

    // console.log(session)
    
     const saveProfileInfo = async (e)=>{
        e.preventDefault()
        
        await updateProfile(auth.currentUser, {
            displayName: formValue.FullName,
            phoneNumber: formValue.mobile
        })
        new Swal({
            icon: 'success',
            title: 'Profile Saved !'
        })
    }

   

        const handleFormValue = (e)=>{
            const input = e.target
            const name = input.name
            const value = name.value

            setFormValue({
                ...formValue,
                [name]:value
            })
        }

    //    for addressFormValue
const setAddress = async(e) =>{

           try{
            e.preventDefault()
            console.log(addressFormValue)
            // const x =  await addDoc(collection(db,'addresses'),(addressFormValue))
            // console.log(x)
            await addDoc(collection(db,'addresses'),(addressFormValue))
            new Swal ({
                icon:"Success",
                title:'Address Saved'
            })
            // setAddressFormValue({
            //     street:'',
            //     address:'',
            //     state:'',
            //     country:'',
            //     userId:''
            // })
            }
           catch(err){
            // console.log(err)
            new Swal ({
                icon:'Error',
                title:'Failed',
                // text:err.message
                // karan show garxa
            })

           }
        }
        const updateAddress = async (e)=>{
            try {
                e.preventDefault()
                const ref = doc(db, "addresses", docId)
                await updateDoc(ref, addressFormValue)
                new Swal({
                    icon: 'success',
                    title: 'Address Updated !'
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

 const handleAddressFormValue = (e) =>{
    const input = e.target
            const name = input.name
            const value = input.value

    setAddressFormValue({
    ...addressFormValue,
    [name]:value
    
})
 }
 console.log(addressFormValue)
// error show garna lagekale use gareko formvalue and addressFormvalue ko lagi
// useEffect(() => {
//     console.log(addressFormValue, formValue);
// }, [addressFormValue, formValue]); // This is fine as long as it doesn't result in a loop.



         // loader
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
            <NavLayout>
                <div className='md:w-8/12 mx-auto md:my-16 shadow-lg rounded-md md:p-8 p-2 border'>
                    <div className='flex gap-3 justify-cente'>
                        <ImProfile className='md:text-4xl text-2xl' />
                        <h1 className='md:text-3xl text-xl font-semibold'>Profile</h1>
                    </div>
                    <hr className='my-3'></hr>
                    <div className='w-24 h-24 mx-auto rounded-full relative'>
                        <img src='images/avat1.jpg' className='w-fit mx-auto rounded-full' alt='' />
                        <input type='file' accept='image/*' className=' mb-5 rounded-full opacity-0 top-0 left-0 w-full h-full absolute' />
                    </div>

                    <div>
                    <form className='grid grid-cols-2 gap-6' onSubmit={saveProfileInfo}>
                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Fullname</label>

                        <input 
                            onChange={handleFormValue}
                            required
                            name="FullName"
                            className='p-2 rounded border border-gray-300'
                            value={formValue.FullName}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Email</label>
                        <input 
                            disabled
                            onChange={handleFormValue}
                            required
                            name="email"
                            type="email"
                            className='p-2 rounded border border-gray-300'
                            value={session.email}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Mobile</label>
                        <input 
                            onChange={handleFormValue}
                            required
                            name="mobile"
                            type="number"
                            className='p-2 rounded border border-gray-300'
                            value={formValue.mobile}
                        />
                    </div>

                    <div />

                    <button className='px-4 py-2 bg-rose-600 text-white rounded w-fit hover:bg-green-600'>
                        <i className="ri-save-line mr-2"></i>
                        Save
                    </button>
                </form>
                    </div>

{/* for addressa and street/ yasma handleAddressFormvalue hoina session.dispalyName, session.email ho remove handleAddressFormvalue.email =>not -email and password ko case ma matra ho  */}
                    <hr className='my-6'/>

                    <form className='grid grid-cols-2 gap-6 ' onSubmit={isAddress ? updateAddress : setAddress}>
                     <div className='flex flex-col gap-2 col-span-2'>
                       <label className='text-lg font-semibold'>Area/Street</label>
                       <input 
                            onChange={handleAddressFormValue}
                            required
                            name="address"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={addressFormValue.address}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>City</label>
                        <input 
                            onChange={handleAddressFormValue}
                            required
                            name="street"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={addressFormValue.street}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>State</label>
                        <input 
                            onChange={handleAddressFormValue}
                            required
                            name="state"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={addressFormValue.state}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Country</label>
                        <input 
                            onChange={handleAddressFormValue}
                            required
                            name="country"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={addressFormValue.country}
                        />
                    </div>

                    

                    <div>
                    {
                        isAddress ? <button className='px-4 py-2 bg-green-500 text-white rounded w-fit hover:bg-green-600'>
                        <i className="ri-save-line mr-2"></i>
                        Save
                    </button> : <button className='px-4 py-2 bg-rose-600 text-white rounded w-fit hover:bg-green-600'>
                        <i className="ri-save-line mr-2"></i>
                        Submit
                    </button>
                    }
                    </div>
                </form>
                    
                </div>
            </NavLayout>

        </>
    )
}

export default Profile

