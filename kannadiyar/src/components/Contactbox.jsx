import React from 'react'

function Contactbox() {
  return (
    <div className="sm: -ml-10 sm: w-[250px]  sm: bg-gray-200 sm: mt-4 sm: rounded-lg sm: p-4 lg:mt-4  lg:w-[350px]  lg:bg-gray-200 lg:p-4 lg:rounded-md">
      <div className='sm: flex sm: flex-row sm: text-3xl lg:flex lg:flex-row lg:text-3xl lg:ml-20'>
        <ion-icon name="mail-open-outline"></ion-icon>
        <h1 className="font-semibold text-green-500 text-2xl ml-3">MAIL US</h1>
      </div>
      <form className="lg:mt-4 lg:ml-12">
        <label>Name</label><br />
        <input
          type="text"
          placeholder="Your Name"
          className="border rounded-md p-2 w-128 mt-2"
        />
        <br />
        <label className='mt-2'>Email</label><br />
        <input
          type="email"
          label="Email"
          placeholder="Your Email"
          className="border rounded-md p-2 mt-2 w-128"
        />
        <br />
        <label className='mt-2'>Mobile</label><br />
        <input
          type="text"
          placeholder="Your Mobile Number"
          className="border rounded-md p-2 mt-2 w-128"
        />
        <br />
        <label className='mt-2'>Message</label><br />
        <textarea
          type="text"
          placeholder="Your Message"
          className="border rounded-md p-2 w-128"
        />
        <br />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 items-center text-white px-4 py-2 rounded mt-4 cursor-pointer">Send Message</button>
        </div>
      </form>
    </div>
  );
}

export default Contactbox