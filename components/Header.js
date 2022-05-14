import React, { Fragment, useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';

const Header = () => {

  //Routing
  const router = useRouter();

  //Extraer usuario autenticado de storage
  const AuthContext = useContext(authContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;

  //Extraer context de la app
  const AppContext = useContext(appContext);
  const { limpiarState } = AppContext;

  useEffect( () => {
    usuarioAutenticado();
  }, []);

  const redireccionar = () => {
    router.push('/');
    limpiarState();
  }

  return ( 
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>

      <a>
        <img 
          className='w-64 mb-8 md:mb-0 cursor-pointer' 
          src="/logo.svg" 
          alt="logo"
          onClick={ () => redireccionar() }
        /> 
      </a>


      <div>
        {
          usuario ?
          (
            <div className='flex items-center'>
              <p className='mr-3'>Hola {usuario.nombre}</p>
              <button 
                type='button'
                className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'
                onClick={ () => cerrarSesion() }
              >
                Cerrar Sesión
              </button>
            </div>
          )
          :
          (
            <Fragment>
              <Link href='/login'><a className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2'>Iniciar Sesion</a></Link>
              <Link href='/crearcuenta'><a className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>Crear Cuenta</a></Link>
            </Fragment>
          )
        }

      </div>


    </header>
   );
}
 
export default Header;