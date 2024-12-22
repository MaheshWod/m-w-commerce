import React, { useState } from 'react';
import NavLayout from './NavLayout';
import Swal from 'sweetalert2';
const ContactUs = () => {

  const [formValue, setFormValue] = useState({
    FullName: '',
    email: '',
    message: '',
  });

  const contactformvalue = (e) => {
    e.preventDefault();
    console.log(formValue);

    // Reset form fields after submission
    setFormValue({
      FullName: '',
      email: '',
      message: '',
    });

    new Swal({
      icon:"Success",
      title:'Success The submit'
    })
  };

  const handleChange = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <>
      <NavLayout>
        <div className="flex flex-col md:w-6/12 md:h-screen md:mx-auto mx-2 md:mt-4 py-4">
          <div className="md:w-full md:h-2/6 w-screen h-36">
            <img src="/k.jpg" className="w-full h-full object-cover" alt="Contact Banner" />
          </div>
          <div>
            <form onSubmit={contactformvalue} className="md:mt-8 space-y-6">
              <div className="flex flex-col mt-1">
                <label className="md:font-semibold md:text-lg mb-1">Full Name</label>
                <input
                  onChange={handleChange}
                  required
                  name="FullName"
                  type="text"
                  value={formValue.FullName}
                  placeholder="Enter your name"
                  className="p-3 border border-grey-600 rounded"
                />
              </div>
              <div className="flex flex-col mt-1">
                <label className="md:font-semibold md:text-lg mb-1">Email</label>
                <input
                  onChange={handleChange}
                  required
                  name="email"
                  type="email"
                  value={formValue.email}
                  placeholder="Enter your Email"
                  className="p-3 border border-grey-600 rounded"
                />
              </div>
              <div className="flex flex-col mt-1">
                <label className="md:font-semibold md:text-lg mb-1">Message</label>
                <textarea
                  onChange={handleChange}
                  required
                  name="message"
                  value={formValue.message}
                  placeholder="Enter your message"
                  className="p-3 border border-grey-600 rounded"
                />
              </div>
              <button
                type="submit"
                className="md:py-3 md:px-8 px-4 py-1 rounded bg-green-500 mt-4 hover:bg-blue-500 hover:text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </NavLayout>
    </>
  );
};

export default ContactUs;
