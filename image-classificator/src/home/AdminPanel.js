import React from 'react';
import {useForm} from '../hooks/useForm';
import {URL} from '../utils/constant';

export const AdminPanel = () => {
   const [{email, token}, handleInputChange, resetForm] = useForm({
      email: '',
      token: 0,
   });
   const handleSubmit = async (e) => {
      console.log(email, token);
      e.preventDefault();
      const result = await fetch(URL + 'addToken', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({email, token}),
      });
      const data = await result.json();
      if (data) {
         console.log(data);
      }
   };
   return (
      <form className="mt-8 space-y-6 container mx-auto px-72" onSubmit={handleSubmit}>
         <h1 className="text-3xl text-white">Asignar tokens</h1>
         <div>
            <label htmlFor="email" className="text-sm font-medium text-white block mb-2">
               Correo a asignar tokens
            </label>
            <input
               name="email"
               onChange={handleInputChange}
               id="email"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="name@company.com"
               required
            />
         </div>
         <div>
            <label htmlFor="token" className="text-sm font-medium text-white block mb-2">
               Cantidad de tokens
            </label>
            <input
               type="number"
               onChange={handleInputChange}
               name="token"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               required
            />
         </div>

         <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         >
            Asignar tokens
         </button>
      </form>
   );
};
