import React, {useState} from 'react';
import * as ml5 from 'ml5';
import {createRef} from 'react/cjs/react.production.min';
import {subToken} from '../utils/subToken';

export const Detector = () => {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('isLoggedIn')));

   const [file, setfile] = useState();
   const img = createRef();
   const [dataModel, setdataModel] = useState(null);

   const handleSubmit = async () => {
      const objectDetector = await ml5.objectDetector('cocossd', {});
      const classifier = await ml5.imageClassifier('MobileNet');
      let obj = objectDetector;
      const results = await classifier.predict(img.current);
      setdataModel(results);
      console.log(obj);
      const updateData = await subToken(user);
      setUser(updateData);
   };

   const onReset = () => {
      setdataModel(null);
      //reset ref
      img.current.src = '';
      setfile(undefined);
   };

   const onChange = (e) => {
      let result = URL.createObjectURL(e.target.files[0]);
      setfile(result);
   };
   return (
      <>
         <section className="flex justify-center pt-16">
            <div>
               <h1 className="text-white text-3xl font-semibold text-center">Object Detector</h1>
               <h2 className="text-white text-center">Tienes {user.token === -1 ? 0 : user.token} tokens</h2>

               <div className="pt-10 ">
                  {file === undefined && (
                     <>
                        <div className=" pb-3">
                           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="user_avatar">
                              Upload file
                           </label>
                           <input
                              onChange={onChange}
                              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              accept="jpg,jpeg,png"
                              type="file"
                           />
                        </div>

                        <button className="py-2.5 w-full px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                           Paste Link
                        </button>
                     </>
                  )}
               </div>
               <div className="image-view" id="imageViewContainer">
                  {file && (
                     <>
                        <img ref={img} src={file} alt="" className="pb-5 w-96 h-96" />
                        {!dataModel && user.token >= 1 && (
                           <>
                              <button
                                 onClick={handleSubmit}
                                 disabled={user.token === 0}
                                 className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                 {user.token === 0 ? 'No tienes tokens' : ' Processar Imagen'}
                              </button>
                           </>
                        )}
                     </>
                  )}

                  {dataModel && (
                     <>
                        <div className="p-6  mb-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Object Detected</h5>
                           {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> */}
                           <ul>
                              <li className="flex flex-col mb-5">
                                 <p className=" font-normal text-gray-700 dark:text-gray-400">Detected Object Name: {dataModel[0].label.toUpperCase()}</p>
                                 <hr></hr>
                                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> Detection Accuracy {dataModel[0].confidence.toFixed(2) * 100}%</p>
                              </li>
                           </ul>
                        </div>
                     </>
                  )}
                  {dataModel && (
                     <button
                        onClick={onReset}
                        type="button"
                        className="text-white w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                     >
                        Reset
                     </button>
                  )}
               </div>
            </div>
         </section>
      </>
   );
};
