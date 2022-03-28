import React from 'react';
import {Link} from 'react-router-dom';
import {URL} from '../utils/constant';
import {useForm} from '../hooks/useForm';
import {useNavigate} from 'react-router-dom';

export const Register = () => {
   let navigate = useNavigate();

   const [{email, password, token}, handleInputChange, resetForm] = useForm({
      email: '',
      password: '',
      token: 5,
   });
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email, password, token);

      const result = await fetch(URL + 'create_user', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({email, password, token}),
      });
      const data = await result.json();
      if (data) {
         navigate('/login', {replace: true});
      }
      // console.log(data);
      console.log(email);
      console.log(password);
   };
   return (
      <div className="mx-auto pt-20 flex flex-col justify-center items-center px-6 pt:mt-0">
         <a className="text-2xl font-semibold flex justify-center items-center mb-8 lg:mb-10">
            <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-10 mr-4" alt="Windster Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">Windster</span>
         </a>

         <div className="bg-gray-800 shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
            <div className="p-6 sm:p-8 lg:p-16 space-y-8">
               <h2 className="text-2xl lg:text-3xl font-bold text-white">Crear cuenta</h2>
               <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div>
                     <label htmlFor="email" className="text-sm font-medium text-white block mb-2">
                        Your email
                     </label>
                     <input
                        name="email"
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="password" className="text-sm font-medium text-white block mb-2">
                        Your password
                     </label>
                     <input
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                     />
                  </div>

                  <button
                     type="submit"
                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                     Crear cuenta
                  </button>
                  <div className="text-sm font-medium text-gray-500">
                     Tienes cuenta?
                     <Link to="/login" className="text-teal-500 hover:underline">
                        Inicia Sesion
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};
