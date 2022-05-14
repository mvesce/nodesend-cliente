import React, { useReducer } from 'react';
import authContext from "./authContext";
import authReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         OCULTAR_ALERTA,
         LOGIN_ERROR,
         LOGIN_EXITOSO,
         USUARIO_AUTENTICADO,
         CERRAR_SESION,
       } from '../../types';


const AuthState = ({children}) => {

  //Definir un state inicial
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('rnstoken') : '',
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: null
  }

  //Definir el reducer
  const [ state, dispatch ] = useReducer(authReducer, initialState);

  //Registrar nuevos usuario
  const registrarUsuario = async datos => {
    
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg
      });

    } catch(error) {
     
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg
      });

    }

    //Limpia alerta después de 3seg
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      });
    }, 3000);

  }


  //Autenticar Usuarios
  const iniciarSesion = async datos => {
    
    try {

      const respuesta = await clienteAxios.post('/api/auth', datos);
      
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token
      });

    } catch(error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      });
    }

    //Limpia alerta después de 3seg
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      });
    }, 3000);

  }


  //Devuelve usuario autenticado en base al jwt
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('rnstoken');
    if(token) {
      tokenAuth(token);
    }

    try {

      const respuesta = await clienteAxios.get('api/auth');
      if(respuesta.data.usuario) {
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: respuesta.data.usuario
        });
      }

    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      });
    }
  }


  //Funcion para cerrar sesión
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        usuarioAutenticado,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthState;