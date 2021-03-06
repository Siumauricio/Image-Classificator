import React from 'react';

export const Candidates = () => {
   return (
      <>
         <div className="flex justify-center">
            <h1 className="text-3xl text-gray-900 dark:text-gray-300 font-bold">Candidates</h1>
         </div>
         <div className="flex flex-col px-96 justify-center pt-10 ">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
               <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden ">
                     <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                           <tr>
                              <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                 Product Name
                              </th>
                              <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                 Category
                              </th>
                              <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                 Price
                              </th>
                              <th scope="col" className="p-4">
                                 <span className="sr-only">Edit</span>
                              </th>
                           </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                           <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple Imac 27"</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Desktop PC</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$1999</td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                 <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                 </a>
                              </td>
                           </tr>
                           <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple MacBook Pro 17"</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Laptop</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$2999</td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                 <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                 </a>
                              </td>
                           </tr>
                           <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">iPhone 13 Pro</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Phone</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$999</td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                 <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                 </a>
                              </td>
                           </tr>
                           <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple Magic Mouse 2</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Accessories</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$99</td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                 <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                 </a>
                              </td>
                           </tr>
                           <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple Watch Series 7</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Accessories</td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$599</td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                 <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                 </a>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
