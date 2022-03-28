import {URL} from './constant';

export const subToken = async (user) => {
   const result = await fetch(URL + 'subToken', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
   });
   const updateData = await result.json();
   localStorage.setItem('isLoggedIn', JSON.stringify(updateData));

   return updateData;
};
