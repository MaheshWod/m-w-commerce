
import React, { useState, useEffect } from 'react';
import NavLayout from './NavLayout';
import { ImProfile } from "react-icons/im";
import firebaseAppConfig from '../util/firebase-config';
import { onAuthStateChanged, getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, addDoc, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(firebaseAppConfig);
const db = getFirestore(firebaseAppConfig);

const Profile = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [formValue, setFormValue] = useState({
        FullName: '',
        email: '',
    });

    const [addressFormValue, setAddressFormValue] = useState({
        street: '',
        address: '',
        state: '',
        country: '',
        userId: ''
    });

    const [isAddress, setIsAddress] = useState(false);
    const [docId, setDocId] = useState(null);
    const [isUpdated] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user);
            } else {
                setSession(false);
                navigate('./login');
            }
        });
    }, [navigate]);

    useEffect(() => {
        const req = async () => {
            if (session) {
                setFormValue((prev) => ({
                    ...prev,
                    FullName: session.displayName,
                }));

                setAddressFormValue((prev) => ({
                    ...prev,
                    userId: session.uid,
                }));

                const col = collection(db, "addresses");
                const q = query(col, where("userId", "==", session.uid));
                const snapshot = await getDocs(q);

                setIsAddress(!snapshot.empty);

                snapshot.forEach((doc) => {
                    setDocId(doc.id);
                    const address = doc.data();
                    setAddressFormValue((prev) => ({
                        ...prev,
                        ...address,
                    }));
                });
            }
        };
        req();
    }, [session, isUpdated]);

    const saveProfileInfo = async (e) => {
        e.preventDefault();

        await updateProfile(auth.currentUser, {
            displayName: formValue.FullName,
        });

        new Swal({
            icon: 'success',
            title: 'Profile Saved!',
        });
    };

    const handleFormValue = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const setAddress = async (e) => {
        try {
            e.preventDefault();
            await addDoc(collection(db, 'addresses'), addressFormValue);
            new Swal({
                icon: "success",
                title: 'Address Saved',
            });
        } catch (err) {
            new Swal({
                icon: 'error',
                title: 'Failed',
            });
        }
    };

    const updateAddress = async (e) => {
        try {
            e.preventDefault();
            const ref = doc(db, "addresses", docId);
            await updateDoc(ref, addressFormValue);
            new Swal({
                icon: 'success',
                title: 'Address Updated!',
            });
        } catch (err) {
            new Swal({
                icon: 'error',
                title: 'Failed!',
                text: err.message,
            });
        }
    };

    const handleAddressFormValue = (e) => {
        const { name, value } = e.target;
        setAddressFormValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
        );





    return (
        <>
            <NavLayout>
                <div className='md:w-8/12 md:mx-auto mx-1 md:my-7 my-6  shadow-2xl rounded-md md:p-8 p-1  border '>
                    <div className='flex gap-1 justify-cente'>
                        <ImProfile className='md:text-3xl text-xl' />
                        <h1 className='md:text-3xl text-[16px] font-semibold'>Profile</h1>
                    </div>
                    <hr className='my-1'></hr>
                    <div className='md:w-20 md:h-20 w-16 h-16 mx-auto rounded-full relative'>
                        <img src='images/avat1.jpg' className='w-fit mx-auto rounded-full' alt='' />
                        {/* <input type='file' accept='image/*' className=' mb-5 rounded-full opacity-0 top-0 left-0 w-full h-full absolute' /> */}
                    </div>

                    <form className='grid grid-cols gap-3 gap-y-[6px] ' onSubmit={saveProfileInfo}>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-4'>
                            <div className='flex flex-col gap-1'>
                                <label className='md:text-lg font-semibold'>Fullname</label>

                                <input
                                    onChange={handleFormValue}
                                    required
                                    name="FullName"
                                    className='md:p-2 p-1 rounded border border-gray-300'
                                    value={formValue.FullName}
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='md:text-lg font-semibold'>Email</label>
                                <input
                                    disabled
                                    onChange={handleFormValue}
                                    required
                                    name="email"
                                    type="email"
                                    className='md:p-2 p-1 rounded border border-gray-300'
                                    value={session.email}
                                />
                            </div>
                        </div>


                        <div />

                        <button className='md:px-4 md:py-2 px-3 py-[3px] bg-rose-600 text-white rounded w-fit hover:bg-green-600 mt-0'>
                            Save
                        </button>
                    </form>

                    {/* for addressa and street/ yasma handleAddressFormvalue hoina session.dispalyName, session.email ho remove handleAddressFormvalue.email =>not -email and password ko case ma matra ho  */}
                    <hr className='md:my-6 my-3' />

                    <form className='grid grid-cols gap-6  gap-y-3 ' onSubmit={isAddress ? updateAddress : setAddress}>
                        <div className='grid grid-cols-2 gap-1 md:gap-4'>

                            <div className='flex flex-col gap-1 '>
                                <label className='md:text-lg font-semibold'>Area/Street</label>
                                <input
                                    onChange={handleAddressFormValue}
                                    required
                                    name="address"
                                    type="text"
                                    className='md:p-2 p-1 rounded border border-gray-300'
                                    value={addressFormValue.address}
                                />
                            </div>



                            <div className='flex flex-col gap-1'>
                                <label className='md:text-lg font-semibold'>City</label>
                                <input
                                    onChange={handleAddressFormValue}
                                    required
                                    name="street"
                                    type="text"
                                    className='md:p-2 p-1 rounded border border-gray-300'
                                    value={addressFormValue.street}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-1 md:gap-4'>
                            <div className='flex flex-col gap-1'>
                                <label className='md:text-lg font-semibold'>State</label>
                                <input
                                    onChange={handleAddressFormValue}
                                    required
                                    name="state"
                                    type="text"
                                    className='md:p-2 p-1 rounded border border-gray-300'
                                    value={addressFormValue.state}
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='md:text-lg font-semibold'>Country</label>
                                <input
                                    onChange={handleAddressFormValue}
                                    required
                                    name="country"
                                    type="text"
                                    className='md:p-2 p-1 rounded border border-gray-300'
                                    value={addressFormValue.country}
                                />
                            </div>
                        </div>



                        <div>
                            {
                                isAddress ? <button className='md:px-4 md:py-2 px-3 py-[3px] bg-green-500 text-white rounded w-fit hover:bg-green-600'>
                                    Save
                                </button> : <button className='md:px-4 md:py-2 px-3 py-[3px]  bg-rose-600 text-white rounded w-fit hover:bg-green-600'>
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

