import React, { useState, useContext } from 'react';
import appContext from '../context/app/appContext';

const Formulario = () => {

  //State local
  const [ tienePassword, setTienePassword ] = useState(false);

  //State de la App
  const AppContext = useContext(appContext);
  const { agregarPassword, agregarDescargas } = AppContext;

  return ( 
    <div className='w-full mt-20'>
      <div>
        <label className='text-lg text-gray-800'>Eliminar después de:</label>
        <select 
          className='appearance-non w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-non focus:outline-non focus:border-gray-500'
          onChange={ e => { agregarDescargas(parseInt(e.target.value)) } }
        >
          <option value="" selected disabled>-- Seleccionar --</option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>

      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <label className='text-lg text-gray-800 mr-2'>Proteger con contraseña</label>
          <input 
            type='checkbox'
            onChange={ () => setTienePassword(!tienePassword) }
          />
        </div>
        
        {
          tienePassword 
          ?
          (
            <input 
              type='password' 
              className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8' 
              onChange={ e => agregarPassword(e.target.value) }
            />
          )
          : null
        }


      </div>

    </div>
   );
}
 
export default Formulario;