import React, { Fragment } from 'react';
import Head from 'next/head';
import Header from './Header';

const Layout = ({children}) => {
  
  return ( 

    <Fragment>

      <Head>
        <title>React NodeSend</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>

      <div className='bg-gray-100 min-h-screen'>
        <div className='container mx-auto'>
          <Header />
          <main className='mt-20'>
           {children}
          </main>
        </div>
      </div>
      

    </Fragment>
   );

}
 
export default Layout;