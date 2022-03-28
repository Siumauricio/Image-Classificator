import React, {useState} from 'react';
import * as ml5 from 'ml5';
import p5 from 'p5';
import {createRef} from 'react/cjs/react.production.min';
import {subToken} from '../utils/subToken';

let faceapi;
let img;
let detections;
let canvas, ctx;

export const ProcessorFace = () => {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('isLoggedIn')));

   const detectionOptions = {
      withLandmarks: true,
      withDescriptors: false,
   };

   const [file, setfile] = useState();
   img = createRef();
   const [dataModel, setdataModel] = useState(null);
   const [data, setdata] = useState(null);
   const handleSubmit = async () => {
      const pic = document.getElementById('buttonSubmit');
      pic.setAttribute('hidden', 'hidden');
      canvas = crearCanvas(img.current.width, img.current.height);
      ctx = canvas.getContext('2d');
      faceapi = await ml5.faceApi(detectionOptions, modelLoaded);
      const updateData = await subToken(user);
      setUser(updateData);
   };

   function modelLoaded() {
      console.log('Model Loaded!');

      // Make some sparkles
      faceapi.detectSingle(img.current, gotResults);
   }
   function gotResults(err, result) {
      if (err) {
         console.log(err);
         return;
      }
      // console.log(result)
      detections = result;
      console.log(detections);

      ctx.drawImage(img.current, 0, 0, img.current.width, img.current.height);

      if (detections) {
         console.log(detections);
         drawBox(detections);
         drawLandmarks(detections);
      }
   }

   function drawBox(detections) {
      const alignedRect = detections.alignedRect;
      const {_x, _y, _width, _height} = alignedRect._box;
      // canvas.fillStyle = 'none';
      ctx.rect(_x, _y, _width, _height);
      ctx.strokeStyle = '#a15ffb';
      ctx.stroke();
   }

   function drawLandmarks(detections) {
      // mouth
      ctx.beginPath();
      detections.parts.mouth.forEach((item, idx) => {
         if (idx === 0) {
            ctx.moveTo(item._x, item._y);
         } else {
            ctx.lineTo(item._x, item._y);
         }
      });
      ctx.closePath();
      ctx.stroke();

      // nose
      ctx.beginPath();
      detections.parts.nose.forEach((item, idx) => {
         if (idx === 0) {
            ctx.moveTo(item._x, item._y);
         } else {
            ctx.lineTo(item._x, item._y);
         }
      });
      ctx.stroke();

      // // left eye
      ctx.beginPath();
      detections.parts.leftEye.forEach((item, idx) => {
         if (idx === 0) {
            ctx.moveTo(item._x, item._y);
         } else {
            ctx.lineTo(item._x, item._y);
         }
      });
      ctx.closePath();
      ctx.stroke();

      // // right eye
      ctx.beginPath();
      detections.parts.rightEye.forEach((item, idx) => {
         if (idx === 0) {
            ctx.moveTo(item._x, item._y);
         } else {
            ctx.lineTo(item._x, item._y);
         }
      });

      ctx.closePath();
      ctx.stroke();

      // // right eyebrow
      ctx.beginPath();
      detections.parts.rightEyeBrow.forEach((item, idx) => {
         if (idx === 0) {
            ctx.moveTo(item._x, item._y);
         } else {
            ctx.lineTo(item._x, item._y);
         }
      });
      ctx.stroke();
      // canvas.closePath();

      // // left eyeBrow
      ctx.beginPath();
      detections.parts.leftEyeBrow.forEach((item, idx) => {
         if (idx === 0) {
            ctx.moveTo(item._x, item._y);
         } else {
            ctx.lineTo(item._x, item._y);
         }
      });
      // canvas.closePath();

      ctx.strokeStyle = '#a15ffb';
      ctx.stroke();
   }

   // Helper Functions
   function createCanvas(w, h) {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      //document.getElementById("imageViewContainer").src=canvas.toDataURL();
      //setfile(canvas.toDataURL());
      document.body.appendChild(canvas);
      //console.log(canvas.toDataURL('image/jpeg'));
      /* canvas.toBlob(function(blob) {
        var newImg = document.createElement('img'),
            url = URL.createObjectURL(blob);
        
        setfile(url);
        newImg.onload = function() {
          // ya no es necesario leer el blob, por lo que se revoca
          URL.revokeObjectURL(url);
        };
      
        newImg.src = url;
        document.body.appendChild(newImg);
      });*/
      return canvas;
   }
   function crearCanvas(w, h) {
      const canva = document.getElementById('myCanvas');
      const imagen = document.getElementById('myImg');
      const hid = canva.getAttribute('hidden');
      imagen.setAttribute('hidden', 'hidden');
      canva.removeAttribute('hidden');
      canva.width = img.current.width;
      canva.height = img.current.height;
      const context = canva.getContext('2d');
      context.drawImage(img.current, 0, 0, img.current.width, img.current.height);
      setdata(imagen);
      return canva;
   }

   const onReset = () => {
      setdata(null);
      //reset ref
      img.current.src = '';
      setfile(undefined);
   };

   const onChange = (e) => {
      let result = URL.createObjectURL(e.target.files[0]);
      setfile(result);
   };

   function cambiar() {
      console.log(img.current.src);
      setfile(img.current.src);
   }
   return (
      <>
         {/* <body onload="main()"> */}
         <section className="flex justify-center pt-16">
            <div>
               <h1 className="text-white text-3xl font-semibold text-center">Processor Face</h1>
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
                        <img ref={img} src={file} alt="" className="pb-5 w-96 h-96" id="myImg" />
                        <canvas id="myCanvas" className="pb-5 w-96 h-96" hidden="hidden" />
                        {!dataModel && (
                           <>
                              <button
                                 id="buttonSubmit"
                                 disabled={user.token === 0}
                                 onClick={handleSubmit}
                                 className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                 {user.token === 0 ? 'No tienes tokens' : ' Processar Imagen'}
                              </button>
                           </>
                        )}
                     </>
                  )}
                  {/* 
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
                  )} */}

                  {dataModel && (
                     <>
                        <div className="p-6  mb-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Estadisticas de resultados</h5>
                           {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> */}
                           <ul>
                              {Object.keys(dataModel).map((key, i) => {
                                 return (
                                    <li key={i} className="flex flex-col mb-5">
                                       <h2 className=" text-white mr-1">{i + 1}. Nombre Modelo:</h2>
                                       <p className=" font-normal text-gray-700 dark:text-gray-400"> {dataModel[key].label}</p>
                                       <h2 className=" text-white">Nivel de confidencialidad:</h2>

                                       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {dataModel[key].confidence}%</p>
                                    </li>
                                 );
                              })}
                           </ul>

                           {/* {dataModel} */}
                           {/* </p> */}
                        </div>
                     </>
                  )}
                  {data && (
                     <button
                        onClick={onReset}
                        type="button"
                        className="text-white w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                     >
                        Reset
                     </button>
                  )}
                  {/* <button
                     type="submit"
                     className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                     What is in the image ?
                  </button> */}

                  {/* <h2 className="result" id="result">
                  
               </h2> */}
               </div>
            </div>
         </section>
      </>
   );
};
