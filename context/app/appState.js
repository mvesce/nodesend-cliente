import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import clienteAxios from '../../config/axios';
import { MOSTRAR_ALERTA,
         OCULTAR_ALERTA,
         LIMPIAR_STATE,
         SUBIR_ARCHIVO,
         SUBIR_ARCHIVO_ERROR,
         SUBIR_ARCHIVO_EXITO,
         CREAR_ENLACE_ERROR,
         CREAR_ENLACE_EXITO,
         AGREGAR_PASSWORD,
         AGREGAR_DESCARGAS
       } from '../../types';

const AppState = ({children}) => {

  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: null,
    descargas: 1,
    password: '',
    autor: null,
    url: ''
  }

  //Crear dispatch y state
  const [ state, dispatch ] = useReducer(appReducer, initialState);

  //Muestra una alerta
  const mostrarAlerta = mensaje => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: mensaje
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 3000);
  }


  //Sube archivos al servidor
  const subirArchivo = async (formData, nombreArchivo) => {

    dispatch({
      type: SUBIR_ARCHIVO
    });
    
    try {

      const resultado = await clienteAxios.post('/api/archivos', formData);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo
        }
      });

    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg
      });
    }

  }


  //Creando el enlace cuando se deja el archivo
  const crearEnlace = async () => {

    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor
    }

    const resultado = await clienteAxios.post('/api/enlaces', data);

    dispatch({
      type: CREAR_ENLACE_EXITO,
      payload: resultado.data.msg
    })

    try {

    } catch(error) {
      dispatch({
        type: CREAR_ENLACE_ERROR,
        payload: error.response.data.msg
      });
    }
  }


  //Agrega password
  const agregarPassword = (password) => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password
    });
  }


  //Reiniciar los estados
  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE, 
    })
  }


  //Agrega nro de descargas
  const agregarDescargas = nroDescargas => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: nroDescargas
    });
  }
  

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassword,
        agregarDescargas
      }}
    >
      {children}
    </appContext.Provider>
  );

}


export default AppState;