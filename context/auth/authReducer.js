import { REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         LOGIN_ERROR,
         LOGIN_EXITOSO,
         USUARIO_AUTENTICADO,
         CERRAR_SESION,
         OCULTAR_ALERTA,
      } from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  
  switch(action.type) {
    
    case REGISTRO_EXITOSO:
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload
      }
    
    case LOGIN_EXITOSO:
      localStorage.setItem('rnstoken', action.payload);
      return {
        ...state,
        token: action.payload,
        autenticado: true
      }      
    
    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje: null
      }
    
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
      }
    
    case CERRAR_SESION:
      localStorage.removeItem('rnstoken');
      return {
        ...state,
        usuario: null,
        autenticado: null,
        token: ''
      }

    default:
      return state;
  }
}