/* eslint-disable react/display-name */
import Layout from "../../components/Layout";
import clienteAxios from '../../config/axios';
import React, { useState, Fragment, useContext } from 'react';
import appContext from '../../context/app/appContext';
import Alerta from '../../components/Alerta';

export async function getServerSideProps({params}) {

  const { enlace } = params;
  const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

  return {
    props: {
      enlace: resultado.data
    }
  }

}

export async function getServerSidePaths() {

  const enlaces = await clienteAxios.get('/api/enlaces');

  return {
    paths: enlaces.data.enlaces.map( enlace => ({
      params: { enlace : enlace.url}
    }) ),
    fallback: false
  }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default ({enlace}) => {

  const AppContext = useContext(appContext);
  const { mostrarAlerta, mensaje_archivo } = AppContext;

  //States
  const [ tienePassword, setTienePassword ] = useState(enlace.password);
  const [ password, setPassword ] = useState('');

  //Verifica si el password es correcto
  const verificarPassword = async e => {

    e.preventDefault();

    try {

      const data = { password };
      const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
      enlace.archivo = resultado.data.archivo;
      setTienePassword(resultado.data.password);

    } catch (error) {
      mostrarAlerta(error.response.data.msg);
    }


  }

  return (
    <Layout>

      {
        tienePassword 
        ?
          <Fragment>
            
            <p className="text-center">Enlace protegido con un password:</p>

            { mensaje_archivo && <Alerta />}

            <div className='flex justify-center mt-5'>

              <div className='w-full max-w-lg '>

                <form
                  className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                  onSubmit={ e => verificarPassword(e) }
                >

                  <div className='mb-4'>
                    <label className='block text-black text-sm font-bold mb-2' htmlFor="password">Password</label>
                    <input 
                      type='password'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none '
                      id="password"
                      placeholder='Password'
                      value={password}
                      onChange={ e => setPassword(e.target.value) }
                    />
                  </div>

                  <input 
                    type='submit'
                    className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold'
                    value="Validar Password"
                  />
                  
                </form>

              </div>

            </div>
          </Fragment>

        :
        (
          <Fragment>
            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo: </h1>
            <div className="flex items-center justify-center mt-10">
              <a 
                href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} 
                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                download
              >
                Aquí
              </a>
            </div>
          </Fragment>
        )
      }



    </Layout>
  );

}