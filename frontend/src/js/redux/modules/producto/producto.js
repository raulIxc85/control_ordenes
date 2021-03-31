import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

const IMAGEN_PRODUCTO = 'IMAGEN_PRODUCTOS';

//  -----------------------------
//  Constantes
//  -----------------------------

const baseReducer = createReducer(
    'producto',         //nombre estado
    'producto',         //url API
    'productoForm',     //formulario
    '/productos'        //redireccion de vista
);

const leer = id => (dispatch) => {
    api.get(`producto/${id}`).then((response) => {
        dispatch({ type: IMAGEN_PRODUCTO, imagen: response.imagen });
        dispatch(initializeForm("productoForm", response));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar producto',
            'Error',
            0
        );
    }).finally(() => {
    });
};

const registroProducto = (data={}, attachments=[]) => (dispatch) => {
    api.postAttachments('/producto', data, attachments).then((response) => {
        NotificationManager.success(
            'Producto creado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/productos'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar producto',
            'Error',
            0
        );
    })
}

const editarProducto = (data={}, attachments) => (dispatch) => {
    api.putAttachments(`/producto/${data.id}`, data, attachments).then((response) => {
        NotificationManager.success(
            'Producto modificado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/productos'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar Producto',
            'Error',
            0
        );
    })
}



const borrarImagen = () => (dispatch) => {
    dispatch({ type: IMAGEN_PRODUCTO, imagen: null })
}

export const initialState = {
    ...baseReducer.initialState,
    imagen: null,
}

export const actions = {
    ...baseReducer.actions,
    registroProducto,
    borrarImagen,
    leer,
    editarProducto
}


export const reducers = {
    ...baseReducer.reducers,
    [IMAGEN_PRODUCTO]: (state, { imagen }) => {
        return {
            ...state,
            imagen,
        }
    },
}

export default handleActions(reducers, initialState)
