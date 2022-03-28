import React from 'react';
import {BrowserRouter, Route, Routes as RouteNode} from 'react-router-dom';
import {Navbar} from '../common/Navbar';
import {Candidates} from '../home/Candidates';
import {HomeScreen} from '../home/HomeScreen';
import {Login} from '../home/Login';
import {Register} from '../home/Register';
import {Processor} from '../home/Processor';
import {Detector} from '../home/ObjectDetector';
import {Pricing} from '../home/Pricing';
import {ProcessorFace} from '../home/ProcessorFace';
import {AdminPanel} from '../home/AdminPanel';

export const Routes = () => {
   const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('isLoggedIn')));

   return (
      <BrowserRouter>
         <div className="flex flex-col h-screen dark:bg-gray-900">
            <Navbar />
            <div className="flex-grow dark:bg-gray-900">
               <RouteNode>
                  <Route path="/" element={<Pricing />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/candidates" element={<Candidates />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/processor" element={<Processor />} />
                  <Route path="/detector" element={<Detector />} />
                  <Route path="/processorface" element={<ProcessorFace />} />
                  <Route path="/admin" element={<AdminPanel />} />
               </RouteNode>
            </div>
         </div>
      </BrowserRouter>
   );
};
