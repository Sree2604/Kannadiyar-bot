import React, { useState } from 'react';

const SignUp = () => {
  const [state, setState] = useState('Login');

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col  items-center space-y-4">
        <div className="flex">
            <button
              onClick={() => setState('Login')}
              className={`${
                state === 'Login' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } px-4 py-2 rounded-l cursor-pointer`}
            >
              Login
            </button>
            <button
              onClick={() => setState('Sign Up')}
              className={`${
                state === 'Sign Up' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } px-4 py-2 rounded-r cursor-pointer`}
            >
              Sign Up
            </button>
          </div>
          {state === 'Login' && (
            <form className="mt-4">
              <input type="text" placeholder="Enter the name" className="border w-full rounded-md p-2" /><br></br>
              <input type="password" placeholder="Enter the password" className="border rounded-md p-2 mt-2" /><br />
              <div className='flex justify-center'>
              <input type="submit" className="bg-blue-500 items-center text-white px-4 py-2 rounded mt-4 cursor-pointer" />
              </div>

            </form>
          )}
          {state === 'Sign Up' && (
            <form className="mt-4">
              <input type="text" placeholder="Enter the name" className="border rounded-md p-2" /><br />
              <input type="password" placeholder="Enter the password" className="border rounded-md p-2 mt-2" /><br />
              <input type="text" placeholder="Confirm password" className="border rounded-md p-2 mt-2" /><br />
              <div className='flex justify-center'>
              <input type="submit" className="bg-blue-500 items-center text-white px-4 py-2 rounded mt-4 cursor-pointer" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
